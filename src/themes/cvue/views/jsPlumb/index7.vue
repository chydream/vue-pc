<template>
  <div class="show-info">
    <h2>example1 基本例子 无限制</h2>
    <div class="test test1">
      <vueCropper
        ref="cropper"
        :img="option.img"
        :outputSize="option.size"
        :outputType="option.outputType"
        :info="true"
        :full="option.full"
        :canMove="option.canMove"
        :canMoveBox="option.canMoveBox"
        :fixedBox="option.fixedBox"
        :original="option.original"
        :autoCrop="option.autoCrop"
        :autoCropWidth="option.autoCropWidth"
        :autoCropHeight="option.autoCropHeight"
        :centerBox="option.centerBox"
        :high="option.high"
        :infoTrue="option.infoTrue"
        @realTime="realTime"
        @imgLoad="imgLoad"
        @cropMoving="cropMoving"
        :enlarge="option.enlarge"
      ></vueCropper>
    </div>
    <div class="test-button">
      <button @click="changeImg" class="btn">changeImg</button>
      <label class="btn" for="uploads">upload</label>
      <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
      <button @click="startCrop" v-if="!crap" class="btn">start</button>
      <button @click="stopCrop" v-else class="btn">stop</button>
      <button @click="clearCrop" class="btn">clear</button>
      <button @click="refreshCrop" class="btn">refresh</button>
      <button @click="changeScale(1)" class="btn">+</button>
      <button @click="changeScale(-1)" class="btn">-</button>
      <button @click="rotateLeft" class="btn">rotateLeft</button>
      <button @click="rotateRight" class="btn">rotateRight</button>
      <button @click="finish('base64')" class="btn">preview(base64)</button>
      <button @click="finish('blob')" class="btn">preview(blob)</button>
      <a @click="down('base64')" class="btn">download(base64)</a>
      <a @click="down('blob')" class="btn">download(blob)</a>
      <a :href="downImg" download="demo.png" ref="downloadDom"></a>
    </div>

    <p>截图框大小</p>
    <div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden',
        'margin': '5px'}">
      <div :style="previews.div">
        <img :src="previews.url" :style="previews.img">
      </div>
    </div>
    
    <p>中等大小</p>
    <div :style="previewStyle1"> 
      <div :style="previews.div">
        <img :src="previews.url" :style="previews.img">
      </div>
    </div>

    <p>迷你大小</p>
    <div :style="previewStyle2"> 
      <div :style="previews.div">
        <img :src="previews.url" :style="previews.img">
      </div>
    </div>

    <div style="display:block; width: 100%;">
      <label class="c-item">
        <span>上传图片是否显示原始宽高 (针对大图 可以铺满)</span>
        <input type="checkbox" v-model="option.original">
        <span>original: {{ option.original}}</span>
      </label>
      <label class="c-item">
        <span>是否根据dpr生成适合屏幕的高清图片</span>
        <input type="checkbox" v-model="option.high">
        <span>high: {{ option.high}}</span>
      </label>
      <label class="c-item">
        <span>是否输出原图比例的截图</span>
        <input type="checkbox" v-model="option.full">
        <span>full: {{ option.full}}</span>
      </label>
      <label class="c-item">
        <span>截图信息展示是否是真实的输出宽高</span>
        <input type="checkbox" v-model="option.infoTrue">
        <span>infoTrue: {{ option.infoTrue}}</span>							
      </label>
      <label class="c-item">
        <span>能否拖动图片</span>
        <input type="checkbox" v-model="option.canMove">
        <span>canMove: {{ option.canMove}}</span>
      </label>
      <label class="c-item">
        <span>能否拖动截图框</span>
        <input type="checkbox" v-model="option.canMoveBox">
        <span>canMoveBox: {{ option.canMoveBox}}</span>
      </label>
      <label class="c-item">
        <span>截图框固定大小</span>
        <input type="checkbox" v-model="option.fixedBox">
        <span>fixedBox: {{ option.fixedBox}}</span>
      </label>
      <label class="c-item">
        <span>是否自动生成截图框</span>
        <input type="checkbox" v-model="option.autoCrop">
        <span>autoCrop: {{ option.autoCrop}}</span>
      </label>
      <label class="c-item">
        <span>截图框是否限制在图片里(只有在自动生成截图框时才能生效)</span>
        <input type="checkbox" v-model="option.centerBox">
        <span>centerBox: {{ option.centerBox}}</span>
      </label>
      <label class="c-item">
        <span>是否按照截图框比例输出 默认为1 </span>
        <input type="number" v-model="option.enlarge">
      </label>
      <p>输出图片格式</p>
      <label class="c-item">
        <label>jpg  <input type="radio" name="type" value="jpeg" v-model="option.outputType"></label>
        <label>png  <input type="radio" name="type" value="png" v-model="option.outputType"></label>
        <label>webp <input type="radio" name="type" value="webp" v-model="option.outputType"></label>
      </label>
    </div>
    <codes>
      <div slot="body">{{ code1 }}</div>
    </codes>
  </div>
