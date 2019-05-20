<template>
    <div>
        <!-- 本网历史延时数据 -->
        <cvue-dialog :dialogVisible="dialogVisible"
                    :isShowFoot = false
                    title="出口历史延时数据"
                    dialogWidth="700px"
                    @closeDialog="closeDialog"
                    @confirmDialog="confirmDialog"
                    @handleClose="handleClose">
            <div class="dialog-body" slot="dialogBody">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-row :gutter="20">
                        <el-col :span="14">
                            <el-date-picker
                                v-model="dateTime"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                                </el-date-picker>
                        </el-col>
                        <el-col :span="10" class="text-right">
                            <el-button type="danger" icon="el-icon-search" size="mini">搜索</el-button>
                        </el-col>
                    </el-row>
                </el-form>
                <div class="table-body">
                    <cvue-table :option="tableOption" :data="tableData" ref="tbl" 
                                :isShowAdd="false" :page="page" 
                                @current-change="handleCurrentChange"
                                @size-change="handleSizeChange"
                                :isShowPage="true">
                    </cvue-table>
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
            ruleForm: {
                name: '77777777@qq.com'
            },
            rules: {},
            disabled: true,
            dateTime: '',
            tablePage: 1,
            page: {
                total: 1, // 总页数
                currentPage: 1, // 当前页数
                pageSize: 5, // 每页显示多少条
                pageSizes: [5, 10, 50, 100]
            },
            tableOption: {
                stripe: true,
                width: '100%',
                border: true,
                index: true,
                cloumn: [
                    {prop: 'dateTime', label: '时间', align: 'center'},
                    {prop: 'DNS', label: 'DNS', align: 'center'},
                    {prop: 'delayed', label: '时延', align: 'center', multiple: true}
                ]
            },
            tableData: [
                {
                  dateTime: '2019.04.08 16:00:00', DNS: '6666', delayed: '6666'
                },
                {
                  dateTime: '2019.04.08 16:00:00', DNS: '6666', delayed: '6666'
                },
                {
                  dateTime: '2019.04.08 16:00:00', DNS: '6666', delayed: '6666'
                }
            ]
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
        },
        // 改变pageSize
        handleSizeChange (val) {
            this.page.pageSize = val
            this.getDeliveries()
        },
        // 改变页码
        handleCurrentChange (val) {
            this.tablePage = val
            this.getDeliveries()
        }
    }
}
</script>
<style lang="sass" scoped>
</style>
