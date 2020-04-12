/**
 * Created by anchao on 2015/12/7.
 */
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import './css/index.scss'
import './css/common/theme/light/antd-ext.less'
import projectInit from './framework/projectInit'

projectInit(document.querySelector('#container'), () => {
    console.log('工程初始化完成！！')
    
    // 图片加载失败处理
    document.addEventListener('error', e => {
        const elem = e.target
        if (elem.tagName.toLowerCase() === 'img') {
            elem.src = '/static/images/404.png'
            // elem.className = 'img-responsive'
        }
    }, true)
})

// if (process.env.NODE_ENV === 'production') {
//     window.addEventListener('beforeunload', e => {
//         const msg = '确定要离开吗？'
//         e.returnValue = msg
//         return msg
//     }, false)
// }
