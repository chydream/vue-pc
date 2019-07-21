<template>
    <div>
        <cvue-tree-grid :option="option"></cvue-tree-grid>
    </div>
</template>
<script>
import cvueTreeGrid from '@/components/cvue-tree-Table'
export default {
    name: 'tree-test',
    components: {
        cvueTreeGrid
    },
    data () {
        return {
            option: {
                expandAll: true,
                columns: [
                    {
                        text: '模块',
                        value: 'describe',
                        width: 200
                    },
                    {
                        text: '编辑权限',
                        value: 'edit'
                    },
                    {
                        text: '查看权限',
                        value: 'view'
                    }
                ],
                data: [
                    {
                        id: 0,
                        describe: '事件1',
                        edit: 50,
                        view: '无'
                    },
                    {
                        id: 1,
                        describe: '事件1',
                        edit: 50,
                        view: '无',
                        children: [
                            {
                                id: 2,
                                describe: '事件1',
                                edit: 50,
                                view: '无'
                            }
                        ]
                    }
                ]
            }
        }
    }
}
</script>
<style lang="sass" scoped>
</style>
