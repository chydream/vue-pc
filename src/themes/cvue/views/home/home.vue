<template>
    <div class="home">
        <el-card class="box-card">
            <!-- 头部 -->
            <div slot="header" class="clearfix fix-lh">
                <span>网吧详情</span>
                <div class="btn-list">
                    <el-button type="info" icon="el-icon-menu">全部：202</el-button>
                    <el-button type="danger" icon="el-icon-tickets">离线：30</el-button>
                </div>
            </div>
            <!-- 表单 -->
            <div class="home-form">
                <el-form ref="ruleForm" label-width="0px">
                    <el-row :gutter="10">
                        <el-col :span="4">
                            <el-input  placeholder="请输入关键字" size="mini"></el-input>
                        </el-col>
                        <el-col :span="3">
                            <el-button type="danger" icon="el-icon-search" size="mini">搜索</el-button>
                        </el-col>
                        <el-col :span="17" class="text-right">
                            <el-button icon="el-icon-plus" size="mini">新增</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="home-body">
                <cvue-table :option="tableOption" :data="tableData" ref="tbl1" 
                            :isShowAdd="false" :page="page" 
                            @current-change="handleCurrentChange"
                            @size-change="handleSizeChange"
                            @cellClick = "handleCellClick"
                            :isShowPage="true">
                    <!-- 操作按钮 -->
                    <el-table-column fixed="right" slot="actionMenu" label="操作" align="center"
                        header-align="center"  width="160">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                            <el-button type="text" size="small" @click="handleFaultAnalysis(scope.row)">故障分析</el-button>
                            <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </cvue-table>
            </div>
        </el-card>
        <!-- 网吧ID信息 -->
        <internet-cafe
                @closeDialog="closeDialog('id')"
                @confirmDialog="confirmDialog('id')"
                @handleClose="closeDialog('id')"
                :dialogVisible="dialogVisible">
        </internet-cafe>
        <!-- 网吧在线情况 -->
        <online-situation   
                @closeDialog="closeDialog('condition')"
                @confirmDialog="confirmDialog('condition')"
                @handleClose="closeDialog('condition')"
                :dialogVisible="dialogVisibleCondition">
        </online-situation>
        <!-- 本网历史延时数据 -->
        <net-quality
                @closeDialog="closeDialog('net')"
                @confirmDialog="confirmDialog('net')"
                @handleClose="closeDialog('net')"
                :dialogVisible="dialogVisibleNet">
        </net-quality>
        <!-- 出口历史延时数据 -->
        <exit-quality
                @closeDialog="closeDialog('exit')"
                @confirmDialog="confirmDialog('exit')"
                @handleClose="closeDialog('exit')"
                :dialogVisible="dialogVisibleExit">
        </exit-quality>
        <!-- 编辑弹窗 -->
        <edit
                @closeDialog="closeDialog('edit')"
                @confirmDialog="confirmDialog('edit')"
                @handleClose="closeDialog('edit')"
                :dialogVisible="dialogVisibleEdit">
        </edit>
        <!-- 故障分析 -->
        <fault-analysis   
                @closeDialog="closeDialog('fault')"
                @confirmDialog="confirmDialog('fault')"
                @handleClose="closeDialog('fault')"
                :dialogVisible="dialogVisibleFault">
        </fault-analysis>
    </div>
