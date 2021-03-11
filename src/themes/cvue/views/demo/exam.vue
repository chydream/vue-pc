<template>
  <div class="exam-wrap" id="examWrap">
    <div class="exam-index" id="examIndex">
      <div class="exam-body" id="examBody">
        <div class="exam-left">
          <div class="exam-left-top">
            <p><i class="icon-clock"></i></p>
            <div class="exam-time">
              <p>剩余</p>
              <p class="left-time">54分37秒</p>
            </div>
            <p><a title="" href="javascript:void(0)" class="sub-exam">我要交卷</a></p>
          </div>
          <div class="exam-left-main">
            <div class="card-head">答题卡<i class="icon-down"></i></div>
            <div class="card-body">
              <ul class="list-index">
                <li class="current" @click="scrollPosition(0, 1)">1</li>
                <li @click="scrollPosition(0, 2)">2</li>
                <li @click="scrollPosition(0, 3)">3</li>
                <li @click="scrollPosition(0, 4)">4</li>
                <li @click="scrollPosition(1, 1)">5</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
                <li>9</li>
                <li>10</li>
                <li>11</li>
                <li>12</li>
                <li>13</li>
                <li>14</li>
                <li>15</li>
                <li>16</li>
                <li>17</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="exam-right" id="examRight">
          <div class="exam-right-top">
            <div class="exam-title">
              <span>暴富之路</span>
              <input value="暴富之路" type="hidden" name="paperRecord.paperName">
            </div>
          </div>
          <div class="exam-right-main">
            <div class="ques-nav">
              <ul class="list-ques">
                <li v-for="(item, index) in quesArr" :key="index" :class="{'active': activeIndex === index}" @click="changeActive(index)">
                  <a href="javascript:void(0)">{{item}}</a>
                </li>
                <!-- <li class="active"><a href="javascript:void(0)">多项选择题</a></li>
                <li><a href="javascript:void(0)">判断题</a></li>
                <li><a href="javascript:void(0)">主观题</a></li>
                <li><a href="javascript:void(0)">天空题</a></li> -->
              </ul>
            </div>
            <div class="clear"></div>
            <div class="ques-content">
              <div class="item-tab" v-if="activeIndex === 0">
                <div class="ques-tip">
                  每题有且只有1个正确答案[ 每小题5分 ]
                </div>
                <div class="ques-body">
                  <ul class="list-ques-item">
                    <li>
                      <h3 id="item1"><em>1</em><span>单选题20210222</span></h3>
                      <div class="list-select">
                        <ol>
                          <li><span>A、</span><em>123</em></li>
                          <li><span>B、</span><em>1</em></li>
                          <li><span>C、</span><em>123</em></li>
                          <li><span>D、</span><em>1</em></li>
                        </ol>
                      </div>
                      <div class="ques-choose">
                        <el-radio-group v-model="radio">
                          <el-radio :label="1">A</el-radio>
                          <el-radio :label="2">B</el-radio>
                          <el-radio :label="3">C</el-radio>
                          <el-radio :label="4">D</el-radio>
                        </el-radio-group>
                      </div>
                    </li>
                    <li>
                      <h3 id="item2"><em>2</em><span>单选题20210222</span></h3>
                      <div class="list-select">
                        <ol>
                          <li><span>A、</span><em>123</em></li>
                          <li><span>B、</span><em>1</em></li>
                          <li><span>C、</span><em>123</em></li>
                          <li><span>D、</span><em>1</em></li>
                        </ol>
                      </div>
                      <div class="ques-choose">
                        <el-radio-group v-model="radio">
                          <el-radio :label="1">A</el-radio>
                          <el-radio :label="2">B</el-radio>
                          <el-radio :label="3">C</el-radio>
                          <el-radio :label="4">D</el-radio>
                        </el-radio-group>
                      </div>
                    </li>
                    <li>
                      <h3 id="item3"><em>3</em><span>单选题20210222</span></h3>
                      <div class="list-select">
                        <ol>
                          <li><span>A、</span><em>123</em></li>
                          <li><span>B、</span><em>1</em></li>
                          <li><span>C、</span><em>123</em></li>
                          <li><span>D、</span><em>1</em></li>
                        </ol>
                      </div>
                      <div class="ques-choose">
                        <el-radio-group v-model="radio">
                          <el-radio :label="1">A</el-radio>
                          <el-radio :label="2">B</el-radio>
                          <el-radio :label="3">C</el-radio>
                          <el-radio :label="4">D</el-radio>
                        </el-radio-group>
                      </div>
                    </li>
                    <li>
                      <h3 id="item3"><em>4</em><span>单选题20210222</span></h3>
                      <div class="list-select">
                        <ol>
                          <li><span>A、</span><em>123</em></li>
                          <li><span>B、</span><em>1</em></li>
                          <li><span>C、</span><em>123</em></li>
                          <li><span>D、</span><em>1</em></li>
                        </ol>
                      </div>
                      <div class="ques-choose">
                        <el-radio-group v-model="radio">
                          <el-radio :label="1">A</el-radio>
                          <el-radio :label="2">B</el-radio>
                          <el-radio :label="3">C</el-radio>
                          <el-radio :label="4">D</el-radio>
                        </el-radio-group>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="page-bar">
                  <button class="next-btn">下一部分</button>
                </div>
              </div>
              <div class="item-tab" v-if="activeIndex === 1">
                <div class="ques-tip">
                  每题有且只有1个正确答案[ 每小题5分 ]
                </div>
                <div class="ques-body">
                  <ul class="list-ques-item">
                    <li>
                      <h3><em>1</em><span>单选题20210222</span></h3>
                      <div class="list-select">
                        <ol>
                          <li><span>A、</span><em>123</em></li>
                          <li><span>B、</span><em>1</em></li>
                          <li><span>C、</span><em>123</em></li>
                          <li><span>D、</span><em>1</em></li>
                        </ol>
                      </div>
                      <div class="ques-choose">
                        <el-checkbox-group v-model="checkList">
                          <el-checkbox label="复选框 A"></el-checkbox>
                          <el-checkbox label="复选框 B"></el-checkbox>
                          <el-checkbox label="复选框 C"></el-checkbox>
                          <el-checkbox label="禁用" disabled></el-checkbox>
                          <el-checkbox label="选中且禁用" disabled></el-checkbox>
                        </el-checkbox-group>
                      </div>
                    </li>
                    <li>
                      <h3><em>1</em><span>单选题20210222</span></h3>
                      <div class="list-select">
                        <ol>
                          <li><span>A、</span><em>123</em></li>
                          <li><span>B、</span><em>1</em></li>
                          <li><span>C、</span><em>123</em></li>
                          <li><span>D、</span><em>1</em></li>
                        </ol>
                      </div>
                      <div class="ques-choose">
                        <el-checkbox-group v-model="checkList">
                          <el-checkbox label="复选框 A"></el-checkbox>
                          <el-checkbox label="复选框 B"></el-checkbox>
                          <el-checkbox label="复选框 C"></el-checkbox>
                          <el-checkbox label="禁用" disabled></el-checkbox>
                          <el-checkbox label="选中且禁用" disabled></el-checkbox>
                        </el-checkbox-group>
                      </div>
                    </li>
                    <li>
                      <h3><em>1</em><span>单选题20210222</span></h3>
                      <div class="list-select">
                        <ol>
                          <li><span>A、</span><em>123</em></li>
                          <li><span>B、</span><em>1</em></li>
                          <li><span>C、</span><em>123</em></li>
                          <li><span>D、</span><em>1</em></li>
                        </ol>
                      </div>
                      <div class="ques-choose">
                        <el-checkbox-group v-model="checkList">
                          <el-checkbox label="复选框 A"></el-checkbox>
                          <el-checkbox label="复选框 B"></el-checkbox>
                          <el-checkbox label="复选框 C"></el-checkbox>
                          <el-checkbox label="禁用" disabled></el-checkbox>
                          <el-checkbox label="选中且禁用" disabled></el-checkbox>
                        </el-checkbox-group>
                      </div>
                    </li>
                    <li>
                      <h3><em>1</em><span>单选题20210222</span></h3>
                      <div class="list-select">
                        <ol>
                          <li><span>A、</span><em>123</em></li>
                          <li><span>B、</span><em>1</em></li>
                          <li><span>C、</span><em>123</em></li>
                          <li><span>D、</span><em>1</em></li>
                        </ol>
                      </div>
                      <div class="ques-choose">
                        <el-checkbox-group v-model="checkList">
                          <el-checkbox label="复选框 A"></el-checkbox>
                          <el-checkbox label="复选框 B"></el-checkbox>
                          <el-checkbox label="复选框 C"></el-checkbox>
                          <el-checkbox label="禁用" disabled></el-checkbox>
                          <el-checkbox label="选中且禁用" disabled></el-checkbox>
                        </el-checkbox-group>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="page-bar">
                  <button class="next-btn">下一部分</button>
                </div>
              </div>
              <div class="item-tab" v-if="activeIndex === 2">
                <div class="ques-tip">
                  每题有且只有1个正确答案[ 每小题5分 ]
                </div>
                <div class="ques-body">
                  <ul class="list-ques-item">
                    <li>
                      <h3 class="mb20"><em>1</em><span>单选题20210222</span></h3>
                      <div class="ques-choose">
                        <el-radio-group v-model="radio">
                          <el-radio :label="1">A</el-radio>
                          <el-radio :label="2">B</el-radio>
                          <el-radio :label="3">C</el-radio>
                          <el-radio :label="4">D</el-radio>
                        </el-radio-group>
                      </div>
                    </li>
                    <li>
                      <h3 class="mb20"><em>1</em><span>单选题20210222</span></h3>
                      <div class="ques-choose">
                        <el-radio-group v-model="radio">
                          <el-radio :label="1">A</el-radio>
                          <el-radio :label="2">B</el-radio>
                          <el-radio :label="3">C</el-radio>
                          <el-radio :label="4">D</el-radio>
                        </el-radio-group>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="page-bar">
                  <button class="next-btn">下一部分</button>
                </div>
              </div>
              <div class="item-tab" v-if="activeIndex === 3">
                <div class="ques-tip">
                  每题有且只有1个正确答案[ 每小题5分 ]
                </div>
                <div class="ques-body">
                  <ul class="list-ques-item">
                    <li>
                      <h3><em>1</em><span>单选题20210222</span></h3>
                      <div class="area-wrap">
                        <el-input type="textarea" placeholder="请输入内容" v-model="textarea" maxlength="300" show-word-limit></el-input>
                      </div>
                      <p class="area-tip">还可以输入20字</p>
                    </li>
                    <li>
                      <h3><em>1</em><span>单选题20210222</span></h3>
                      <div class="area-wrap">
                        <el-input type="textarea" placeholder="请输入内容" v-model="textarea" maxlength="300" show-word-limit></el-input>
                      </div>
                      <p class="area-tip">还可以输入20字</p>
                    </li>
                  </ul>
                </div>
                <div class="page-bar">
                  <button class="next-btn">下一部分</button>
                </div>
              </div>
              <div class="item-tab" v-if="activeIndex === 4">
                <div class="ques-tip">
                  每题有且只有1个正确答案[ 每小题5分 ]
                </div>
                <div class="ques-body">
                  <ul class="list-ques-item">
                    <li>
                      <h3><em>1</em><span>单选题20210222</span></h3>
                      <div class="input-wrap">
                        <span>答案1</span>
                        <input type="text" placeholder="" class="input-txt">
                      </div>
                      <div class="input-wrap">
                        <span>答案1</span>
                        <input type="text" placeholder="" class="input-txt">
                      </div>
                      <div class="input-wrap">
                        <span>答案1</span>
                        <input type="text" placeholder="" class="input-txt">
                      </div>
                    </li>
                    <li>
                      <h3><em>1</em><span>单选题20210222</span></h3>
                      <div class="input-wrap">
                        <span>答案1</span>
                        <input type="text" placeholder="" class="input-txt">
                      </div>
                      <div class="input-wrap">
                        <span>答案1</span>
                        <input type="text" placeholder="" class="input-txt">
                      </div>
                      <div class="input-wrap">
                        <span>答案1</span>
                        <input type="text" placeholder="" class="input-txt">
                      </div>
                    </li>
                    <li>
                      <h3><em>1</em><span>化学指示剂能验证灭菌的过程（即是否达到灭菌条件），但是无法验证__的效果。常见灭菌用化学指示剂有等。</span></h3>
                      <div class="input-wrap">
                        <span>答案1</span>
                        <input type="text" placeholder="" class="input-txt">
                      </div>
                      <div class="input-wrap">
                        <span>答案1</span>
                        <input type="text" placeholder="" class="input-txt">
                      </div>
                      <div class="input-wrap">
                        <span>答案1</span>
                        <input type="text" placeholder="" class="input-txt">
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="page-bar">
                  <button class="next-btn">下一部分</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: 'exam',
  components: {},
  data () {
    return {
      activeIndex: 0,
      quesArr: ['单项选择题', '多项选择题', '判断题', '主观题', '天空题'],
      radio: '',
      checkList: [],
      textarea: ''
    }
  },
  mounted () {

  },
  methods: {
    changeActive (i) {
      this.activeIndex = i
    },
    scrollPosition (type,index) {
      this.activeIndex = type
      if (type === 0) {
        document.querySelector("#examWrap").scrollTop = 161 + 280 * (index - 1)
      }
      if (type === 1) {
        document.querySelector("#examWrap").scrollTop = 161 + 280 * (index - 1)
      }
      
    }
  }
}
</script>
<style lang="scss">
.exam-wrap{
  width: 100%;
  height: 100%;
  overflow: auto;
}
.exam-index{
  width: 100%;
  height: auto;
  min-height: 100%;
  background: #f3f5f7;
  padding-top: 20px;
  em,i{
    font-style: normal;
  }
  .mb20{
    margin-bottom: 20px;
  }
  .exam-body{
    position: relative;
    padding-left: 235px;
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    box-sizing: border-box;
  }
  .clear{
    clear: both;
  }
  .exam-left{
    position: fixed;
    left: 50%;
    margin-left: -600px;
    top: 20px;
    bottom: 0;
    width: 208px;
  }
  .exam-left-top{
    border: 1px solid #eee;
    background: #fff;
    padding: 20px 15px;
    text-align: center;
    box-shadow: 0 0 8px rgba(0,0,0,0.04);
    border-radius: 5px;
  }
  .icon-clock{
    width: 40px;
    height: 40px;
    display: inline-block;
    // background: url(../../assets/img/icon_exam.png) no-repeat 0 0;
    background-position: -294px -181px;
  }
  .exam-time{
    margin-top: 15px;
  }
  .exam-time p{
    color: #aaa;
    font-size: 14px;
    height: 22px;
    line-height: 22px;
  }
  .exam-time p.left-time{
    color: #31a4ff;
    margin-top: 5px;
    font-size: 18px;
    vertical-align: middle;
  }
  .sub-exam{
    background: #31a4ff;
    color: #fff;
    width: 100%;
    height: 32px;
    display: inline-block;
    border-radius: 30px;
    line-height: 32px;
    margin-top: 20px;
  }
  .exam-left-main{
    margin-top: 20px;
    background: #fff;
  }
  .card-head{
    background-color: #31a4ff;
    padding: 8px 0;
    text-align: center;
    position: relative;
    font-size: 18px;
    color: #fff;
    border-radius: 4px 4px 0 0;
  }
  .icon-down{
    display: inline-block;
    height: 16px;
    width: 16px;
    vertical-align: middle;
    // background: url(../../assets/img/icon_exam.png) no-repeat 0 0;
    background-position: -130px -3px;
    margin-left: 5px;
    margin-top: -5px;
  }
  .list-index{
    overflow: hidden;
  }
  .list-index li{
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    width: 25%;
    font-size: 16px;
    line-height: 36px;
    color: #999;
    text-align: center;
    float: left;
    cursor: pointer;
  }

  .list-index li.current{
    color: #31a4ff;
    background-color: #ecf6fd;
  }

  .exam-right-top{
    margin-bottom: 10px;
  }
  .exam-title{
    border-bottom: 1px solid #dbdbdb;
    color: #222;
    font-size: 20px;
    line-height: 50px;
  }
  .ques-nav{
    border-bottom: 1px solid #d2d2d2;
    background-color: #f3f5f7;
    padding: 0 25px;
    min-height: 40px;
    line-height: 40px;
  }
  .list-ques{
    clear: both;
    // overflow: hidden;
  }
  .list-ques li{
    float: left;
    display: inline-block;
  }
  .list-ques li a{
    display: inline-block;
    color: #4e4e4e;
    padding: 0 10px;
    text-align: center;
    line-height: 39px;
    border-bottom: 1px solid #f3f5f7;
    // background: #f3f5f7;
    margin-right: 9px;
    font-weight: bold;
  }
  .list-ques li.active a{
    border: 1px solid;
    border-color: #31a4ff #D2D2D2 #f3f5f7 #D2D2D2;
    position: relative;
    color: #31a4ff;
    cursor: text;
    line-height: 39px;
    border-bottom: 1px solid #f3f5f7;
    background: #f3f5f7;
  }
  .ques-tip{
    padding:10px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    box-sizing: content-box;
  }
  .list-ques-item>li{
    margin-bottom: 15px;
    padding: 8px 8px 17px;
    border: 1px solid #eee;
    background: #fff;
    border-radius: 5px;
  }
  .list-ques-item>li:hover {
    border: 1px solid #c8e5fc;
    background: #eef6fd;
  }
  .list-ques-item>li>h3{
    line-height: 28px;
    color: #333;
    font-size: 16px;
    font-weight: normal;
    padding: 8px 17px 0;
  }
  .list-ques-item>li>h3>em{
    min-width: 16px;
    height: 20px;
    padding: 0 3px;
    display: inline-block;
    background-color: #31a4ff;
    color: #fff;
    font-size: 16px;
    text-align: center;
    line-height: 20px;
    margin-right: 5px;
    box-sizing: content-box;
    font-family: monospace;
  }
  .list-select{
    padding: 10px 24px 10px;
  }
  .list-select>ol>li {
    padding: 5px 0;
    color: #999;
    font: 14px/30px "Arial";
  }
  .ques-choose{
    margin: 0 20px;
    padding: 10px 0 3px;
    border-top: 1px dashed #aaa;
  }
  .page-bar{
    padding: 15px 0;
    text-align: right;
  }
  .next-btn{
    background: #31a4ff;
    color: #fff;
    width: 60px;
    border-radius: 5px;
    border: 1px solid #ddd;
    font: 14px/30px 'Arial';
    display: inline-block;
    height: 30px;
    line-height: 30px;
    padding: 2px 25px;
    text-align: center;
    box-sizing: content-box;
    cursor: pointer;
  }
  .next-btn:focus{
    border: 1px solid #ddd;
    outline: none;
  }
  .area-wrap{
    margin: 12px 30px;
  }
  .area-wrap .el-textarea__inner{
    min-height: 120px!important;
  }
  .area-tip{
    text-indent: 30px;
    color: #666;
    margin-bottom: 3px;
  }
  .input-wrap{
    color: #666;
    margin-top: 15px;
    padding: 0 16px;
    font-size: 14px;
  }
  .input-txt{
    height: 26px;
    width: 92%;
    line-height: 26px;
    border: 1px solid #ddd;
    padding: 0 8px;
    color: #666;
    margin-left: 5px;
  }
  .under-line{
    display: inline-block;
    height: 17px;
    width: 50px;
    border-bottom: 1px solid #333;
    vertical-align: middle;
  }
}
</style>
