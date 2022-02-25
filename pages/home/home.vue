<template>
  <view>
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" >
      <swiper-item v-for="(item,i) in swiperList" :key="i">
        <navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`">
          <image :src="item.image_src" mode=""></image>
        </navigator>
      </swiper-item>
    </swiper>
    <view class="cate-box">
        <view class="cate-item" v-for="(item,i) in navList" :key="i" @click="navClickHandle(item)">
          <image :src="item.image_src"></image>
        </view>
    </view>
    <view class="floor-list">
      <view class="floor-item" v-for="(item,i) in floorList" :key="i">
        <image :src="item.floor_title.image_src" mode="" class="floor-title"></image>
        <view class="box">
          <navigator class="floor-left" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
          </navigator>
          <view class="floor-right">
            <navigator  v-for="(item2,i2) in item.product_list" :key="i2" :url="item2.url">
               <image  :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}" mode="widthFix" v-if="i2 !== 0"></image>
            </navigator>
          </view>
          
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
          swiperList: [], //轮播图数据
          navList: [], //分类导航数据
          floorList: [], // 楼层数据
      };
    },
    // 页面加载处理函数
    onLoad(){
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
    },
    methods:{
      /**
       * 获取轮播图数据
       */
      getSwiperList() {
         // 发起请求
         uni.$http.get("/api/public/v1/home/swiperdata").then(({data:res}) => {
           if(res.meta.status !== 200){
             return uni.$showMsg()
           }
           this.swiperList = res.message
         })
      },
      /**
       * 获取分类导航数据
       */
      getNavList(){
        uni.$http.get("/api/public/v1/home/catitems").then(({data:res}) => {
          if(res.meta.status !== 200) return uni.$showMsg()
          
          this.navList = res.message
        })
      },
      /**
       * 获取楼层数据
       */
      getFloorList(){
        uni.$http.get("/api/public/v1/home/floordata").then(({data:res}) => {
          if(res.meta.status !== 200) return uni.$showMsg()
          res.message.forEach(floor => {
            floor.product_list.forEach(prod => {
              prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
            })
          })
          this.floorList = res.message
        })
      },
      // 分类导航点击事件
      navClickHandle(item){
        if(item.name === "分类"){
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      }
    }
  }
</script>

<style lang="scss">
swiper {
  height: 330rpx;
}
.swiper-item,image {
  width: 100%;
  height: 100%;
}
.cate-box {
  display: flex;
  justify-content: space-around;
  margin: 10rpx 0;
}
.cate-item {
  width: 128rpx;
  height: 140rpx;
}
.floor-list{
  width: 100%;
  height: 100%;
}
.floor-item{
  width: 100%;
}
.box{
  height: 100%;
  display: flex;
}
.floor-title{
  height: 60rpx;
  width: 100%;
}
.floor-left image{
  height: 100%;
}
.floor-right{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
