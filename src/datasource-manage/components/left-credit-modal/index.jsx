/**
 * 功能: 新增编辑数据源
 * 作者: tanglimei
 * 日期: 2020.02.05
 */

import {
    React,
    PureComponent,
    PropTypes,
    noop,
    classNames,
} from 'framework/Util'
import config from 'conf'
import dialog from 'dialog'
import { Form, Input, Select, Button, InputNumber, message, Row, Col } from 'antd'

import FooterButton from '@/components/footer-button'
import LinkStatusBox from '../left-credit-link-status'
import UploadDataSource from '../left-credit-upload'
import ModalSyncDataSource from '../../container/left-sync-modal'
import './scss/index.scss'

const { Option } = Select
const { Password, TextArea } = Input

const { 
    constant: { 
        validatorDic,
    }
} = config


class ModalCredit extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            linkStatus: 'wait',
            testReqInfo: {}, // 记录测试连接时的信息，一旦发生变化，重新进行测试连接
            initUploadFlag: true,
            dataSourceDriverOption: [],
            asyncValidatorName: '' // 数据源重复信息-后台返回
        }
    }

    handleSubmit = () => {
        const { 
            form: { validateFields }, 
            newDataSource, 
            editDataSource, 
            editFlag, 
            record 
        } = this.props

        validateFields((err, fieldsValue) => {
            if (!err) {
                console.log(fieldsValue)

                if (editFlag) { 
                    const reqData = {
                        ...fieldsValue, 
                    }
                    const { dataSourceInfoId } = record
                    reqData.dataSourceInfoId = dataSourceInfoId
                    this.reqSubmit(reqData, editDataSource)
                } else {
                    this.reqSubmit(fieldsValue, newDataSource)
                }
            }
        })
    }

    // 新增/编辑请求 
    reqSubmit = (reqData, func) => { 
        const { 
            form: { validateFields }, 
            getTableData, 
            clearSyncCurrentData,
        } = this.props
        func({
            data: reqData  
        }).then(res => {
            const { data, message: msg, statusCode } = res
            if (statusCode === 200){
                // getTableData()
                this.setState({
                    asyncValidatorName: ''
                })
                message.success(msg)
                dialog.open({
                    title: '同步数据源',
                    width: 980,
                    content: <ModalSyncDataSource 
                        getTableData={getTableData} 
                        currentCreitToSyncData={reqData}
                        oneSync
                    />,
                    cancel: () => {
                        dialog.hide()
                        getTableData()
                        clearSyncCurrentData()
                    }
                })
            } else if (data === 'dataSourceName'){
                // 验证数据源重复
                this.setState({
                    asyncValidatorName: msg
                }, () => {
                    validateFields(['dataSourceName'], { force: true })
                })
            } else {
                message.error(msg)
            }
        })
    }

    // 测试连接
    handleLinkClick = e => {
        e.preventDefault()
        
        const { form: { validateFields, }, testDataSource } = this.props
        validateFields((err, fieldsValue) => {
            if (!err) {
                this.setState({
                    linkStatus: 'runing'
                })
                testDataSource({
                    data: fieldsValue
                }).then(res => {
                    if (res.statusCode === 200){
                        this.setState({
                            linkStatus: 'success',
                            testReqInfo: { 
                                ...fieldsValue, 
                                linkSta: 'success'
                            },
                        })
                    } else {
                        this.setState({
                            linkStatus: 'error',
                            testReqInfo: { 
                                ...fieldsValue, 
                                linkSta: 'error'
                            },
                        })
                    }
                })
            }
        })
    }

    // 验证
    validateField = (field, rule, value, callback) => {
        const { cn, desc, reg } = validatorDic[field]
        const { asyncValidatorName } = this.state
        if (value) {
            if (!new RegExp(reg).test(value.trim())){
                callback(`${cn}仅支持输入${desc}格式`)
            }
            if (asyncValidatorName){
                callback(asyncValidatorName)
            }
        }
        callback()
    }


    handleFormItemChange = (keyName, value) => {
        const { form: { setFieldsValue, validateFields } } = this.props
        const { testReqInfo } = this.state
        setFieldsValue({ [keyName]: value })
        // 测试连接时的信息，一旦发生变化，重新进行测试连接
        if (testReqInfo[keyName] !== value) {
            this.setState({
                linkStatus: 'wait',
            })
            if (keyName === 'dataSourceName'){
                this.setState({
                    asyncValidatorName: ''
                }, () => {
                    validateFields(['dataSourceName'], { force: true })
                })
            }
        } else {
        // 如果再改回之前的就又使用之前的测试结果
            this.setState({
                linkStatus: testReqInfo.linkSta
            })
        }
    }

    // 上传
    uploadChange = info => { 
        const { 
            uploadJar, 
            form: { setFieldsValue, validateFields }
        } = this.props
        const formData = new FormData()
        formData.append('file', info.file)
        uploadJar({ 
            data: formData
        }).then(res => {
            if (res.statusCode === 200) {
                const { data } = res
                message.success('上传成功')
                setFieldsValue({ fileList: 'hasfile' })
                this.setState({ 
                    initUploadFlag: false,
                    dataSourceDriverOption: data
                })
            } else {
                setFieldsValue({ fileList: '' })
                // 上传不成功的时候,再检验-TODO(需要吗?)
                validateFields(['fileList'], { force: true })
            }
        })
    }


    render() {
        const { form: { getFieldDecorator, getFieldValue }, dataSourceType, 
            editFlag, record } = this.props
        const dataSourceTypeSel = getFieldValue('dataSourceType')

        const { linkStatus, initUploadFlag, dataSourceDriverOption, 
        } = this.state

        const isOracle = (editFlag && record.dataSourceType === 'oracle')
        || dataSourceTypeSel === 'oracle'
        const isPgsql = (editFlag && record.dataSourceType === 'pgsql')
        || dataSourceTypeSel === 'pgsql'
        const isOther = (editFlag && record.dataSourceType === 'other')
        || dataSourceTypeSel === 'other'

        return (
            <div styleName="credit-datasoruce">
                
                <div className="main-content-modal">
                    <Form>
                        <Row>
                            <Col span={12}>   
                                <Form.Item label="数据源名称">
                                    {getFieldDecorator('dataSourceName', {
                                        rules: [
                                            { required: true, message: '请输入数据源名称!' },
                                            { validator: (rule, value, callback) => this.validateField('dataSourceName', rule, value, callback) },
                                        ],
                                        initialValue: record.dataSourceName
                                    })(
                                        <Input
                                            type="text" 
                                            onChange={e => { this.handleFormItemChange('dataSourceName', e.target.value) }}
                                            maxLength={32}
                                            placeholder="请输入数据源名称"
                                            allowClear
                                        />,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="数据源类型">
                                    {getFieldDecorator('dataSourceType', {
                                        rules: [
                                            { required: true, message: '请选择数据源类型!' },
                                        ],
                                        initialValue: record.dataSourceType
                                    })(
                                        <Select
                                            allowClear
                                            disabled={editFlag}
                                            placeholder="请选择数据源类型" 
                                            onChange={value => { this.handleFormItemChange('dataSourceType', value) }}
                                        >
                                            {dataSourceType.map((item, index) => (
                                                <Option key={`dataSourceType${index}`} value={item}>{item}</Option>
                                            ))}
                                            {/* <Option key="other" value="other">other</Option> */}
                                        </Select>,
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        
                        { isOther && (
                            <UploadDataSource
                                initUploadFlag={initUploadFlag}
                                getFieldDecorator={getFieldDecorator}
                                uploadChange={this.uploadChange}
                                dataSourceDriverOption={dataSourceDriverOption}
                                handleFormItemChange={this.handleFormItemChange}
                                validateField={this.validateField}
                            />
                        )}
                        <Form.Item label="URL" className="long-item">
                            {getFieldDecorator('url', {
                                rules: [
                                    { required: true, message: '请输入URL地址!' },
                                    // { validator: (rule, value, callback) => this.validateField('url', rule, value, callback) }
                                ],
                                initialValue: record.url
                                // initialValue: 'jdbc:mysql://ws04.mlamp.cn:3306'
                            })(
                                <Input
                                    allowClear
                                    maxLength={255}
                                    type="text"
                                    disabled={editFlag}
                                    placeholder="请输入URL地址" 
                                    onChange={e => { this.handleFormItemChange('url', e.target.value) }}
                                />,
                            )}
                        </Form.Item>
                        <Row>
                            <Col span={(isOracle || isPgsql) ? 12 : 24}>
                                <Form.Item
                                    label="库名"
                                    className={classNames({ 'long-item': !(isOracle || isPgsql) })}
                                >
                                    {getFieldDecorator('database', {
                                        rules: [
                                            { required: true, message: '请输入库名!' },
                                            { validator: (rule, value, callback) => this.validateField('database', rule, value, callback) }
                                        ],
                                        initialValue: record.database
                                        // initialValue: 'cona3_shdemo1'
                                    })(
                                        <Input
                                            allowClear
                                            maxLength={32}
                                            type="text"
                                            disabled={editFlag}
                                            placeholder="请输入库名" 
                                            onChange={e => { this.handleFormItemChange('database', e.target.value) }}
                                        />,
                                    )}
                                </Form.Item>
                            </Col>
                            { isOracle && (
                                <Col span={12}>
                                    <Form.Item label="owner">
                                        {getFieldDecorator('owner', {
                                            rules: [
                                                { required: true, message: '请输入owner!' },
                                                { validator: (rule, value, callback) => this.validateField('owner', rule, value, callback) }
                                            ],
                                            initialValue: record.owner
                                        })(
                                            <Input
                                                allowClear
                                                maxLength={32}
                                                type="text"
                                                disabled={editFlag}
                                                placeholder="请输入owner" 
                                                onChange={e => { this.handleFormItemChange('owner', e.target.value) }}
                                            />,
                                        )}
                                    </Form.Item>
                                </Col>
                            )}
                            { isPgsql && (
                                <Col span={12}>
                                    <Form.Item label="schema">
                                        {getFieldDecorator('schema', {
                                            rules: [
                                                { required: true, message: '请输入schema!' },
                                                { validator: (rule, value, callback) => this.validateField('schema', rule, value, callback) }
                                            ],
                                            initialValue: record.schema
                                        })(
                                            <Input
                                                allowClear
                                                maxLength={32}
                                                type="text"
                                                disabled={editFlag}
                                                placeholder="请输入owner" 
                                                onChange={e => { this.handleFormItemChange('schema', e.target.value) }}
                                            />,
                                        )}
                                    </Form.Item>
                                </Col>
                            )}
                        </Row>
                        <Row>
                            <Col span={12}>   
                                <Form.Item label="用户名">
                                    {getFieldDecorator('username', {
                                        rules: [
                                            { required: true, message: '请输入用户名!' },
                                            // { validator: (rule, value, callback) => this.validateField('username', rule, value, callback) }
                                        ],
                                        initialValue: record.username
                                        // initialValue: 'root'
                                    })(
                                        <Input
                                            allowClear
                                            maxLength={32}
                                            type="text"
                                            disabled={editFlag}
                                            placeholder="请输入用户名" 
                                            onChange={e => { this.handleFormItemChange('username', e.target.value) }} 
                                        />,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="密码">
                                    {getFieldDecorator('password', {
                                        rules: [
                                            { required: true, message: '请输入密码地址!' },
                                        ],
                                        initialValue: record.password
                                    })(
                                        <Password
                                            allowClear
                                            maxLength={32}
                                            placeholder="请输入密码地址" 
                                            onChange={e => { this.handleFormItemChange('password', e.target.value) }}
                                        />,
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item label="取样数据量" className="long-item">
                            {getFieldDecorator('sampleDataSize', {
                                rules: [
                                    { required: true, message: '请输入取样数据量!' },
                                ],
                                initialValue: record.sampleDataSize || 5
                            })(
                                <InputNumber
                                    placeholder="请输入取样数据量" 
                                    min={5}
                                    max={10}
                                    onChange={value => { this.handleFormItemChange('sampleDataSize', value) }}
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="描述" className="long-item">
                            {getFieldDecorator('description', {
                                rules: [
                                    { required: false, message: '请输入描述!' },
                                    // { validator: (rule, value, callback) => this.validateField('description', rule, value, callback) }
                                ],
                                initialValue: record.description
                            })(
                                <TextArea autoSize={{ minRows: 3, maxRows: 5 }} maxLength={100} />,
                            )}
                        </Form.Item>
                    </Form>
                    <div className="test-link-box">
                        <LinkStatusBox linkStatus={linkStatus} />
                        <Button type="primary" onClick={this.handleLinkClick}>测试连接</Button>
                    </div>
                </div>
                <FooterButton handleSubmit={this.handleSubmit} ensureBtnDis={linkStatus !== 'success'} />
            </div>
        )
    }
}

ModalCredit.propTypes = {
    // 父级
    record: PropTypes.object,
    editFlag: PropTypes.bool,
    form: PropTypes.object.isRequired,
    getTableData: PropTypes.func.isRequired,
    // actionCreator
    uploadJar: PropTypes.func,
    editDataSource: PropTypes.func,
    newDataSource: PropTypes.func.isRequired,
    testDataSource: PropTypes.func.isRequired,
    clearSyncCurrentData: PropTypes.func.isRequired,
    // store中
    dataSourceType: PropTypes.array.isRequired,
}

ModalCredit.defaultProps = {
    record: {},
    editFlag: false,
    editDataSource: noop,
    uploadJar: noop
}

export default Form.create()(ModalCredit)
