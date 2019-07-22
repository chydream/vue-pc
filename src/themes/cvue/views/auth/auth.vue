<template>
    <div class="auth">
        <p>查看当前路由权限：{{$route.meta}}</p>
        <p>配置前：</p>
        <el-button type="warning">查看</el-button>
        <el-button type="warning">删除</el-button>
        <el-button type="warning">新增</el-button>
        <el-button type="warning">编辑</el-button>
        <el-button type="warning">其他</el-button>
        <p>配置后：(v-hasPermission="permission.view")</p>
        <el-button type="warning" v-hasPermission="permission.view">查看</el-button>
        <el-button type="warning" v-hasPermission="permission.delete">删除</el-button>
        <el-button type="warning" v-hasPermission="permission.add">新增</el-button>
        <el-button type="warning" v-hasPermission="permission.edit">编辑</el-button>
        <el-button type="warning" v-hasPermission="permission.other">其他</el-button>
        <!-- <el-input v-model="msg" type="input"></el-input> -->
    </div>
</template>
<script>
export default {
    name: 'Auth',
    data () {
        return {
            msg: ''
        }
    },
    created () {
    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
.auth{
    height: 400px!important;
    padding: 30px!important;
    line-height: 50px;
    background: #fff;
}
</style>
