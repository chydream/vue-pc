<template>
  <div class="work-flow">
    <el-row :gutter="10">
      <el-col :span="24">
        <el-card class="box-card mt-15">
          <div class="home-form">
            <el-form ref="ruleForm" label-width="50px" @submit.native.prevent>
              <el-row :gutter="10">
                <el-col :span="4">
                  <el-button size="mini" class="search-btn" @click="addNode">新增</el-button>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-card>
        <el-card class="box-card">
          <!-- 头部 -->
          <div class="home-body" style="min-height:500px;">
            <div class="node-wrap" id="nodeWrap">
              <div class="item" 
                   v-for="(item,index) in flowNodeList" 
                   :key="index" 
                   :id="item.Id" 
                   :style="{'left':item.Left + 'px', 'top':item.Top + 'px'}">
                   {{item.NodeName}}<i class="fa fa-user" style="cursor:pointer"></i>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 编辑弹窗 -->
    <work-edit
      @closeDialog="closeDialog('edit')"
      @confirmDialog="confirmDialog('edit')"
      @handleClose="closeDialog('edit')"
      v-if="dialogWorkEdit"
      :dialogVisible="dialogWorkEdit">
    </work-edit>
  </div>
</template>

<script>
/* eslint-disable*/
import cvueTable from '@/components/cvue-table'
import {getClientHeight} from '@/util/tool'
import {Endpoint, jsPlumb} from 'jsplumb'
import workEdit from './workEdit'
export default {
  name: 'grade',
  components: {
    cvueTable,
    workEdit
  },
  data () {
    return {
      node: {},
      dialogWorkEdit: false,
      flowNodeList: [
        {
          "Id":"1f9e047b-c6b1-4784-a49f-73b91b281034",
          "NodeName":"新增节点1",
          "NodeRemark":"新增节点",
          "NodeType":1,
          "FlowId":"840317a2-38ce-4ee1-887e-5739e8bbb35d",
          "ParentIds":"",
          "OpUserIds":",*,",
          "OpDeptIds":",,",
          "OpRoleIds":",,",
          "Top":120,
          "Left":20
        },
        {
          "Id":"cc7423e4-6775-4578-8fb7-342145fea714",
          "NodeName":"新增节点2",
          "NodeRemark":"新增节点",
          "NodeType":1,
          "FlowId":"840317a2-38ce-4ee1-887e-5739e8bbb35d",
          "ParentIds":"e50a1499-3303-4e9d-9010-746d86f1c7b9",
          "OpUserIds":",*,",
          "OpDeptIds":",,",
          "OpRoleIds":",,",
          "Top":100,
          "Left":200
        },
        {
          "Id":"e50a1499-3303-4e9d-9010-746d86f1c7b9",
          "NodeName":"新增节点3",
          "NodeRemark":"新增节点",
          "NodeType":1,
          "FlowId":"840317a2-38ce-4ee1-887e-5739e8bbb35d",
          "ParentIds":"",
          "OpUserIds":",,",
          "OpDeptIds":"17dd015e620c48a1951fcbb995d9bae0,287a1077ebb0449e81eefd65d823297d,95db4101973f49f88b6d64005b3accff",
          "OpRoleIds":",,",
          "Top":300,
          "Left":428
        }
      ],
      jsPlumb: null,
      option: {
        Container: 'nodeWrap',
        Connector: ['Bezier', { curviness: 100}],
        Anchors: ['Top', 'TopCenter', 'TopRight', 'TopLeft', 'Right', 'RightMiddle', 'Bottom', 'BottomCenter', 'BottomRight', 'BottomLeft', 'Left', 'LeftMiddle'],
        ConnectionsDetachable: false, // 鼠标不能拖动删除线
        DeleteEndpointsOnDetach: false, // 删除线的时候节点不删除
        Endpoint: ['Blank', {Overlays: ''}], // 空白端点
        EndpointStyle: {fill: '#1879ffa1', outlineWidth: 1},
        LogEnabled: true,
        PaintStyle: {
          stroke: '#E0E3E7',
          strokeWidth: 1,
          outlineWidth: 10,
          outlineStroke: 'transparent'
        },
        DragOptions: {cursor: 'pointer', zIndex: 2000},
        Overlays: [
          ['Arrow', {width: 10, length: 8, location: 1, direction: 1, foldback: 0.623}],
          ['Label', {label: '', location: 0.1, cssClass: 'labeled'}]
        ],
        RenderMode: 'svg',
        HoverPaintStyle: {stroke: '#b0b2b5', strokeWidth: 1},
        Scope: 'jsPlumb_DefaultScope' // 范围，具有相同scope的点才可连接
      },
      sourceOption: {
        filter: '.fa-user', // 设置可以拖拽的类名，只要鼠标移动到该类名上的DOM，就可以拖拽连线
        filterExclude: false,
        anchor: 'Continuous', // 锚点类型
        allowLoopback: 'false',  // 是否允许自己连接自己
        maxConnections: -1,
        onMaxConnections: function (info, e) {
          console.log(`超过了最大值连线: ${info.maxConnections}`)
        },
        // connector: ['Flowchart', {curviness: 50}],
        // connectorStyle: {
        //     stroke: 'red',
        //     strokeWidth: 1,      
        //     outlineStroke: 'transparent',
        //     outlineWidth: 10
        // },
        // connectorHoverStyle: {stroke: 'red', strokeWidth: 2}
      },
      targetOption: {
        filter: '.fa-user',
        filterExclude: false,
        maxConnections: -1,
        anchor: 'Continuous',
        allowLoopback: false,
        dropOptions: {hoverClass: 'ef-drop-hover'}
      }
    }
  },
  computed: {
    height () {
      var height = getClientHeight() - 170
      return height + 'px'
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      var self = this
      this.jsPlumb = jsPlumb.getInstance() 
      this.jsPlumb.ready(() => {
        this.jsPlumb.importDefaults(this.option)
        // this.jsPlumb.setSuspendDrawing(true)  // 暂停绘制
        // this.jsPlumb.setSuspendDrawing(false, true) // 重新绘制
        this.flowNodeList.forEach((item, index) => {
          // 允许拖放
          this.jsPlumb.draggable(item.Id, {
            containment: 'nodeWrap',
            grid: [10, 10],
            stop: function (el) {
              // console.log('拖拽结束: ', el)
            }
          })
          this.jsPlumb.makeSource(item.Id, this.sourceOption)
          this.jsPlumb.makeTarget(item.Id, this.targetOption)
          if (item.ParentIds) {
            this.jsPlumb.connect({
              source: item.ParentIds,
              target: item.Id
            }, this.targetOption)
          }
        })
        this.jsPlumb.bind('click', function (conn, originalEvent) {
          self.jsPlumb.deleteConnection(conn)
        })
        this.jsPlumb.bind("beforeDrop",function (evt) {
          console.log(123)
          console.log(self.jsPlumb.hasLine())
          let from = evt.sourceId
          let to = evt.target
          if (from === to) {
            self.$message.error('节点不支持连接自己')
            return false
          }
          if (this.hasLine(from, to)) {
            self.$message.error('该关系已存在，不允许重复创建')
            return false
          }
          if (this.hashOppositeLine(from, to)) {
            self.$message.error('不支持两个节点之间连接回环')
            return false
          }
          self.$message.success('连接成功')
          return true
        })
      })
    },
    addNode () {
      this.dialogWorkEdit = true
    },
    closeDialog (params) {
      if (params == 'edit') {
        this.dialogWorkEdit = false
      }
    },
    // 确认
    confirmDialog (params) {
      if (params == 'edit') {
        this.dialogWorkEdit = false
        this.flowNodeList.push(this.node)
        console.log(this.node)
        this.setConnect(this.node.Id, this.node.ParentIds)
      }
    },
    setConnect (id, parentId) {
      console.log(id, parentId)
      if (id && parentId) {
        this.$nextTick(() => {
          this.jsPlumb.makeSource(id, this.sourceOption)
          this.jsPlumb.makeTarget(id, this.targetOption)
          this.jsPlumb.connect({
            source: parentId,
            target: id
          }, this.targetOption)
        })
      }
    }
  }
}
</script>

<style lang="scss">
.work-flow {
  padding: 0px !important;
  height: auto !important;
  .node-wrap{
    position: relative;
  }
  .item{
    position: absolute;
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #ccc;
    cursor: move;
  }
}
</style>
