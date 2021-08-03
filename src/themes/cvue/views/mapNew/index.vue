<template>
  <div>
    <el-input  placeholder="请输入工号" v-model.trim="empNumber" clearable size="mini"></el-input>
    <div id="container">
      <el-amap class="amap-box" :vid="'amap-vue'"></el-amap>
    </div>
  </div>
</template>
<script>
import { lazyAMapApiLoaderInstance } from 'vue-amap'
/* eslint-disable */
export default {
  name: 'mapNew',
  data() {
    return {
      empNumber: '',
      aMap: null
    }
  },
  beforeRouteLeave (to, from, next) {
    // this.map.destroy()
    next()
  },
  mounted() {
    this.$nextTick(() => {
      lazyAMapApiLoaderInstance.load().then(() => {
        // var cluster, markers = [];
        // var map = new AMap.Map("container", {
        //     resizeEnable: true,
        //     center: [105, 34],
        //     zoom: 4
        // });
        // for (var i = 0; i < points.length; i += 1) {
        //     markers.push(new AMap.Marker({
        //         position: points[i]['lnglat'],
        //         content: '<div style="background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
        //         offset: new AMap.Pixel(-15, -15)
        //     }))
        // }
        // if (cluster) {
        //     cluster.setMap(null);
        // }
        // cluster = new AMap.MarkerClusterer(map, markers, {gridSize: 80});
        // map.plugin(["AMap.MarkerCluster"],function(){
        //   var cluster = new AMap.MarkerCluster(map, points, {
        //       gridSize: 80 // 聚合网格像素大小
        //   })
        // })
      })
    })
  },
}
</script>
<style>
 #container {
    width: 500px;
    height: 500px;
  }
</style>
