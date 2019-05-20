<template>
    <div class="cvue-dialog">
        <el-dialog :title="title" 
                    :width="dialogWidth"
                   :before-close="handleClose"
                   :visible.sync="dialogVisible">
            <div class="dialog-body">
                <slot name="dialogBody"></slot>
            </div>
            <span slot="footer" class="dialog-footer" v-if="isShowFoot">
                <el-button @click="closeDialog">取消</el-button>
                <el-button @click="confirmDialog" type="primary">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'cvueDialog',
    data () {
        return {
            msg: 'hello'
        }
    },
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
         dialogWidth: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: '提示'
        },
        isShowFoot: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        handleClose () {
            this.$emit('handleClose')
        },
        closeDialog () {
            this.$emit('closeDialog')
        },
        confirmDialog () {
            this.$emit('confirmDialog')
        }
    }
}
</script>
<style lang="scss">
.cvue-dialog{
    .el-dialog__header{
        background: #f0f0f1;
        padding: 15px 20px;
    }
    .el-dialog__title{
        font-size: 15px;
    }
    .el-dialog__headerbtn{
        top: 17px;
    }
}
</style>
