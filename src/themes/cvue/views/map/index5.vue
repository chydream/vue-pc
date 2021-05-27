<template>
  <div class="draw">    
    <amap :zoom="11" :center="position" :resizeEnable="true" ref="myMap">
      <template v-slot:map-content>
        <el-form class="controls" layout="inline">
          <el-form-item>
            <el-button-group>
              <template v-if="drawer.mode === 'none'">
                <el-button @click="drawer.mode = 'polygon'">多边形</el-button>
                <el-button @click="drawer.mode = 'rectangle'">矩形</el-button>
                <el-button @click="drawer.mode = 'circle'">圆形</el-button>
              </template>
              <template v-else>
                <el-button @click="drawer.mode = 'none'">取消</el-button>
              </template>
            </el-button-group>
          </el-form-item>
        </el-form>
        <el-form class="info" layout="inline">
          <el-form-item label="面积" v-show="area > 0">{{ (area / 1000000).toFixed(4) }}平方公里</el-form-item>
          <el-form-item v-show="area > 0">
            <el-button size="small" shape="circle" icon="copy" @click="showModal"></el-button>
          </el-form-item>
          <el-form-item label="卫星图">
            <el-switch v-model="satellite" />
          </el-form-item>
        </el-form>
        <amap-satellite-layer :visible="satellite" />
        <amap-scale />
        <amap-mouse-tool :mode.sync="drawer.mode" clear-when-close @draw="onDraw" />
        <amap-polygon 
          v-if="drawer.polygon" 
          :path.sync="drawer.polygon" 
          :stroke-color="styles.stroke"
          :fill-opacity="0.5"
          :fill-color="styles.fill" />
        <amap-circle 
          v-if="drawer.circle"
          :fill-color="styles.fill" 
          :stroke-color="styles.stroke"
          :fill-opacity="0.5"
          editable
          :center.sync="drawer.circle.center"
          :radius.sync="drawer.circle.radius"/>
        <amap-rectangle 
          v-if="drawer.rectangle"
          :fill-color="styles.fill"
          :stroke-color="styles.stroke"
          :fill-opacity="0.5"
          editable 
          :bounds.sync="drawer.rectangle"/>
      </template>
    </amap>
  </div>
</template>

<script>
import { loadAmap, loadPlugins } from '@amap/amap-vue'

function makeBounds (value) {
  const sw = new window.AMap.LngLat(value[0][0], value[0][1])
  const ne = new window.AMap.LngLat(value[1][0], value[1][1])
  return new window.AMap.Bounds(sw, ne)
}

export default {
  name: 'index2',
  data () {
    return {
      position: [116.473778, 39.990661],
      ready: false,
      styles: {
        fill: '#409EFF',
        stroke: '#000A58'
      },
      satellite: false,
      drawer: {
        type: 'polygon',
        mode: 'none',
        polygon: [
          [116.416529, 39.960142],
          [116.422794, 39.959287],
          [116.421421, 39.953234],
          [116.413181, 39.957708],
          [116.413782, 39.960866]
        ],
        circle: null,
        rectangle: null
      }
    }
  },
  computed: {
    area () {
      const { ready, drawer } = this
      if (!ready) {
        return 0
      }
      switch (drawer.type) {
        case 'none':
          return 0
        case 'polygon':
          return window.AMap.GeometryUtil.ringArea(drawer.polygon)
        case 'rectangle':
          return new window.AMap.Rectangle({
            bounds: makeBounds(drawer.rectangle)
          }).getArea()
        case 'circle':
          return Math.PI * Math.pow(drawer.circle.radius, 2)
        default:
          return 0
      }
    }
  },
  methods: {
    onDraw (type, res) {
      this.drawer.type = type
      this.drawer[type] = res
      this.drawer.mode = 'none'
    },
    showModal () {
      const h = this.$createElement
      this.$success({
        title: '当前圈选的范围',
        content: h('a-textarea', {
          attrs: {
            style: 'height: 400px; font-family: monospace;'
          },
          props: {
            value: JSON.stringify(this.drawer[this.drawer.type], null, '  ')
          }
        })
      })
    }
  },
  watch: {
    'drawer.mode' (mode) {
      console.log('drawer.mode', mode)
      if (mode !== 'none') {
        const { drawer } = this
        drawer.type = 'none'
        drawer.polygon = null
        drawer.circle = null
        drawer.rectangle = null
      }
    }
  }
}
</script>

<style lang="less">
.controls {
  position: absolute;
  left: 6px;
  top: 0;
}
.info {
  position: absolute;
  right: 6px;
  top: 0;
}
</style>
