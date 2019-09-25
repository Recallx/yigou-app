// pages/goods_list/index.js
import { request } from "../../request/index.js"
Page({
  data: {
    titleList:[
      {id:0,name:"综合"},
      {id:1,name:"销量"},
      {id:2,name:"价格"}
    ],
    cureater:0,
    // 商品数据
    goodsList:[]
  },
  qingqiushuju:{
    query:"",
    // 商品的id
    cid:"",
    // 页码
    pagenum:1,
    // 一页要显示的数据
    pagesize:10
  },
  // 总数据条数
  ToetalPages:1,
  onLoad(options) {
    console.log(options)
    // 将id存起来
    const {cid} = options
    this.qingqiushuju.cid=cid
    this.getSearch()
  },
  // 页面向上拉触底事件
  onReachBottom(){
    // 判断有没有下一页数据
    if(this.qingqiushuju.pagenum >= this.ToetalPages){
      // 没有下一页数了，提示用户
      wx.showToast({
        title: '没有下一页了！',
        icon: 'none',
        mask: false
      });
    }else{
      // 让页面++，重新发送异步请求
      this.qingqiushuju.pagenum++
      this.getSearch()
    }
  },
  // 页面下拉刷新数据事件
  onPullDownRefresh(){
    // 重置页面回到1
    this.qingqiushuju.pagenum=1;
    // 重新设置回数组
    this.setData({
      goodsList:[]
    })
    this.getSearch()
  },
  // 发送请求
  getSearch(){
    request({
      url:'/goods/search',
      data:this.qingqiushuju
    }).then(res =>{
      console.log(res)
      const newgoodsList=res.data.message.goods
      // 拿到旧数据
      const beforgoodslist = this.data.goodsList
      // 拿到总条数
      const total = res.data.message.total
      // 计算总页数
      this.ToetalPages=Math.ceil(total/this.qingqiushuju.pagesize)
      // 从新将旧数据和新数据拼接
      this.setData({
        goodsList:[...beforgoodslist,...newgoodsList]
      })
    })
    // 关闭下拉刷新组件
    wx.stopPullDownRefresh()
  },
  hanldIndex(e){
    this.setData({
      cureater: e.detail.index
    })
  }
})