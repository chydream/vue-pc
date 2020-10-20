<template>
  <div class="flowJsPlumb"  >
    <div id="diagramContainer">
      <div id="item_left" class="item"></div>
      <div id="item_right" class="item" style="left:550px;"></div>
    </div>
  </div>
</template>
<script>
/* eslint-disable*/
import {jsPlumb} from 'jsplumb'
export default {
  name: 'jsPlumb',
  data () {
    return {
      msg: '123',
      flowNodeList: [
        {
          "Id":"1f9e047b-c6b1-4784-a49f-73b91b281034",
          "NodeName":"新增节点",
          "NodeRemark":"新增节点",
          "NodeType":1,
          "FlowId":"840317a2-38ce-4ee1-887e-5739e8bbb35d",
          "ParentIds":"",
          "OpUserIds":",*,",
          "OpDeptIds":",,",
          "OpRoleIds":",,",
          "Top":86,
          "Left":44
        },
        {
          "Id":"cc7423e4-6775-4578-8fb7-342145fea714",
          "NodeName":"新增节点",
          "NodeRemark":"新增节点",
          "NodeType":1,
          "FlowId":"840317a2-38ce-4ee1-887e-5739e8bbb35d",
          "ParentIds":"e50a1499-3303-4e9d-9010-746d86f1c7b9",
          "OpUserIds":",*,",
          "OpDeptIds":",,",
          "OpRoleIds":",,",
          "Top":129,
          "Left":209
        },
        {
          "Id":"e50a1499-3303-4e9d-9010-746d86f1c7b9",
          "NodeName":"新增节点",
          "NodeRemark":"新增节点",
          "NodeType":1,
          "FlowId":"840317a2-38ce-4ee1-887e-5739e8bbb35d",
          "ParentIds":"",
          "OpUserIds":",,",
          "OpDeptIds":",17dd015e620c48a1951fcbb995d9bae0,287a1077ebb0449e81eefd65d823297d,95db4101973f49f88b6d64005b3accff,",
          "OpRoleIds":",,",
          "Top":47,
          "Left":128
        }
      ]
    }
  },
  mounted () {
    // 请单点击一下连接线, 
    jsPlumb.ready(function () {
      console.log(jsPlumb)
      jsPlumb.connect({
        source: 'item_left',
        target: 'item_right',
        endpoint: 'Dot',
        paintStyle: { stroke: 'lightgray', strokeWidth: 5 },
        overlays: [ ['Arrow', { width: 12, length: 12, location: 0.5 }] ]
      })
      jsPlumb.bind('click', function (conn, originalEvent) {
        // console.log(conn)
        // jsPlumb.detach(conn)
        jsPlumb.deleteConnection(conn)
      })
    })
  },
  methods: {
    fun1 () {
      jsPlumb.ready(function(){
        // jsPlumb.addEndpoint('item_left', {
        //   anchors: ['Right']
        // })
        // var common = {
        //   // endpoint: 'Rectangle',
        //   connector: ['Bezier'],
        //   anchor: ['Left', 'Right']
        // }
        // jsPlumb.connect({
        //   source:'item_left',
        //   target: 'item_right',
        //   // paintStyle: { stroke: 'lightgray', strokeWidth: 3 },
        //   // endpointStyle: { fill: 'lightgray', outlineStroke: 'darkgray', outlineWidth: 2 },
        //   overlays: [ ['Arrow', [ "Label", { label:"foo", location:0.25, id:"myLabel" } ]] ]
        // }, common)
        jsPlumb.makeSource('item_left', {
          endpoint:"Dot",
          anchor: "Continuous"
        })

        jsPlumb.makeTarget('item_right', {
          endpoint:"Dot",
          anchor: "Continuous"
        })

        jsPlumb.draggable('item_left', {
          containment: 'parent',
          grid: [10, 10]
        })
        jsPlumb.draggable('item_right', {
          containment: 'parent',
          grid: [10, 10]
        })
        jsPlumb.setContainer('diagramContainer')      
        var common = {
          isSource: true,
          isTarget: true,
          connector: ['Straight'],
          maxConnections: -1,
          // paintStyle: {
          //   fill: 'white',
          //   outlineStroke: 'blue',
          //   strokeWidth: 3
          // },
          // hoverPaintStyle: {
          //   outlineStroke: 'lightblue'
          // },
          // connectorStyle: {
          //   outlineStroke: 'green',
          //   strokeWidth: 1
          // },
          // connectorHoverStyle: {
          //   strokeWidth: 2
          // }
        }
        jsPlumb.addEndpoint('item_left', {
          anchors: ['Right'],
          uuid: 'fromId'
        }, common)
        // jsPlumb.addEndpoint('item_left', {
        //   anchors: ['Left']
        // }, common)

        jsPlumb.addEndpoint('item_right', {
          anchor: 'Left',
          uuid: 'toId'
        }, common)

        jsPlumb.addEndpoint('item_right', {
          anchor: 'Right'
        }, common)

        jsPlumb.importDefaults({
          ConnectionsDetachable: false
        })

        setTimeout(function () {
          jsPlumb.connect({ uuids: ['fromId', 'toId'] })
        }, 3000)


        jsPlumb.bind('click', function (conn, originalEvent) {
          console.log(conn)
          console.log(originalEvent)
          setTimeout(function () {
            jsPlumb.remove('item_left')
          }, 3000)
          jsPlumb.detach(conn)
        })

        jsPlumb.bind('beforeDrop', function (info) {
          var a = 1
          var b = 2
          if (a < b) {
            console.log('链接会自动建立')
            return true // 链接会自动建立
          } else {
            console.log('链接取消')
            return false // 链接不会建立，注意，必须是false
          }
        })
      })
    }
  }
}
</script>
<style lang='scss'>
.flowJsPlumb{
  position: relative;
  #diagramContainer {
    background-image: linear-gradient(90deg,rgba(0, 0, 0, 0.15) 10%, rgba(0, 0, 0, 0) 10%),linear-gradient(rgba(0, 0, 0, 0.15) 10%, rgba(0, 0, 0, 0) 10%);
    background-size: 10px 10px;
    height: 500px;
    background-color: rgb(251, 251, 251);
    /*background-color: #42b983;*/
    position: relative;
    margin-left: 30px;
  }

  .item {
    position: absolute;
    width: 60px;
    height: 20px;
    background-color: white;
    padding: 5px;
    opacity: 0.7;
    border: 1px solid #346789;
    /*border-radius: 10px;*/
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
}
</style>
