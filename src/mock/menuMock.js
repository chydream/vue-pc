// import Mock from 'mockjs'
let menu = {
    admin: [
        {
          id: 1,
          label: '首页',
          href: '/index/home',
          icon: 'fa fa-home',
          permission: ['view', 'add', 'delete', 'edit'],
          show: true,
          children: []
        },
        {
          id: 2,
          label: '用户管理',
          href: '/user/index',
          icon: 'fa fa-user',
          permission: ['view', 'add', 'delete', 'edit'],
          show: true,
          children: []
        },
        {
          id: 7,
          label: '系统设置',
          href: '',
          icon: 'fa fa-sliders',
          permission: ['view', 'add', 'delete', 'edit'],
          show: true,
          children: [
            {
              id: 12,
              label: '用户设置',
              href: '/system/index',
              icon: 'fa fa-comments',
              permission: ['view', 'add', 'delete', 'edit'],
              show: true,
              children: []
            },
            {
              id: 13,
              label: '角色管理',
              href: '/system/role-index',
              icon: 'fa fa-comments',
              permission: ['view', 'add', 'delete', 'edit'],
              show: true,
              children: []
            }
          ]
        },
        {
          id: 7,
          label: '图表',
          href: '',
          icon: 'fa fa-sliders',
          permission: ['view', 'add', 'delete', 'edit'],
          show: true,
          children: [
            {
              id: 12,
              label: '图表',
              href: '/chart/line',
              icon: 'fa fa-comments',
              permission: ['view', 'add', 'delete', 'edit'],
              show: true,
              children: []
            }
          ]
        }
    ],
    user: [
      {
          id: 1,
          label: '首页',
          href: '/index/home',
          icon: 'fa fa-home',
          permission: ['view', 'add', 'delete', 'edit'],
          show: true,
          children: []
      }
    ]
}
// Mock.mock(/\/user\/menu/, 'post', menu)
export default menu
