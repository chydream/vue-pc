import Mock from 'mockjs'
Mock.setup({
    timeout: '300-600'
})
let alarmsInfo = Mock.mock({
    'code': 1,
    'msg': '',
    'data': {
      'id': 1,
      'pattern': '',
      'barAdmin': '',
      'status': '',
      'contacts': [
        {
          'name': '',
          'email': '',
          'phone': ''
        }
      ],
      'alarmType': [
        {
          'type': '',
          'content': '',
          'threshold': ''
        }
      ],
      'cycle': 1
    }
})
Mock.mock(/\/api\/alarms/, 'get', alarmsInfo)

let setAlarmsInfo = Mock.mock({
  'code': 1,
  'msg': '处理成功'
})
Mock.mock(/\/api\/alarms/, 'put', setAlarmsInfo)

export default Mock
