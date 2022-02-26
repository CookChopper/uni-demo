<template>
  <view>
    <view class="scroll-view-container">
      <scroll-view scroll-y="true"  class="scroll-view-left" :style="{height:wh + 'px'}">
        <view class="scroll-left-item" v-for="(item,i) in cateList" :key="i" :class="[i === active ? 'active' : '']" @click="activeChanged(i)">
          {{item.cat_name}}
        </view>
      </scroll-view>
      <scroll-view scroll-y="true" class="scroll-view-right" :style="{height:wh + 'px'}" :scroll-top="scrollTop">
        <view class="scroll-right-item" v-for="(item,i) in cateLevel2" :key="i">
          <view class="scroll-right-title">
            /{{item.cat_name}}/
          </view>
          <view class="scroll-right-list" >
            <view class="scroll-list-box" v-for="(child,i2) in item.children" :key="i2" @click="gotoGoodsList(child)">
              <image :src="child.cat_icon" mode=""></image>
              <text>{{item.cat_name}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        wh: 0, // 屏幕可使用高度
        active: 0, // 一级分类激活索引
        cateList: [], //一级分类
        cateLevel2: [], //二级分类
        cateLevel3: [], //三级分类
        scrollTop:0, // 解决切换一级分类，不回滚到顶部
      };
    },
    async onLoad(){
      // 获取屏幕可使用高度
      const sysInfo = await uni.getSystemInfo()
      this.wh = sysInfo[1].windowHeight
      
      this.getCateList()
    },
    methods:{
      /**
       * 获取分类数据
       */
      async getCateList(){
        const {data:res} = await uni.$http.get('/api/public/v1/categories')
        if(res.meta.status !== 200) return uni.$showMsg()
        this.cateList = res.message
        this.cateLevel2 = res.message[this.active].children
        console.log(res)
      },
      /**
       * 切换一级分类
       * @param {Number} i 索引
       */
      activeChanged(i){
        this.active = i
        this.cateLevel2 = this.cateList[this.active].children
        this.scrollTop = this.scrollTop === 0 ? 1 : 0
      },
      /**
       * @param {Object} item 点击三级分类对象
       */
      gotoGoodsList(item){
        // console.log(item)
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
        })
      }
    }
  }
</script>

<style lang="scss">
.scroll-view-container{
  display: flex;
  
  .scroll-view-left{
    width: 120px;
    .scroll-left-item{
      line-height: 60px;
      text-align: center;
      background-color: #f7f7f7;
      font-size: 12px;
      &.active {
        background-color: #fff;
        position: relative;
        &::before {
          content: '';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #C00000;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
  .scroll-view-right{
      
    .scroll-right-item{
      .scroll-right-title{
        font-size: 12px;
         font-weight: bold;
         text-align: center;
         padding: 15px 0;
      }
      .scroll-right-list{
        display: flex;
        flex-wrap: wrap;
        .scroll-list-box{
          display: flex;
          width: 33%;
          flex-direction: column;
          align-items: center;
          image{
            width: 60px;
            height: 60px;
          }
        }
       }
      }
      
    }
  
}
</style>
