// pages/goods_detail/index.js
import  regeneratorRuntime  from "../../lib/runtime/runtime"
import { request } from "../../request/index.js"
Page({
  data: {
    // 总数据
    GoodsdetailList: {}
  },
  onLoad(options) {
    this.getGoodsdetail(options.goods_id)
  },
  // 发送请求拿到商品详情
  async getGoodsdetail(goods_id) {
    const res = await request({ url: '/goods/detail', data: { goods_id } })
    this.setData({
      GoodsdetailList: res.data.message
    })
  },
      // 加入购物车事件
    handleCartAdd() {
        // 拿到数据
        const { GoodsdetailList } = this.data
    // 获取本地存储中购物车的数据
    let cartList = wx.getStorageSync("carts") || [];
        // 判断商品对象是否存在数组中
        const index = cartList.findIndex(v => v.goods_id === GoodsdetailList.goods_id)
    if(index === -1) {
      // 第一次添加
      cartList.push({
        goods_id: GoodsdetailList.goods_id,
        goods_name: GoodsdetailList.goods_name,
        goods_price: GoodsdetailList.goods_price,
        goods_small_logo: GoodsdetailList.goods_small_logo,
        checked:true,
        num: 1
      })


    } else {
      // 就是有数据
      cartList[index].num++
    }
    // 把数组存到缓存中
    wx.setStorageSync("carts", cartList);

  // 提示用户添加成功
  wx.showToast({
    title: '加入购物车成功',
    mask: true
  });

  },
  // 点击图片方法事件
  handleClick(e) {
  console.log(e)
    const { GoodsdetailList } = this.data;
  // 拿到图片需要预览的图片链接
  const urls = GoodsdetailList.pics.map(v => v.pics_mid_url)
    // 拿到当前显示的图片链接
    const current = e.currentTarget.dataset.current
    // 微信内置API
    wx.previewImage({
    urls: urls,
    current: current
  });

}
})