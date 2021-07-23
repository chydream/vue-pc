<template>
  <div>
    <!-- 编辑弹窗 -->
    <cvue-dialog
      :dialogVisible="dialogVisible"
      :title="title"
      dialogWidth="500px"
      @handleOpen="getDetail"
      @closeDialog="closeDialog"
      @confirmDialog="confirmDialog"
      @handleClose="handleClose">
      <div class="dialog-body" slot="dialogBody">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="节点ID" prop="id">
                <el-input v-model.trim="ruleForm.id" :disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="节点名称" prop="name">
                <el-input v-model.trim="ruleForm.name" :disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="父Id" prop="parentId">
                <el-input v-model.trim="ruleForm.parentId" :disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="Left" prop="left">
                <el-input v-model.trim="ruleForm.left" :disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="Top" prop="top">
                <el-input v-model.trim="ruleForm.top" :disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="condition" prop="condition" v-if="ruleForm.parentId != ''">
                <el-input v-model.trim="ruleForm.condition" :disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </cvue-dialog>
  </div>
</template>
<script>
import cvueDialog from '@/components/cvue-dialog'
import { validPhone, validIp } from '@/util/validator.js'
export default {
  name: 'gradeEdit',
  components: {
    cvueDialog
  },
  data () {
    return {
      ruleForm: {
        name: '',
        id: '',
        parentId: '',
        left: '',
        top: '',
        condition: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入节点名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ]
      },
      disabled: false,
      dialogLoading: false,
      status: 1,
      stageArr: []
    }
  },
  mounted () {
    this.getEditDetail()
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    title () {
      var title = ''
      if (this.$parent.actionType == 'add') {
        title = '新增'
      } else {
        title = '编辑'
      }
      return title
    }
  },
  methods: {
    // 触发事件
    handleClose () {
      this.$emit('handleClose')
    },
    closeDialog () {
      this.$emit('closeDialog')
    },
    confirmDialog () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          var params
          if (this.$parent.actionType == 'add') {
            this.$parent.nodeData = {
              Id: this.ruleForm.id,
              NodeName: this.ruleForm.name,
              ParentIds: this.ruleForm.parentId,
              Top: this.ruleForm.top,
              Left: this.ruleForm.left,
              condition: this.ruleForm.condition,
              type: this.$parent.nodeData.type,
              icon: this.$parent.nodeData.icon
            }
            this.$emit('confirmDialog')
            this.dialogLoading = false
          } else {
            this.$parent.nodeData = {
              Id: this.ruleForm.id,
              NodeName: this.ruleForm.name,
              ParentIds: this.ruleForm.parentId,
              Top: this.ruleForm.top,
              Left: this.ruleForm.left,
              condition: this.ruleForm.condition,
              type: this.$parent.nodeData.type,
              icon: this.$parent.nodeData.icon
            }
            this.$emit('confirmDialog')
            this.dialogLoading = false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getDetail () {
    },
    getEditDetail () {
      // console.log(this.$parent.nodeData)
      if (this.$parent.actionType == 'edit') {
        this.$set(this.ruleForm, 'name', this.$parent.nodeData.NodeName)
        this.$set(this.ruleForm, 'id', this.$parent.nodeData.Id)
        this.$set(this.ruleForm, 'parentId', this.$parent.nodeData.ParentIds)
        this.$set(this.ruleForm, 'left', this.$parent.nodeData.Left)
        this.$set(this.ruleForm, 'top', this.$parent.nodeData.Top)
        this.$set(this.ruleForm, 'condition', this.$parent.nodeData.condition)
      }
    }
  }
}
</script>
<style scoped>
</style>
