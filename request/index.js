
// 定义加载次数
let requestTimes = 0

export const request = (params) => {
    // 当调用一次request就加载多次
    requestTimes++
    // 显示遮罩层
    wx.showLoading({
        title: "加载中",
        mask: true,
    });
    const baseUrl = "https://api.zbztb.cn/api/public/v1"
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: baseUrl + params.url,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {
                // 判断requestTimes等于0就隐藏遮罩
                requestTimes--
                requestTimes === 0 && wx.hideLoading();
            }
        });

    })
}
// 获取当前用户设置
export const getSetting = () => {
    return new Promise((resolve,reject) =>{
        wx.getSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        });
          
    })
}
// 返回用户的操作结果
export const openSetting = () => {
    return new Promise((resolve,reject) =>{
        wx.openSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        });
          
    })
}
// 获取用户守护地址
export const chooseAddress = () => {
    return new Promise((resolve,reject) =>{
        wx.chooseAddress({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        });
          
    })
}
// 模态框
export const showModel = (params) =>{
    return new Promise ((resolve,reject) =>{
        wx.showModal({
            ...params,
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
                if (result.confirm) {
                    resolve(result)
                }
            }
        });
          
    })
}
// 提示框
export const showToast = (params) =>{
    return new Promise((resolve,reject) =>{
        wx.showToast({
            ...params,
            icon: 'none',
            duration: 1500,
            mask: false,
            success: (result) => {
                resolve(result)
            }
        });
          
    })
}