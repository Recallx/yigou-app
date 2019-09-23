
// 定义加载次数
let requestTimes = 0

export const request = (params) =>{
    // 当调用一次request就加载多次
    requestTimes++
    // 显示遮罩层
    wx.showLoading({
        title: "加载中",
        mask: true,
    });
    const baseUrl = "https://api.zbztb.cn/api/public/v1" 
    return new Promise((resolve,reject) =>{
        wx.request({
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
                requestTimes===0 && wx.hideLoading();   
            }
        });
          
    })
}