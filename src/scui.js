import config from "./config"
import api from './api'
import tool from './utils/tool'
import http from "./utils/request"
import { permission, rolePermission } from './utils/permission'
import auth from './directives/auth'
import role from './directives/role'
import time from './directives/time'
import copy from './directives/copy'
import errorHandler from './utils/errorHandler'

export default {
    install(app) {
        // 挂载全局对象
        app.config.globalProperties.$CONFIG = config
        app.config.globalProperties.$TOOL = tool
        app.config.globalProperties.$HTTP = http
        app.config.globalProperties.$API = api
        app.config.globalProperties.$AUTH = permission
        app.config.globalProperties.$ROLE = rolePermission

        // 注册全局组件

        // 注册全局指令
        app.directive('auth', auth)
        app.directive('role', role)
        app.directive('time', time)
        app.directive('copy', copy)

        // 全局代码错误捕捉
        app.config.errorHandler = errorHandler
    }
}
