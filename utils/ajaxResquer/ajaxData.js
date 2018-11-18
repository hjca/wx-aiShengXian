// 请求地址常量
const url = 'https://result.eolinker.com/';
const lastUrl = url + 'uWJKmJWb0acaccd8915a169b45d6cbbed4a65919804fe82?uri=';

// url：请求后端的地址
// successFun:执行成功时的函数
// failFun：执行失败是的函数
// methods：执行的方式，get，post
// data：提交给后台的数据
// contentType：设置请求头
// isLoadding：是否出现loadding
function requestAjax(urlParems='', successFun, failFun, methods = "GET", data, contentType ='application/json',isLoadding=true){

  let userHead = lastUrl + urlParems;

  // 是否出现loading
  isLoadding ? 
    wx.showLoading({
      mask: true
    }) :
    wx.hideLoading();

  wx.request({
    url: userHead,
    data:data,
    header:{
      'content-type': contentType
    },
    success(res){
      res.statusCode == 200 ?
        successFun(res.data) : '';
    },
    fail(){
      failFun();
    },
    complete(){
      wx.hideLoading();
    }
  })
}
export default requestAjax;