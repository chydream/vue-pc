<template>
  <div class="marker-cluster-example">
    <a-form layout="inline">
      <a-form-item label="类型">
        <a-radio-group v-model="type">
          <a-radio-button value="default">默认</a-radio-button>
          <a-radio-button value="styles">
            使用 styles 定义聚合样式
          </a-radio-button>
          <a-radio-button value="custom-cluster">
            使用 cluster 插槽定义聚合样式
          </a-radio-button>
          <a-radio-button value="custom-marker">
            是用 marker 插槽定义单个点样式
          </a-radio-button>
          <a-radio-button value="custom-all">
            完全自定义
          </a-radio-button>
        </a-radio-group>
      </a-form-item>
    </a-form>
    <div class="map-container">
      <amap
        cache-key="marker-cluster-map"
        :center="map.center"
        :zoom="map.zoom"
        map-style="amap://styles/whitesmoke"
      >
        <amap-marker-cluster
          v-if="type === 'default'"
          key="default"
          :data="data"
          :grid-size="options.gridSize"
          :average-center="options.averageCenter"
        />

        <amap-marker-cluster
          v-if="type === 'styles'"
          key="styles"
          :data="data"
          :grid-size="options.gridSize"
          :average-center="options.averageCenter"
          :styles="options.styles"
        />

        <amap-marker-cluster
          v-if="type === 'custom-cluster'"
          key="custom-cluster"
          :data="data"
          :marker-options="getMarkerOptions"
          :cluster-options="getClusterOptions"
          :grid-size="options.gridSize"
          :average-center="options.averageCenter"
        >
          <!-- <template v-slot:cluster="context">
            <div :style="getClusterStyle(context)">
              {{ context.count }}
            </div>
          </template> -->

          <template slot-scope="scope" slot="cluster">
            <span>{{ scope.row.count }}</span>
          </template>
        </amap-marker-cluster>

        <amap-marker-cluster
          v-if="type === 'custom-marker'"
          key="custom-marker"
          :data="data"
          :marker-options="getMarkerOptions"
          :grid-size="options.gridSize"
          :average-center="options.averageCenter"
        >
          <!-- <template v-slot:marker="point">
            <div class="custom-marker" />
          </template> -->
           <template slot-scope="scope" slot="marker">
            <div class="custom-marker" />
          </template>
        </amap-marker-cluster>

        <amap-marker-cluster
          v-if="type === 'custom-all'"
          key="custom-all"
          :data="data"
          :marker-options="getMarkerOptions"
          :cluster-options="getClusterOptions"
          :grid-size="options.gridSize"
          :average-center="options.averageCenter"
        >
          <!-- <template v-slot:marker="point">
            <div class="custom-marker" />
          </template>
          <template v-slot:cluster="context">
            <div :style="getClusterStyle(context)">
              {{ context.count }}
            </div>
          </template> -->
        </amap-marker-cluster>
      </amap>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
const data = Object.freeze(
  require('./marker-cluster-weighted.json')
);

function interpolate(u, begin, end) {
  if (u < 0) u = 0;
  if (u > 1) u = 1;
  u = Math.pow(u, 1 / 10);
  return u * (end - begin) + begin;
}

export default {
  data() {
    return {
      data,
      map: {
        center: [105, 38],
        zoom: 4,
      },
      type: 'default',
      options: {
        gridSize: 80,
        averageCenter: true,
        styles: Object.freeze([
          {
            url: '/assets/clusters/blue.png',
            size: [32, 32],
            offset: [-16, -16],
          },
          {
            url: '/assets/clusters/green.png',
            size: [32, 32],
            offset: [-16, -16],
          },
          {
            url: '/assets/clusters/orange.png',
            size: [36, 36],
            offset: [-18, -18],
          },
          {
            url: '/assets/clusters/red.png',
            size: [48, 48],
            offset: [-24, -24],
          },
          {
            url: '/assets/clusters/darkRed.png',
            size: [48, 48],
            offset: [-24, -24],
          },
        ]),
      },
    };
  },
  mounted() {
    this.options.styles.forEach(style => {
      // style.url = this.$withBase(style.url);
    });
  },
  methods: {
    getMarkerOptions(point) {
      return {
        // position: point.lnglat,
        offset: [-15, -15],
        // content: '<div class="custom-marker" />',
      };
    },
    getClusterOptions(context) {
      const size = Math.round(
        30 + Math.pow(context.count / this.data.length, 1 / 5) * 20
      );
      return {
        offset: [-size / 2, -size / 2],
      };
    },
    getClusterStyle(context) {
      const u = context.count / this.data.length;
      const hue = ~~interpolate(u, 90, 0);
      const size = ~~interpolate(u, 30, 50);
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
        textAlign: 'center',
      }
    },
  },
};
</script>

<style lang="less">
.marker-cluster-example {
  .map-container {
    width: 100%;
    height: 500px;
  }
  .custom-marker {
    background-color: hsla(180, 100%, 50%, 0.7);
    height: 24px;
    width: 24px;
    border: 1px solid hsl(180, 100%, 40%);
    border-radius: 12px;
    box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;
    text-align: center;
  }
}
</style>