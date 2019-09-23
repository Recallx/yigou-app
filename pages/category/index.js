// pages/category/index.js
import { request } from "../../request/index.js"
Page({
  data: {
    // 选择菜单，回到顶部
    scrolltop:0,
    // 选中添加的样式
    currentIndex: 0,
    leftDatalist: [],
    rightDatalist: []
  },
  Cateh: [],
  onLoad() {
    this.loadData()
  },
  // 缓存数据
  loadData() {
    // 拿到本地存储的数据
    const locato = wx.getStorageSync('Datalist');
    // 判断有没有数据
    if (locato) {
      // 如果有数据就判断
      if (Date.now() - locato.tiem > 1000 * 60) {
        // 过期了，重新发送请求
        this.getleftCategories()
      } else {
        // 没有过期就用旧数据
        // 总数据重新赋值
        this.Cateh = locato.data;
        const leftDatalist = this.Cateh.map(v => v.cat_name)
        const rightDatalist = this.Cateh[0].children
        this.setData({
          leftDatalist,
          rightDatalist
        })

      }
    } else {
      // 没有数据就发送请求
      this.getleftCategories()
    }
  },
  // 发送请求拿到数据
  getleftCategories() {
    request({
      url: '/categories'
    }).then((result) => {
      console.log(result)
      // 将所有数据存到全局的数组中
      this.Cateh = result.data.message

      // 将数据存到本地
      wx.setStorageSync('Datalist', {
        data: this.Cateh,
        tiem: Date.now()
      })
      // 先拿到第一层数据
      const leftDatalist = this.Cateh.map(v => v.cat_name)
      // 拿到第二层数据
      const rightDatalist = this.Cateh[0].children
      // 赋给定义的数组
      this.setData({
        leftDatalist,
        rightDatalist
      })
    })
  },
  // 左侧栏点击事件
  handleMenuTap(e) {
    // 结构出index
    const { index } = e.target.dataset
    // 重新发送请求
    const rightDatalist = this.Cateh[index].children
    this.setData({
      currentIndex: index,
      rightDatalist,
      scrolltop:0
    })
  }
})