<template>
  <div class="work-flow" id="workFlow">
    <el-row :gutter="2">
      <el-col :span="2" class="left">
        <p>节点类型列表</p>    
        <draggable v-model="myArray" 
            class="drag-start"
            chosenClass="chosen" 
            forceFallback="true" 
            animation="1000"
            :options="optionData" 
            @end="onEnd1"
            :move="onMove"
            @start="onStart">
            <span :id="'node' + index" class="btn-type"  v-for="(item, index) in myArray" :key="index">
              <i :class="item.icon" aria-hidden="true"></i>{{item.name}}
            </span>
        </draggable>
      </el-col>
      <el-col :span="22" class="right">
        <div ref="efContainer" style="height:100%;" class="drag-end">
          <span :id="'nodeEnd' + index" class="btn-type"  v-for="(item, index) in myArray1" :key="index" :style="{'left':item.left + 'px','top':item.top + 'px'}">
            <i :class="item.icon" aria-hidden="true"></i>{{item.name}}
          </span>
          <!-- <draggable v-model="myArray1"
              class="drag-end"
              chosenClass="chosen" 
              forceFallback="true" 
              group="itxst" 
              animation="1000" 
              @end="onEnd2"
              :move="onMove"
              @start="onStart">
              <span :id="'nodeEnd' + index" class="btn-type"  v-for="(item, index) in myArray1" :key="index" :style="{'left':item.left,'top':item.top}">
                <i :class="item.icon" aria-hidden="true"></i>{{item.name}}
              </span>
          </draggable> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {jsPlumb} from 'jsplumb'
import draggable from 'vuedraggable'
export default {
  name: 'workflow',
  components: {
    draggable
  },
  data () {
    return {
      jsPlumb: null,
      drag: false,
      // 定义要被拖拽对象的数组
      myArray: [
        {icon: 'fa fa-play-circle-o', name: '语音播报'},
        {icon: 'fa fa-navicon', name: '菜单'}
      ],
      myArray1: [
        // {icon: 'fa fa-play-circle-o', name: '语音播报1'},
        // {icon: 'fa fa-navicon', name: '菜单2'}
      ],
      optionData: {group: {name: 'itxst', pull: 'clone'}, sort: true}  
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.jsPlumb = jsPlumb.getInstance()
      this.jsPlumb.ready(() => {
        // 允许拖放
        // this.jsPlumb.draggable('node1')
      })
    },
    onStart (e) {
      // this.drag = true
      // console.log(e.draggedContext)
    },
    onEnd1 (e) {
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
      console.log(e.item.innerText == '语音播报')
      if (e.item.innerText == '语音播报') {
        this.myArray1.push({icon: 'fa fa-play-circle-o', name: '语音播报1', left: left, top: top})
      }
    },
    onEnd2 (e) {
      // console.log(e.originalEvent)
      // var screenX = e.originalEvent.clientX
    },
    onMove (e, originalEvent) {
      console.log(e)
    }
  }
}
</script>
<style lang="scss">
.work-flow {
  width: 100%;
  height: 100%;
  background: #dff0d8;
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
}
</style>
