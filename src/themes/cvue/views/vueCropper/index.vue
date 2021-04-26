<template>
  <div class="show-info">
    <cvue-dialog
      :dialogVisible="dialogVisible"
      :title="title"
      dialogWidth="640px"
      @handleOpen="getDetail"
      @closeDialog="closeDialog"
      @confirmDialog="confirmDialog"
      @handleClose="handleClose">
      <div class="dialog-body" slot="dialogBody">
    <div class="model" v-show="model">
			<div class="model-show" @click="model = false">
				<img :src="modelSrc" alt="" @click="model = false">
			</div>
		</div>
    <div class="test">
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
      <!-- <label class="btn" for="uploads">upload</label>
      <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)"> -->
      
      <!-- <button @click="changeImg" class="btn">changeImg</button>
      <button @click="startCrop" v-if="!crap" class="btn">start</button>
      <button @click="stopCrop" v-else class="btn">stop</button>
      <button @click="clearCrop" class="btn">clear</button>
      <button @click="refreshCrop" class="btn">refresh</button>
      <button @click="changeScale(1)" class="btn">+</button>
      <button @click="changeScale(-1)" class="btn">-</button>
      <button @click="rotateLeft" class="btn">rotateLeft</button>
      <button @click="rotateRight" class="btn">rotateRight</button> -->
     
      <!-- <button @click="finish('base64')" class="btn">preview(base64)</button>
      <button @click="finish('blob')" class="btn">preview(blob)</button> -->
      <!-- <button @click="() => option.img = ''" class="btn">清除图片</button> -->
      <!-- <a @click="down('base64')" class="btn">download(base64)</a>
      <a @click="down('blob')" class="btn">download(blob)</a>
      <a :href="downImg" download="demo.png" ref="downloadDom"></a> -->
    </div>
    <div class="pre">
      <!-- <section class="pre-item">
        <p>固定大小 固定宽度100px</p>
        <section v-html="previews.html"></section>
      </section> -->

      <section class="pre-item">
        <p>截图框大小</p>
        <div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden',
          'margin': '5px'}">
          <div :style="previews.div">
            <img :src="previews.url" :style="previews.img">
          </div>
        </div>
      </section>

      <!-- <section class="pre-item">
        <p>中等大小</p>
        <div :style="previewStyle1"> 
          <div :style="previews.div">
            <img :src="previews.url" :style="previews.img">
          </div>
        </div>
      </section>

      <section class="pre-item">
        <p>迷你大小</p>
        <div :style="previewStyle2"> 
          <div :style="previews.div">
            <img :src="previews.url" :style="previews.img">
          </div>
        </div>
      </section>

      <section class="pre-item" title="zoom: (100 / previews.w)">
        <p>固定为100宽度</p>
        <div :style="previewStyle3"> 
          <div :style="previews.div">
            <img :src="previews.url" :style="previews.img">
          </div>
        </div>
      </section>

      <section class="pre-item" title="zoom: (100 / previews.h)">
        <p>固定为100高度</p>
        <div :style="previewStyle4">
          <div :style="previews.div">
            <img :src="previews.url" :style="previews.img">
          </div>
        </div>
      </section> -->
    </div>
     </div>
    </cvue-dialog>
  </div>
