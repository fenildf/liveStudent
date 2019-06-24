import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
 //------------视频库路由由开始

  {
    path: '/videolibrary',
    name: 'videolibrary',
    meta: {
      icon: 'md-videocam',
      title: '视频库'
    },
    component: Main,
    children: [
      {
        path: 'videomanage',
        name: 'videomanage',
        meta: {
          icon: 'md-videocam',
          title: '视频管理',
          hideInMenu: false
        },
        component: () => import('@/view/videolibrary/index.vue')
      },

      {
        path: 'videoadd',
        name: 'videoadd',
        meta: {
          icon: 'md-flower',
          title:'添加视频',// route => `${route.params.title}`,
          notCache: true,
          beforeCloseName: 'before_close_normal',
          hideInMenu: true
        },
        component: () => import('@/view/videolibrary/add.vue')
      },
      {
        path: 'videoedit/:id',
        name: 'videoedit',
        meta: {
          icon: 'md-flower',
          title: route => `${route.params.title}`,

          notCache: true,
          beforeCloseName: 'before_close_normal',
          hideInMenu: true
        },
        component: () => import('@/view/videolibrary/add.vue')
      },
    ]
  },
  //-------------视频库路由结束
  
  //------------课程路由开始

  {
    path: '/course',
    name: 'course',
    meta: {
      icon: 'ios-ribbon-outline', 
      title: '课程'
    },
    component: Main,
    children: [
      {
        path: 'manage',
        name: 'manage',
        meta: {
          icon: 'ios-ribbon-outline', 
          title: '课程管理',
          hideInMenu: false
        },
        component: () => import('@/view/course/index.vue')
      },

      {
        path: 'addcourse',
        name: 'addcourse',
        meta: {
          icon: 'md-flower',
          title:'添加课程',// route => `${route.params.title}`,
          notCache: true,
          beforeCloseName: 'before_close_normal',
          hideInMenu: true
        },
        component: () => import('@/view/course/add.vue')
      },
      {
        path: 'editcourse/:id',
        name: 'editcourse',
        meta: {
          icon: 'md-flower',
          title: route => `${route.params.title}`,

          notCache: true,
          beforeCloseName: 'before_close_normal',
          hideInMenu: true
        },
        component: () => import('@/view/course/add.vue')
      },
    ]
  },
  //-------------课程路由结束

//------------课程分类路由开始

{
  path: '/coursetype',
  name: 'coursetype',
  meta: {
    icon: 'md-reorder',
    title: '课程分类'
  },
  component: Main,
  children: [
    {
      path: 'typemanage',
      name: 'typemanage',
      meta: {
        icon: 'md-reorder',
        title: '课程分类管理',
        hideInMenu: false
      },
      component: () => import('@/view/coursetype/index.vue')
    },

    {
      path: 'addcoursetype',
      name: 'addcoursetype',
      meta: {
        icon: 'md-flower',
        title:'添加分类',// route => `${route.params.title}`,
        notCache: true,
        beforeCloseName: 'before_close_normal',
        hideInMenu: true
      },
      component: () => import('@/view/coursetype/add.vue')
    },
    {
      path: 'editcoursetype/:id',
      name: 'editcoursetype',
      meta: {
        icon: 'md-flower',
        title: route => `${route.params.title}`,

        notCache: true,
        beforeCloseName: 'before_close_normal',
        hideInMenu: true
      },
      component: () => import('@/view/coursetype/add.vue')
    },
  ]
},
//-------------课程分类路由结束
 
//------------会员路由开始

{
  path: '/users',
  name: 'users',
  meta: {
    icon: 'ios-contacts', 
    title: '会员管理'
  },
  component: Main,
  children: [
    {
      path: 'usersmanage',
      name: 'usersmanage',
      meta: {
        icon: 'ios-contacts', 
        title: '会员管理',
        hideInMenu: false
      },
      component: () => import('@/view/users/index.vue')
    },
  ]
},
//-------------会员路由结束
//订单路由开始
{
  path: '/order',
  name: 'order',
  meta: {
    icon: 'md-card', 
    title: '订单'
  },
  component: Main,
  children: [
    {
      path: 'ordermanage',
      name: 'ordermanage',
      meta: {
        icon: 'md-card', 
        title: '订单管理',
        hideInMenu: false
      },
      component: () => import('@/view/order/index.vue')
    },
  ]
},
//订单路由结束

//会员卡设置开始
{
  path: '/membercard',
  name: 'membercard',
  meta: {
    icon: 'ios-card-outline', 
    title: '会员卡'
  },
  component: Main,
  children: [
    {
      path: 'membercardmanage',
      name: 'membercardmanage',
      meta: {
        icon: 'ios-card-outline', 
        title: '会员卡设置',
        hideInMenu: false
      },
      component: () => import('@/view/membercard/index.vue')
    },
  ]
},
////会员卡设置结束

//管理员列表开始
{
  path: '/adminlist',
  name: 'adminlist',
  meta: {
    icon: 'md-apps',
    title: '管理员列表'
  },
  component: Main,
  children: [
    {
      path: 'adminlistdmanage',
      name: 'adminlistdmanage',
      meta: {
        icon: 'md-apps', 
        title: '管理员列表',
        hideInMenu: false
      },
      component: () => import('@/view/adminlist/index.vue')
    },
  ]
},
 
//管理员列表结束
{
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  },


]
