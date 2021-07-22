let menu = {
  admin: [
    {
      id: 1,
      label: '首页',
      href: '/home/index',
      icon: 'fa fa-home',
      permission: ['view', 'add', 'delete', 'edit'],
      show: true,
      children: []
    },
    {
      id: 1,
      label: '权限',
      href: '/auth/index',
      icon: 'fa fa-file-text',
      permission: ['add', 'delete', 'edit'],
      show: true,
      children: []
    },
    {
      id: 1,
      label: '实例',
      href: '#',
      icon: 'fa fa-file-text',
      permission: ['view', 'add', 'delete', 'edit'],
      show: true,
      children: [
        {
          id: 1,
          label: '实例1',
          href: '/demo/index',
          icon: 'fa fa-file-text',
          permission: ['view', 'add', 'delete', 'edit'],
          show: true,
          children: []
        },
        {
          id: 1,
          label: '实例2',
          href: '/demo/faculty',
          icon: 'fa fa-file-text',
          permission: ['view', 'add', 'delete', 'edit'],
          show: true,
          children: []
        },
        {
          id: 1,
          label: '实例3',
          href: '/demo/subject',
          icon: 'fa fa-file-text',
          permission: ['view', 'add', 'delete', 'edit'],
          show: true,
          children: []
        },
        {
          id: 1,
          label: '实例4',
          href: '/demo/school-manage',
          icon: 'fa fa-file-text',
          permission: ['view', 'add', 'delete', 'edit'],
          show: true,
          children: []
        },
        {
          id: 1,
          label: '图片上传',
          href: '/demo/uploader',
          icon: 'fa fa-file-text',
          permission: ['view', 'add', 'delete', 'edit'],
          show: true,
          children: []
        },
        {
          id: 1,
          label: '工作流',
          href: '/demo/work',
          icon: 'fa fa-file-text',
          permission: ['view', 'add', 'delete', 'edit'],
          show: true,
          children: []
        },
        {
          id: 1,
          label: '工作流1',
          href: '/demo/work-list',
          icon: 'fa fa-file-text',
          permission: ['view', 'add', 'delete', 'edit'],
          show: true,
          children: []
        },
        {
          id: 1,
          label: '工作流2',
          href: '/demo/work-flow',
          icon: 'fa fa-file-text',
          permission: ['view', 'add', 'delete', 'edit'],
          show: true,
          children: []
        }
      ]
    },
    {
      id: 1,
      label: '直播',
      href: '/live/index',
      icon: 'fa fa-file-text',
      permission: ['view', 'add', 'delete', 'edit'],
      show: true,
      children: []
    },
    {
      id: 1,
      label: '图表',
      href: '#',
      icon: 'fa fa-file-text',
      permission: ['view', 'add', 'delete', 'edit'],
      show: true,
      children: [
        {
          id: 1,
          label: '图表1',
          href: '/chart/line',
          icon: 'fa fa-file-text',
          permission: ['view', 'add', 'delete', 'edit'],
          show: true,
          children: []
        },
        {
          id: 1,
          label: '图表2',
          href: '/chart/index',
          icon: 'fa fa-file-text',
          permission: ['view', 'add', 'delete', 'edit'],
          show: true,
          children: []
        }
      ]
    },
    {
      id: 1,
      label: '地图',
      href: '#',
      icon: 'fa fa-file-text',
      permission: ['view', 'add', 'delete', 'edit'],
      show: true,
      children: [
        {
          id: 1,
          label: '地图',
          href: '/map/index',
          icon: 'fa fa-file-text',
          permission: ['view', 'add', 'delete', 'edit'],
          show: true,
          children: []
        },
        {
          id: 1,
          label: '地图1',
          href: '/map/index1',
          icon: 'fa fa-file-text',
          permission: ['view', 'add', 'delete', 'edit'],
          show: true,
          children: []
        },
        {
          id: 1,
          label: '地图2',
          href: '/map/index2',
          icon: 'fa fa-file-text',
          permission: ['view', 'add', 'delete', 'edit'],
          show: true,
          children: []
        },
        {
          id: 1,
          label: '地图3',
          href: '/map/index3',
          icon: 'fa fa-file-text',
          permission: ['view', 'add', 'delete', 'edit'],
          show: true,
          children: []
        },
        {
          id: 1,
          label: '地图4',
          href: '/map/index4',
          icon: 'fa fa-file-text',
          permission: ['view', 'add', 'delete', 'edit'],
          show: true,
          children: []
        },
        {
          id: 1,
          label: '地图5',
          href: '/map/index5',
          icon: 'fa fa-file-text',
          permission: ['view', 'add', 'delete', 'edit'],
          show: true,
          children: []
        }
      ]
    },
    {
      id: 1,
      label: '地图Test',
      href: '#',
      icon: 'fa fa-file-text',
      permission: ['view', 'add', 'delete', 'edit'],
      show: true,
      children: [
        {
          id: 1,
          label: '地图',
          href: '/map-test/index',
          icon: 'fa fa-file-text',
          permission: ['view', 'add', 'delete', 'edit'],
          show: true,
          children: []
        },
        {
          id: 2,
          label: '线路规划',
          href: '/map-test/route-plan',
          icon: 'fa fa-file-text',
          permission: ['view', 'add', 'delete', 'edit'],
          show: true,
          children: []
        },
        {
          id: 2,
          label: '大数据',
          href: '/big-data',
          icon: 'fa fa-file-text',
          permission: ['view', 'add', 'delete', 'edit'],
          show: true,
          children: []
        },
        {
          id: 2,
          label: '多表头',
          href: '/map-test/table',
          icon: 'fa fa-file-text',
          permission: ['view', 'add', 'delete', 'edit'],
          show: true,
          children: []
        },
        {
          id: 2,
          label: 'circulationTime',
          href: '/map-test/circulationTime',
          icon: 'fa fa-file-text',
          permission: ['view', 'add', 'delete', 'edit'],
          show: true,
          children: []
        },
        {
          id: 2,
          label: '工作流',
          href: '/workflow',
          icon: 'fa fa-file-text',
          permission: ['view', 'add', 'delete', 'edit'],
          show: true,
          children: []
        },
        {
          id: 2,
          label: '节点',
          href: '/workflownode',
          icon: 'fa fa-file-text',
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
      href: '/home/index',
      icon: 'fa fa-home',
      permission: ['view', 'add', 'delete', 'edit'],
      show: true,
      children: []
    }
  ]
}
export default menu
