// pages/cart/index.js
import regeneratorRuntime, { async } from "../../lib/runtime/runtime"
import { request, showToast,frequestPaymentff } from '../../request/index'
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
  handlclose() {
    this.getProost()
  },
  // 逻辑代码
  async getProost() {
    // 本地存储中拿到存的token
    const token = wx.getStorageSync('token')
    if (!token) {
      // 跳转到auth
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return
    }
    // 有token,拼接请求需要的参数
    const { totalPrice, address, carts } = this.data
    // 商品单价
    const order_price = totalPrice
    // 收货地址
    const consignee_addr = address.detailInfodz
    // 商品数组
    const goods = carts.map(v => {
      return {
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price
      }
    })
    // 将参数包起来
    const Datalist = {
      order_price, consignee_addr, goods
    }
    // 发送请求创建订单
    const res1 = await request({ url: "/my/orders/create", method: "post", data: Datalist });
    const {order_number} = res1.data.message;
    // 准备预支付
    const res = await request({url:"/my/orders/req_unifiedorder",method:"post",data: {order_number}})
    // 将pay结构出来
    const {pay} = res.data.message;
    // 调用内置微信支付API
    await frequestPaymentff(pay)
    // 查看订单状态
    const ress5 = await request({url:"/my/orders/chkOrder",method:'post',data:{order_number}})
    const {message} = ress5.data
    // 弹出提示用户
    await showToast({ title: message, mask: true });
    // 保留没有选中的商品
    let locatiog = wx.getStorageSync('carts');
    wx.setStorageSync('carts', locatiog.filter(v=>!v.checked));
    // 跳转页面到order
    wx.navigateTo({
      url: '/pages/order/index'
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
    let carts = wx.getStorageSync('carts') || []
    // 筛选出选中的商品
    carts = carts.filter(v => v.checked)
    // 赋值给data的变量
    this.setData({
      carts, address
    })
    this.countData(carts)
  },

})