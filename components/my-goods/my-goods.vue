<template>
  <view class="goods-item" >
    <view class="goods-item-left" >
      <radio :checked="goods.goods_status" color="#C00000" v-if="showRadio" @click="ridioClickHandler" />
      <image :src="goods.goods_small_logo || defaultPic" mode="" @click="goToGoodsDetail(goods)"></image>
    </view>
    <view class="goods-item-right" >
      <view class="goods-name">
        {{goods.goods_name}}
      </view>
      <view class="goods-info">
        <view class="goods-price">
          ¥{{goods.goods_price | tofixed}}
        </view>
        <uni-number-box :min="1" v-model="goods.goods_count" v-if="showCount" @change="countChangeHandler"></uni-number-box>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-goods",
    props: {
      goods: {
        type: Object,
        default: () => ({})
      },
      showRadio:{
        type: Boolean,
        default: false
      },
      showCount: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    methods:{
      // 跳转详情页
      goToGoodsDetail(item){
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      },
      // 单选框点击事件
      ridioClickHandler(){
        this.$emit('radio-change',{
          goods_id: this.goods.goods_id,
          goods_status : !this.goods.goods_status
        })
      },
      // 数量输入框变化事件
      countChangeHandler(val){
        this.$emit('count-change',{
          goods_id: this.goods.goods_id,
          goods_count: +val
        })
      }
    },
    filters:{
      tofixed(num){
        return Number(num).toFixed(2)
      }
    }
  }
</script>

<style lang="scss">
.goods-item{
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #efefef;
    .goods-item-left{
      margin-right: 10px;
      display: flex;
      align-items: center;
      image {
        display: block;
        width: 120px;
        height: 120px;
      }
    }
    .goods-item-right{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .goods-name{
        font-size: 13px;
      }
      .goods-info{
        display: flex;
        justify-content: space-between;
        .goods-price{
          font-size: 16px;
          color: #C00000;
        }
      }
    }
  }
</style>
