// pages/search/index.js
import regeneratorRuntime, { async } from "../../lib/runtime/runtime"
import { request, showToast,frequestPaymentff } from '../../request/index'
Page({
  data:{
    // 存放数据
    list:[],
    ValueInput:'',
    // 取消按钮一开始消失
    isFes:false
  },
  // 定义一个变量
  timeID:-1,
  handlClick(e){
    const {value} = e.detail
    if(value.trim()){
      this.setData({
        isFes:true
      })
      // 清除上一次的输入
      clearTimeout(this.timeID)
      this.timeID = setTimeout(()=>{
        this.postValue(value)
      },1000)
    }
  },
  async postValue(value){
    // 发送请求
    const res = await request({url:'/goods/qsearch',data:{query:value}})
    console.log(res)
    this.setData({
      list:res.data.message
    })
  },
  // 取消按钮
  hanldDel(){
    // 点击了取消就请求所有数据
    this.setData({
      list:[],
      ValueInput:'',
      isFes:false
    })
  }
  
})