<template>
    <div>
        <figure>
            <figcaption>视频播放器</figcaption>
            <div class="player">
                <video width="500px" height="500px" ref="videoPlayer" :src="shareVideoLink"></video>
                <div class="controls">
                    <!-- 播放/暂停 -->
                    <a href="javascript:;" class="switch fa fa-play"></a>
                    <!-- 全屏 -->
                    <a href="javascript:;" class="expand fa fa-expand"></a>
                    <!-- 进度条 -->
                    <div class="progress">
                        <div class="loaded"></div>
                        <div class="line"></div>
                        <div class="bar"></div>
                    </div>
                    <!-- 时间 -->
                    <div class="timer">
                        <span class="current">00:00:00</span> /  <span class="total">00:00:00</span>
                    </div>
                    <!-- 声音 -->
                </div>
            </div>
        </figure>
    </div>
</template>
<script>
export default {
    name: 'video',
    data () {
        return {
            shareVideoLink: '/static/movie.mp4'
        }
    },
    props: {

    },
    mounted () {
        var self = this
        var video = document.querySelector('video')
        var isPlay = document.querySelector('.switch')
        var expand = document.querySelector('.expand')
        var progress = document.querySelector('.progress')
        var loaded = document.querySelector('.progress > .loaded')
        var currPlayTime = document.querySelector('.timer>.current')
        var totalTime = document.querySelector('.timer>.total')
        video.oncanplay = function () {
            this.style.display = 'block'
            totalTime.innerHTML = self.getFormatTime(this.duration)
        }
        isPlay.onclick = function () {
            if (video.paused) {
                video.play()
            } else {
                video.pause()
            }
            this.classList.toggle('fa-pause')
        }
        video.ontimeupdate = function () {
            var currTime = this.currentTime
            var duration = this.duration
            var pre = currTime / duration * 100 + '%'
            loaded.style.width = pre
            currPlayTime.innerHTML = self.getFormatTime(currTime)
        }
        progress.onclick = function (e) {
            var event = window.event || e
            video.currentTime = (event.offsetX / this.offsetWidth) * video.duration
        }
        expand.onclick = function () {
            video.webkitRequestFullScreen()
        }
        video.onended = function () {
            var that = this
            isPlay.classList.remove('fa-pause')
            isPlay.classList.add('fa-play')
            loaded.style.width = 0
            currPlayTime.innerHTML = self.getFormatTime()
            that.currTime = 0
        }
    },
    methods: {
        getFormatTime (time) {
            time = time || 0
            var h = parseInt(time / 3600)
            var m = parseInt(time % 3600 / 60)
            var s = parseInt(time % 60)
            h = h < 10 ? '0' + h : h
            m = m < 10 ? '0' + m : m
            s = s < 10 ? '0' + s : s
            return h + ':' + m + ':' + s
        }
    }
}
</script>
<style>
figcaption{
    font-size: 24px;
    text-align: center;
    margin: 20px;
}
.player{
    width: 720px;
    height: 360px;
    margin: 0 auto;
    background: #000 center/300px no-repeat;
    position: relative;
}
video{
    display: none;
    height: 100%;
    margin: 0 auto;
}
.controls{
    width: 720px;
    height: 40px;
    background-color: #2196F3;
    position: absolute;
    left: 0;
    bottom: -40px;
    z-index: 99;
    opacity: 0.7;
}
.player:hover .controls{
    opacity: 1;
}
.controls .switch{
    display:block;
    width: 20px;
    height: 20px;
    font-size: 20px;
    color: #fff;
    position: absolute;
    top: 11px;
    left: 11px;
}
.controls .switch:hover{
    color: blue;
}
.controls .expand{
    display:block;
    width: 20px;
    height: 20px;
    font-size: 20px;
    color: #fff;
    position: absolute;
    top: 11px;
    right: 11px;
}
.controls .expand:hover{
    color: blue;
}
.progress{
    width: 430px;
    height: 10px;
    border-radius: 3px;
    overflow: hidden;
    background-color: #555;
    cursor: pointer;
    position: absolute;
    top: 16px;
    left: 45px;
}
/*下载进度*/
.progress .loaded{
    width: 0px;
    height: 100%;
    background-color: blue;
}
/*播放进度*/
.progress .line{
    width: 0px;
    height: 100%;
    background-color: #fff;
    position: absolute;
    top: 0;
    left: 0;
}
.progress .bar {
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
}
.timer{
    height: 20px;
    line-height: 20px;
    position: absolute;
    left: 490px;
    top: 11px;
    color: #fff;
    font-size: 14px;
}
</style>
