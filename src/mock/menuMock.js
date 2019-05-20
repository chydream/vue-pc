import Mock from 'mockjs'
let menu = {
    admin: [
        {
            id: 1,
            label: '网吧详情',
            href: '/index/home',
            icon: 'fa fa-home',
            permission: ['view', 'add', 'delete', 'edit'],
            show: true,
            children: []
        },
        {
          id: 4,
          label: '告警设置',
          href: '/index/warning',
          icon: 'fa fa-warning',
          permission: ['view', 'add', 'delete', 'edit'],
          show: true,
          children: []
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
      },
      {
        id: 4,
        label: '告警',
        href: '/index/warning',
        icon: 'fa fa-warning',
        permission: ['view', 'add', 'delete', 'edit'],
        show: true,
        children: []
      }
    ]
}
Mock.mock(/\/user\/menu/, 'post', menu)
export default Mock
