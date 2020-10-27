<template>
  <div class="jsPlumb" style="height: calc(100vh - 128px);">
    <el-row>
      <el-col :span="24">
        <div class="ef-tooltar">
          <el-link type="primary" :underline="false">{{data.name}}</el-link>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" icon="el-icon-delete" size="large"></el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" icon="el-icon-download" size="large"></el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" icon="el-icon-plus" size="large"></el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" icon="el-icon-minus" size="large"></el-button>
          <div style="float:right;margin-right:5px">
            <el-button type="info" plain round icon="el-icon-document" size="mini">流程信息</el-button>
            <el-button type="primary" plain round icon="el-icon-refresh" size="mini">切换流程A</el-button>
            <el-button type="primary" plain round icon="el-icon-refresh" size="mini">切换流程B</el-button>
            <el-button type="primary" plain round icon="el-icon-refresh" size="mini">切换流程C</el-button>
            <el-button type="primary" plain round icon="el-icon-refresh" size="mini">自定义样式</el-button>
            <el-button type="info" plain round icon="el-icon-document" size="mini">帮助</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <div style="display:flex;height:calc(100% - 47px);">
      <div style="width: 230px;border-right:1px solid #dce3e8;">
         <node-menu @addNode="addNode" ref="nodeMenu"></node-menu>
      </div>
      <div id="efContainer" ref="efContainer" class="container" v-flowDrag>
        <template v-for="node in data.nodeList">
          <flow-node
            :id="node.id"
            :key="node.id"
            :node="node"
            :activeElement="activeElement"
            @changeNodeSite="changeNodeSite"
            @nodeRightMenu="nodeRightMenu"
            @clickNode="clickNode">
          </flow-node>
        </template>
        <!-- <div style="position:absolute;top:2000px;left:2000px;">&nbsp;</div> -->
      </div>
      <div style="width:300px;border-left:1px solid #dce3e8;background-color:#FBFBFB">
         <flow-node-form ref="nodeForm" @setLineLabel="setLineLabel" @repaintEverything="repaintEverything"></flow-node-form>
      </div>
    </div>
    <flow-info v-if="flowInfoVisible" ref="flowInfo" :data="data"></flow-info>
  </div>
