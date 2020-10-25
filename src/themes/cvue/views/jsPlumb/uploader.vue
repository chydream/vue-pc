<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      v-loading="loading"
      :data="uploadData"
      :on-success="handleAvatarSuccess"
      :http-request="picUpload"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <index-dia
      @closeDialog="closeDialog('edit')"
      @confirmDialog="confirmDialog('edit')"
      @handleClose="closeDialog('edit')"
      v-if="dialogIndexEdit"
      :dialogVisible="dialogIndexEdit">
    </index-dia>
  </div>
</template>
<script>
/* eslint-disable*/
import indexDia from './index'
export default {
  name: 'uploader',
  components: {
    indexDia
  },
  data () {
    return {
      dialogIndexEdit: false,
      msg: '',
      uploadData: {},
      loading: false,
      imageUrl: '',
      cropperImg: ''
    }
  },
  methods: {
    // 关闭弹窗
    closeDialog (params) {
      if (params == 'edit') {
        this.dialogIndexEdit = false
      }
    },
    // 确认
    confirmDialog (params) {
      if (params == 'edit') {
        this.dialogIndexEdit = false
      }
    },
    picUpload(option) {
      let file = option.file
      console.log(file)
      let reader = new FileReader();
      if (file) {
        reader.readAsDataURL(file)
      }
      reader.onload = () => {
        let src = reader.result
        this.cropperImg = src
        this.dialogIndexEdit = true
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
  },
}
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>