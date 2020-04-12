const url = {
    root: '/',
    login: {
        path: '/login',
        title: '登录页'
    },
    app: {
        root: {
            path: '/app',
            title: '权限页'
        },
        errorAuthority: { 
            path: '/app/403'
        },
        pipeline: {
            path: '/app/pipeline'
        },
    }
}

export default url
