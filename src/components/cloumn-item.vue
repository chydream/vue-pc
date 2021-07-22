<template>
  <el-table-column 
      :prop="cloumn.column_name"
      :label="cloumn.column_label"
      :width="cloumn.width"
      align="center"
      :headerAlign="cloumn.headerAlign"
      :sortable="cloumn.sortable">
      <cloumn-item v-for="(item, index) in cloumn.children" :key="index" :cloumn="item" :pageSize="pageSize" :tablePage="tablePage"></cloumn-item>
      <template slot-scope="scope">
        <slot v-if="cloumn.slotStatus" :name="cloumn.column_name" :row="scope.row"></slot>
        <template v-else>
          <span v-if="cloumn.column_name=='index'">{{(scope.$index + 1) + pageSize * (tablePage - 1) }}</span>
          <span v-else>{{scope.row[cloumn.column_name] }}</span>
        </template>
      </template>
  </el-table-column>
</template>

<script>
  export default {
    name: 'cloumnItem',
    props: {
      cloumn: {
        type: Object,
        required: true,
        default () {
          return {}
        }
      },
      pageSize: {
        type: Number,
        required: true,
        default: 10
      },
      tablePage: {
        type: Number,
        required: true,
        default: 1
      }
    },
    data () {
      return {

      }
    },
    computed: {
    },
    methods: {
      
    }
  }
</script>

<style lang="scss" scoped>

</style>