</template>
<script>
/* eslint-disable*/
import cvueDialog from '@/components/cvue-dialog'
import { VueCropper } from 'vue-cropper' 
import codes from './code'
export default {
  name: '',
  components: {
    VueCropper,
    codes,
    cvueDialog
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    title () {
      var title = ''
      if (this.$parent.actionType == 'add') {
        title = '新增'
      } else {
        title = '编辑'
      }
      return title
    }
  },
  data () {
    return {
      imageUrl: '',
      downImg: '',
      code1: '',
      previews: {},
      previewStyle1: '',
      previewStyle2: '',
      previewStyle3: '',
      previewStyle4: '',
      model: false,
      modelSrc: "",
      crap: false,
      option: {
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        full: false, // 输出原图比例截图 props名full
        outputType: 'png', // 裁剪生成图片的格式
        canMove: true, // 能否拖动图片
        canMoveBox: true, // 能否拖动截图框
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 180, // 默认生成截图框宽度
        autoCropHeight: 180, // 默认生成截图框高度
        fixedBox: true, // 截图框固定大小
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        high: false,
        cropData: {},
      }
    }
  },
  mounted () {
    this.option.img = this.$parent.cropperImg
  },
  methods: {
    // 触发事件
    handleClose () {
      this.$emit('handleClose')
    },
    closeDialog () {
      this.$emit('closeDialog')
    },
    confirmDialog () {
      this.$refs.cropper.getCropBlob(data => {
        let file = new File([data], '图片.png', { type: 'image/png', lastModified: Date.now() });
        file.uid = Date.now();
        var fileObj = file
        var formData = new FormData()
        var params = {
          filename: ''
        }
        formData.append('MS_HttpContext', fileObj)
        formData.append('data', JSON.stringify(params))
        console.log(file)
        this.$parent.imageUrl = this.previews.url
        this.$emit('confirmDialog')
        // this.$store.dispatch('payroll/ExcelFilePreview', formData).then(res => {
        //   console.log(res)
        //   this.$emit('confirmDialog')
        // })
      })
    },
    getDetail () {
    },
    // 实时预览函数
    realTime(data) {
      // console.log(data)
      var previews = data;
      var h = 0.5;
      var w = 0.2;

      this.previewStyle1 = {
        width: previews.w + "px",
        height: previews.h + "px",
        overflow: "hidden",
        margin: "0",
        zoom: h
      };

      this.previewStyle2 = {
        width: previews.w + "px",
        height: previews.h + "px",
        overflow: "hidden",
        margin: "0",
        zoom: w
      };

      this.previewStyle3 = {
        width: previews.w + "px",
        height: previews.h + "px",
        overflow: "hidden",
        margin: "0",
        zoom: (100 / previews.w)
      };

      this.previewStyle4 = {
        width: previews.w + "px",
        height: previews.h + "px",
        overflow: "hidden",
        margin: "0",
        zoom: (100 / previews.h)        
      };

			this.previews = data;
    },
    imgLoad(msg) {
      // console.log(msg);
    },
    cropMoving(data) {
      this.option.cropData = data;
    },
    finish(type) {
      // 输出
      // var test = window.open('about:blank')
      // test.document.body.innerHTML = '图片生成中..'
      if (type === "blob") {
        this.$refs.cropper.getCropBlob(data => {
          var img = window.URL.createObjectURL(data);
          this.model = true;
          this.modelSrc = img;
        });
      } else {
        this.$refs.cropper.getCropData(data => {
          this.model = true;
          this.modelSrc = data;
        });
      }
    },
        // 确定裁剪
    cropperFinish(type) {
      if (type === 'Blob') {
        this.$refs.cropper.getCropBlob((data) => {
          let file = data;
          file.name = this.file.name;
          this.$emit('cropperFinish', file, data);
        });

      } else {
        this.$refs.cropper.getCropData(data => {

          // 将剪裁后base64的图片转化为file格式
          let file = this.convertBase64UrlToBlob(data);
          file.name = this.file.name;

          this.$emit('cropperFinish', file, data);
        });
      }

    },
    uploadImg(e, num) {
      //上传图片
      // this.option.img
      var file = e.target.files[0];
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
        return false;
      }
      var reader = new FileReader();
      reader.onload = e => {
        let data;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        if (num === 1) {
          this.option.img = data;
        } else if (num === 2) {
          this.example2.img = data;
        }
        this.$refs.uploadImg.value = ''
      };
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file);
    },
    down(type) {
      // event.preventDefault()
      // 输出
      if (type === "blob") {
        this.$refs.cropper.getCropBlob(data => {
          this.downImg = window.URL.createObjectURL(data);
          if (window.navigator.msSaveBlob) {
            var blobObject = new Blob([data]);
            window.navigator.msSaveBlob(blobObject, "demo.png");
          } else {
            this.$nextTick(() => {
              this.$refs.downloadDom.click();
            });
          }
        });
      } else {
        this.$refs.cropper.getCropData(data => {
          this.downImg = data;
          if (window.navigator.msSaveBlob) {
            var blobObject = new Blob([data]);
            window.navigator.msSaveBlob(blobObject, "demo.png");
          } else {
            this.$nextTick(() => {
              this.$refs.downloadDom.click();
            });
          }
        });
      }
    }
  }
}
</script>
<style>
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

.show-info {
  margin-bottom: 50px;
}

.show-info h2 {
  line-height: 50px;
}

.test {
  height: 400px;
  width: 600px;
}

.model {
  position: fixed;
  z-index: 10000;
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
.pre {
	display: flex;
  flex-wrap: wrap;
}
.pre-item {
	padding-right: 20px;
}
</style>