</template>
<script>
/* eslint-disable*/
import { jsPlumb } from 'jsplumb'
import flowNode from './node'
import FlowNodeForm from './node_form'
import FlowInfo from './info'
import { easyFlowMixin } from './mixins'
import { getDataA } from './data_A'
import { getDataB } from './data_B'
import { getDataC } from './data_C'
import { getDataD } from './data_D'
import nodeMenu from './node_menu'
import lodash from 'lodash'
var mousePosition = {
  left: -1,
  top: -1
}
export default {
  name: 'jsPlumb',
  mixins: [easyFlowMixin],
  components: {
    flowNode,
    FlowNodeForm,
    FlowInfo,
    nodeMenu
  },
  data () {
    return {
      data: {},
      flowInfoVisible: false,
      jsPlumb: null,
      easyFlowVisible: false,
      flowInfoVisible: false,
      loadEasyFlowFinish: false,
      flowHelpVisible: false,
      activeElement: {
        type: undefined,
        nodeId: undefined,
        sourceId: undefined,
        targetId: undefined
      },
      zoom: 0.5
    }
  },
  mounted () {
    this.jsPlumb = jsPlumb.getInstance()
    // console.log(getDataB())
    this.$nextTick(() => {
      this.dataReload(getDataB())
    })
  },
  directives: {
    'flowDrag': {
      bind (el, binding, vnode, oldNode) {
        if (!binding) {
          return
        }
        el.onmousedown = (e) => {
          if (e.button == 2) {
            // 右键不管
            return
          }
          //  鼠标按下，计算当前原始距离可视区的高度
          let disX = e.clientX
          let disY = e.clientY
          el.style.cursor = 'move'

          document.onmousemove = function (e) {
            // 移动时禁止默认事件
            e.preventDefault()
            const left = e.clientX - disX
            disX = e.clientX
            el.scrollLeft += -left

            const top = e.clientY - disY
            disY = e.clientY
            el.scrollTop += -top
          }

          document.onmouseup = function (e) {
            el.style.cursor = 'auto'
            document.onmousemove = null
            document.onmouseup = null
          }
        }
      }
    }
  },
  methods: {
    clickNode(nodeId) {
      this.activeElement.type = 'node'
      this.activeElement.nodeId = nodeId
      this.$refs.nodeForm.nodeInit(this.data, nodeId)
    },
    nodeRightMenu(nodeId, evt) {
      this.menu.show = true
      this.menu.curNodeId = nodeId
      this.menu.left = evt.x + 'px'
      this.menu.top = evt.y + 'px'
    },
    // 改变节点的位置
    changeNodeSite(data) {
      for (var i = 0; i < this.data.nodeList.length; i++) {
        let node = this.data.nodeList[i]
        if (node.id === data.nodeId) {
          node.left = data.left
          node.top = data.top
        }
      }
    },
    // 返回唯一标识
    getUUID() {
        return Math.random().toString(36).substr(3, 10)
    },
    // 设置连线条件
    setLineLabel(from, to, label) {
      var conn = this.jsPlumb.getConnections({
        source: from,
        target: to
      })[0]
      if (!label || label === '') {
        conn.removeClass('flowLabel')
        conn.addClass('emptyFlowLabel')
      } else {
        conn.addClass('flowLabel')
      }
      conn.setLabel({
        label: label,
      })
      this.data.lineList.forEach(function (line) {
        if (line.from == from && line.to == to) {
          line.label = label
        }
      })
    },
    repaintEverything() {
      this.jsPlumb.repaint()
    },
    addNode(evt, nodeMenu, mousePosition) {
      var screenX = evt.originalEvent.clientX, screenY = evt.originalEvent.clientY
      let efContainer = this.$refs.efContainer
      var containerRect = efContainer.getBoundingClientRect()
      var left = screenX, top = screenY
      // 计算是否拖入到容器中
      if (left < containerRect.x || left > containerRect.width + containerRect.x || top < containerRect.y || containerRect.y > containerRect.y + containerRect.height) {
          this.$message.error("请把节点拖入到画布中")
          return
      }
      left = left - containerRect.x + efContainer.scrollLeft
      top = top - containerRect.y + efContainer.scrollTop
      // 居中
      left -= 85
      top -= 16
      var nodeId = this.getUUID()
      // 动态生成名字
      var origName = nodeMenu.name
      var nodeName = origName
      var index = 1
      while (index < 10000) {
          var repeat = false
          for (var i = 0; i < this.data.nodeList.length; i++) {
              let node = this.data.nodeList[i]
              if (node.name === nodeName) {
                  nodeName = origName + index
                  repeat = true
              }
          }
          if (repeat) {
              index++
              continue
          }
          break
      }
      var node = {
          id: nodeId,
          name: nodeName,
          type: nodeMenu.type,
          left: left + 'px',
          top: top + 'px',
          ico: nodeMenu.ico,
          state: 'success'
      }
      /**
       * 这里可以进行业务判断、是否能够添加该节点
       */
      this.data.nodeList.push(node)
      this.$nextTick(function () {
          this.jsPlumb.makeSource(nodeId, this.jsplumbSourceOptions)
          this.jsPlumb.makeTarget(nodeId, this.jsplumbTargetOptions)
          this.jsPlumb.draggable(nodeId, {
              containment: 'parent',
              stop: function (el) {
                  // 拖拽节点结束后的对调
                  console.log('拖拽结束: ', el)
              }
          })
      })
    },
    dataReload (data) {
      this.easyFlowVisible = false
      this.data.nodeList = []
      this.data.lineList = []
      this.$nextTick(() => {
        data = lodash.cloneDeep(data)
        this.easyFlowVisible = true
        this.data = data
        console.log(this.data)
        this.$nextTick(() => {
          this.jsPlumb = jsPlumb.getInstance()
          this.$nextTick(() => {
            this.jsPlumbInit()
          })
        })
      })
    },
    jsPlumbInit () {
      this.jsPlumb.ready(() => {
        this.jsPlumb.importDefaults(this.jsplumbSetting)
        this.jsPlumb.setSuspendDrawing(false, true)
        this.loadEasyFlow()
        this.jsPlumb.bind('click', (conn, originalEvent) => {
          this.activeElement.type = 'line'
          this.activeElement.sourceId = conn.sourceId
          this.activeElement.targetId = conn.targetId
          this.$refs.nodeForm.lineInit({
            from: conn.sourceId,
            to: conn.target,
            label: conn.getLabel()
          })
        })
        this.jsPlumb.bind("connection", (evt) => {
          let from  = evt.source.id
          let to = evt.target.id
          if (this.loadEasyFlowFinish) {
            this.data.lineList.push({from: from, to: to})
          }
        })
        this.jsPlumb.bind("connectionDetached", (evt) => {
          this.deleteLine(evt.source, evt.targetId)
        })
        this.jsPlumb.bind("connectionMoved", (evt) => {
          this.changeLine(evt.originalSourceId, evt.originalTargetId)
        })
        this.jsPlumb.bind("contextmenu", (evt) => {
          console.log('contextmenu', evt)
        })
        this.jsPlumb.bind("beforeDrop", (evt) => {
          let from = evt.sourceId
          let to = evt.target
          if (from === to) {
            this.$message.error('节点不支持连接自己')
            return false
          }
          if (this.hasLine(from, to)) {
            this.$message.error('该关系已存在，不允许重复创建')
            return false
          }
          if (this.hashOppositeLine(from, to)) {
            this.$message.error('不支持两个节点之间连接回环')
            return false
          }
          this.$message.success('连接成功')
          return true
        })
        this.jsPlumb.bind('beforeDetach', (evt) => {
          console.log('beforeDetach', evt)
        })
        this.jsPlumb.setContainer(this.$refs.efContainer)
      })
    },
    loadEasyFlow () {
      for (var i = 0; i < this.data.nodeList.length; i++) {
        let node = this.data.nodeList[i]
        this.jsPlumb.makeSource(node.id, lodash.merge(this.jsplumbSourceOptions, {}))
        this.jsPlumb.makeTarget(node.id, this.jsplumbTargetOptions)
        if (!node.viewOnly) {
          this.jsPlumb.draggable(node.id, {
            containment: 'parent',
            stop: function (el) {
              console.log('拖曳结束', el)
            }
          })
        }
      }
      for (var i = 0; i < this.data.lineList.length; i++) {
        let line = this.data.lineList[i]
        var connParam = {
          source: line.from,
          target: line.to,
          label: line.label ? line.label : '',
          connector: line.connector ? line.connector : '',
          anchors: line.anchors ? line.anchors : undefined,
          paintStyle: line.paintStyle ? line.paintStyle : undefined
        }
        this.jsPlumb.connect(connParam, this.jsplumbTargetOptions)
      }
      this.$nextTick(function () {
        this.loadEasyFlowFinish = true
      })
    }
  }
}
</script>
<style lang='scss'>
@import url('../../../../style/index.css');
.jsPlumb {
  background: #fff;
}
</style>
