<template>
  <div class="warning">
    <div class="warning-switch">
      <span>告警开关</span>
      <el-switch :true-label="1" :false-label="0" v-model="status"></el-switch>
    </div>
    <div class="title">
      <span class="title-txt">告警方式</span>
      <span class="title-line"></span>
    </div>
    <div class="warning-type content">
      <el-checkbox :true-label="1" :false-label="0" v-model="pattern.message" :disabled="!status">短信</el-checkbox>
      <el-checkbox :true-label="1" :false-label="0" v-model="pattern.email" :disabled="!status">邮件</el-checkbox>
    </div>
    <div class="title">
      <span class="title-txt">联系人设置</span>
      <span class="title-line"></span>
    </div>
    <div class="concat content">
      <el-checkbox :true-label="1" :false-label="0" v-model="barAdmin.system" :disabled="!status">系统管理员</el-checkbox>
      <div class="concat-cate">
        <div class="concat-item" v-for="(item, index) in concatList" :key="index">
          {{index + 1}}.
          <el-input class="concat-input" v-model="item.name" placeholder="请输入用户名" :disabled="!status||!barAdmin.system"></el-input>
          <el-input class="concat-input" v-model="item.phone" placeholder="请输入电话" :disabled="!status||!barAdmin.system"></el-input>
          <el-input class="concat-input" v-model="item.email" placeholder="请输入邮箱" :disabled="!status||!barAdmin.system"></el-input>
          <i
            v-if="index + 1 == concatList.length && index != 2"
            class="el-icon-circle-plus-outline"
            @click="addConcat(index)"
          ></i>
          <i
            v-if="index + 1 < concatList.length || index == 2"
            class="el-icon-remove-outline"
            @click="reduceConcat(index)"
          ></i>
        </div>
      </div>
      <el-checkbox :true-label="1" :false-label="0" v-model="barAdmin.netbar" :disabled="!status">网吧管理员</el-checkbox>
    </div>
    <div class="title">
      <span class="title-txt">告警事件</span>
      <span class="title-line"></span>
    </div>
    <div class="warning-event content">
      <div class="warning-event-item">
        <div class="warning-event-item-left">
          <el-checkbox :true-label="1" :false-label="0" v-model="packetLoss.type" :disabled="!status">短信</el-checkbox>
          <div class="warning-event-item-input">
            <span>阈值</span>
            <el-input class="warning-event-item-threshold" v-model="packetLoss.threshold" :disabled="!status || !packetLoss.type"></el-input>
            <span>%</span>
          </div>
        </div>
        <div class="warning-event-item-right">
          <span>告警内容</span>
          <el-input class="warning-event-item-content" v-model="packetLoss.content" :disabled="!status || !packetLoss.type"></el-input>
        </div>
      </div>
      <div class="warning-event-item">
        <div class="warning-event-item-left">
          <el-checkbox :true-label="1" :false-label="0" v-model="dns.type" :disabled="!status">DNS不通</el-checkbox>
        </div>
        <div class="warning-event-item-right">
          <span>告警内容</span>
          <el-input class="warning-event-item-content" v-model="dns.content" :disabled="!status || !dns.type"></el-input>
        </div>
      </div>
      <div class="warning-event-item">
        <div class="warning-event-item-left">
          <el-checkbox :true-label="1" :false-label="0" v-model="probe.type" :disabled="!status">探针掉线</el-checkbox>
        </div>
        <div class="warning-event-item-right">
          <span>告警内容</span>
          <el-input class="warning-event-item-content" v-model="probe.content" :disabled="!status || !probe.type"></el-input>
        </div>
      </div>
      <div class="warning-event-item">
        <div class="warning-event-item-left">
          <el-checkbox :true-label="1" :false-label="0" v-model="ping.type" :disabled="!status">PING值</el-checkbox>
          <div class="warning-event-item-input">
            <span>阈值</span>
            <el-input class="warning-event-item-threshold" v-model="ping.threshold" :disabled="!status || !ping.type"></el-input>
            <span>%</span>
          </div>
        </div>
        <div class="warning-event-item-right">
          <span>告警内容</span>
          <el-input class="warning-event-item-content" v-model="ping.content" :disabled="!status || !ping.type"></el-input>
        </div>
      </div>
    </div>
    <div class="title">
      <span class="title-txt">告警周期</span>
      <span class="title-line"></span>
    </div>
    <div class="warning-cycle content">
      <el-input class="warning-cycle-input" v-model="cycle" :disabled="!status"></el-input>&nbsp;&nbsp; 分钟
      <span>（同类型告警在该周期内仅触发一次）</span>
    </div>
    <div class="footer">
      <el-button type="primary" @click="saveWarning" :disabled="!status">保存</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      status: true,
      pattern: {
        message: 0,
        email: 0
      },
      barAdmin: {
        system: 0,
        netbar: 0
      },
      concatList: [
        {
          name: '',
          email: '',
          phone: ''
        }
      ],
      packetLoss: {
        threshold: '',
        content: '',
        type: 0
      },
      dns: {
        type: 0,
        content: ''
      },
      probe: {
        type: 0,
        content: ''
      },
      ping: {
        threshold: '',
        content: '',
        type: 0
      },
      cycle: null
    }
  },
  created () {
    this.$store.dispatch('GetWarningInfo', {}).then(res => {
      console.log('warningInfo', res)
    })
  },
  directives: {
    disable: {
      inserted (el, binding) {
        el.disabled = !binding.value
      },
      update (el, binding) {
        console.log(el.disabled)
        el.disabled = !binding.value
        // console.log(binding.value)
      }
    }
  },
  methods: {
    // 添加联系人
    addConcat () {
      this.concatList.push({
        username: '',
        email: '',
        phone: ''
      })
    },
    // 删除联系人
    reduceConcat (index) {
      this.concatList.splice(index, 1)
    },
    // 保存配置
    saveWarning () {
      console.log('saveWarning', this.pattern)
      let pattern = '' //
      if (this.pattern.email) {
        pattern = '0,'
      }
      if (this.pattern.email) {
        pattern += '1'
      }
      let alarmType = []

      const params = {
        pattern,
        barAdmin: this.barAdmin.netbar,
        status: this.status,
        cycle: this.cycle,
        alarmType: [
          {
            type: '',
            content: '',
            threshold: ''
          }
        ],
        contacts: {
          name: '',
          email: '',
          phone: ''
        }
      }
      this.$store.dispatch('SetWarningInfo', params).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style scoped>
.warning {
  padding: 20px !important;
  height: auto !important;
}

.warning-switch {
  text-align: right;
  /* padding: 15px 20px; */
  margin-bottom: 20px;
}
.title {
  display: flex;
  align-items: center;
}
.title-line {
  width: 100%;
  flex: 1;
  border-top: 1px solid #ccc;
}
.title-txt {
  margin-right: 15px;
  font-weight: 700;
}
.content {
  padding: 20px;
}
.concat-cate {
  padding: 10px 0;
  margin-left: 30px;
}
.concat-item {
  width: 500px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.concat-item:last-child {
  margin: 0;
}
.concat-item i {
  font-size: 20px;
}
.concat-item .concat-input {
  margin: 0 5px;
}
.warning-event .warning-event-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.warning-event .warning-event-item:last-child {
  margin-bottom: 0;
}
.warning-event .warning-event-item-left {
  width: 230px;
  display: flex;
  align-items: center;
}
.warning-event .warning-event-item-left .warning-event-item-input {
  display: flex;
  align-items: center;
}
.warning-event
  .warning-event-item-left
  .warning-event-item-input
  .warning-event-item-threshold {
  flex: 1;
  margin: 0 10px;
}
.warning-event .warning-event-item-right {
  width: 300px;
  display: flex;
  align-items: center;
  margin-left: 50px;
}
.warning-event .warning-event-item-right .warning-event-item-content {
  flex: 1;
  margin: 0 10px;
}
.warning-cycle {
  display: flex;
  align-items: center;
}
.warning-cycle .warning-cycle-input {
  width: 60px;
}
.warning-cycle > span {
  margin-left: 20px;
  color: #ccc;
}
.footer {
  text-align: center;
}
</style>
