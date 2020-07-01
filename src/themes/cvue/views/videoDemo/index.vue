<template>
    <div>
        <cvue-video :forbidProgress="true" :currTime="5"></cvue-video>
    </div>
</template>
<script>
import cvueVideo from '@/components/cvue-video'
export default {
    name: 'video',
    components: {
        cvueVideo
    },
    data () {
        return {
           msg: 'hello'
        }
    },
    mounted () {
        
    },
    methods: {
        
    }
}
</script>
<style>

</style>
