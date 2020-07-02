<template>
  <div class="video">
    <cvue-video 
      :forbidProgress="true" 
      :currTime="0"
      :isControls="true"
      videoSrc="http://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8"
      :isVideojs="true"></cvue-video>
  </div>
</template>

<script>
import cvueVideo from '@/components/cvue-video'
var player = null
var playerArr = []
export default {
  name: 'video',
  components: {
      cvueVideo
  },
  props: {
  },
  data () {
    return {
    }
  },
  mounted () {
    
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
