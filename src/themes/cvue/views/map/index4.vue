<template>
  <div class="coord-picker">
    <div class="map-container">
      <amap 
        async
        :center.sync="center"
        :zoom.sync="zoom"
        is-hotspot
        @click="onMapClick"
        cache-key="coord-picker-map"
        mmap-style="amap://styles/whitesmoke">
        <amap-satellite-layer :visible="satellite" />
        <amap-marker v-if="position" :position.sync="position" draggable />
        <el-card :body-style="{
          'max-height': '450px',
            'overflow-y': 'scroll',
            'padding-top': 0,
          }"
        class="result-panel">
          <template slot="title">
            <template v-if="mode === 'search'">
              <el-input v-model="query" placeholder="关键字" @search="autoComplete"></el-input>
              <el-button @click="search(true)" :disabled="!query" type="primary">搜索</el-button>
            </template>
            <template v-if="mode === 'result'">
              <div class="search-bar">
                <el-button icon="left" @click="reset" style="margin-right: 6px;"></el-button>
                <span class="text">搜索 {{query}} 共 {{searching ? '...' : total}} 条结果</span>
              </div>
            </template>
          </template>
        </el-card>

        <el-form class="info ant-card ant-card-bordered" layout="inline">
          <el-form-item label="坐标" v-if="position">
            <el-input read-only :value="positionText" style="width: 200px;" />
          </el-form-item>
          <el-form-item label="卫星图">
            <el-switch v-model="satellite" />
          </el-form-item>
        </el-form>

      </amap>
    </div>
  </div>
</template>

<script>
import { loadAmap, loadPlugins } from '@amap/amap-vue'
export default {
  name: 'index2',
  data () {
    return {
      mode: 'search',
      center: null,
      zoom: 10,
      query: '',
      searching: false,
      tips: [],
      results: [],
      position: null,
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      satellite: false
    }
  },
  computed: {
    wrapper () {
      return this.$refs.wrapper
    },
    positionText () {
      if (!this.position) return ''
      return `${this.position[0]}, ${this.position[1]}`
    }
  },
  created () {
    this.$ready = new Promise(async resolve => {
      const AMap = await loadAmap()
      await loadPlugins(['AMap.PlaceSearch', 'AMap.AutoComplete'])
      this.ps = new AMap.PlaceSearch({
        pageSize: this.pageSize
      })
      this.ac = new AMap.AutoComplete()
      resolve()
    })
  },
  methods: {
    onMapClick (e) {
      if (e.lnglat) {
        this.position = [e.lnglat.lng, e.lnglat.lat]
      } else {
        this.position = null
      }
    },
    async search (clear = false) {
      this.mode = 'result'
      await this._ready
      if (clear) {
        this.results = []
        this.total = 0
        this.pageIndex = 1
        this.ps.setPageIndex(1)
      }
      this.searching = true
      const {query} = this
      this.ps.search(query, (status, result) => {
        this.searching = false
        if (query !== this.query) return
        if (status === 'complete' && result.poiList) {
          this.results = result.poiList.pois
          this.total = result.poiList.count
        } else {
          this.results = []
          this.total = 0
        }
      })
    },
    async autoComplete (kw) {
      if (!kw) {
        this.tips = []
      } else {
        this.ac.search(kw, (status, result) => {
          if (kw !== this.query) return
          if (status === 'complete' && result.tips) {
            this.tips = Array.from(new Set(result.tips.map(tip => tip.name)))
          } else {
            this.tips = []
          }
        })
      }
    },
    focus (poi) {
      const pos = [poi.location.lng, poi.location.lat]
      this.position = [...pos]
      this.center = [...pos]
    },
    reset () {
      this.ps.setPageIndex(1)
      this.results = []
      this.tips = []
      this.total = 0
      this.mode = 'search'
    }
  },
  watch: {
    pageIndex (value) {
      this.$ready.then(() => {
        this.ps.setPageIndex(value)
        this.search(false)
      })
    }
  }
}
</script>

<style lang="less">
.map-container {
  width: 100%;
  height: 600px;
}

.result-panel {
  position: absolute;
  left: 10px;
  top: 10px;
  width: 320px;
  display: flex;
  flex-direction: column;

  .search-bar {
    display: flex;
    align-items: center;
    .text {
      text-overflow: ellipsis;
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  .result-list.ant-list-loading {
    min-height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.info {
  position: absolute;
  right: 10px;
  top: 10px;
  padding-left: 24px;
}
</style>
