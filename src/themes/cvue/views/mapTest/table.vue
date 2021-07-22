<template>
  <div class="big-table">
    <cvue-table
      :option="tableOption"
      :data="tableData"
      ref="tbl1"
      :isShowAdd="false"
      :page="page"
      :tablePage="tablePage"
      :pageSize="page.pageSize"
      :loading="tableLoading"
      :isShowPage="false">
      <template slot-scope="scope" slot="name">
        <span>{{ scope.row.name }}</span>
      </template>
    </cvue-table>
  </div>
</template>
<script>
/* eslint-disable */
import cvueTable from '@/components/cvue-table1'
import cloumnItem from '@/components/cloumn-item.vue'
export default {
  name: 'table',
   components: {
    cvueTable,
    cloumnItem
  },
  data () {
    return {
      tablePage: 1,
      tableLoading: false,
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
        pageSizes: [10, 50, 100]
      },
      tableOption: {
        stripe: true,
        width: '100%',
        border: false,
        index: false,
        selected: false,
        cloumn:   [
            {
              "column_name": "BusiType00",
              "column_label": "汽车票",
              "tag": null,
              "children": [
                  {
                      "column_name": "dt1",
                      "column_label": "巴士管家",
                      "tag": 0,
                      "children": []
                  },
                  {
                      "column_name": "dt2",
                      "column_label": "窗口微信",
                      "tag": 0,
                      "children": []
                  },
                  {
                      "column_name": "dt3",
                      "column_label": "窗口支付宝",
                      "tag": 0,
                      "children": []
                  },
                  {
                      "column_name": "dt4",
                      "column_label": "兑换赠票",
                      "tag": 0,
                      "children": []
                  },
                  {
                      "column_name": "dt5",
                      "column_label": "飞猪微信",
                      "tag": 0,
                      "children": []
                  },
                  {
                      "column_name": "dt6",
                      "column_label": "飞猪支付宝",
                      "tag": 0,
                      "children": []
                  },
                  {
                      "column_name": "dt7",
                      "column_label": "今点通售票",
                      "tag": 0,
                      "children": []
                  },
                  {
                      "column_name": "dt8",
                      "column_label": "南京特捷",
                      "tag": 0,
                      "children": []
                  },
                  {
                      "column_name": "dt9",
                      "column_label": "携程售票",
                      "tag": 0,
                      "children": []
                  },
                  {
                      "column_name": "dt10",
                      "column_label": "易行售票",
                      "tag": 0,
                      "children": []
                  },
                  {
                      "column_name": "dt14",
                      "column_label": "携程地推",
                      "tag": 0,
                      "children": []
                  }
              ]
          },
          {
              "column_name": "dt11",
              "column_label": "城际出行",
              "tag": 8,
              "children": []
          },
          {
              "column_name": "dt12",
              "column_label": "网约车",
              "tag": 40,
              "children": []
          },
          {
              "column_name": "dt13",
              "column_label": "小件物流",
              "tag": 90,
              "children": []
          }
        ]
      },
      tableData: [
         {
            "ReportMonth": "2021-01",
            "dt1": 334.0,
            "dt2": 231942.0,
            "dt3": 55787.0,
            "dt4": 318.0,
            "dt5": 46422.0,
            "dt6": 29295.0,
            "dt7": 21634.0,
            "dt8": 1213.60,
            "dt9": 53870.60,
            "dt10": 163607.70,
            "dt14": 0.0,
            "dt11": 114068.0,
            "dt12": 183188.0,
            "dt13": 13475.0
        },
        {
            "ReportMonth": "2021-02",
            "dt1": 0.0,
            "dt2": 183435.0,
            "dt3": 47880.0,
            "dt4": 0.0,
            "dt5": 36506.0,
            "dt6": 28247.0,
            "dt7": 24298.0,
            "dt8": 1643.30,
            "dt9": 67496.10,
            "dt10": 179596.60,
            "dt14": 0.0,
            "dt11": 259550.0,
            "dt12": 236023.0,
            "dt13": 24149.0
        },
        {
            "ReportMonth": "2021-03",
            "dt1": 53.0,
            "dt2": 214542.0,
            "dt3": 63236.0,
            "dt4": 586.0,
            "dt5": 46884.60,
            "dt6": 35207.0,
            "dt7": 28276.0,
            "dt8": 1084.40,
            "dt9": 88092.80,
            "dt10": 208595.10,
            "dt14": 159.0,
            "dt11": 266593.0,
            "dt12": 196896.0,
            "dt13": 9335.0
        },
        {
            "ReportMonth": "2021-04",
            "dt1": 0.0,
            "dt2": 268344.0,
            "dt3": 73770.0,
            "dt4": 424.0,
            "dt5": 63200.60,
            "dt6": 47122.0,
            "dt7": 40210.0,
            "dt8": 1558.80,
            "dt9": 114518.90,
            "dt10": 220276.40,
            "dt14": 0.0,
            "dt11": 332665.0,
            "dt12": 247386.20,
            "dt13": 10455.0
        },
        {
            "ReportMonth": "2021-05",
            "dt1": 53.0,
            "dt2": 270560.0,
            "dt3": 65512.0,
            "dt4": 212.0,
            "dt5": 63465.20,
            "dt6": 47163.0,
            "dt7": 51322.0,
            "dt8": 1434.20,
            "dt9": 157553.90,
            "dt10": 236072.70,
            "dt14": 0.0,
            "dt11": 324217.0,
            "dt12": 248570.0,
            "dt13": 9270.0
        }
      ]
    }
  }
}
</script>
<style scoped>
.big-table{
  height: auto !important;
  padding-bottom: 50px !important;
  background: #fff;
}
</style>
