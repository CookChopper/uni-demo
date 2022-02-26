<template>
  <view>
    <view class="goods-list">
      <my-goods v-for="(goods,i) in goodsList" :key="i" :goods="goods">
      
      </my-goods>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        queryInfo:{
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        total: 0, // 商品列表结果总数
        goodsList: [], // 商品列表
        isloading: false, //节流阀
      };
    },
    onLoad(options){
      // console.log(options)
      this.queryInfo.query = options.query || ''
      this.queryInfo.cid = options.cid || ''
      this.getGoodsList()
    },
    onPullDownRefresh(){
      this.goodsList = []
      this.total = 0
      this.isloading = false
      this.queryInfo.pagenum = 1
      this.getGoodsList(() => {
        uni.stopPullDownRefresh()
      })
    },
    onReachBottom(){
      // console.log(1)
      // if(this.queryInfo.pagesize * this.queryInfo.pagenum >= this.total) return uni.$showMsg('数据加载完毕！')
      // 目前api接口有问题 当20条数据 只能请求前20条
      if(this.queryInfo.pagesize * (this.queryInfo.pagenum + 1) >= this.total) return uni.$showMsg('数据加载完毕！！')
      if(this.isloading) return 
      this.queryInfo.pagenum += 1
      this.getGoodsList()
    },
    methods:{
      /**
       * 获取商品列表
       */
      async getGoodsList(cb){
        this.isloading = true
        const { data : res } = await uni.$http.get('/api/public/v1/goods/search',this.queryInfo)
        cb && cb()
        this.goodsList = [...this.goodsList,...res.message.goods]
        this.total = res.message.total
        this.isloading = false
      }
    }
  }
</script>

<style lang="scss">
.goods-list{
  .goods-item{
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #efefef;
    .goods-item-left{
      margin-right: 10px;
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
      .goods-price{
        font-size: 16px;
        color: #C00000;
      }
    }
  }
}
</style>
