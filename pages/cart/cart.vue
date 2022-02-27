<template>
  <scroll-view scroll-y="true" v-if="JSON.stringify(cart) !== '[]'">
    <my-address></my-address>
    <my-setle></my-setle>
    <view class="cart-box">
      <view class="cart-title">
        <uni-icons type="shop" size="20"></uni-icons>
        <text>购物车</text>
      </view>
      <view class="cart-content">
        <uni-swipe-action>
        <block v-for="(goods,i) in cart" :key="i">
           <uni-swipe-action-item :right-options="options"  @click="onClick(goods.goods_id)" >
           <my-goods :goods="goods" :showRadio="true" :showCount="true" @radio-change="radioChanged" @count-change="countChanged"></my-goods>
           </uni-swipe-action-item>
        </block>
        </uni-swipe-action>
      </view>
    </view>
  </scroll-view>
  <view v-else class="cart-empty">
      <image src="../../static/cart_empty@2x.png" mode=""></image>
      <text>购物车空空如也！</text>
  </view>
</template>

<script>
  import { mapState,mapGetters,mapMutations } from 'vuex'
  import badgeMixin from '../../mixins/badgeMixin.js'
  export default {
    mixins:[badgeMixin],
    data() {
      return {
        options:[
                {
                    text: '删除',
                    style: {
                        backgroundColor: '#C00000'
                    }
                }]
      };
    },
    computed:{
      ...mapState('m_cart',['cart']),
      ...mapGetters('m_cart',['total','allCount']),
     
    },
    watch: {
      total:{
        handler(newVal){
          console.log(newVal)
        },
        immediate: true
      }
    },
    methods:{
      ...mapMutations('m_cart',['updateStatus','updateCount','deteleGoods']),
      radioChanged(e){
        this.updateStatus(e)
      },
      countChanged(e){
        // console.log(e)
        this.updateCount(e)
      },
      onClick(id){
        this.deteleGoods(id)
      }
    }
  }
</script>

<style lang="scss">
.cart-box{
  margin-bottom: 50px;
  .cart-title{
    margin: 5px 0;
    padding: 0 10px;
    font-size: 14px;
    display: flex;
    align-items: center;
    text {
      margin-left: 5px;
    }
  }
}
.cart-empty{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50%;
  image{
    width: 100px;
    height: 100px;
    display: block;
    margin-bottom: 10px;
  }
  text{
    font-size: 14px;
  }
}
</style>
