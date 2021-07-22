<template>
  <div class="route-plan">
    <div class="home-form">
      <el-form ref="ruleForm" label-width="80px" @submit.native.prevent>
        <el-row :gutter="10">
          <el-col :span="5">
            <el-form-item label="起始位置" prop="start">
              <el-input  placeholder="请输入起始位置"  v-model.trim="start" clearable size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="终点位置" prop="end">
              <el-input  placeholder="请输入终点位置"  v-model.trim="end" clearable size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="公交站点" prop="station">
              <el-input  placeholder="请输入公交站点"  v-model.trim="station" clearable size="mini"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="5">
            <el-form-item label="公交线路" prop="line">
              <el-input  placeholder="请输入公交线路"  v-model.trim="line" clearable size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleSearch" class="search-btn">搜索</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <amap 
      :zoom.sync="map.zoom" 
      :center.sync="map.center" 
      ref="map"
      :isHotspot="false"
      @hotspotover="handleHotspotover"
      @click="getPosition" 
      @moveend="move"
      @complete="complete">
      <amap-marker 
        :position="item.position" 
        v-for="(item, index) in markers" :key="index"/>
      </amap>
    <div id="panel1"></div>
  </div>
</template>
<script>
/* eslint-disable */
import { Amap } from '@amap/amap-vue'
export default {
  name: 'routePlan',
  data () {
    return {
      map: {
        zoom: 11,
        center:[119.296389, 26.074268]
      },
      start: '',
      searchStart: '',
      end: '',
      searchEnd: '',
      station: '',
      searchStation: '',
      line: '',
      searchLine: '',
      area: '',
      center: '',
      zoom: '',
      position: '',
      marker: null,
      circle: null,
      text: null,
      circleMarker: null,
      labelMarker: null,
      line: null,
      bezierCurve: null,
      polygon: null,
      rectangle: null,
      ellipse: null,
      markers: [
        // {position: [119.296389, 26.074268]},
        // {position: [119.088335,26.067977]},
        // {position: [119.27785,26.040835]},
        // {position: [119.396142,26.060968]}
      ],
      autoInput: ''
    }
  },
  computed: {
    aMap () {
      return this.$refs.map.$map
    }
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        // console.log(this.aMap)
        // this.planRoute()
      }, 2000)
    })
  },
  methods: {
    // 地图的热点
    handleHotspotover (result) {
      let self = this
      this.aMap.plugin(['AMap.PlaceSearch', 'AMap.InfoWindow'], function(){
        let placeSearch = new AMap.PlaceSearch()
        let infoWindow = new AMap.InfoWindow({})
        // console.log(result)
        placeSearch.getDetails(result.id, function(status, result){
          console.log(status,result)
          let poiArr = result.poiList.pois
          let location = poiArr[0].location
          let html = ''
              html += '<div class="info-title">'+poiArr[0].name+'</div><div class="info-content">'+"地址：" + poiArr[0].address
              html += '<br/>电话：'  + poiArr[0].tel + '<br/>类型：' + poiArr[0].type + '</div>'
          infoWindow.setContent(html)
          infoWindow.open(self.aMap, location)
        })
      })
    },
    // 地图加载完成
    complete () {
    },
    // 地图拖放
    move () {
      // console.log(this.aMap.getZoom())
      // console.log(this.aMap.getCenter())
    },
    // 获取经纬度
    getPosition (e) {
      // console.log(e)
      this.position = e.lnglat.getLng() + ',' + e.lnglat.getLat()
      // this.addMarker()
    },
    handleSearch () {
      this.searchStart = this.start
      this.searchEnd = this.end
      this.searchStation = this.station
      this.searchLine = this.line
      if (this.searchStation) {
        this.stationSearch(this.searchStation)
      } else if (this.searchLine) {
        this.lineSearch(this.searchLine)
      } else{
        this.planRoute(this.searchStart, this.searchEnd)
      }
    },
    planRoute (start, end) {
      // console.log(AMap)
      var self = this
      this.aMap.plugin(['AMap.Transfer'], function () {
        var transOptions = {
          map: self.aMap,
          city: '福州市',
          panel: 'panel1',
          policy: AMap.TransferPolicy.LEAST_TIME
        }
        var transfer = new AMap.Transfer(transOptions)
        // transfer.search(new AMap.LngLat(119.326628,26.072123), new AMap.LngLat(119.340777,26.092676), function(status, result){
        //   console.log(result)
        // })
        transfer.search([{keyword: start,city:'福州市'},{keyword: end,city:'福州市'}],function(status, result){
          console.log(status, result)
        })
      })
    },
    stationSearch (stationKeyWord) {
      var self = this
      this.aMap.plugin(['AMap.StationSearch'], function () {
        var transOptions = {
          map: self.aMap,
          city: '福州市',
          panel: 'panel1',
          pageIndex: 1, //页码
          pageSize: 60, //单页显示结果条数
          // city: '010'   //确定搜索城市
        }
        var station = new AMap.StationSearch(transOptions)
        // transfer.search(new AMap.LngLat(119.326628,26.072123), new AMap.LngLat(119.340777,26.092676), function(status, result){
        //   console.log(result)
        // })
        station.search(stationKeyWord,function(status, result){
          console.log(status, result)
        })
      })
    },
    lineSearch (busLineName) {
      var self = this
      this.aMap.plugin(['AMap.LineSearch'], function () {
        var transOptions = {
          pageIndex: 1,
          city: '福州',
          pageSize: 1,
          extensions: 'all'
        }
        var linesearch = new AMap.LineSearch(transOptions)
        // transfer.search(new AMap.LngLat(119.326628,26.072123), new AMap.LngLat(119.340777,26.092676), function(status, result){
        //   console.log(result)
        // })
        linesearch.search(busLineName,function(status, result){
          console.log(status, result)
        })
      })
    }
  }
}
</script>
<style scoped lang="scss">
html,body,#container {
  width: 100%;
  height: 100%;
}
.route-plan {
  padding: 0px !important;
  .home-form{
    background: #fff;
    margin-bottom: 10px;
    padding: 5px 0;
  }
  #panel1 {
    position: fixed;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    bottom: 10px;
    right: 10px;
    width: 280px;
  }
  #panel1 .amap-call {
    background-color: #009cf9;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  #panel1 .amap-lib-transfer {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    overflow: hidden;
  }
}
</style>
