var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    publicizeModel: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log('走入onShow')
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  goCustomerList() {
    wx.navigateTo({
      url: '../customerList/customerList',
    })
  },
  showPublicizeModel() {
    this.setData({
      publicizeModel: true
    })
    // this.scHaibao()
  },
  cancel() {
    this.setData({
      publicizeModel: false
    })
  },
  scHaibao() {
    wx.createSelectorQuery()
      .select('#myCanvas') // 在 WXML 中填入的 id
      .fields({
        node: true,
        size: true
      })
      .exec((res) => {
        const canvas = res[0].node
        wx.getImageInfo({
          src: 'https://api.caiduohui.com:8080/assets/haibao.jpg', // 本地背景图片路径
          success(ress) {
            console.log(ress, 'ress')
            const ctx = canvas.getContext('2d')
            const width = res[0].width
            const height = res[0].height
            ctx.clearRect(0, 0, width, height)
            wx.request({
              url: '123333', // 替换成实际的二维码接口地址
              success(res) {
                wx.getImageInfo({
                  src: res.data.qrcodeUrl,
                  success(res) {
                    // 绘制二维码到画布上
                    ctx.drawImage(res.path, 100, 100, 100, 100);

                    // 绘制文字
                    ctx.setFontSize(16);
                    ctx.setFillStyle('#ffffff');
                    ctx.fillText('我的推广码', 120, 250);

                    // 绘制完成并保存画布
                    ctx.draw(false, () => {
                      wx.canvasToTempFilePath({
                        canvasId: 'myCanvas',
                        success(res) {
                          console.log('Canvas 生成临时图片路径:', res.tempFilePath);
                        },
                        fail(err) {
                          console.error('Canvas 保存失败:', err);
                        }
                      });
                    });
                  },
                  fail(err) {
                    console.error('获取二维码图片失败:', err);
                  }
                });
              },
              fail(err) {
                console.error('请求二维码接口失败:', err);
              }
            });
          },
          fail(err) {
            console.error('获取背景图片信息失败:', err);
          }
        })
        return
        // Canvas 对象

        // 渲染上下文
        const ctx = canvas.getContext('2d')

        // Canvas 画布的实际绘制宽高
        const width = res[0].width
        const height = res[0].height

        // 初始化画布大小
        const dpr = wx.getWindowInfo().pixelRatio
        canvas.width = width * dpr
        canvas.height = height * dpr
        ctx.scale(dpr, dpr)
      })
    return
    // 绘制背景图片
    // const ctx = wx.createSelectorQuery('myCanvas');
    wx.getImageInfo({
      src: 'https://api.caiduohui.com:8080/assets/haibao.jpg', // 本地背景图片路径
      success(res) {
        console.log(res, 'ressssss')


        // 绘制二维码
        wx.request({
          url: '我爱你', // 替换成实际的二维码接口地址
          success(res) {
            wx.getImageInfo({
              src: res.data.qrcodeUrl,
              success(res) {
                // 绘制二维码到画布上
                ctx.drawImage(res.path, 100, 100, 100, 100);

                // 绘制文字
                ctx.setFontSize(16);
                ctx.setFillStyle('#ffffff');
                ctx.fillText('我的推广码', 120, 250);

                // 绘制完成并保存画布
                ctx.draw(false, () => {
                  wx.canvasToTempFilePath({
                    canvasId: 'myCanvas',
                    success(res) {
                      console.log('Canvas 生成临时图片路径:', res.tempFilePath);
                    },
                    fail(err) {
                      console.error('Canvas 保存失败:', err);
                    }
                  });
                });
              },
              fail(err) {
                console.error('获取二维码图片失败:', err);
              }
            });
          },
          fail(err) {
            console.error('请求二维码接口失败:', err);
          }
        });
      },
      fail(err) {
        console.error('获取背景图片信息失败:', err);
      }
    });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    console.log(app.globalData.userInfo,'app.globalData.userInfo')
    return{
      title: app.globalData.userInfo.nickname+'邀请你加入菜多惠',
      path:'/pages/index/index?parentId='+app.globalData.userInfo.user_id,
      imageUrl:'https://api.caiduohui.com:8080/assets/logo.png'
    }
  }
})