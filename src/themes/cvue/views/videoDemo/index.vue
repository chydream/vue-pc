<template>
    <div>
        <!-- <cvue-video :forbidProgress="true" :currTime="5"></cvue-video> -->
        <video id="example-video" width=960 height=540 class="video-js vjs-default-skin" controls>
            <source src="//d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8" type="application/x-mpegURL">
        </video>
    </div>
</template>
<script>
import cvueVideo from '@/components/cvue-video'
// import 'video.js/dist/video-js.css'
import videojs from 'video.js'
import 'videojs-contrib-hls'
export default {
    name: 'video',
    components: {
        
    },
    data () {
        return {
           msg: 'hello',
           videoUrl: 'http://ivi.bupt.edu.cn/hls/cctv3hd.m3u8'
        }
    },
    mounted () {
        var player = videojs('example-video', {}, function () {
            this.play()
        })
    },
    methods: {
        
    }
}
</script>
<style>

</style>
