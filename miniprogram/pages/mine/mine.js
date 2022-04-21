import wj from "../../utils/wj"

const app = getApp();

Page({
  data: {
    userinfo: {},
    tel: 123,
    keyword: 23,
  },
  /**
   * 页面的初始数据
   */

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.GetOpenID()
    wj.user().get().then(res=>{
      console.log(res);
    }).catch(err=>{

    })
    
  

    //console.log(app.globalData.openid)
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
    const userinfo = wx.getStorageSync("userinfo");
    this.setData({ userinfo })
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

  },
  getTEL: function (e) {
    console.log(e.detail.value)
    this.setData({
      tel: e.detail.value
    })
  },
  getKEYWORD: function (e) {
    console.log(e.detail.value)
    this.setData({
      keyword: e.detail.value
    })
  },


  enterClicked: function () {
    let that = this
    //console.log(this.data.openID)
    app.Request("/bind", app.ReqOpt.token).PUT({
      openid: app.globalData.openid,
      // tel: this.data.tel,
      // pass: this.data.keyword,
      tel: "17602498003",
      pass: "123456",
    }).then(res => {
      //console.log(res.statusCode);
      let situ = res.statusCode;
      console.log(res.data);
      if (situ == 200) {
        let token = res.data.token
        wx.setStorageSync("token", token)
        console.log(res);
        wj.user().addup({
          userInfo:that.data.userinfo,
          tel:res.data.user.tel,
          cdid:res.data.user._id,
        }).then(res=>{
          console.log(res);
        }).catch(err=>{
          console.log(err);
        })
      }
      else if (situ == 404) {
        console.log(situ);
      }
      else {
        console.log(situ);
      }
    })
  },
  getUserProfile(e) {
    var that = this;
    wx.getUserProfile({
        desc: '用于登录', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      })
      .then(res => {
        this.setData({
          userinfo: res.userInfo
        })
      })
      .catch(err => {
      })
  },

})