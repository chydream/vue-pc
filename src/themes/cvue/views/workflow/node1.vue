<template>
  <div class="work-flow-node" style="padding-top: 100px;">
    <div class="node-wrap" id="nodeWrap">
      <div id="item_left" class="item"><i class="item1">5555</i></div>
      <div id="item_right" style="left:350px;" class="item"><i class="item1">5555</i></div>
    </div>
  </div>
</template>
<script>
/* eslint-disable*/
import {jsPlumb} from 'jsplumb'
export default {
  name: 'workFlowNode',
  data () {
    return {
      jsPlumb: null,
      option: {
        Container: 'nodeWrap',
        Connector: ['Bezier', { curviness: 100}],
        Anchors: ['Top', 'TopCenter', 'TopRight', 'TopLeft', 'Right', 'RightMiddle', 'Bottom', 'BottomCenter', 'BottomRight', 'BottomLeft', 'Left', 'LeftMiddle'],
        ConnectionsDetachable: false, // 鼠标不能拖动删除线
        DeleteEndpointsOnDetach: false, // 删除线的时候节点不删除
        // Endpoint: ['Blank', {Overlays: ''}], // 空白端点
        // EndpointStyle: {fill: '#1879ffa1', outlineWidth: 1},
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
        filter: '.item1', // 设置可以拖拽的类名，只要鼠标移动到该类名上的DOM，就可以拖拽连线
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
        filter: '.item1',
        filterExclude: false,
        maxConnections: -1,
        anchor: 'Continuous',
        allowLoopback: true,
        dropOptions: {hoverClass: 'ef-drop-hover'}
      },
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
        this.jsPlumb.setContainer('nodeWrap')
        this.jsPlumb.connect({
          source: 'item_left',
          target: 'item_right',
          endpoint: 'Dot'
        })
        this.jsPlumb.draggable('item_left', {
          containment: 'nodeWrap'
        })
        this.jsPlumb.draggable('item_right')
        this.jsPlumb.addEndpoint('item_left', {
          anchors: ['Left'],
          isSource: true,
          isTarget: true,
          connector: ['Straight']
        })
        this.jsPlumb.addEndpoint('item_left', {
          anchors: ['Bottom'],
          isSource: true,
          isTarget: true,
          connector: ['Straight']
        })
        this.jsPlumb.addEndpoint('item_right', {
          anchors: ['Bottom'],
          isSource: true,
          isTarget: true,
          connector: ['Straight']
        })
        this.jsPlumb.makeSource('item_left', this.sourceOption)
        this.jsPlumb.makeTarget('item_left', this.targetOption)
        this.jsPlumb.makeSource('item_right', this.sourceOption)
        this.jsPlumb.makeTarget('item_right', this.targetOption)
      })
    }
  }
}
</script>
<style lang="scss">
.work-flow-node{
  width: 100%;
  height: 100%;
  .node-wrap {
    padding: 20px;
    width: 80%;
    height: 400px;
    border: 1px solid gray;
  }
  .item {
    height: 80px;
    width: 80px;
    border: 1px solid blue;
    position: absolute;
  }
}
</style>
