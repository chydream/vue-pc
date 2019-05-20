<template>
    <div>
        <!-- 故障分析 -->
        <cvue-dialog :dialogVisible="dialogVisible"
                    :isShowFoot = false
                    title="网吧故障分析"
                    dialogWidth="600px"
                    @closeDialog="closeDialog"
                    @confirmDialog="confirmDialog"
                    @handleClose="handleClose">
            <div class="dialog-body" slot="dialogBody">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-select placeholder="请选择" v-model="selectValue">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="8">
                            <el-input value="127.0.0.1"></el-input>
                        </el-col>
                        <el-col :span="8" class="text-right">
                            <el-button type="danger" size="mini">开始</el-button>
                        </el-col>
                    </el-row>
                </el-form>
                <div class="fault-wrap">
                    <div class="fault-body">
                        <p>ddddddddddddddddddd</p>
                    </div>
                </div>
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
            selectValue: '',
            ruleForm: {
                name: '77777777@qq.com'
            },
            rules: {}
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
