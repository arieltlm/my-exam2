## 配置须知

#### 环境依赖：

- `node v9.9`
- `python2.7`
- `ruby`

#### 使用npm本地仓库

```bash
npm set registry http://fe.mlamp.cn:2018
```

#### 安装依赖包

```bash
gem install sass
npm install
```

#### 安装额外依赖

```bash
npm install package_name --save
npm install package_name --dev-save
```

## 启动调试环境

```bash
预编译：npm run dll
开发：npm run start
模拟服务：npm run server
打包：npm run deploy
```
## 规定
```bash
1. reducer中initialState各项含义必须注释说明，同时使用Immutable对象进行声明
2. 所有的component组件使用.jsx扩展名
3. 工具类中各方法的使用必须注释清楚
4. 弹窗的交互数据全部写在组件内部，禁止保存在store内
5. 公共弹窗dialog.open的content中写入弹窗的操作的按钮（如：确定、取消）
6. 公共弹窗dialog支持open/confirm/alert/hide/setFooter等方法，具体用法参考：framework/dialog/index.js
```

## js规范
```
采用国际通用规范airbnb,
采用eslint对js代码自动校验纠错
规范参考文档：https://github.com/airbnb/javascript

actionType规范：
1. 动作名_模块名（例如：SET_USER_INFO_LOGIN）
2. 每个模块独立声明自己的action名称
```
## scss规范
```
采用国际通用规范recommended-scss
采用stylelint对scss代码自动校验纠错
规范参考文档：https://stylelint.io/user-guide/rules/

模块内scss规范：
1. 组件根样式命名：功能-模块名（例如：.footer-todos）
2. 所有组件内部不能使用id，只能使用class(命名以-方式分隔主要单词，如：fa-close)
3. 工程集成了compass，充分使用compass提供的所有功能！！
4. 基于react组件单根的特点，所以组件内样式也采用单根形式
.footer-todos {
  height: 20px;
  display: block;
  
  .filters{
     font-size: 14px;
  }  
  .clear-completed{
    overflow: hidden;
  }
}
```

## 提交规范
```
格式：<type>(<scope>): <subject>

type: 用于说明commit的类别，中允许使用以下7个标识。
      feat：新功能（feature）
      fix：修补bug
      docs：文档（documentation）
      style： 格式（不影响代码运行的变动）
      refactor：重构（即不是新增功能，也不是修改bug的代码变动）
      test：增加测试
      chore：构建过程或辅助工具的变动
scope: 用于说明commit的影响范围，比如store,reducer,view,根据不同位置来决定。
subject: 是commit的简短描述，不超过50个字符。
      1.以动词开头，使用第一人称现在时，比如change，而不是changed或changes
      2.第一个字母小写
      3.结尾不加句号（.）   
      
可以参考：http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html           
```
## 开发使用说明
```
1. actionCreator内可配置ajax请求和静态的action设置
   ajax示例说明：
   getAllTodo: {
       url: '/api/getTodos', // ajax请求地址（必写）
       method: 'GET', // ajax请求方式（必写）
       hasLoading: true, // ajax请求时是否出现loading画面，默认是true,（非必写）
       handleError: true, // ajax出现错误时是否自动提醒，默认true，（非必写）
       needFormData: false, // ajax执行成功后是否把请求参数传给action.payload，默认false，（非必写）
       actionType: actionTypes.GET_ALL_TODO // ajax成功之后执行的action动作，（非必写）
   },
   非ajax示例：
   checkedAllTodo: createAction(actionTypes.CHECKED_ALL_TODO)
2. reducer内可配置ajax的发送前pre，成功success， 失败error，无论如何always的配置
   ajax示例说明：
   // 只有需要放到store里的state才需要在这里设置，每一项都不一定是必需写的！！！
   [actionTypes.GET_ALL_TODO]: {
           pre: state => state.set('isLoading', true), // 发送前的state的修改变化
           success: (state, action) => state.set('list', Immutable.fromJS(action.payload)), // 成功后state的修改变化
           error: state => state.set('isLoading', false), // 失败后state的修改变化
           always: state => state.set('isLoading', false) // 无论成功或失败都要执行的action
       },  
   非ajax示例说明    
   [actionTypes.CLEAR_COMPLETED_TODO](state) {
           return state.update('list', list => list.filter(oTodo => (!oTodo.get('completed'))))
       }     
3. reducers汇总
   3.1 每个模块reducers文件夹里都必须有一个index.js作为本模块内所有state的汇总
   3.2 在conf/reducers里把每个模块reducers/index.js汇总在一起，store即可管理所有的state        
```

## 特殊处理
```
1. 在每个actionCreator里默认注入了projectInit方法，在每个渲染组件里都可以直接初始化store中的state
```