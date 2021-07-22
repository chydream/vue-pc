<template>
  <div>
    <div id="main" style="width: 500px;height:500px;"></div>
  </div>
</template>
<script>
/* eslint-disable */
import * as echarts from 'echarts'
import 'echarts-gl'
export default {
  name: 'tMap',
  data () {
    return {
      msg: 1
    }
  },
  mounted () {
    var chart = echarts.init(document.getElementById('main'));
    chart.setOption({
        grid3D: {},
        xAxis3D: {},
        yAxis3D: {},
        zAxis3D: {},
        series: [{
            type: 'scatter3D',
            symbolSize: 50,
            data: [[-1, -1, -1], [0, 0, 0], [1, 1, 1]],
            itemStyle: {
                opacity: 1
            }
        }]
    })
  }
}
</script>
<style lang="scss">

</style>