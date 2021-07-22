<template>
  <div class="big-data">
    <dv-full-screen-container>
      <el-row :gutter="10">
        <el-col :span="7">
           <dv-border-box-8>dv-border-box-8</dv-border-box-8>
        </el-col>
        <el-col :span="9">
          <dv-loading>Loading...</dv-loading>
        </el-col>
        <el-col :span="7">
           <dv-border-box-8>dv-border-box-8</dv-border-box-8>
        </el-col>
      </el-row>
    </dv-full-screen-container>
  </div>
</template>

<script>
export default {
  name: 'bigData',
  data () {
    return {
      msg: 'hello'
    }
  }
}
</script>

<style scoped>
.big-data{

}
</style>
