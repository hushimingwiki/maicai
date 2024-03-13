// let baseURL = 'https://api.caiduohui.com/'; 
let baseURL = 'http://39.99.133.31:8080/';  
// let baseURL = 'http://120.55.114.174:8080/';
// let baseURL = 'http://112.126.103.80:8080/';
const app = getApp()
const post=(url,params,burl)=>{
  let date = Date.parse(new Date())
  return new Promise((resolve,reject)=>{
    let data 
    data = Object.assign({
      userId:wx.getStorageSync('userId') || '',
      token:wx.getStorageSync('token') || '',
    },params)
    // if(getApp() && getApp().globalData.userInfo){
    //    data = Object.assign({
    //     UserId:getApp().globalData.userInfo.userId?getApp().globalData.userInfo.userId:'0',
    //     Token:getApp().globalData.token?getApp().globalData.token:'0',
    //   },params)
    // }
    wx.request({
      method: 'post',
      url: baseURL+url,
      data: data?data:params,
      header: {
        "content-type": 'application/x-www-form-urlencoded',
      },
      success: async res => {
        console.log(res,'request.js')
        if(res.statusCode==200){
          resolve(res.data)
        }
        if(res.statusCode==404){
          wx.showToast({
            title:'与服务器出现错误',
            icon:'none'
          })
        }
        if(res.data.code == 201){
          console.log(res.data.msg)
        }
        if(res.data.code==202){
            wx.removeStorageSync('userId')
            wx.removeStorageSync('token')
            await getApp().getCode()
        }
      },
      fail:err=>{
        wx.showToast({
          title:'网络错误',
          icon:'none'
        })
        reject(err)
      }
    })
  })
}

const postFile = (file,Token,userId,type) => {
  let date = Date.parse(new Date())
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url:baseURL+'UpLoad/UpLoadFile',
      filePath:file,
      name: 'File',
      formData:{
        Type:type,
        Token:Token,
        UserId:userId
      },
      success:res=>{
        if(res.data.code==202){
          getCode()
        }
        resolve(JSON.parse(res.data))
      },
      fail:err=>{
        // console.log(err,'err')
        reject(err)
      }
    })
  })
}

module.exports={
  post:post,
  postFile: postFile
}