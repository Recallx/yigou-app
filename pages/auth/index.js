
import regeneratorRuntime from '../../lib/runtime/runtime';
import { login,request } from "../../request/index.js";
Page({
  handleGetuserinfo(e) {
    this.wxLogin(e);
  },

  // 执行微信登录
  async wxLogin(e) {
    const { code } = await login();
    const { encryptedData, rawData, iv, signature } = e.detail;
    const tokenParam = {
      code,encryptedData, rawData, iv, signature
    }
    const res = await request({url:"/users/wxlogin",method:"post",data:tokenParam});
    // 将token存到本地存储
    wx.setStorageSync('token', res.data.message.token);
    // 跳转页面回到上一级
    wx.navigateBack({
      delta: 1
    });
  }
})