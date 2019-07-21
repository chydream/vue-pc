<template>
    <div class='page'>
        {{msg}}
        <input type='text' placeholder='请输入' value='' name='inputTxt' v-model='inputValue'/>
        <!-- <child v-for='(item,index) in test' :key='index'>
            <span >{{item}}</span>
        </child> -->
        
        <el-row class='tac'>
            <el-col :span='12'>
                <h5>默认颜色</h5>
                <el-menu
                    default-active='2'
                    class='el-menu-vertical-demo'>
                    <template v-for="(item,index) in sitebars">
                         <el-menu-item :index="item.href" @click="goUrl(item.href)" v-if="item.children.length==0" :key="index">
                            <i :class="item.icon"></i>
                            <span slot="title">{{item.label}}</span>
                        </el-menu-item>
                        <el-submenu :index="item.label" :key="index" v-else>
                            <template slot="title" v-show="item.show">
                                <i :class="item.icon"></i>
                                <span>{{item.label}}</span>
                            </template>
                            <template v-for="(itemChild,indexChild) in item.children">
                                <el-menu-item :index="itemChild.href" @click="goUrl(itemChild.href)" :key="indexChild" v-if="itemChild.children==null">
                                    <i :class="itemChild.icon"></i>
                                    <span slot="title">{{itemChild.label}}</span>
                                </el-menu-item>
                            </template>
                        </el-submenu>
                    </template>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import Child from './Child'
export default {
    components: {
        Child
    },
    name: 'Page',
    props: {
        inputValue: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            msg: 'page page page',
            test: [1, 2],
            sitebars: [{
                'id': 1, 
                'pid': -1, 
                'flag': 'OPPORTUNITY', 
                'name': '商机管理系统', 
                'type': 0, 
                'icon': null, 
                'url': null, 
                'cssStyle': null, 
                'isParent': true, 
                'href': null, 
                'label': '商机管理系统', 
                'show': true, 
                'permission': [
                    'view'
                ],
                'children': [
                    {
                        'id': 1023, 
                        'pid': 1, 
                        'flag': '', 
                        'name': '商机列表', 
                        'type': 1, 
                        'icon': '', 
                        'url': '#', 
                        'cssStyle': '', 
                        'isParent': false, 
                        'children': null, 
                        'href': '#', 
                        'label': '商机列表', 
                        'show': true, 
                        'permission': [
                            'view'
                        ]
                    }
                ]
            }]
        }
    }
}
</script>
<style lang='scss' scoped>
    // .page{
    //     background: red !important;
    //     height: 50%!important;
    // }
</style>
