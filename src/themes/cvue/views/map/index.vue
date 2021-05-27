<template>
  <div>
    <div>
      <el-form :inline="true">
        <el-form-item style="width:200px">
          <el-input type="number" v-model="zoom"></el-input>
        </el-form-item>
        <el-form-item style="width:200px">
          <el-input 
            type="text" 
            v-model="str" 
            readonly></el-input>
        </el-form-item>
        <el-form-item style="width:200px">
          <el-input type="number" v-model.number="pitch" :step="5"></el-input>
        </el-form-item>
        <el-form-item style="width:200px">
          <el-input type="number" v-model.number="rotation" :step="5"></el-input>
        </el-form-item>
        <el-form-item label="anchor">
          <el-select v-model="anchor" style="width: 120px">
            <el-option
              v-for="anchor in anchors"
              :key="anchor"
              :value="anchor"
            >
              {{ anchor }}
            </el-option>
          </el-select>
      </el-form-item>
      </el-form>
    </div>
    <div style="width: 100%; height: 500px;">
      <amap 
        cache-key="map"
        view-mode="3D"
        map-style="amap://styles/whitessmoke"
        async
        :zoom.sync="zoom"
        :center.sync="center"
        :pitch.sync="pitch"
        :rotation.sync="rotation"
        :show-indoor-map="false"
        is-hotspot
        @hotspotclick="onHotspotClick"
        ref="myMap">
          <amap-polyline
            :stroke-weight="7"
            stroke-color="#32AC2E"
            is-outline
            :border-weight="2"
            outline-color="#fff"
            show-dir 
            :path="path"/>
            <amap-marker 
              :position.sync="position1" 
              :label="{
                content: 'Hello, AMap-Vue!',
                direction: 'bottom'
              }" 
              draggable 
              ref="myMarker"></amap-marker>
            <amap-marker :position="position2" :offset="[0,0]" :anchor="anchor" draggable>
              <div class="marker-using-slot">使用slot的Marker</div>
            </amap-marker>
            <amap-marker
              draggable 
              :position.sync="position3" 
              :offset="[-22, -40]"
              :label="{
                content: '使用自定义Icon的Marker',
                direction: 'bottom'
              }"
              :icon="markerIcon" />
            <amap-marker
              :position.sync="car.pos"
              :angle.sync="car.angle"
              :icon="car.icon"
              :offset="car.offset"
              @amap-ready="onCarReady"
            />
      </amap>
    </div>
  </div>
</template>

<script>
import markerIcon from './marker-1.svg'
import carIcon from './car.png'
import { loadPlugins } from '@amap/amap-vue'
const path = Object.freeze(require('./path.json'))
export default {
  name: 'map',
  data () {
    const dx = path[1][0] - path[0][0]
    const dy = path[1][1] - path[0][1]
    return {
      center: [116.473778, 39.990661],
      position: [116.473778, 39.990661],
      zoom: 15.5,
      pitch: 0,
      rotation: 0,
      markerIcon,
      car: {
        pos: path[0].slice(0),
        angle: (Math.atan2(dy, dx) * 180) / Math.PI,
        icon: {
          image: carIcon,
          imageSize: [26, 50]
        },
        offset: [-13, -25]
      },
      anchors: Object.freeze([
        'top-left',
        'top-center',
        'top-right',
        'middle-left',
        'center',
        'middle-right',
        'bottom-left',
        'bottom-center',
        'bottom-right'
      ]),
      position1: [116.473571, 39.993083],
      position2: [116.478463, 39.999428],
      position3: [116.464258, 39.999067],
      anchor: 'center',
      path
    }
  },
  computed: {
    str () {
      return this.position1.join()
    }
  },
  mounted () {
    this.$nextTick(() => {
      // console.log(this.$refs.myMap)
      // console.log(this.$refs.myMap.$map)
      // console.log(this.$refs.myMarker)
      // console.log(this.$refs.myMarker.$target)
    })
  },
  methods: {
    onHotspotClick (e) {
      if (e && e.lnglat) {
        this.center = [e.lnglat.lng, e.lnglat.lat]
      }
    },
    async onCarReady (car) {
      await loadPlugins('AMap.MoveAnimation')
      car.moveAlong(path, {
        speed: 500,
        circlable: true,
        autoRotation: true
      })
    }
  }
}
</script>

<style scoped lang="scss">
.marker-using-slot {
  border: 3px solid #000;
  margin: 0;
  white-space: nowrap;
  padding: 0 10px;
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
