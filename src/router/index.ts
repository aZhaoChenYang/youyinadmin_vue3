import {createRouter, createWebHashHistory, Router} from 'vue-router'
import Layout from '@/layout'
import {RouterTy} from '~/router'

export const constantRoutes: RouterTy = [

  {
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        //using el svg icon, the elSvgIcon first when at the same time using elSvgIcon and icon
        meta: {title: '首页', elSvgIcon: 'House'}
      }
    ]
  },

]
/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes: RouterTy = [
  {
    path: '/drama',
    component: Layout,
    children: [
      {
        path: '',
        name: 'drama',
        component: () => import('@/views/drama/index.vue'),
        meta: {title: '剧本', elSvgIcon: 'Notebook', roles: ['admin', "editer"]}
      },
      {
        path: 'detail',
        name: 'drama-detail',
        component: () => import('@/views/drama/detail.vue'),
        meta: {title: '剧本详情', roles: ['admin']},
        hidden: true
      }
    ]
  },
  {
    path: '/shop',
    component: Layout,
    children: [
      {
        path: '',
        name: 'shop',
        component: () => import('@/views/shop/index.vue'),
        meta: {title: '店铺', elSvgIcon: 'Shop', roles: ['admin']}
      },{
        path: 'detail',
        name: 'shop-detail',
        component: () => import('@/views/shop/detail.vue'),
        meta: {title: '店铺详情', roles: ['admin']},
        hidden: true
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: '',
        name: 'user',
        component: () => import('@/views/user/index.vue'),
        meta: {title: '用户', elSvgIcon: 'User', roles: ['admin']}
      },
    ]
  },
  {
    path: '/order',
    component: Layout,
    children: [
      {
        path: '',
        name: 'order',
        component: () => import('@/views/order/index.vue'),
        meta: {title: '订单', elSvgIcon: 'List', roles: ['admin']}
      },
    ]
  },
  {
    path: '/tags',
    component: Layout,
    children: [
      {
        path: '',
        name: 'tag',
        component: () => import('@/views/tags/index.vue'),
        meta: {title: '标签', elSvgIcon: 'SetUp', roles: ['admin']}
      },
    ]
  },
  {
    path: '/admin',
    component: Layout,
    children: [
      {
        path: '',
        name: 'admin',
        component: () => import('@/views/admin/index.vue'),
        meta: {title: '管理员', elSvgIcon: 'UserFilled', roles: ['admin']}
      }
    ]
  },
  {
    path: '/swiper',
    component: Layout,
    children: [
      {
        path: '',
        name: 'swiper',
        component: () => import('@/views/swiper/index.vue'),
        meta: {title: '轮播图', elSvgIcon: 'Picture', roles: ['admin']}
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    children: [
      {
        path: '',
        name: 'setting',
        component: () => import('@/views/setting/index.vue'),
        meta: {title: '设置', elSvgIcon: 'Setting', roles: ['admin']}
      }
    ]
  },
  { path: '/:pathMatch(.*)', redirect: '/404', hidden: true }
]

const router: Router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({top: 0}),
  routes: constantRoutes
})

// export function resetRouter() {
//   const newRouter = createRouter({
//     history: createWebHashHistory(),
//     scrollBehavior: () => ({ top: 0 }),
//     routes: constantRoutes
//   })
// }

export default router
