// components/search/index.js
Component({
  properties: {
    titleList:{
      type:Array,
      value:[]
    },
    cureater:{
      type:Number,
      value:0
    }
  },
  methods: {
    handletap(e){
      console.log(e)
      const {index} = e.target.dataset
      // 传递索引到父组件
      this.triggerEvent('itemChange',{index})
    }
  }
})
