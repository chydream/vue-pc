<template>
  <div class="cvue-table">
    <div class="table-wrap">
      <el-table
        :stripe="option.stripe"
        :width="option.width"
        :border="option.border"
        ref="homeTable"
        :class="cssClass"
        class="home-table"
        v-loading="loading"
        @cell-click="handleClick"
        @selection-change="handleSelectionChange"
        :data="data"
      >
        <!-- 复选框 -->
        <el-table-column
          type="selection"
          width="55"
          v-if="option.selected"
          align="center"
          header-align="center"
        ></el-table-column>
        <!-- 序号 -->
        <el-table-column
          type="index"
          :width="indexWidth"
          v-if="option.index"
          align="center"
          label="序号"
        ></el-table-column>
        <!-- 循环列 -->

        <cloumn-item 
          v-for="(cloumn, index) in option.cloumn"
          :key="index" 
          :cloumn="cloumn"
          :pageSize="pageSize" 
          :tablePage="tablePage">
          <!-- <template>
           <span :slot="col.prop" v-for="(col, i) in option.cloumn" :key="i">22222</span>
          </template> -->
        </cloumn-item>

        <!-- <el-table-column
          :prop="cloumn.prop"
          :label="cloumn.label"
          :width="cloumn.width"
          :align="cloumn.align"
          :headerAlign="cloumn.headerAlign"
          :key="cloumn.prop"
          :sortable="false"
          v-for="cloumn in option.cloumn">
            <el-table-column
              :prop="child.prop"
              :label="child.label"
              :width="child.width"
              :align="child.align"
              :headerAlign="child.headerAlign"
              :key="child.prop"
              :sortable="false"
              v-for="child in cloumn.children">
               <template slot-scope="scope">
                <slot v-if="child.slotStatus" :name="child.prop" :row="scope.row"></slot>
                <template v-else>
                  <span v-if="child.prop=='index'">{{(scope.$index + 1) + pageSize * (tablePage - 1) }}</span>
                  <span v-else>{{scope.row[child.prop] }}</span>
                </template>
              </template>
            </el-table-column>
            <template slot-scope="scope">
              <slot v-if="cloumn.slotStatus" :name="cloumn.prop" :row="scope.row"></slot>
              <template v-else>
                <span v-if="cloumn.prop=='index'">{{(scope.$index + 1) + pageSize * (tablePage - 1) }}</span>
                <span v-else>{{scope.row[cloumn.prop] }}</span>
              </template>
            </template>
        </el-table-column> -->

        <slot name="multipleCloumn"></slot>
        <slot name="singleCloumn"></slot>
        <!-- 操作按钮 -->
        <slot name="actionMenu"></slot>
      </el-table>
    </div>
    <div class="page" v-show="isShowPage">
      <el-pagination
        :current-page="page.currentPage"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="layout"
        :total="page.total"
        :pager-count="5"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import File from '../themes/cvue/views/home/file.vue'
import cloumnItem from './cloumn-item.vue'
export default {
  name: 'cvueTable',
  components: {
    cloumnItem,
    File
  },
  data () {
    return {
    }
  },
  props: {
    isShowPage: {
      type: Boolean,
      default: false
    },
    page: {
      type: Object,
      default: () => {
        return {}
      }
    },
    option: {
      type: Object,
      required: true,
      default: () => {
        return {}
      }
    },
    data: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    },
    totalData: {
      type: Array,
      default: () => {
        return []
      }
    },
    cssClass: {
      type: String,
      default: ''
    },
    isIndexTotal: {
      type: Boolean,
      default: false
    },
    isShowSummary: {
      type: Boolean,
      default: false
    },
    isShowTotalSummary: {
      type: Boolean,
      default: false
    },
    summaryType: {
      type: Number,
      default: 1
    },
    indexWidth: {
      type: Number,
      default: 62
    },
    summaryFun: {
      type: Function,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    layout: {
      type: String,
      default: 'total,sizes,prev,pager,next,jumper'
    },
    tablePage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.$emit('current-change', val)
    },
    handleSizeChange (val) {
      this.$emit('size-change', val)
    },
    handleClick (row, index, prop) {
      this.$emit('cellClick', row, index, prop)
    },
    handleSelectionChange (val) {
      this.$emit('select-change', val)
    }
  }
}
</script>
<style lang="scss">
.cvue-table {
  .page {
    text-align: right;
    padding-top: 15px;
    .el-input__inner {
      border-radius: 4px;
      border: 1px solid #dcdfe6;
    }
  }
  .el-table thead tr th {
    background-color: #f6f6fd;
    color: #333;
  }
}
</style>
