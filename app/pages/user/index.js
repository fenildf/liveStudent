Page({
  onShow() {
    
  },
  onShareAppMessage() {
    return {
      title: '个人中心',
      path: 'page/component/index'
    }
  },

  data: {
    list: [
      {
        id: 'view',
        name: '已购买的会员卡',
        open: false,
        pages: [
          { cardName: '一年级语文上册',price:110,realPrice:30, endTime: '2019/8/7到期'}
        ]
      }, {
        id: 'content',
        name: '未购买的会员卡',
        open: false,
        pages: [
          { cardName: '二年级语文上册', price: 110, realPrice: 30, endTime: '购买' },
          { cardName: '三年级语文上册', price: 110, realPrice: 30,endTime: '购买'}
        ]
      } 
    ]
  },

  kindToggle(e) {
    const id = e.currentTarget.id
    const list = this.data.list
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list
    })
   
  }
})
