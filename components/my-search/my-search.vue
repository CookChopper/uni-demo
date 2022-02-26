<template>
  <view class="search-container" :style="{'background-color': bgColor}">
    <view class="search" :style="{'border-radius': bRadius + 'px'}" @click="searchClickHandler">
      <uni-icons type="search" size="17"></uni-icons>
      <text>搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    data() {
      return {
        
      };
    },
    props: {
      bgColor: {
        type: String,
        default: '#C00000'
      },
      bRadius: {
        type: Number,
        default: 17
      }
    },
    methods: {
      searchClickHandler(){
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
.search-container{
   height: 50px;
   padding: 0 10px;
   display: flex;
   align-items: center;
  .search{
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }
}
</style>
