import {
    React,
    // PropTypes,
} from 'framework/Util'
// import {  } from 'antd'
import Stage from '../stage'
import './scss/index.scss'

const pipelineDatas = [
    { title: '编译', jobs: [{ name: '编译', status: 'success', time: 1586501933017 }] },
    { title: '部署', jobs: [{ name: '部署', status: 'success', time: 1586501933017 }] },
    {
        title: '代码扫描和检查',
        jobs: [
            { name: 'STC', status: 'success', time: 1586501933017 },
            { name: 'PMD', status: 'fail', time: 1586501933017 },
            { name: 'PMD1', status: 'success', time: 1586501933017 },
        ]
    },
    {
        title: '集成测试',
        jobs: [
            { name: '集成测试', status: 'fail', time: 1586501933017 },
            { name: '单元测试', status: 'fail', time: 1586501933017 }
        ]
    },
    { title: '编译1', jobs: [{ name: '编译', status: 'success', time: 1586501933017 }] },
    { title: '部署1', jobs: [{ name: '部署', status: 'success', time: 1586501933017 }] },
    {
        title: '代码扫描和检查1',
        jobs: [
            { name: 'STC1', status: 'success', time: 1586501933017 },
            { name: 'PMD1', status: 'fail', time: 1586501933017 }
        ]
    },
    {
        title: '集成测试1',
        jobs: [
            { name: '集成测试1', status: 'fail', time: 1586501933017 },
            { name: '单元测试1', status: 'fail', time: 1586501933017 }
        ]
    },

]

// console.log(pipelineDatas)

const stageWidth = 250
const stageSpace = 60

const Pipeline = function () { 
    const [scrollX, setScrollX] = React.useState('100%')
    React.useEffect(() => {
        const handleResize = () => {
            const { clientWidth } = document.body
            const pipeWidth = pipelineDatas.length * (stageWidth + stageSpace)
            if (pipeWidth > clientWidth) {
                setScrollX(pipeWidth)
            }
        }
        handleResize()
        document.addEventListener('resize', handleResize)

        return () => {
            document.removeEventListener('resize', handleResize)
        }
    }, [])
    return (
        <div styleName="pipeline">
            <div className="pipeline-box" style={{ width: scrollX }}>
                {pipelineDatas.map(item => (
                    <Stage key={item.title} title={item.title} jobs={item.jobs} stageWidth={stageWidth} />
                ))}
            </div>
            
        </div>
    )
}

// Pipeline.propTypes = {
// 
// }

// Pipeline.defaultProps = {
// 
// }

export default Pipeline
