// 异步路由需要权限验证
import Menu1_Page1_1 from '@/views/menu1/page1-1'
import Menu1_Page1_2 from '@/views/menu1/page1-2'
import Menu2_Page2_1 from '@/views/menu2/page2-1'
import Menu2_Page2_1_1 from '@/views/menu2/page2-1-1'
import Student_index from '@/views/student/index'



const routes = [{
    name: "menu1",
    path: "/menu1",
    redirect: '/menu1/page1-1',
    meta: {
        title: "菜单一",
        icon: "el-icon-menu",
        type: "menu"
    },
    children: [
        {
            name: "page1-1",
            path: "/menu1/page1-1",
            component: Menu1_Page1_1,
            meta: {
                title: "页面1-1",
                icon: "el-icon-menu"
            }
        },
        {
            name: "page1-2",
            path: "/menu1/page1-2",
            component: Menu1_Page1_2,
            meta: {
                title: "页面1-2",
                icon: "el-icon-menu"
            }
        },
        {
            name: "vue-router",
            path: "/menu1/vue-router",
            meta: {
                title: "vue-router官方文档",
                icon: "el-icon-menu",
                type: 'iframe',
                url: 'https://router.vuejs.org/zh/'
            }
        }
    ]
}, {
    name: "menu2",
    path: "/menu2",
    redirect: '/menu2/page2-1',
    meta: {
        title: "菜单二",
        icon: "el-icon-menu",
        type: "menu"
    },
    children: [
        {
            name: "page2-1",
            path: "/menu2/page2-1",
            component: Menu2_Page2_1,
            meta: {
                title: "页面2-1",
                icon: "el-icon-menu"
            }
        },
        {
            name: "page2-1-1",
            path: "/menu2/page2-1-1",
            component: Menu2_Page2_1_1,
            meta: {
                title: "页面2-1-1",
                icon: "el-icon-menu",
                active: "/menu2/page2-1",
                hidden: true
            }
        }
    ]
}, {
    name: "studnet",
    path: "/studnet",
    redirect: '/student/index',
    meta: {
        title: "学生菜单",
        icon: "el-icon-menu",
        type: "menu",
        role: ['student']
    },
    children: [
        {
            name: "student-index",
            path: "/studnet/index",
            component: Student_index,
            meta: {
                title: "学生主页",
                icon: "el-icon-menu"
            }
        }
    ]
}, {
    name: "teacher",
    path: "/teacher",
    redirect: '/teacher/index',
    meta: {
        title: "老师菜单",
        icon: "el-icon-menu",
        type: "menu",
        role: ['teacher']
    },
    children: [
        {
            name: "teahcer-index",
            path: "http://www.baidu.com",
            // component:`teacher/index`,
            meta: {
                title: "老师主页",
                icon: "el-icon-menu",
                type: 'link'
            }
        }
    ]
}
]

// 按照角色生成路由表
export function generateRoleRouter(role) {
    function getRouter(routes, role) {
        routes = routes.map(item => {
            // 有权限
            if((item.meta.role && item.meta.role.includes(role)) || !item.meta.role) {
                if(item.children) {
                    const children = getRouter(item.children, role)
                    children.length === 0 ? (delete item.children) : (item.children = children)
                }
                return item
            }
            return null
        })
        return routes.filter(item => item !== null)
    }
    return getRouter(routes, role)
}

export default routes
