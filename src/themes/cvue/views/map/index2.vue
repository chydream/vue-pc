<template>
  <div class="top-home-rank">
    <div class="side">
      <ul class="rank-list" @mouseout="hoverAoi = null">
        <li
          v-for="(aoi, i) in aois"
          @mouseover="hoverAoi = aoi"
          @click="activeAoi = aoi"
          :class="{ active: aoi === activeAoi, hover: aoi === hoverAoi }"
          :key="aoi.aoiid"
        >
          <div class="name">No.{{ i + 1 }} {{ aoi.name }}</div>
          <div class="bar">
            <div class="bar-inner" :style="barStyle(aoi, i + 1)"></div>
          </div>
        </li>
      </ul>
    </div>
    <div class="main">
      <amap
        ref="map"
        :rotation="0"
        :pitch="0"
        async
        @complete="setFitView"
        map-style="amap://styles/whitesmoke"
        cache-key="top-home-rank-map"
        @click="activeAoi = null"
      >
        <amap-polygon
          v-for="(aoi, i) in aois"
          :key="aoi.aoiid"
          :pth="aoi.wkt"
          :fill-opacity="aoi === activeAoi ? 0.8 : aoi === hoverAoi ? 0.7 : 0.4"
          :fill-color="fillColor(i + 1)"
          :stroke-weight="aoi === activeAoi || aoi === hoverAoi ? 2 : 1"
          stroke-color="#000"
          clickable
          @click="activeAoi = aoi"
          @mouseover="hoverAoi = aoi"
          @mouseout="hoverAoi = null"
          :z-index="10"
          ref="polygons"
        ></amap-polygon>

        <amap-info-window
          :visible="!!activeAoi"
          :position="activeAoi ? [activeAoi.x, activeAoi.y] : null"
          :z-index="12"
          :offset="[0, -40]"
          is-custom
        >
          <div class="info-window-content">
            <el-card shadow="always" v-if="activeAoi">
              <el-icon
                type="close"
                class="button-close"
                @click="activeAoi = null"
              />
              <h3>{{ activeAoi.name }}</h3>
              <div>指数：{{ activeAoi.index }}</div>
              <div>中心点坐标：{{ activeAoi.x }},{{ activeAoi.y }}</div>
            </el-card>
          </div>
        </amap-info-window>

        <amap-marker
          :position="hoverAoi ? [hoverAoi.x, hoverAoi.y] : undefined"
          :offset="[-22, -39]"
          :visivle="!!hoverAoi && hoverAoi !== activeAoi"
        >
          <div class="hover-icon"><img :src="assets.marker1" /></div>
        </amap-marker>

        <amap-marker
          :visible="!!activeAoi"
          :offset="[-22, -39]"
          :position="activeAoi ? [activeAoi.x, activeAoi.y] : undefined"
        >
          <div class="active-icon"><img :src="assets.marker2" /></div>
        </amap-marker>
      </amap>
    </div>
  </div>
</template>

<script> 
import marker1 from './marker-2.svg'
import marker2 from './marker-3.svg'

const topHomeAois = Object.freeze(
  require('./top-home-aois.json')
)
const aois = topHomeAois.map(aoi => {
  return {
    ...aoi,
    wkt: aoi.wkt.split(',').map(pair => pair.split(' '))
  }
})
export default {
  name: 'index2',
  data () {
    return {
      assets: {
        marker1,
        marker2
      },
      aois,
      hoverAoi: null,
      activeAoi: null
    }
  },
  computed: {
    $map () {
      return this.$refs.map.$map
    }
  },
  methods: {
    fillColor (rank) {
      if (rank === 1) return 'rgba(255, 109, 157, 1.0)'
      if (rank === 2) return 'rgba(255, 221, 119, 1.0)'
      if (rank === 3) return 'rgba(100, 237, 178, 1.0)'
      if (rank === 4) return 'rgba(85, 172, 254, 1.0)'
      return 'rgba(0, 126, 255, 1.0)'
    },
    barStyle (aoi, rank) {
      if (!this.aois || !this.aois[0]) return {}
      const max = this.aois[0].index
      const relative = aoi.index / max
      return {
        width: `${relative * 100}%`,
        background: this.fillColor(rank)
      }
    },
    async setFitView (map) {
      await this.$nextTick()
      const topn = this.$refs.polygons.slice(0, 5).map((p) => p.$target)
      map.setFitView(topn)
    }
  },
  watch: {
    activeAoi (aoi) {
      if (!aoi) return
      this.$map.setCenter([aoi.x, aoi.y])
    }
  }
}
</script>

<style lang="scss">
.top-home-rank {
  display: flex;
  height: 600px;
  border: 1px solid #000;
  .side {
    width: auto;
    height: 100%;
    overflow-y: auto;
  }
  .main {
    flex: 1;
  }

  .info-window-content {
    position: relative;

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
  .rank-list {
    margin: 0;
    padding: 0;
    list-style: none;
    width: 240px;
    position: relative;

    li {
      box-sizing: border-box;
      width: 100%;
      padding: 8px 12px;
      cursor: default;
    }
    li.hover,
    li.active {
      background-color: #e5e5e5;
    }
    .name {
      width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow-x: hidden;
    }
    .bar {
      padding: 4px 0 0;
    }
    .bar-inner {
      height: 8px;
    }
  }

  /deep/ .amap-marker {
    pointer-events: none;
  }
}
</style>
