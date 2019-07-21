<template>
    <div>
        <cvue-dialog :dialogVisible="bool" 
                     @closeDialog="handleCloseDialog" 
                     @confirmDialog="handleConfirmDialog">
            <component :is="pageInfo" slot="dialogBody" ref="pageWrap" :inputValue="inputValue"></component>
        </cvue-dialog>
        <page-info></page-info>
        <el-button @click="toggleDialog">切换弹窗</el-button>
    </div>
</template>
<script>
import cvueDialog from '@/components/cvue/cvue-dialog'
import pageInfo from './Page'
export default {
    name: 'Dialog',
    components: {
        cvueDialog,
        pageInfo
    },
    data () {
        return {
            bool: false,
            pageInfo: 'pageInfo',
            inputValue: '5555'
        }
    },
    methods: {
        toggleDialog () {
            this.bool = true
        },
        handleCloseDialog () {
            this.bool = false
        },
        handleConfirmDialog () {
            console.log(this.$refs.pageWrap.$el)
        }
    }
}
</script>
<style lang="scss">
    
</style>
