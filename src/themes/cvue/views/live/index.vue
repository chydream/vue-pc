<template>
  <div>
    <video autoplay playsinline ref="videoRtc"></video>
  </div>
</template>
<script>
/* eslint-disable*/
export default {
  name: '',
  mounted () {
    var aliWebrtc = new AliRtcEngine()
    aliWebrtc.startPreview(this.$refs.videoRtc).then(() => {
      console.log('success')
    }).catch((error) => {
      console.log(error)
    })
  }
}
</script>
<style scoped>
@import url('../../../../../static/ali/index.css');
</style>
