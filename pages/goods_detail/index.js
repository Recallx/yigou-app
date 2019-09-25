// pages/goods_detail/index.js
import { request } from "../../request/index.js"
Page({
  data: {
    // 总数据
    GoodsdetailList:[]
  },
  onLoad(options) {
    console.log(options)
    this.getGoodsdetail(options.goods_id)
  },
  // 发送请求拿到商品详情
  getGoodsdetail(goods_id){
    request({
      url:'/goods/detail',
      data:{
        goods_id
      }
    }).then(res =>{
      console.log(res)
      this.setData({
        GoodsdetailList:res.data.message
      })
    })
  },
  // 点击图片方法事件
  handleClick(){
    
    // 微信内置API
    
  }
})