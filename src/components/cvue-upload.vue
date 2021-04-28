<template>
  <div class="cvue-upload">
    <el-upload
      :class="cssClass"
      :ref="refEl"
      :action="actionUrl"
      :file-list="fileList"
      :show-file-list="isShowFileList"
      :accept="accept"
      :auto-upload="isAutoUpload"

      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-error="handleError"
      :before-upload="handleBeforeupload"
      :on-change="handleChange"
      :http-request="uploadImg"

      :headers="accessToken"
      name="file"
      :data="fileParams">
      <div v-if="type === 1">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip"><slot name="slotTip"></slot></div>
      </div>
      <div v-if="type === 2">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </div>
      <div v-if="type === 3">
        <div v-loading="fileLoading"><slot></slot></div>
      </div>
    </el-upload>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'upload',
  data () {
    return {
      uploadFileList: [],
      token: ''
    }
  },
  computed: {
    accessToken () {
      var accessToken = {
        'Authorization': 'Bearer ' + this.token
      }
      return accessToken
    }
  },
  props: {
    type: {
      type: Number,
      default: 1
    },
    accept: {
      type: String,
      default: ''
    },
    imageUrl: {
      type: String,
      default: ''
    },
    refEl: {
      type: String,
      default: 'cvue-upload'
    },
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
    },
    isAutoUpload: {
      type: Boolean,
      default: true
    },
    uploadImg: {
      type: Function,
      default: () => {
        return () => {}
      }
    }
  },
  methods: {
    // 上传前
    handleBeforeupload (file) {
      const isJPG = file.type === 'image/jpeg'
      // var pattern = ''
      // if (this.accept == '.xls,.xlsx') {
      //   pattern = /(\.jpg)|(\.png)|(\.jpeg)|(\.gif)/ig
      // } else {
      //   if (!pattern.test(file.name)) {
      //     this.$message({ message: '上传文件只支持jpg、png、jpeg、gif格式', type: 'error' })
      //     return false
      //   }
      // }
      var m = (file.size / (1024 * 1024)).toFixed(2)
      if (m > 30) {
        this.$message({ message: '最大限制30M', type: 'error' })
        return false
      }
      return true
    },
    // 成功
    handleSuccess (response, file, fileList) {
      this.$emit('success', {response, file, fileList})
    },
    // 错误
    handleError (err, file, fileList) {
      var errData = JSON.parse(err.message)
      this.$message({ message: errData.resp_msg, duration: 5000, type: 'error' })
      this.$emit('error')
    },
    handleChange (file, fileList) {
      this.uploadFileList = fileList
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
    },
    submitUpload () {
      this.$refs['cvue-upload'].submit()
      if (this.uploadFileList.length > 0) {
        this.$emit('submit')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.img-upload{
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 130px;
    height: 130px;
    line-height: 130px;
    text-align: center;
  }
  .avatar {
    width: 130px;
    height: 130px;
    display: block;
  }
}
</style>
