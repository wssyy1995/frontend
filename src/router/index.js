import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/pages/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '仪表板', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/globalVar',
    component: Layout,
    meta: { icon: 'globalvar', roles: ['globalVar'] },
    children: [
      {
        path: 'add',
        component: () => import('@/pages/globalvar/add'),
        name: 'AddGlobalVar',
        meta: { title: '添加全局变量', noCache: false },
        hidden: true
      },
      {
        path: 'update/:globalVarId',
        component: () => import('@/pages/globalvar/update'),
        name: 'UpdateGlobalVar',
        meta: { title: '更新全局变量', noCache: false },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/pages/globalvar/list'),
        name: 'GlobalVarList',
        meta: { title: '全局变量', noCache: true }
      }
    ]
  },
  {
    path: 'log',
    component: Layout,
    children: [
      {
        path: '/:wsUrl',
        component: () => import('@/pages/log/index'),
        name: 'Log',
        meta: { title: '日志', noCache: false },
        hidden: true
      }
    ]
  },
  {
    path: '/auto',
    meta: { title: '自动化', icon: 'auto', roles: ['admin'] },
    component: Layout,
    children: [
      {
        path: 'autocase',
        component: () => import('@/pages/action/testcase/list'),
        name: 'autocase',
        meta: { title: '自动化用例', icon: 'testcase', noCache: true }
      },
      {
        path: 'coverage',
        component: () => import('@/pages/action/testcase/list'),
        name: 'coverage',
        meta: { title: '业务覆盖率', icon: 'cases', noCache: true }
      },
      {
        path: '/testTask',
        component: Layout,
        meta: { icon: 'testtask', roles: ['testTask'] },
        children: [
          {
            path: 'list',
            component: () => import('@/pages/testtask/list'),
            name: 'TestTaskList',
            meta: { title: '测试任务', noCache: true }
          },
          {
            path: 'report/:testTaskId',
            component: () => import('@/pages/testtask/report/index'),
            name: 'TestTaskReport',
            meta: { title: '测试报告', noCache: false },
            hidden: true
          }
        ]
      }
    ]
  },
  {
    path: '/taTool',
    meta: { title: 'TA工具', icon: 'tool', roles: ['admin'] },
    component: Layout,
    children: [
      {
        path: 'docker',
        component: () => import('@/pages/action/testcase/list'),
        name: 'docker',
        meta: { title: 'docker', icon: 'icon_docker', noCache: true }
      },
      {
        path: 'datagenerate',
        component: () => import('@/pages/action/testcase/list'),
        name: 'dataGenerate',
        meta: { title: '造数工具', icon: 'data', noCache: true }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    meta: { title: '系统管理', icon: 'setting', roles: ['admin'] },
    children: [
      {
        path: 'project/list',
        component: () => import('@/pages/project/list'),
        name: 'ProjectList',
        meta: { title: '系统管理', icon: 'setting', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