</template>
<script>
import { VueCropper } from 'vue-cropper' 
import codes from './code'
export default {
  name: '',
  components: {
    VueCropper,
    codes
  },
  data () {
    return {
      code1: '',
      option: {
        img: '/static/img/2.jpg', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        full: false, // 输出原图比例截图 props名full
        outputType: 'png', // 裁剪生成图片的格式
        canMove: true, // 能否拖动图片
        canMoveBox: true, // 能否拖动截图框
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 200, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true, // 截图框固定大小
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      }
    }
  },
  methods: {
    realTime () {},
    imgLoad () {},
    cropMoving () {},
    changeImg () {},
    crap () {},
    stopCrop () {},
    clearCrop () {},
    refreshCrop () {},
    rotateLeft () {},
    rotateRight () {},
    downImg () {},
    previews () {},
    previewStyle1 () {},
    previewStyle2 () {}
  }
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
}

.content {
  margin: auto;
  max-width: 1200px;
  margin-bottom: 100px;
}

.test-button {
  display: flex;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #c0ccda;
  color: #1f2d3d;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 20px 10px 0px 0px;
  padding: 9px 15px;
  font-size: 14px;
  border-radius: 4px;
  color: #fff;
  background-color: #50bfff;
  border-color: #50bfff;
  transition: all 0.2s ease;
  text-decoration: none;
  user-select: none;
}

.des {
  line-height: 30px;
}

code.language-html {
  padding: 10px 20px;
  margin: 10px 0px;
  display: block;
  background-color: #333;
  color: #fff;
  overflow-x: auto;
  font-family: Consolas, Monaco, Droid, Sans, Mono, Source, Code, Pro, Menlo,
    Lucida, Sans, Type, Writer, Ubuntu, Mono;
  border-radius: 5px;
  white-space: pre;
}

.show-info {
  margin-bottom: 50px;
}

.show-info h2 {
  line-height: 50px;
}

/*.title, .title:hover, .title-focus, .title:visited {
		color: black;
	}*/

.title {
  display: block;
  text-decoration: none;
  text-align: center;
  line-height: 1.5;
  margin: 20px 0px;
  background-image: -webkit-linear-gradient(
    left,
    #3498db,
    #f47920 10%,
    #d71345 20%,
    #f7acbc 30%,
    #ffd400 40%,
    #3498db 50%,
    #f47920 60%,
    #d71345 70%,
    #f7acbc 80%,
    #ffd400 90%,
    #3498db
  );
  color: transparent;
  -webkit-background-clip: text;
  background-size: 200% 100%;
  animation: slide 5s infinite linear;
  font-size: 40px;
}

.test {
  height: 500px;
}

.model {
  position: fixed;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
}

.model-show {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  text-align: center;
}

.model img {
  display: block;
  margin: auto;
  max-width: 80%;
  width: auto;
  user-select: none;
  background-position: 0px 0px, 10px 10px;
  background-size: 20px 20px;
  background-image: linear-gradient(
      45deg,
      #eee 25%,
      transparent 25%,
      transparent 75%,
      #eee 75%,
      #eee 100%
    ),
    linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
}

.c-item {
  display: block;
  padding: 10px 0;
  user-select: none;
}

.pre {
	display: flex;
  flex-wrap: wrap;
}

.pre-item {
	padding-right: 20px;
}

@keyframes slide {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}

@media screen and (max-width: 1000px) {
  .content {
    max-width: 90%;
    margin: auto;
  }

  .test {
    height: 400px;
  }
}
</style>
