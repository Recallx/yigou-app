// pages/index/index.js
import { request } from "../../request/index.js"
Page({
    data: {
        swiperlist: [],
        catitemslist: [],
        floordata: []
    },
    onLoad() {
        this.getSwiperData()
        this.getcatitems()
        this.getfloordata()
    },
    getSwiperData() {
        request({
            url: '/home/swiperdata'
        }).then((result) => {
            this.setData({
                swiperlist: result.data.message
            })
        })
    },
    getcatitems() {
        request({
            url: '/home/catitems'
        }).then((result) => {
            this.setData({
                catitemslist: result.data.message
            })
        })
    },
    getfloordata() {
        request({
            url: '/home/floordata'
        }).then((result) => {
            this.setData({
                floordata: result.data.message
            })
        })
    }
})