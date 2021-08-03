<template>
  <div class="work-flow" id="workFlow">
    <el-row :gutter="2">
      <el-col :span="2" class="left">
        <p>节点类型列表</p> 
        <el-button size="mini" class="search-btn" @click="addNode" v-show="false">新增</el-button>
        <el-radio-group v-model="connector" class="radio" @change="handleChange">
          <el-radio label="Bezier">贝塞尔曲线</el-radio>
          <el-radio label="Flowchart">直角折线</el-radio>
          <el-radio label="StateMachine">状态线</el-radio>
          <el-radio label="Straight">直线</el-radio>
        </el-radio-group>   
        <draggable v-model="myArray" 
            class="drag-start"
            chosenClass="chosen" 
            forceFallback="true" 
            animation="1000"
            :options="optionData" 
            @end="onEnd"
            @start="onStart">
            <span :id="'node' + index" class="btn-type" :type="item.type" v-for="(item, index) in myArray" :key="index">
              <i :class="item.icon" aria-hidden="true"></i>{{item.name}}
            </span>  
        </draggable>
      </el-col>
      <el-col :span="22" class="right">
        <div ref="efContainer" style="height:100%;" class="drag-end" id="nodeWrap">
          <template v-for="(item, index) in flowNodeList">
            <span :id="item.Id" class="btn-type"  :key="index" v-if="item.type=='node'"
                  :style="{'left':item.Left + 'px','top':item.Top + 'px'}">
              <i :class="item.icon" aria-hidden="true" style="cursor:crosshair"></i>
              <em>{{item.NodeName}}</em>
              <i class="el-icon-edit" aria-hidden="true" style="cursor:default;margin:0 5px;" @click.prevent.stop="handleEdit(item)"></i>
              <i class="el-icon-circle-close el-node-state-error" aria-hidden="true" style="cursor:pointer;" @click="handleDelete(item, index)"></i>
            </span>
            <span :id="item.Id" class="condition-type" :key="index"  v-if="item.type=='diamond'"
              :style="{'left':item.Left + 'px','top':item.Top + 'px'}">
              <span>
                <i :class="item.icon" aria-hidden="true" style="cursor:crosshair"></i>
                <em :title="item.NodeName">{{item.NodeName}}</em>
                <i class="el-icon-edit" aria-hidden="true" style="cursor:default;margin:0 5px;" @click.prevent.stop="handleEdit(item)"></i>
                <i class="el-icon-circle-close el-node-state-error" aria-hidden="true" style="cursor:pointer;" @click="handleDelete(item, index)"></i>
              </span>
            </span>
            <span :id="item.Id" v-if="item.type=='text'" :key="index" 
              :style="{'left':item.Left + 'px','top':item.Top + 'px'}">
              <el-input  class="drag-input" type="text" v-model="item.NodeName" placeholder="请输入">
                <i :class="item.icon" aria-hidden="true" style="cursor:crosshair" slot="prepend"></i>
                <i slot="append" class="el-icon-circle-close el-node-state-error" aria-hidden="true" style="cursor:pointer;" @click="handleDelete(item, index)"></i>
              </el-input>
            </span>
          </template>
        </div>
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
import {jsPlumb} from 'jsplumb'
import draggable from 'vuedraggable'
import workEdit from './workEdit'
export default {
  name: 'workflow',
  components: {
    draggable,
    workEdit
  },
  data () {
    return {
      connector: 'Bezier',
      jsPlumb: null,
      drag: false,
      // 定义要被拖拽对象的数组
      myArray: [
        {icon: 'fa fa-navicon', name: '节点', type: 'node'},
        {icon: 'fa fa-navicon', name: '菱形', type: 'diamond'},
        {icon: 'fa fa-navicon', name: '文本框', type: 'text'}
      ],
      myArray1: [
        // {icon: 'fa fa-play-circle-o', name: '语音播报1'},
        // {icon: 'fa fa-navicon', name: '菜单2'}
      ],
      optionData: {group: {name: 'itxst', pull: 'clone'}, sort: true},
      nodeData: null,
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
          "Left":20,
          "icon": 'fa fa-navicon',
          "condition": '条件',
          "type": 'node'
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
          "Left":200,
          "icon": 'fa fa-navicon',
          "condition": '条件',
          "type": 'node'
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
          "Left":428,
          "icon": 'fa fa-navicon',
          "condition": '条件',
          "type": 'node'
        }
      ],
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
          // stroke: '#E0E3E7',
          stroke: '#b0b2b5',
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
        HoverPaintStyle: {stroke: '#E0E3E7', strokeWidth: 1},
        Scope: 'jsPlumb_DefaultScope' // 范围，具有相同scope的点才可连接
      },
      sourceOption: {
        filter: '.fa', // 设置可以拖拽的类名，只要鼠标移动到该类名上的DOM，就可以拖拽连线
        filterExclude: false,
        anchor: 'Continuous', // 锚点类型
        allowLoopback: 'true',  // 是否允许自己连接自己
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
        filter: '.fa',
        filterExclude: false,
        maxConnections: -1,
        anchor: 'Continuous',
        allowLoopback: true,
        dropOptions: {hoverClass: 'ef-drop-hover'}
      },
      handleEdit (item) {
        this.nodeData = item
        this.actionType = 'edit'
        this.dialogWorkEdit = true
      }  
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    initNode (item) {
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
          target: item.Id,
          label: item.condition
        }, this.targetOption)
      }
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
        // this.flowNodeList.push(this.nodeData)
        // console.log(this.nodeData)
        this.flowNodeList.forEach((item, index) => {
          console.log(item.Id === this.nodeData.Id)
          if(item.Id === this.nodeData.Id) {
            this.flowNodeList[index] = this.nodeData
          }
        })
        this.setConnect(this.nodeData.Id, this.nodeData.ParentIds, this.nodeData.condition)
      }
    },
    init () {
      var self = this
      this.jsPlumb = jsPlumb.getInstance()
      this.jsPlumb.ready(() => {
        this.jsPlumb.importDefaults(this.option)
        this.jsPlumb.setContainer('nodeWrap')
        this.flowNodeList.forEach((item, index) => {
          this.initNode(item)
        })
        this.jsPlumb.bind('click', function (conn, originalEvent) {
          self.jsPlumb.deleteConnection(conn)
        })
        this.jsPlumb.bind('beforeDrop', function (evt) {
          let from = evt.sourceId
          let to = evt.target
          if (form === to) {
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
    setConnect (id, parentId, label) {
      if (id && parentId) {
        this.$nextTick(() => {
          this.jsPlumb.makeSource(id, this.sourceOption)
          this.jsPlumb.makeTarget(id, this.targetOption)
          this.jsPlumb.connect({
            source: parentId,
            target: id,
            label: label,
          }, this.targetOption)
        })
      }
    },
    onStart (e) {
      // this.drag = true
      // console.log(e.draggedContext)
    },
    onEnd (e) {
      var clientX = e.originalEvent.clientX
      var clientY = e.originalEvent.clientY
      var efContainer = this.$refs.efContainer
      var containerRect = efContainer.getBoundingClientRect()
      var left = clientX 
      var top = clientY
      // 计算是否拖入到容器中
      if (left < containerRect.x || left > containerRect.width + containerRect.x || top < containerRect.y || containerRect.y > containerRect.y + containerRect.height) {
          this.$message.error('请把节点拖入到画布中')
          return
      }
      left = left - containerRect.x + efContainer.scrollLeft
      top = top - containerRect.y + efContainer.scrollTop
      // 居中
      left -= 85
      top -= 16
      // console.log(e.item.innerText == '语音播报')
      // console.log(e.item.getAttribute('type'))
      if (e.item.getAttribute('type') == 'node') {
        var id = this.getuuid()
        let item = {
          "Id": id,
          "NodeName":"新增节点",
          "NodeRemark":"新增节点",
          "NodeType":1,
          "FlowId":"840317a2-38ce-4ee1-887e-5739e8bbb35d",
          "ParentIds":"",
          "OpUserIds":",,",
          "OpDeptIds":"17dd015e620c48a1951fcbb995d9bae0,287a1077ebb0449e81eefd65d823297d,95db4101973f49f88b6d64005b3accff",
          "OpRoleIds":",,",
          "Top":top,
          "Left":left,
          "icon": 'fa fa-navicon',
          "condition": '条件',
          "type": 'node'
        }
        this.flowNodeList.push(item)
        // console.log(this.jsPlumb)
        this.$nextTick(() => {
          this.initNode(item)
        })
      }
      if (e.item.getAttribute('type') == 'diamond') {
        var id = this.getuuid()
        let item = {
          "Id": id,
          "NodeName":"新增节点",
          "NodeRemark":"新增节点",
          "NodeType":1,
          "FlowId":"840317a2-38ce-4ee1-887e-5739e8bbb35d",
          "ParentIds":"",
          "OpUserIds":",,",
          "OpDeptIds":"17dd015e620c48a1951fcbb995d9bae0,287a1077ebb0449e81eefd65d823297d,95db4101973f49f88b6d64005b3accff",
          "OpRoleIds":",,",
          "Top":top,
          "Left":left,
          "icon": 'fa fa-navicon',
          "condition": '条件',
          "type": 'diamond'
        }
        this.flowNodeList.push(item)
        // console.log(this.jsPlumb)
        this.$nextTick(() => {
          this.initNode(item)
        })
      }
      if (e.item.getAttribute('type') == 'text') {
        var id = this.getuuid()
        let item = {
          "Id": id,
          "NodeName":"新增节点",
          "NodeRemark":"新增节点",
          "NodeType":1,
          "FlowId":"840317a2-38ce-4ee1-887e-5739e8bbb35d",
          "ParentIds":"",
          "OpUserIds":",,",
          "OpDeptIds":"17dd015e620c48a1951fcbb995d9bae0,287a1077ebb0449e81eefd65d823297d,95db4101973f49f88b6d64005b3accff",
          "OpRoleIds":",,",
          "Top":top,
          "Left":left,
          "icon": 'fa fa-navicon',
          "condition": '条件',
          "type": 'text'
        }
        this.flowNodeList.push(item)
        // console.log(this.jsPlumb)
        this.$nextTick(() => {
          this.initNode(item)
        })
      }
    },
    getuuid (len, radix) {
      var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
      var chars = CHARS
      var uuid = []
      var i
      radix = radix || chars.length
      if (len) {
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
      } else {
        var r
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = ''
        uuid[14] = '4'
        for (i = 0; i < 32; i++) {
          if (!uuid[i]) {
            r = 0 | Math.random() * 16
            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r]
          }
        }
      }
      return uuid.join('')
    },
    // 删除
    handleDelete (item, index) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.flowNodeList.splice(index, 1)
        this.jsPlumb.removeAllEndpoints(item.Id);
        // this.jsPlumb.remove(item.Id)
      }).catch(() => {
      })
    },
    handleChange (val) {
      this.$set(this.option, 'Connector', [val])
      this.jsPlumb.importDefaults(this.option)
    }
  }
}
</script>
<style lang="scss">
.work-flow {
  width: 100%;
  height: 100%;
  background: #dff0d8;
  .jtk-overlay:not(.labeled) {
    padding: 4px 10px;
    background-color: #fff;
    color: #565758!important;
    border: 1px solid #e0e3e7;
    border-radius: 5px;
  }
  .el-row{
    width: 100%;
    height: 100%;
  }
  .left{
    height: 100%;
    background: #d9edf7;
    text-align: center;
    padding-top: 10px;
  }
  .right{
    height: 100%;
  }
  .btn-type{
    color: #fff;
    background-color: #67C23A;
    border-color: #67C23A;
    padding: 9px 15px;
    font-size: 12px;
    border-radius: 3px;
    // position: absolute;
    top:50px;
    cursor: move;
    margin: 6px 0;
    display: inline-block;
    i{
      margin-right: 5px;
    }
  }
  /*选中样式*/
  .chosen {
    // border: solid 1px #3089dc !important;
  }
  .drag-start{
    width:100%;
    height: 100%;
    position: relative;
  }
  .drag-end{
    width:100%;
    height: 100%;
    position: relative;
  }
  .drag-end span{
    position: absolute;
  }
  .radio{
    text-align: left;
    margin-top: 10px;
    margin-bottom: 10px;
    line-height: 20px;
  }
  .el-radio{
    margin-left: 20px;
  }
  .condition-type{
    display: inline-block;
    left: 200px;
    top: 200px;
    width: 100px;
    height: 100px;
    border: 1px solid #ccc;
    transform: rotate(45deg);
    cursor: move;
    color: #fff;
    background-color: #67C23A;
    border-color: #67C23A;
    font-size: 12px;
    span{
      // vertical-align: middle;
      // display: inline-block;
      transform: rotate(-45deg);
      // margin-top: 2px;
      // margin-left: 12px;
      position: absolute;
      left: -5px;
      top: 28px;
      width: 130px;
      display: inline-block;
      em{
        display: inline-block;
        width: 50px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        vertical-align: middle;
      }
    }
  }
}
</style>
