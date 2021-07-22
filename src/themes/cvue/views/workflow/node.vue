<template>
  <div class="work-flow-node">
    <div class="node-wrap" id="nodeWrap">
      <div id="item_left" class="item"></div>
      <div id="item_right" class="item" style="left:350px;"></div>
    </div>
  </div>
</template>
<script>
import {jsPlumb} from 'jsplumb'
export default {
  name: 'workFlowNode',
  data () {
    return {
      jsPlumb: null,
      option: {
        ConnectionsDetachable: false
      }
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
          // endpoint: 'Rectangle',
          label: '条件',
          // anchors: ['Left', 'Right'],
          connector: ['Straight'],
          overlays: [['Arrow', {width: 12, length: 12, location: 0.8}]]
        }, {
          // filter: '.fa',
          // filterExclude: false,
          anchor: 'Continuous',
          // paintStyle: {stroke: 'lightgray', strokeWidth: 3},
          painStyle: {fill: 'white', outlineStroke: 'blue', strokeWidth: 3},
          hoverPaintStyle: {outlineStroke: 'lightblue'},
          connectorStyle: {outlineStroke: 'green', strokeWidth: 1},
          connectorHoverStyle: {strokeWidth: 2},
          endpointStyle: { fill: 'lightgray', outlineStroke: 'darkgray', outlineWidth: 2 }
          // maxConnections: -1,
          // allowLoopback: true,
          // dropOptions: {hoverClass: 'ef-drop-hover'}
        })
        this.jsPlumb.draggable('item_left')
        this.jsPlumb.draggable('item_right')
        this.jsPlumb.addEndpoint('item_left', {
          anchors: ['Left']
        }, {
          isSource: true,
          isTarget: true,
          // painStyle: {fill: 'white', outlineStroke: 'blue', strokeWidth: 3},
          // hoverPaintStyle: {outlineStroke: 'lightblue'},
          connectorStyle: {outlineStroke: 'green', strokeWidth: 1},
          connectorHoverStyle: {strokeWidth: 2},
          Endpoint: ['Blank', {Overlays: ''}], // 空白端点
          EndpointStyle: {fill: '#1879ffa1', outlineWidth: 1}
        })
        this.jsPlumb.addEndpoint('item_right', {
          anchors: ['Right']
        }, {
          isSource: true,
          isTarget: true,
          Endpoint: ['Blank', {Overlays: ''}], // 空白端点
          EndpointStyle: {fill: '#1879ffa1', outlineWidth: 1}
        })
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
