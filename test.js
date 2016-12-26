/**
 * Created by suncg on 2016/12/26.
 */
var {request} = require('./config/commonModules');

let zhihu = require('./index');
// zhihu.Post.likersDetail('https://zhuanlan.zhihu.com/p/24391869?refer=chenyuz',{limit:3}).then(function (data) {
//   console.log(data)
// })
zhihu.zhuanlan.comments('https://zhuanlan.zhihu.com/p/24241616?refer=chenyuz').then(function (data) {
  console.log(data)
})


// request({
//   url:'https://zhuanlan.zhihu.com/api/posts/22591792/comments',
//   qs:{
//     limit:10,
//     offset:10
//   }
// }).then(function (data) {
//   console.log(JSON.parse(data.body))
// })







