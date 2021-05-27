<template>
  <div class="wangjing-parkings">
    <div class="map-container">
      <amap 
        cache-key="wangjing-parkings-map" 
        :center="map.center" 
        async
        map-style="amap://styles/whitesmoke"
        @click="current = null"
        @zoomstart="current = null"
        :zoom="map.zoom">
        <amap-marker-cluster 
          key="custom-cluster"
          key-prop="poiid"
          :marker-options="getMarkerOptions"
          :cluster-options="getClusterOptions"
          :grid-size="options.gridSize"
          :average-center="options.averageCenter" 
          :data="data">
          <template v-slot:cluster="context">
            <div :style="getClusterStyle(context)">
              {{context.count}}
            </div>
          </template>
          <template v-slot:marker="point">
            <div class="custom-marker" @click="current = point"></div>
          </template>
        </amap-marker-cluster>
        <el-card class="park-info-card" shadow="always" v-if="current">
          <h3>{{current.name}}</h3>
          <div>{{current.address}}</div>
          <div>{{current.x}},{{current.y}}</div>
        </el-card>
        <amap-marker v-if="current" :key="current.poiid" :position="[current.x, current.y]" />
      </amap>
    </div>
  </div>
</template>

<script> 
const parkings = Object.freeze(require('./parkings.json').map(park => ({
  ...park,
  lnglat: [parseFloat(park.x), parseFloat(park.y)]
})))
function interpolate (u, begin, end) {
  if (u < 0) u = 0
  if (u > 1) u = 1
  u = Math.pow(u, 1 / 10)
  return u * (end - begin) + begin
}
export default {
  name: 'index2',
  data () {
    return {
      data: parkings,
      map: {
        center: [116.473778, 39.990661],
        zoom: 13
      },
      options: {
        gridSize: 40,
        averageCenter: true,
        zoomOnClick: true
      },
      current: null,
      context: ''
    }
  },
  methods: {
    getMarkerOptions (point) {
      return {
        offset: [0, 0]
      }
    },
    getClusterOptions (context) {
      const size = Math.round(30 + Math.pow(context.count / this.data.length, 1 / 5) * 20)
      return {
        offset: [-size / 2, -size / 2]
      }
    },
    getClusterStyle (context) {
      const u = context.count / this.data.length
      const hue = ~~interpolate(u, 90, 0)
      const size = ~~interpolate(u, 30, 50)
      return {
        backgroundColor: `hsla(${hue}, 100%, 50%, 0.7)`,
        width: `${size}px`,
        height: `${size}px`,
        lineHeight: `${size}px`,
        borderRadius: `${size / 2}px`,
        border: `1px solid hsla(${hue}, 100%, 40%, 1)`,
        boxShadow: `0 0 1px hsla(${hue}, 100%, 50%, 1)`,
        color: `hsla(${hue}, 100%, 20%, 1)`,
        fontSize: '14px',
        textAlign: 'center'
      }
    }
  }
}
</script>

<style lang="less">
.wangjing-parkings {
  .map-container {
    width: 100%;
    height: 500px;
  }
  .custom-marker {
    @color: hsla(128, 100%, 58%, 0.8);
    background-color: @color;
    border: 1px solid darken(@color, 50%);
    box-sizing: border-box;
    @size: 20px;
    height: @size;
    width: @size;
    border-radius: @size / 2;
    transform: translate3d(-50%, -50%, 0);
  }

  .park-info-card {
    position: absolute;
    left: 10px;
    top: 10px;

    h3 {
      margin-top: 0;
    }

    .button-close {
      position: absolute;
      right: 0.5em;
      top: 0.5em;

      cursor: pointer;
    }
  }
}
</style>
