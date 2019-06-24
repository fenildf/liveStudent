// pages/course/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     list:[
       {
         id:1,
         text:'语文',
         icon:'http://fdfs.xmcdn.com/group56/M09/3B/BD/wKgLgFyQujLCAVYRAAAuwA7DZMg198.png'
       },
       {
         id: 2,
         text: '数学',
         icon: 'http://fdfs.xmcdn.com/group57/M0A/3B/D0/wKgLgVyQuqWRZsJtAAAnr8tg4rs307.png'
       },
       {
         id: 3,
         text: '英语',
         icon: 'http://fdfs.xmcdn.com/group57/M0A/3B/D0/wKgLgVyQuqWRZsJtAAAnr8tg4rs307.png'
       },
       {
         id: 3,
         text: '历史',
         icon: 'http://fdfs.xmcdn.com/group63/M01/B2/54/wKgMcl0Arv-gbwo4AABqDmN0C8Q090.png'
       },
       {
         id: 3,
         text: '地理',
         icon: 'http://fdfs.xmcdn.com/group63/M01/B2/54/wKgMcl0Arv-gbwo4AABqDmN0C8Q090.png'
       },
       {
         id: 3,
         text: '政治',
         icon: 'http://fdfs.xmcdn.com/group63/M01/B2/54/wKgMcl0Arv-gbwo4AABqDmN0C8Q090.png'
       },
       {
         id: 3,
         text: '物理',
         icon: 'http://fdfs.xmcdn.com/group63/M01/B2/54/wKgMcl0Arv-gbwo4AABqDmN0C8Q090.png'
       },
       {
         id: 3,
         text: '化学',
         icon: 'http://fdfs.xmcdn.com/group63/M01/B2/54/wKgMcl0Arv-gbwo4AABqDmN0C8Q090.png'
       },
       {
         id: 3,
         text: '生物',
         icon: 'http://fdfs.xmcdn.com/group63/M01/B2/54/wKgMcl0Arv-gbwo4AABqDmN0C8Q090.png'
       }
     ]
  },
  goToCourseModel: function () {
    console.log(1)
    wx.navigateTo({
      url: '/pages/course-model/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: 'view',
      path: 'page/component/pages/view/view'
    }
  },
  onSearch:function(){
    console.log("search")
  },
  
})