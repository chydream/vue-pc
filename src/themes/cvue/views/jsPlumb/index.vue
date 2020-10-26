<template>
  <div class="jsPlumb">
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
        11
      </div>
      <div id="efContainer" ref="efContainer" class="container" v-flowDrag>
        <div style="position:absolute;top:2000px;left:2000px;">&nbsp;</div>
      </div>
    </div>
    <div style="width:300px;border-left:1px solid #dce3e8;background-color:#FBFBFB">

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
      data: {}
    }
  },
  mounted () {  
    
  },
  methods: {
   
  }
}
</script>
<style lang='scss'>

</style>
