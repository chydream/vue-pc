<template>
  <div class="login">
    <div class="content">
      <h3 class="form-title">登录</h3>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" @submit.native.prevent @keyup.enter.native="submitForm">
        <el-row>
          <el-col :span="24">
            <el-form-item prop="username">
              <el-input v-model="ruleForm.username" placeholder="用户名"  prefix-icon="el-icon-user"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item  prop="password">
              <el-input v-model="ruleForm.password" placeholder="密码" :type="passType"  prefix-icon="el-icon-lock">
                <i slot="suffix" class="el-icon-view" @click="changeType"></i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-checkbox v-model="checked">记住我</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="text-right">
            <el-form-item>
              <el-button type="default" @click="getLogin">登录</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="copyright">2016 © copyright</div>
    <div class="bg">
      <ul>
        <li v-for="(item, index) in imgs" :key="index" :class="{activeItem:activeIndex == index}">
          <img :src="item" />
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {setCookie, getCookie} from '@/util/tool'
export default {
  name: 'login',
  data () {
    return {
      imgs: [
        require('../../../static/img/7.jpg'),
        require('../../../static/img/2.jpg'),
        require('../../../static/img/3.jpg'),
        require('../../../static/img/4.jpg')
      ],
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        password: [
           { required: true, message: '请输入密码', trigger: 'blur' },
           { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ]
      },
      checked: false,
      activeIndex: 0,
      passType: 'password'
    }
  },
  created () {
    this.bgAnimation()
    this.setUserName()
  },
  methods: {
    // 设置用户名
    setUserName () {
      var username = getCookie('username')
      if (username) {
        this.ruleForm.username = username
        this.checked = true
      } else {
        this.ruleForm.username = ''
        this.checked = false
      }
    },
    // 图片轮播
    bgAnimation () {
      var timer = null
      var interval = 5000
      timer = setInterval(() => {
        if (this.activeIndex < 3) {
          this.activeIndex++
        } else {
          this.activeIndex = 0
        }
      }, interval)
    },
    // 修改密码框
    changeType () {
      if (this.passType == 'password') {
        this.passType = 'text'
      } else {
        this.passType = 'password'
      }
    },
    // 登录
    getLogin () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          var params = {
            username: this.ruleForm.username,
            password: this.ruleForm.password
          }
          this.$store.dispatch('user/Login', params).then(res => {
            if (res.success) {
              this.$store.dispatch('user/GetUserInfo', res.data.token).then(res => {
                if (res.success) {
                  if (this.checked) {
                    setCookie('username', params.username, 24)
                  } else {
                    setCookie('username', '', -1)
                  }
                  this.$router.push('/index/home')
                }
              })
            } else {
              this.tip(res.message, 'error')
            }
          }).catch(err => {
            this.tip('服务器出错', 'error')
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 表单enter提交
    submitForm (event) {
      this.getLogin()
    }
  }
}
</script>
<style scoped lang="scss">
@import url('./css/login.css');
.login{
  .bg {
    position: relative;
  }
  .bg ul li {
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: all 2s ease;
  }
  .activeItem {
    opacity: 1 !important;
  }
  .bg ul li img {
    width: 100%;
    height: 100%;
  }
  .text-right{
    text-align: right;
  }
}
</style>
