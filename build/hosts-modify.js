/**
 * 功能：统一用户管理&修改用户hosts文件
 * 作者：安超
 * 日期：2019-08-06
 */

const Hosts = require('hosts-so-easy')

const hosts = new Hosts.default()

// 删除上一次的配置
hosts.remove('127.0.0.1', '*')
hosts.remove('*', 'server.local.host')

// 增加配置，qavm1.qa.mlamp.cn -> 172.16.2.192
// hosts.add('127.0.0.1', 'qavm1.qa.mlamp.cn')
// hosts.add('172.16.2.192', 'server.local.host')

// hosts.add('127.0.0.1', 'povm3.po.mlamp.cn')
// hosts.add('172.16.2.249', 'server.local.host')

hosts.add('127.0.0.1', 'ml28vm3.po.mlamp.cn')
hosts.add('172.21.28.13', 'server.local.host')

// hosts.add('172.16.2.222', 'server.local.host')

// hosts.add('127.0.0.1', 'ml22vm2.po.mlamp.cn')
// hosts.add('172.21.22.12', 'server.local.host')

hosts.updateFinish()
    .then(() => {
        console.log('hosts modified success~')
    })
    .catch(() => {
        console.log('hosts modified error!')
    })
