export default {
  namespaced: true,
  state: () => ({
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  mutations:{
    addToCart(state,goods){
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      if(!findResult){
        state.cart.push(goods)
      }else{
        findResult.goods_count++
      }
      this.commit('m_cart/saveToStorage')
    },
    saveToStorage(state){
      uni.setStorageSync('cart',JSON.stringify(state.cart))
    },
    updateStatus(state,goods){
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      if(findResult){
        findResult.goods_status = goods.goods_status
      }
      this.commit('m_cart/saveToStorage')
    },
    updateCount(state,goods){
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      if(findResult){
        findResult.goods_count = goods.goods_count
      }
      this.commit('m_cart/saveToStorage')
    },
    deteleGoods(state,id){
      state.cart = state.cart.filter(x => x.goods_id !== id)
      this.commit('m_cart/saveToStorage')
    },
    updateAllStatus(state,status){
      state.cart.forEach(item => item.goods_status = status)
      this.commit('m_cart/saveToStorage')
    }
  },
  getters: {
    total(state){
      return state.cart.filter(x => x.goods_status).reduce((total,item) => total += item.goods_count,0)
    },
    allCount(state){
      return state.cart.reduce((total,item)=> total+= item.goods_count ,0)
    },
    checkedGoodsPrice(state){
      return state.cart.filter(x => x.goods_status).reduce((total,item)=> total += (item.goods_count * item.goods_price) ,0).toFixed(2)
    }
  }
}