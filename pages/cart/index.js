// pages/cart/index.js
import regeneratorRuntime, { async } from "../../lib/runtime/runtime"
import { request, showToast ,getSetting, openSetting, chooseAddress,showModel } from '../../request/index'
Page({
  data: {
    address: {},
    // 购物车的数据
    carts: [],
    // 计算价格的数据
    allChecked: true,
    totalPrice: 0,
    totalNum: 0
  },
  // 结算按钮
  async handlclose(){
    // 拿到数据
    const {totalNum,address} = this.data;
    // 判断商品的数量是否为0
    if(totalNum === 0){
      // 提示用户没有选择商品
      await showToast({title:'您还没有选择商品！',mask:true,icon:'none'})
      return
    }
    // 再判断地址是否为空
    if(address === ''){
      // 提示用户没有选择地址
      await showToast({title:'您还没有选择收货地址！',mask:true,icon:'none'})
      return
    }
    // 跳转页面到支付页面
    wx.navigateTo({
      url: '/pages/pay/index'
    });
      
  },

  // 计算数据方法
  countData(carts) {
    // 选中的商品
    let allChecked = true;
    // 价格
    let totalPrice = 0;
    // 数量
    let totalNum = 0;
    // 循环数组
    carts.forEach((v, i) => {
      // 判断是否有勾选的商品
      if (v.checked) {
        // 如果有就计算价格和数量
        totalPrice += v.num * v.goods_price
        totalNum += v.num
      } else {
        // 否则勾选商品就等于false
        allChecked = false
      }
      // 重新设置回data中
      this.setData({
        allChecked,
        totalPrice,
        totalNum
      })
    })
  },

  // 拿到存在本地存储的地址数据
  onShow() {
    // 拿到本地存储的默认地址，默认是空字符串
    const address = wx.getStorageSync('address');
    // 拿到存在本地存储的购物车商品数据
    const carts = wx.getStorageSync('carts')
    // 赋值给data的变量
    this.setData({
      carts, address
    })
    this.countData(carts)
  },

  // 商品项复选框的点击事件
  handlChecked(e) {
    // 拿到用户选择的索引
    const { index } = e.target.dataset;
    // 获取data中的数据
    const { carts } = this.data
    // 将数组里面的复选框取反
    carts[index].checked = !carts[index].checked
    // 设置回data和本地存储中
    this.setData({
      carts
    })
    // 本地存储
    wx.setStorageSync('carts', carts);
    // 重新计算价格
    this.countData(carts)
  },

  //数量增加和减少事件
  async hanldquantity(e) {
    const { index, operation } = e.currentTarget.dataset
    // 拿到数组
    const { carts } = this.data
    // 判断用户点击的是增加还是减少
    if (operation === -1 && carts[index].num === 1) {
      // 删除弹窗提示用户
       const res =  await showModel({title:'警告',content:'您确定要删除吗？'})
      if (res) {
        console.log('删除 了')
        carts.splice(index, 1)
      } else {
        return
      }

    } else {
      carts[index].num += operation
    }
    this.setData({
      carts
    })
    wx.setStorageSync('carts', carts);
    this.countData(carts)
  },

  // 添加收货地址按钮
  handlButton() {
    // 获取用户收货地址
    this.getUserAdd()
  },
  async getUserAdd() {
    // 获取用户授权状态
    const result1 = await getSetting()
    // 拿到里面的数值，auth就代表用户授权状态
    const auth = result1.authSetting["scope.address"]
    // 判断是否等于false
    if (auth === false) {
      // 诱导用户打开授权设置
      await openSetting()
    }
    // 获取到用户地址的数据
    const result2 = await chooseAddress()
    // 拼接里面的地址
    result2.detailInfodz = result2.provinceName + result2.cityName + result2.countyName + result2.detailInfo
    // 复制给data中
    this.setData({
      address: result2
    })
    // 存到本地存储中
    wx.setStorageSync("address", result2);
  }
})