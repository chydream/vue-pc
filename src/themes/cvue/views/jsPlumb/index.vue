<template>
  <div class="jsPlumb" style="height: calc(100vh);">
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
    <div style="display:flex;height:calc(100%-47px);">
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
        <div style="position:absolute;top:2000px;left:2000px;">&nbsp;</div>
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
import draggable from 'vuedraggable'
import flowNode from './node'
import FlowNodeForm from './node_form'
import FlowInfo from './info'
import { easyFlowMixin } from './mixins'
import { getDataA } from './data_A'
import { getDataB } from './data_B'
import { getDataC } from './data_C'
import { getDataD } from './data_D'
import nodeMenu from './node_menu'
var mousePosition = {
  left: -1,
  top: -1
}
export default {
  name: 'jsPlumb',
  mixins: [easyFlowMixin],
  components: {
    draggable,
    flowNode,
    FlowNodeForm,
    FlowInfo,
    nodeMenu
  },
  data () {
    return {
      data: {},
      activeNames: '1',
      // draggable配置参数参考 https://www.cnblogs.com/weixin186/p/10108679.html
      draggableOptions: {
        preventOnFilter: false,
        sort: false,
        disabled: false,
        ghostClass: 'tt',
        // 不使用H5原生的配置
        forceFallback: true,
        // 拖拽的时候样式
        // fallbackClass: 'flow-node-draggable'
      },
      // 默认打开的左侧菜单的id
      defaultOpeneds: ['1', '2'],
      menuList: [
        {
          id: '1',
          type: 'group',
          name: '开始节点',
          ico: 'el-icon-video-play',
          open: true,
          children: [
            {
              id: '11',
              type: 'timer',
              name: '数据接入',
              ico: 'el-icon-time',
              // 自定义覆盖样式
              style: {}
            }, {
              id: '12',
              type: 'task',
              name: '接口调用',
              ico: 'el-icon-odometer',
              // 自定义覆盖样式
              style: {}
            }
          ]
        },
        {
          id: '2',
          type: 'group',
          name: '结束节点',
          ico: 'el-icon-video-pause',
          open: true,
          children: [
            {
              id: '21',
              type: 'end',
              name: '流程结束',
              ico: 'el-icon-caret-right',
              // 自定义覆盖样式
              style: {}
            }, {
              id: '22',
              type: 'over',
              name: '数据清理',
              ico: 'el-icon-shopping-cart-full',
              // 自定义覆盖样式
              style: {}
            }
          ]
        }
      ],
      nodeMenu: {},
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
    // 根据类型获取左侧菜单对象
    getMenuByType (type) {
      for (let i = 0; i < this.menuList.length; i++) {
        let children = this.menuList[i].children;
        for (let j = 0; j < children.length; j++) {
          if (children[j].type === type) {
            return children[j]
          }
        }
      }
    },
    // 拖拽开始时触发
    move (evt, a, b, c) {
      var type = evt.item.attributes.type.nodeValue
      this.nodeMenu = this.getMenuByType(type)
    },
    // 拖拽结束时触发
    end (evt, e) {
      this.$emit('addNode', evt, this.nodeMenu, mousePosition)
    },
    // 是否是火狐浏览器
    isFirefox () {
      var userAgent = navigator.userAgent
      if (userAgent.indexOf("Firefox") > -1) {
        return true
      }
      return false
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
  }
}
</script>
<style lang='scss'>
@import url('../../../../style/index.css');
.jsPlumb {
  background: #fff;
}
</style>
