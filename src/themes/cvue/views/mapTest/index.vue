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
          <el-col :span="3">
            <el-form-item label="级别" prop="zoom">
              <el-input  placeholder="请输入"  v-model.trim="zoom" clearable size="mini"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="4">
            <el-form-item label="坐标" prop="position">
              <el-input  placeholder="请输入"  v-model.trim="position" clearable size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="4">
            <el-form-item label="自动输入" prop="zoom" label-width="80px">
              <el-input  placeholder="请输入" clearable size="mini" v-model.trim="autoInput" @input="autoComplete" id="tipinput"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-button type="primary" icon="el-icon-search" size="mini" @click="removeMarker" class="search-btn" style="margin-left:10px;">移除</el-button>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="getAllOverlays" class="search-btn" style="margin-left:10px;">获取覆盖物</el-button>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="addAllOverlays" class="search-btn" style="margin-left:10px;">添加覆盖物</el-button>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="addPointer" class="search-btn" style="margin-left:10px;">添加点标记</el-button>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="getCityInfo" class="search-btn" style="margin-left:10px;">IP城市定位</el-button>
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
    <div id="panel" style="width:300px;height:500px;position:absolute;right: 0;bottom:0"></div>
  </div>
</template>
<script>
import { Amap } from '@amap/amap-vue'
/* eslint-disable */
export default {
  name: '',
  data () {
    return {
      map: {
        zoom: 11,
        center:[119.296389, 26.074268]
      },
      city: '',
      searchCity: '',
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
    let self = this
    self.$nextTick(() => {
      setTimeout(() => {
        // console.log(self.aMap)
        // this.getBounds()
        // this.setBounds()
        // this.setLimitBounds()
        // this.setOptions()
        this.setDefaultCursor()
        this.getCurrentPosition()
        this.getWeather()
        // this.addArea()
        this.createWindowInfo()
        this.placeSearch()
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
        console.log(result)
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
    // 获取经纬度
    getPosition (e) {
      console.log(e)
      this.position = e.lnglat.getLng() + ',' + e.lnglat.getLat()
      // this.addMarker()
    },
    // 地图加载完成
    complete () {
    },
    // 地图拖放
    move () {
      // console.log(this.aMap.getZoom())
      // console.log(this.aMap.getCenter())
    },
    // 地图销毁
    destroy () {
       this.aMap.destroy()
    },
    // 地图搜索
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
    // 获取地图边界
    getBounds () {
      let bounds = this.aMap.getBounds()
      console.log(bounds.northEast.toString())
      console.log(bounds.southWest.toString())
    },
    // 设置地图边界
    setBounds () {
      let myBounds = new AMap.Bounds([116.319665, 39.855919], [116.468324, 39.9756])
      this.aMap.setBounds(myBounds)
    },
    // 限制地图边界
    setLimitBounds () {
      let bounds = this.aMap.getBounds()
      this.aMap.setLimitBounds(bounds)
      let limitBounds =this.aMap.getLimitBounds()
      console.log(limitBounds.northEast.toString())
      console.log(limitBounds.southWest.toString())
    },
    // 清除限制
    clearLimitBounds () {
      this.aMap.clearLimitBounds()
    },
    // 平移
    mapPanBy () {
      this.aMap.panBy(50,100)
    },
    // 移动到
    mapPanTo () {
      this.aMap.panTo([119.527143, 27.255234])
    },
    // 地图初始化配置
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
    },
    // 设置鼠标样式
    setDefaultCursor () {
      // default pointer move crosshair
      this.aMap.setDefaultCursor('pointer')
    },
    addMarker () {
      // this.aMap.setZoom(14)
      // 点标记
      this.marker = new AMap.Marker({
        // icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        position: [119.331408,26.110528],
        anchor: "bottom-center"
      })
     
      // 文本
      this.text = new AMap.Text({
        text: '纯文本标记',
        anchor: 'center',
        draggable: true,
        cursor: 'pointer',
        angle: 10,
        style:{
          'padding': '.75rem 1.25rem',
          'margin-bottom': '1rem',
          'border-radius': '.25rem',
          'background-color': 'white',
          'width': '15rem',
          'border-width': 0,
          'box-shadow': '0 2px 6px 0 rgba(114, 124, 245, .5)',
          'text-align': 'center',
          'font-size': '20px',
          'color': 'blue'
        },
        position: [119.088335,26.067977]
      })
      // 圆点
      this.circleMarker = new AMap.CircleMarker({
        center:[119.27785,26.040835],
        radius: 10 + Math.random() * 10,
        strokeColor: 'white',
        strokeColor:'white',
        strokeWeight:2,
        strokeOpacity:0.5,
        fillColor:'rgba(0,0,255,1)',
        fillOpacity:0.5,
        zIndex:10,
        bubble:true,
        cursor:'pointer',
        clickable: true
      })
      // labelMarker
      this.labelMarker = new AMap.LabelMarker({
        name: '全聚德烤鸭',
        position: [119.396142,26.060968],
        zooms: [10, 20],
        opacity: 1,
        zIndex: 10,
        icon: {
            type: 'image',
            image: 'https://a.amap.com/jsapi_demos/static/images/poi-marker.png',
            clipOrigin: [14, 92],
            clipSize: [50, 68],
            size: [25, 34],
            anchor: 'bottom-center',
            angel: 0,
            retina: true
        },
        text: {
            content: '全聚德烤鸭',
            direction: 'left',
            offset: [0, -5],
            style: {
                fontSize: 15,
                fontWeight: 'normal',
                fillColor: '#333',
                strokeColor: '#fff',
                strokeWidth: 2,
            }
        }
      })
      this.aMap.add(this.labelMarker)
      this.aMap.add(this.marker)
      this.marker.setTitle("我是marker的title")
      this.marker.setLabel({
        offset: new AMap.Pixel(20,20),
        content: '<div class="info">我是marker的label标签</div>',
        direction: 'right'
      })
      this.aMap.add(this.text)
      this.aMap.add(this.circleMarker)
      // this.aMap.setFitView()
    },
    // 画线
    addLine (path) {
      this.line = new AMap.Polyline({
        path: path,
        isOutline: true,
        dirColor:'pink',
        outlineColor:"#ffeeff",
        borderWeight: 3,
        strokeColor: '#3366FF',
        strokeOpacity: 1,
        strokeWeight: 6,
        strokeStyle: 'solid',
        strokeDasharray: [10, 5],
        lineJoin: 'round',
        lineCap: 'round',
        zIndex: 50,
        showDir:true,
        // strokeColor: '#3366bb',   // 线颜色
        // strokeWeight: 10    
      })
      this.bezierCurve = new AMap.BezierCurve({
        path: path,
        isOutline: true,
        outlineColor: '#ffeeff',
        borderWeight: 3,
        strokeColor: "#3366FF", 
        strokeOpacity: 1,
        strokeWeight: 6,
        // 线样式还支持 'dashed'
        strokeStyle: "solid",
        // strokeStyle是dashed时有效
        strokeDasharray: [10, 10],
        lineJoin: 'round',
        lineCap: 'round',
        zIndex: 50,
      })
      // this.aMap.add(this.bezierCurve)
      this.aMap.add(this.line)
    },
    // 画面
    addArea () {
      let limitBounds =this.aMap.getBounds()
      var bounds = new AMap.Bounds(limitBounds.southWest, limitBounds.northEast)
      // 多边形
      this.polygon = new AMap.Polygon({
        path: bounds,
        fillColor: '#ccebc5',
        strokeOpacity: 1,
        fillOpacity: 0.5,
        strokeColor: '#2b8cbe',
        strokeWeight: 1,
        strokeStyle: 'dashed',
        strokeDasharray: [5, 5],
      })
      this.polygon.on('mouseover', () => {
        polygon.setOptions({
          fillOpacity: 0.7,
          fillColor: '#7bccc4'
        })
      })
      this.polygon.on('mouseout', () => {
        polygon.setOptions({
          fillOpacity: 0.5,
          fillColor: '#ccebc5'
        })
      })
      // 矩形
      this.rectangle = new AMap.Rectangle({
        bounds: bounds,
        strokeColor:'red',
        strokeWeight: 6,
        strokeOpacity:0.5,
        strokeDasharray: [30,10],
        // strokeStyle还支持 solid
        strokeStyle: 'dashed',
        fillColor:'blue',
        fillOpacity:0.5,
        cursor:'pointer',
        zIndex:50,
      })
       // 圆形
      this.circle = new AMap.Circle({
        center: new AMap.LngLat("119.296389", "26.074268"),
        radius: 1000,
        strokeColor:"#F33",
        strokeOpacity:1,
        strokeWeight:3,
        fillColor:"#ee2200",
        fillOpacity:0.35
      })
      // 椭圆
      this.ellipse = new AMap.Ellipse({
        center: [119.296389, 26.074268],
        radius: [ 2000, 1000 ], //半径
        borderWeight: 3,
        strokeColor: "#FF33FF", 
        strokeOpacity: 1,
        strokeWeight: 6,
        strokeOpacity: 0.2,
        fillOpacity: 0.4,
        // 线样式还支持 'dashed'
        strokeStyle: 'dashed',
        strokeDasharray: [10, 10], 
        fillColor: '#1791fc',
        zIndex: 50,
      })

      this.aMap.add(this.ellipse);
      this.aMap.add(this.circle)
      this.aMap.add(this.polygon)
      this.aMap.add(this.rectangle)
    },
    removeMarker () {
      // this.markers.shift()
      // console.log(this.markers)
      this.markers.splice(0,1)
      console.log(this.markers)
      // this.aMap.clearMap()
      // this.aMap.remove(this.marker)
      // this.aMap.remove(this.circle)
    },
    async clearMarker () {
      await this.$nextTick();
      // map.setFitView();
      setTimeout(() => {
        this.aMap.clearMap()
      }, 3000)
    },
    getAllOverlays (type) {
      console.log(this.aMap.getAllOverlays())
      // var overlays = this.aMap.getAllOverlays('marker')
      // console.log(overlays)
    },
    addAllOverlays () {
      // var marker = new AMap.Marker({
      //   // icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
      //   position: [119.331408,26.110528],
      //   anchor: "bottom-center"
      // })
      // this.aMap.add(marker)
      this.markers.push({position: [119.396142,26.060968]})
    },
    addPointer () {
      var marker = new AMap.Marker({
        icon:"//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
        position: [119.296389, 26.074268],
        offset: new AMap.Pixel(-13, -30)
      })
      marker.setMap(this.aMap)
      marker.setIcon("//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png")
      // marker.setMap(null)
      // marker = null
      var markerContent = document.createElement('div')
      var markerImg = document.createElement('img')
      markerImg.className = "markerlnglat"
      markerImg.src =  "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png"
      markerContent.appendChild(markerImg)
      var markerSpan = document.createElement("span")
      markerSpan.className = 'marker'
      markerSpan.innerHTML = 'Hi，我被更新啦！'
      markerContent.appendChild(markerSpan)
      marker.setContent(markerContent)
      marker.setPosition([119.088335,26.067977])
    },
    // 获取城市信息
    getCityInfo () {
      var self = this
      this.aMap.plugin(['AMap.CitySearch'], function () {
        var citySearch = new AMap.CitySearch()
        citySearch.getLocalCity(function(status, result){
          console.log(result)
          var arr = []
          arr.push(result.rectangle.split(";")[0].split(','))
          arr.push(result.rectangle.split(";")[1].split(','))
          console.log(arr)
          self.addLine(arr)
        })
      })
    },
    // 定位
    getCurrentPosition () {
      var self = this
      AMap.plugin('AMap.Geolocation', function () {
        var options1 = {
          enableHighAccuracy: true,
          timeout: 10000,
          position: 'RB',
          buttonOffset: new AMap.Pixel(10, 20),
          zoomToAccuracy: true
        }
        var options = {
          'showButton': true,//是否显示定位按钮
          'buttonPosition': 'LB',//定位按钮的位置
          /* LT LB RT RB */
          'buttonOffset': new AMap.Pixel(10, 20),//定位按钮距离对应角落的距离
          'showMarker': true,//是否显示定位点
          'markerOptions':{//自定义定位点样式，同Marker的Options
            'offset': new AMap.Pixel(-18, -36),
            'content':'<img src="https://a.amap.com/jsapi_demos/static/resource/img/user.png" style="width:36px;height:36px"/>'
          },
          'showCircle': true,//是否显示定位精度圈
          'circleOptions': {//定位精度圈的样式
            'strokeColor': '#0093FF',
            'noSelect': true,
            'strokeOpacity': 0.5,
            'strokeWeight': 1,
            'fillColor': '#02B0FF',
            'fillOpacity': 0.25
          } 
        }
        var geolocation = new AMap.Geolocation(options1)
        self.aMap.addControl(geolocation)
        geolocation.getCurrentPosition(function(status, result){
          console.log(status, result)
        })
      })
    },
    // 获取天气
    getWeather () {
      AMap.plugin('AMap.Weather', function(){
        var weather = new AMap.Weather()
        weather.getLive('福州', function(err, data){
          console.log(data)
        })
        weather.getForecast('福州', function(err,data){
          console.log(data)
        })
      })
    },
    // 信息窗体
    createWindowInfo () {
      var html = '<div class="info">这是一个信息窗体！！</div>'
      var infoWindow = new AMap.InfoWindow({
        // position: lnglat,
        isCustom: false,  //使用自定义窗体
        anchor: 'top-left',
        content: html,
        offset: new AMap.Pixel(16, -45)
      })
      //  infoWindow.setContent(createContent(poiArr[0]))
      infoWindow.open(this.aMap, this.aMap.getCenter())
      this.aMap.clearInfoWindow()
    },
    autoComplete (keywords) {
      var self = this
      AMap.plugin('AMap.AutoComplete', function(){
        var autoOptions = {
          city: '全国',
          input: "tipinput"
        }
        var autoComplete = new AMap.Autocomplete(autoOptions)
        autoComplete.search(keywords, function(status, result) {
          console.log(result)
        })
        autoComplete.on("select", self.placeSearchSelect);//注册监听，当选中某条记录时会触发
      })
    },
    placeSearchSelect (e) {
      console.log(e)
      AMap.plugin('AMap.PlaceSearch', function(){
        var autoOptions = {
          // type: '餐饮服务', // 兴趣点类别
          city: '全国',
          pageSize: 5, // 单页显示结果条数
          pageIndex: 1, // 页码
          // city: "010", // 兴趣点城市
          citylimit: true,  //是否强制限制在设置的城市内搜索
          map: self.aMap, // 展现结果的地图实例
          panel: "panel", // 结果列表将在此容器中进行展示。
          autoFitView: false, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
          children: 0, //不展示子节点数据
          extensions: 'base' //返回基本地址信息
        }
        var placeSearch = new AMap.PlaceSearch(autoOptions) 
        placeSearch.setCity(e.poi.adcode);
        placeSearch.search(e.poi.name);  //关键字查询查询
      })
    },
    placeSearch () {
      var self = this
      AMap.plugin('AMap.PlaceSearch', function(){
        var autoOptions = {
          // type: '餐饮服务', // 兴趣点类别
          city: '福州',
          pageSize: 5, // 单页显示结果条数
          pageIndex: 1, // 页码
          // city: "010", // 兴趣点城市
          citylimit: true,  //是否强制限制在设置的城市内搜索
          map: self.aMap, // 展现结果的地图实例
          panel: "panel", // 结果列表将在此容器中进行展示。
          autoFitView: false, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
          children: 0, //不展示子节点数据
          extensions: 'base' //返回基本地址信息
        }
        var placeSearch = new AMap.PlaceSearch(autoOptions) 
        var cpoint = [119.296389, 26.074268]; //中心点坐标
        // placeSearch.search('福州｜软件园', function(status, result){
        //   console.log(result)
        // })
        // 附近搜索
        // placeSearch.searchNearBy('', cpoint, 200, function(status, result){
        //   console.log(result)
        // })
        // 多边形搜索
        let limitBounds =self.aMap.getBounds()
        console.log(limitBounds)
        var bounds = new AMap.Bounds(limitBounds.southWest, limitBounds.northEast)
        var polygonArr = [//多边形覆盖物节点坐标数组
            [116.403322, 39.920255],
            [116.410703, 39.897555],
            [116.402292, 39.892353],
            [116.389846, 39.891365]
        ]
        // 多边形
        var polygon = new AMap.Polygon({
          path: polygonArr,
          fillColor: '#ccebc5',
          strokeOpacity: 1,
          fillOpacity: 0.5,
          strokeColor: '#2b8cbe',
          strokeWeight: 1,
          strokeStyle: 'dashed',
          strokeDasharray: [5, 5],
        })
        placeSearch.searchInBounds('酒店', polygon, function(status, result){
          console.log(status,result)
        })
      })
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
