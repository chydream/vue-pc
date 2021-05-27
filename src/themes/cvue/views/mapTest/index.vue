<template>
  <div class="my-map">
    <div class="home-form">
      <el-form ref="ruleForm" label-width="60px" @submit.native.prevent>
        <el-row :gutter="10">
          <el-col :span="4">
            <el-form-item label="城市" prop="city">
              <el-input  placeholder="请输入城市"  v-model.trim="city" clearable size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleSearch" class="search-btn">搜索</el-button>
            <el-button type="primary" size="mini" @click="mapPanBy" class="search-btn">平移</el-button>
            <el-button type="primary" size="mini" @click="mapPanTo" class="search-btn">移到</el-button>
          </el-col>
          <el-col :span="4">
            <el-form-item label="行政区" prop="area">
              <el-input  placeholder="请输入"  v-model.trim="area" clearable size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="中心点" prop="center">
              <el-input  placeholder="请输入"  v-model.trim="center" clearable size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="级别" prop="zoom">
              <el-input  placeholder="请输入"  v-model.trim="zoom" clearable size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <amap 
        :zoom.sync="map.zoom" 
        :center.sync="map.center" 
        ref="map" 
        @moveend="move"
        @complete="complete"></amap>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: '',
  data () {
    return {
      map: {
        zoom: 11,
        center: [119.296389, 26.074268]
      },
      city: '',
      searchCity: '',
      area: '',
      center: '',
      zoom: ''
    }
  },
  computed: {
    aMap () {
      return this.$refs.map.$map
    }
  },
  mounted () {
    let self = this
    self.$nextTick(() => {
      setTimeout(() => {
        // console.log(self.aMap)
        // this.getBounds()
        // this.setBounds()
        this.setLimitBounds()
        this.setOptions()
      }, 2000)
    })
  },
  methods: {
    complete () {
    },
    move () {
      // console.log(this.aMap.getZoom())
      // console.log(this.aMap.getCenter())
    },
    destroy () {
       this.aMap.destroy()
    },
    handleSearch () {
      this.searchCity = this.city
      this.aMap.setCity(this.searchCity)
      this.clearLimitBounds()
      setTimeout(() => {
        this.aMap.getCity((info) => {
          console.log(info)
          this.area = info.city
          this.center = this.aMap.getCenter().toString()
          this.zoom = this.aMap.getZoom()
        })
      }, 1000)
    },
    getBounds () {
      let bounds = this.aMap.getBounds()
      console.log(bounds.northEast.toString())
      console.log(bounds.southWest.toString())
    },
    setBounds () {
      let myBounds = new AMap.Bounds([116.319665, 39.855919], [116.468324, 39.9756])
      this.aMap.setBounds(myBounds)
    },
    setLimitBounds () {
      let bounds = this.aMap.getBounds()
      this.aMap.setLimitBounds(bounds)
      let limitBounds =this.aMap.getLimitBounds()
      console.log(limitBounds.northEast.toString())
      console.log(limitBounds.southWest.toString())
    },
    clearLimitBounds () {
      this.aMap.clearLimitBounds()
    },
    mapPanBy () {
      this.aMap.panBy(50,100)
    },
    mapPanTo () {
      this.aMap.panTo([119.527143, 27.255234])
    },
    setOptions () {
      var mapOpts = {
        showIndoorMap: false, // 是否在有矢量底图的时候自动展示室内地图，PC默认true,移动端默认false
        dragEnable: false, // 地图是否可通过鼠标拖拽平移，默认为true
        keyboardEnable: false, //地图是否可通过键盘控制，默认为true
        doubleClickZoom: false, // 地图是否可通过双击鼠标放大地图，默认为true
        zoomEnable: false, //地图是否可缩放，默认值为true
        rotateEnable: false, // 地图是否可旋转，3D视图默认为true，2D视图默认false
      }
      this.aMap.setStatus(mapOpts)
    }
  }
}
</script>
<style lang="scss">
.my-map{
  padding: 0px !important;
  .home-form{
    background: #fff;
    margin-bottom: 10px;
    padding: 5px 0;
  }
}
</style>
