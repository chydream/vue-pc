<template>
  <div class="cvue-upload">
    <el-upload
      :class="cssClass"
      ref="cvue-upload"
      :action="actionUrl"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-error="handleError"
      :before-upload="handleBeforeupload"
      :headers="accessToken"
      name="file"
      :data="fileParams"
      :show-file-list="isShowFileList"
      :file-list="fileList">
        <!-- <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">上传文件不能超过20M</div>-->
        <div v-loading="fileLoading"><slot></slot></div>
    </el-upload>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'upload',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['token']),
    accessToken () {
      var accessToken = {
        'Authorization': 'bearer ' + this.token
      }
      return accessToken
    }
  },
  props: {
    cssClass: {
      type: String,
      default: ''
    },
    actionUrl: {
      type: String,
      default: 'https://jsonplaceholder.typicode.com/posts/'
    },
    headToken: {
      type: Object,
      default: () => {
        return {
        }
      }
    },
    fileParams: {
      type: Object,
      default: () => {
        return {
        }
      }
    },
    fileList: {
      type: Array,
      default: () => {
        return [] // 附件列表
      }
    },
    isShowFileList: {
      type: Boolean,
      default: false
    },
    fileLoading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 上传前
    handleBeforeupload (file) {
      const isJPG = file.type === 'image/jpeg'
      var m = (file.size / (1024 * 1024)).toFixed(2)
      if (m > 30) {
        this.$message({ message: '最大限制30M', type: 'error' })
        return false
      }
      return true
    },
    // 成功
    handleSuccess (response, file, fileList) {
      if (response.success) {
        this.$message({ message: response.message, duration: 2000, type: 'success' })
      } else {
        this.$message({ message: response.message, duration: 2000, type: 'error' })
      }
      this.$emit('success', {response, file, fileList})
    },
    // 错误
    handleError (err, file, fileList) {
      console.log(err)
    },
    // 移除
    handleRemove (file, fileList) {
      // return true
    },
    // 预览
    handlePreview (file) {
    },
    // 自定义文件上传
    uploadFile (param) { 
      // :http-request="uploadFile"
      var fileObj = param.file
      var formData = new FormData()
      var params = {
        filename: ''
      }
      formData.append('MS_HttpContext', fileObj)
      formData.append('data', JSON.stringify(params))
      this.$store.dispatch('payroll/ExcelFilePreview', formData).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="sass" scoped>
</style>
