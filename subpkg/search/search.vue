<template>
  <view>
    <view class="search-box">
      <uni-search-bar  @input="input" cancelButton="none" ></uni-search-bar>
    </view>
    <view class="sugg-list" v-if="searchResult.length !== 0">
      <view class="sugg-item" v-for="(item,i) in searchResult" :key="i" @click="goToDetail(item.goods_id)">
        <view class="goods-name">
          {{item.goods_name}}
        </view>
        <uni-icons type="forward" size="17"></uni-icons>
      </view>
    </view>
    <view class="history-box" v-else >
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash-filled" size="18" @click="clearHistory"></uni-icons>
      </view>
      <view class="history-list">
        <uni-tag :text="item" v-for="(item,i) in historys" :key="i" @click="goToGoodsList(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        kw: '', //关键词
        searchResult: [], //搜索结果列表
        historyList: [] // 搜索历史
      };
    },
    computed: {
      historys(){
        return [...this.historyList].reverse()
      }
    },
    onLoad(){
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    methods:{
      input(e){
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            this.kw = e
            // 根据关键词，查询搜索建议列表
            this.getSearchList()
           
        },500)
      },
      /**
       * 获取建议列表
       */
      async getSearchList(){
        if(this.kw === ''){
          this.searchResult = []
          return 
        }
        const {data:res} = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.kw })
        if(res.meta.status !== 200) return uni.$showMsg()
        this.searchResult = res.message
        this.saveSearchHistory()
      },
      /**
       * 跳转商品详情
       */
      goToDetail(goods_id){
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
        })
      },
      /**
       * 保存搜索历史
       */
      saveSearchHistory(){
        // 加入搜索历史
        const set = new Set(this.historyList)
        set.delete(this.kw)
        set.add(this.kw)
        this.historyList = Array.from(set)
        uni.setStorageSync('kw',JSON.stringify(this.historyList))
      },
      /**
       * 清空搜索历史
       */
      clearHistory(){
        this.historyList = []
        uni.setStorageSync('kw','[]')
      },
      /**
       * 跳转到商品列表
       */
      goToGoodsList(kw){
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?query=' + kw
        })
      }
    }
    
  }
</script>

<style lang="scss">
.search-box{
  position: sticky;
  top:0;
  z-index:99;
}
.sugg-list{
  padding: 0 5px;
  .sugg-item{
    display: flex;
    align-items: center;
    justify-content:space-between;
    font-size: 12px;
    padding: 15px 0;
    border-bottom: 1px solid #eeeeee;
    .goods-name{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.history-box{
  padding: 0 10px;
  .history-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #efefef;
    font-size: 14px;
    height: 40px;
  }
  .history-list{
    display: flex;
    flex-wrap: wrap;
    .uni-tag{
      display: block;
      margin-top: 5px;
      margin-right: 5px;
    }
  }
}
</style>
