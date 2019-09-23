// pages/category/index.js
import { request } from "../../request/index.js"
Page({
  data: {
    // 选中添加的样式
    currentIndex:0,
    leftDatalist:[]
  },
  onLoad(){
    this.getleftCategories()
  },
  // 发送请求拿到数据
  getleftCategories(){
    request({
      url:'/categories'
    }).then((result)=>{
      console.log(result)
      // 先拿到第一层数据
      const leftDatalist = result.data.message.map(v=>v.cat_name)
      // 赋给定义的数组
      this.setData({
        leftDatalist,
      })
    })
  }
})