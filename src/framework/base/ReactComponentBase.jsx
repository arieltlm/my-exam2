/**
 * 功能： 所有组件的基类
 * 作者： 
 * 日期： 2016/7/30
 */

import React from 'react'
import { pathToRegexp } from 'path-to-regexp'
import url from '@/conf/url'
// import PropTypes from 'prop-types'

const { login, app } = url

class ReactComponentBase extends React.PureComponent {
    constructor(props, context) {
        super(props, context)
        this.setDocTitle()
    }
    
    // 组件装载顺序
    // constructor()
    // componentWillMount()
    // render()
    // componentDidMount()
    
    // 组件更新顺序
    // state getDerivedStateFromProps()
    // shouldComponentUpdate()
    // componentWillUpdate()
    // render()
    // componentDidUpdate()
    
    // 组件卸载
    // componentWillUnmount()
    
    // setState的特性
    // setState() 并不总是立即更新组件。它可能会批量或延迟到后面更新。这使得在调用 setState() 之后立即读取 this.state 存在一个潜在的陷阱。 而使用 componentDidUpdate 或 setState 回调（setState(updater, callback)），在应用更新后，都将被保证触发。
    // setState()第一个参数可以传递一个对象，而不是一个函数，将执行stateChange的浅合并到新的state，这种形式的 setState() 是异步的，并且在同一周期内的多个调用可以被合并在一起执行批处理。类似：
    //   Object.assign(
    //     previousState,
    //     {quantity: state.quantity + 1},
    // {quantity: state.quantity + 1},
    // ...
    // )
    // 同一周期中，后续调用将覆盖先前调用的值，所以数量只会增加一次。如果下一个 state 取决于以前的 state ，推荐使用回调函数。
    
    // forceUpdate()
    // 调用 forceUpdate() 会导致组件跳过 shouldComponentUpdate() ，直接调用 render()。 这将触发子组件的正常生命周期方法，包括每个子组件的 shouldComponentUpdate() 方法。
    // 通常你应该尽量避免使用 forceUpdate() ，并且 render() 中的 this.props 和 this.state 应该是只读的。
    
    // componentWillMount(){
    // 在组件 装载(mounting) 发生之前立即被调用。 它在 render() 之前调用，因此在此方法中的设置 state(状态) 不会触发重新渲染。 避免在此方法中进行任何其它修改（side－effects）或订阅（subscriptions）。 这是在服务器渲染上调用的唯一的生命周期钩子。 一般来说，建议使用 constructor()。
    // }
    //
    // componentDidMount(){
    //  在组件 装载(mounting) 后被立即调用。 需要初始化 DOM 节点的应该放在这里。 如果需要从远程端点加载数据，这里是进行网络请求的好地方。 此方法中的设置 state(状态) 将触发重新渲染。
    // }
    //
    // state getDerivedStateFromProps(props, state){
    //  return { 新state的值 } 参考：http://react.css88.com/docs/react-component.html#static-getderivedstatefromprops
    // }
    //
    // shouldComponentUpdate(nextProps, nextState){
    //  当接收到新的 props 或 state 时，shouldComponentUpdate() 在渲染之前被调用。
    //  默认返回 true ，对于初始(第一次)渲染 或 使用 forceUpdate() 时，不调用此方法。
    //  返回 false 不会阻止子组件在 state 更改时重新渲染。
    //  目前，如果 shouldComponentUpdate() 返回 false ，那么 componentWillUpdate() ，render()和componentDidUpdate() 将不会被调用。
    // }
    //
    // componentWillUpdate(nextProps, nextState){
    //  当接收到新的 props 或 state 时，componentWillUpdate() 在渲染之前立即被调用。在更新发生之前，使用这个方法可以作为执行准备更新的一个好机会。这个方法在第一次渲染时不会被调用。
    //  这里不能调用 this.setState() 。 如果你需要更新 state 以响应 props 更改，请改用 state getDerivedStateFromProps()。
    // }
    //
    // componentDidUpdate(prevProps, prevState){
    //  在更新发生后立即被调用。 这个方法在第一次渲染时不会被调用。
    //  当组件已更新时，使用此方法作为操作 DOM 的一个机会。 这也是做网络请求的一个好地方，只需你比较当前 props 与以前的 props（例如，如果 props 没有改变，可能不需要网络请求）。
    // }
    //
    // componentWillUnmount(){
    //  在一个组件被卸载(unmounted) 和销毁(destroyed) 之前立即被调用。 在此方法中执行任何必要的清理，例如使计时器无效，取消网络请求，或清理在 componentDidMount 中创建的任何 DOM 元素。
    // }
    
    componentWillUnmount(){
        this.setState = function () {}
    }
    
    setDocTitle = () => {
        let docTitle = '测试工程'
        const pathname = window.location.hash.slice(1)
        
        if (pathname === login.path) {
            window.document.title = `${docTitle}-${login.title}`
            return
        }
        
        // 受限页面
        for (const moduleName in app) {
            if ({}.hasOwnProperty.call(app, moduleName)){
                const { path, title } = app[moduleName]
                const keys = []
                const toPath = pathToRegexp(path, keys)
                
                // 没有可变参数
                if (keys.length === 0 && pathname === path) {
                    docTitle = `${docTitle}${title ? `-${title}` : ''}`
                    break
                } else if (toPath.test(pathname)){
                    docTitle = `${docTitle}${title ? `-${title}` : ''}`
                    break
                } else {
                    // 没有匹配的路径
                }
            }
        }
        
        window.document.title = docTitle
    }
    
    forbitBlackSpace = e => {
        if (e.which === 32) {
            e.preventDefault()
        }
        
        return this
    }
    
    forbitDefaultEvent = e => {
        e.preventDefault()
        e.stopPropagation()
        
        return this
    }
    
    stateChange = (key, value, fnCb = () => {}) => {
        if (typeof key === 'string') {
            this.setState({
                [key]: value
            }, fnCb)
        } else {
            // key可以传一个对象
            // value，则为一个回调
            this.setState(key, value)
        }
    }
    
    render() {
        return null
    }
}

export default ReactComponentBase
