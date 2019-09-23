export const request = (params) =>{
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
            complete: () => {}
        });
          
    })
}