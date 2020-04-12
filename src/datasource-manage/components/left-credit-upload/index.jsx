/**
 * 功能: other数据源类型时的上传部分
 * 作者: tanglimei
 * 日期: 2020.02.06
 */
import {
    React,
    PropTypes,
} from 'framework/Util'
import { Form, Input, Select, Button, Upload, Icon, Row, Col } from 'antd'

const { Option } = Select


function UploadDataSource({
    dataSourceDriverOption, 
    initUploadFlag, 
    uploadChange, 
    getFieldDecorator, 
    handleFormItemChange,
    validateField,
}) {
    const props = {
        name: 'file',
        action: '',
        headers: {
            authorization: 'authorization-text',
        },
        showUploadList: false,
        beforeUpload: () => false,
        accept: '.jar',
        onChange: uploadChange,
            
    }

    return (
        initUploadFlag ? (
            <Form.Item label="数据源Driver class">
                {getFieldDecorator('fileList', {
                    valuePropName: 'fileList',
                    rules: [
                        { required: true, message: '请上传文件!' },
                    ],
                })(
                    <Upload {...props}>
                        <Button><Icon type="upload" /> 上传文件</Button>
                    </Upload>
                )}
            </Form.Item>
        ) : (
            <>
                <Row>
                    <Col span={12}>   
                        <Form.Item label="数据源Driver class">
                            {getFieldDecorator('dataSourceDriver', {
                                rules: [
                                    { required: true, message: '请选择数据源Driver class!' },
                                ],
                                initialValue: dataSourceDriverOption[0]
                            })(
                                <Select
                                    allowClear
                                    placeholder="Driver class" 
                                    onChange={value => { handleFormItemChange('dataSourceDriver', value) }}
                                >
                                    {dataSourceDriverOption.map(item => (
                                        <Option key={item} value={item}>{item}</Option>
                                    ))}
                                </Select>,
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>   
                        <Form.Item label="数据源类型名称">
                            {getFieldDecorator('dataSourceTypeName', {
                                rules: [
                                    { required: true, message: '请输入数据源类型名称!' },
                                    { validator: (rule, value, callback) => validateField('dataSourceTypeName', rule, value, callback) }
                                ],
                            })(
                                <Input
                                    allowClear
                                    maxLength={16}
                                    type="text"
                                    placeholder="请输入数据源类型名称" 
                                    onChange={e => { handleFormItemChange('dataSourceTypeName', e.target.value) }}
                                />,
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Upload {...props}>
                        <Button><Icon type="upload" /> 重新上传</Button>
                    </Upload>
                </Form.Item>
            </>
        )
    )
}

/**
 * dataSourceDriverOption 上传的数据源解析出来的列表选项
 * initUploadFlag 是否为初始未上传状态
 * uploadChange 上传函数
 * getFieldDecorator 
 * handleFormItemChange 改变某个字段
 * validateField 校验方法
 */
UploadDataSource.propTypes = {
    dataSourceDriverOption: PropTypes.array.isRequired,
    initUploadFlag: PropTypes.bool.isRequired,
    uploadChange: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
    handleFormItemChange: PropTypes.func.isRequired,
    validateField: PropTypes.func.isRequired,
}

export default UploadDataSource