</template>
<script>
import cvueTable from '@/components/cvue-table'
import cvueDialog from '@/components/cvue-dialog'
import internetCafe from './internetCafe'
import onlineSituation from './onlineSituation'
import netQuality from './netQuality'
import exitQuality from './exitQuality'
import edit from './edit'
import faultAnalysis from './faultAnalysis'
export default {
    name: 'Home',
    components: {
        cvueTable,
        cvueDialog,
        internetCafe,
        onlineSituation,
        netQuality,
        edit,
        faultAnalysis,
        exitQuality
    },
    data () {
        return {
            dialogVisible: false,
            dialogVisibleEdit: false,
            dialogVisibleNet: false,
            dialogVisibleExit: false,
            dialogVisibleCondition: false,
            dialogVisibleFault: false,
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
                    {prop: 'id', label: '网吧ID', align: 'center', solt: true},
                    {prop: 'name', label: '网吧名称', align: 'center'},
                    {prop: 'status', label: '在线情况', align: 'center'}
                ]
            },
            ownNetworkQuality: [
                {prop: 'DNS', label: 'DNS地址', align: 'center'},
                {prop: 'packetLossRate', label: '丢包率', align: 'center'},
                {prop: 'shake', label: '抖动', align: 'center'},
                {prop: 'delayed', label: '平均延时', align: 'center'}
            ],
            thirdNetworkQuality: [
                {prop: 'thirdDNS', label: 'DNS地址', align: 'center'},
                {prop: 'thirdPacketLossRate', label: '丢包率', align: 'center'},
                {prop: 'thirdShake', label: '抖动', align: 'center'},
                {prop: 'thirdDelayed', label: '平均延时', align: 'center'}
            ],
            tableData: [
                {
                  id: '1', name: '网吧1', status: '在线', ownNetworkQuality: '优', DNS: '5555', packetLossRate: '5555', shake: '5555', delayed: '555', thirdDNS: '5555', thirdPacketLossRate: '5555', thirdShake: '5555', thirdDelayed: '666'
                },
                {
                  id: '1', name: '网吧1', status: '在线', ownNetworkQuality: '优', DNS: '5555', packetLossRate: '5555', shake: '5555', delayed: '555', thirdDNS: '5555', thirdPacketLossRate: '5555', thirdShake: '5555', thirdDelayed: '555'
                },
                {
                  id: '1', name: '网吧1', status: '在线', ownNetworkQuality: '优', DNS: '5555', packetLossRate: '5555', shake: '5555', delayed: '555', thirdDNS: '5555', thirdPacketLossRate: '5555', thirdShake: '5555', thirdDelayed: '555'
                },
                {
                  id: '1', name: '网吧1', status: '在线', ownNetworkQuality: '优', DNS: '5555', packetLossRate: '5555', shake: '5555', delayed: '555', thirdDNS: '5555', thirdPacketLossRate: '5555', thirdShake: '5555', thirdDelayed: '555'
                },
                {
                  id: '1', name: '网吧1', status: '在线', ownNetworkQuality: '优', DNS: '5555', packetLossRate: '5555', shake: '5555', delayed: '555', thirdDNS: '5555', thirdPacketLossRate: '5555', thirdShake: '5555', thirdDelayed: '555'
                },
                {
                  id: '1', name: '网吧1', status: '在线', ownNetworkQuality: '优', DNS: '5555', packetLossRate: '5555', shake: '5555', delayed: '555'
                },
                {
                  id: '1', name: '网吧1', status: '在线', ownNetworkQuality: '优', DNS: '5555', packetLossRate: '5555', shake: '5555', delayed: '555'
                },
                {
                  id: '1', name: '网吧1', status: '在线', ownNetworkQuality: '优', DNS: '5555', packetLossRate: '5555', shake: '5555', delayed: '555'
                }
            ]
        }
    },
    methods: {
        handleClick (row) {
            console.log(row)
        },
        // 改变pagesize
        handleSizeChange (val) {
            this.page.pageSize = val
            this.getDeliveries()
        },
        // 改变页码
        handleCurrentChange (val) {
            this.tablePage = val
            this.getDeliveries()
        },
        // 列表接口
        handleList (projectParam, contractParam) {
            this.tableLoading = true
            var params = {
                page: this.tablePage,
                limit: this.page.pageSize,
                projectParam: projectParam,
                contractParam: contractParam
            }
            this.$store.dispatch('sell/GetSaleContractList', params).then(res => {
                if (res.data.success) {
                    var data = res.data.data
                    this.tableData = data.saleContractList
                    this.page.total = data.total
                    this.page.currentPage = this.tablePage
                    this.tableLoading = false
                } else {
                    this.tableLoading = false
                    this.$message({
                        message: res.data.message,
                        duration: 2000,
                        type: 'error'
                    })
                }
            })
        },
        // 单元格单击
        handleCellClick (row, index, prop) {
            // console.log(prop)
            if (prop == 'id') {
                this.dialogVisible = true
            }
            if (prop == 'DNS' || prop == 'packetLossRate' || prop == 'shake' || prop == 'delayed') {
                this.dialogVisibleNet = true
            }
            if (prop == 'thirdDNS' || prop == 'thirdPacketLossRate' || prop == 'thirdShake' || prop == 'thirdDelayed') {
                this.dialogVisibleExit = true
            }
            if (prop == 'status') {
                this.dialogVisibleCondition = true
            }
        },
        // 关闭弹窗
        closeDialog (params) {
            if (params == 'id') {
                this.dialogVisible = false
            }
            if (params == 'condition') {
                this.dialogVisibleCondition = false
            }
            if (params == 'net') {
                this.dialogVisibleNet = false
            }
            if (params == 'exit') {
                this.dialogVisibleExit = false
            }
            if (params == 'edit') {
                this.dialogVisibleEdit = false
            }
            if (params == 'fault') {
                this.dialogVisibleFault = false
            }
        },
        // 确认
        confirmDialog (params) {
            if (params == 'id') {
                this.dialogVisible = false
            }
            if (params == 'condition') {
                this.dialogVisibleCondition = false
            }
            if (params == 'net') {
                this.dialogVisibleNet = false
            }
            if (params == 'exit') {
                this.dialogVisibleExit = false
            }
            if (params == 'edit') {
                this.dialogVisibleEdit = false
            }
            if (params == 'fault') {
                this.dialogVisibleFault = false
            }
        },
        // 编辑
        handleEdit () {
            this.dialogVisibleEdit = true
        },
        // 删除
        handleDelete () {
             this.$confirm('确定要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
            }).catch(() => {
            })
        },
        // 故障分析
        handleFaultAnalysis () {
            this.dialogVisibleFault = true
        }
    }
}
</script>
<style lang="scss">
    .home{
        padding: 0px!important;
        height: auto!important;
        .btn-list{
            float: right;
        }
        .el-card__header{
            border-bottom: none;
        }
        .fix-lh{
            line-height: 32px;
        }
        .text-right{
            text-align: right;
        }
        .home-form{
            margin-bottom: 7px;
            margin-top: -17px;
        }
        .el-card__header,.el-card__body{
            padding: 15px;
        }
        .el-input.is-disabled .el-input__inner{
            color: #606266;
        }
        .el-table__body{
            tr td:nth-child(2) span, tr td:nth-child(4) span{
                color: #409EFF;
                cursor: pointer;
            }
            tr td:nth-child(6) span,tr td:nth-child(7) span,tr td:nth-child(8) span{
                // color: #409EFF;
                cursor: pointer;
            }
            tr td:nth-child(9) span,tr td:nth-child(10) span,tr td:nth-child(11) span,tr td:nth-child(12) span,tr td:nth-child(13) span{
                // color: #409EFF;
                cursor: pointer;
            }
        }
        .table-body{
            margin-top: 20px;
        }
        .fault-wrap{
            margin-top: 20px;
        }
        .fault-body{
            width: 100%;
            height: 100%;
            min-height: 300px;
            background: #000000;
            color: #fff;
            font-size: 16px;
            border-radius: 4px;
            padding: 10px;
            box-sizing: border-box;
        }
    }
</style>
