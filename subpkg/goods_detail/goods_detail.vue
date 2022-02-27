<template>
  <view>
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,i) in goodsInfo.pics" >
        <image :src="item.pics_big" mode="" @click="preview(i)"></image>
      </swiper-item>
    </swiper>
    <view class="goods-info-box" v-if="goodsInfo.goods_name">
      <!-- 商品价格 -->
      <view class="price">￥{{goodsInfo.goods_price}}</view>
      <!-- 信息主体区域 -->
      <view class="goods-info-body">
        <!-- 商品名称 -->
        <view class="goods-name">{{goodsInfo.goods_name}}</view>
        <!-- 收藏 -->
        <view class="favi">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 运费 -->
      <view class="yf">快递：免运费</view>
    </view>
    <rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
    <view class="goods-nav">
      <uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
  import { mapMutations,mapGetters } from 'vuex'
  export default {
    data() {
      return {
        goodsInfo: {}, // 商品详情
         options: [{
                    icon: 'shop',
                    text: '店铺',
                    infoColor:"red"
                }, {
                    icon: 'cart',
                    text: '购物车',
                    info: 0
                }],
                buttonGroup: [{
                  text: '加入购物车',
                  backgroundColor: '#ff0000',
                  color: '#fff'
                },
                {
                  text: '立即购买',
                  backgroundColor: '#ffa200',
                  color: '#fff'
                }
                ]
      };
    },
    onLoad(options) {
      const goods_id = options.goods_id
      this.getGoodsDetail(goods_id)
    },
    methods: {
      ...mapMutations('m_cart',['addToCart']),
      // 获取商品详情
      async getGoodsDetail(goods_id){
        const { data:res } = await uni.$http.get('/api/public/v1/goods/detail',{goods_id})
        if(res.meta.status !== 200) return uni.$showMsg()
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,'<img style="display:block;" ')
        this.goodsInfo = res.message
      },
      // 图片预览
      preview(i){
        uni.previewImage({
          current: i,
          urls: this.goodsInfo.pics.map(x => x.pics_big)
        })
      },
      // 商品导航左侧按钮
      onClick(e){
        if(e.content.text === "购物车" && e.index === 1){
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      },
      // 商品导航右侧按钮
      buttonClick(e){
        if(e.content.text === "加入购物车"){
          // console.log(1)
          const goods = {
            goods_id : this.goodsInfo.goods_id,
            goods_name : this.goodsInfo.goods_name,
            goods_price : this.goodsInfo.goods_price,
            goods_count : 1,
            goods_status : true,
            goods_small_logo: this.goodsInfo.goods_small_logo
          }
          this.addToCart(goods)
        }
      }
    },
    computed:{
      ...mapGetters('m_cart',['total'])
    },
    watch: {
      total:{
        handler(newVal){
          this.options[1].info = newVal
        },
        immediate: true
      }
    }
  }
</script>

<style lang="scss">
swiper{
  height: 750rpx;
  image{
    width: 100%;
    height: 100%;
  }
}
.goods-info-box{
  padding: 10px 5px;
  .price{
    color: #C00000;
    font-size: 18px;
    margin: 5px 0;
  }
  .goods-info-body{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .goods-name{
      font-size: 14px;
    }
    .favi{
      width: 120px;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-left:1px solid #eee;
    }
  }
  .yf{
    margin: 5px 0;
    font-size: 14px;
    color: gray;
  }
 
}
 .goods-nav{
    position: fixed;
    bottom: 0;
    z-index: 99;
    width: 100%;
  }
</style>
