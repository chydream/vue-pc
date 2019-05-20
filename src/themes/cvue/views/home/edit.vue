<template>
    <div>
        <!-- 编辑弹窗 -->
        <cvue-dialog :dialogVisible="dialogVisible"
                    title="网吧信息编辑"
                    dialogWidth="500px"
                    @closeDialog="closeDialog"
                    @confirmDialog="confirmDialog"
                    @handleClose="handleClose">
            <div class="dialog-body" slot="dialogBody">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <el-form-item label="网吧ID" prop="name">
                                <el-input v-model="ruleForm.name" :disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="网吧名称" prop="name">
                                <el-input v-model="ruleForm.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="网吧地址" prop="name">
                                <el-input v-model="ruleForm.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="联系人" prop="name">
                                <el-input v-model="ruleForm.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="联系方式" prop="name">
                                <el-input v-model="ruleForm.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="本网DNS" prop="name">
                                <el-input v-model="ruleForm.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="出口DNS" prop="name">
                                <el-input v-model="ruleForm.name"></el-input>
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
import cvueTable from '@/components/cvue-table'
export default {
    name: 'internetCafe',
    components: {
        cvueDialog,
        cvueTable
    },
    data () {
        return {
            ruleForm: {
                name: '77777777@qq.com'
            },
            rules: {},
            disabled: true
        }
    },
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
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
<style lang="sass" scoped>
</style>
