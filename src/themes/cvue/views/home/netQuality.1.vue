<template>
    <div class="net-quality">
        <!-- 本网历史延时数据 -->
        <cvue-dialog :dialogVisible="dialogVisible"
                    :isShowFoot = false
                    title="本网历史延时数据"
                    dialogWidth="700px"
                    @handleOpen="getDetail(-1, null, getLatestMonthDate(-20,0), getLatestMonthDate(1,0))"
                    @closeDialog="closeDialog"
                    @confirmDialog="confirmDialog"
                    @handleClose="handleClose">
            <div class="dialog-body" slot="dialogBody">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                    <el-row :gutter="20">
                        <el-col :span="14">
                            <el-form-item prop="dateTime">
                                <el-date-picker
                                    :picker-options="datePicker"
                                    v-model="ruleForm.dateTime"
                                    type="datetimerange"
                                    range-separator="至"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                    </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" class="text-right">
                            <el-button type="danger" icon="el-icon-search" size="mini" @click="handleSearch">搜索</el-button>
                        </el-col>
                    </el-row>
                </el-form>
                <div class="table-body">
                    <cvue-table :option="tableOption" :data="tableData" ref="tbl" 
                                :isShowAdd="false" :page="page" :layout="layout"
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
            start: '',
            end: '',
            firstId: '',
            lastId: '',
            ruleForm: {
                dateTime: []
            },
            rules: {
                dateTime: [
                    { required: true, message: '请选择日期', trigger: 'change' }
                ]
            },
            disabled: true,
            layout: 'prev,next',
            tablePage: 1,
            page: {
                total: 100000, // 总页数
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
                    {prop: 'createTime', label: '时间', align: 'center'},
                    {prop: 'dnsAddress', label: 'DNS', align: 'center'},
                    {prop: 'delay', label: '时延', align: 'center', multiple: true}
                ]
            },
            tableData: [
                // {
                //   dateTime: '2019.04.08 16:00:00', DNS: '5555', delayed: '555'
                // },
                // {
                //   dateTime: '2019.04.08 16:00:00', DNS: '5555', delayed: '555'
                // },
                // {
                //   dateTime: '2019.04.08 16:00:00', DNS: '5555', delayed: '555'
                // }
            ]
        }
    },
    computed: {
        datePicker () {
            return this.datePickerLimit()
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
            // this.page.pageSize = val
            // this.getDetail('', '', '')
        },
        // 改变页码
        handleCurrentChange (val) {
            if (this.tablePage < val) {
                this.getDetail('', this.lastId, this.ruleForm.dateTime[0], this.ruleForm.dateTime[1])
            } else {
                this.getDetail(this.firstId, '', this.ruleForm.dateTime[0], this.ruleForm.dateTime[1])
            } 
            this.tablePage = val   
        },
        // 搜索
        handleSearch () {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    // console.log(this.ruleForm.dateTime)
                    this.tablePage = 1
                    this.start = this.ruleForm.dateTime[0]
                    this.end = this.ruleForm.dateTime[1]
                    this.getDetail(-1, null, this.start, this.end)
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        // 网吧在线情况
        getDetail (firstId, lastId, beginTime, endTime) {
            this.ruleForm.dateTime = [this.getLatestMonthDate(-20, 0), this.getLatestMonthDate(1, 0)]
            var params = {
                pageSize: this.page.pageSize,
                firstId: firstId,
                lastId: lastId,
                barId: this.$parent.rowId,
                beginTime: beginTime,
                endTime: endTime,
                ping_way: 0
            }
            this.dialogLoading = true
            this.$store.dispatch('home/PingHistoricRecords', params).then(res => {
                // console.log(res)
                if (res.code == 1) {
                    this.tableData = res.data
                    if (res.data.length > 0) {
                        var len = res.data.length
                        this.lastId = res.data[len - 1].id
                        this.firstId = res.data[0].id
                    }
                    // this.page.total = res.data[0].total
                    this.page.currentPage = this.tablePage 
                } else {
                    this.$message({
                        message: res.msg,
                        duration: 2000,
                        type: 'error'
                    })
                }
                this.dialogLoading = false
            })
        },
        // 获取最近月日期
        getLatestMonthDate (days, months) {
            var now = new Date()
            var nYear = now.getFullYear()
            var nMonth = now.getMonth()
            var nDay = now.getDate()
            var Latest = new Date(nYear, nMonth + months, nDay + days)
            var sMonth = (Latest.getMonth() + 1)
            var sDay = Latest.getDate()
            if (sMonth < 10) {
                sMonth = '0' + sMonth
            }
            if (sDay < 10) {
                sDay = '0' + sDay
            }
            return Latest.getFullYear() + '-' + sMonth + '-' + sDay + ' ' + '00:00:00'
        },
        datePickerLimit () {
            let self = this
            var curDate = new Date()
            var preDate = new Date(curDate.getTime() + 24 * 60 * 60 * 1000) // 前一天
            return {
                disabledDate (time) {
                    return time.getTime() > preDate
                }
            } 
        }
    }
}
</script>
<style lang="scss" scoped>
.net-quality{
    .el-form-item{
        margin-bottom: 0px;
    }
}
</style>
