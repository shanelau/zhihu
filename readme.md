# 知乎数据API 接口 powered by  nodejs
======
根据这些接口获取到知乎的数据，包括用户、问答、专栏信息

**欢迎贡献代码，一起完善知乎的接口**

## 快速开始

```
var zhihu = require('zhihu');
```
## demo
获取用户的信息  

```
var username = 'shanelau1021';
zhihu.User.getUserByName(name).then(function(user){
    console.log(user);
});
```



##用户 API--User
### User.getUserByName(username)
根据用户名获取到用户的信息，用户名为用的唯一标识，参见个人主页的url,或者设置中的个性网站  

* `username`  //用户位置标识

**Example**  
请求这个用户：[http://www.zhihu.com/people/shanelau1021](http://www.zhihu.com/people/shanelau1021)  
`name` 为 `shanelau1021`

```
var nam = 'shanelau1021';
zhihu.User.getUserByName(name).then(function(user){
    console.log(user);
});

```
**Result**

参数说明

* `answer`答题数量
* `post` 文章数量
* `follower` 跟随者数量
* `profileUrl` 个人主页
* `name` 名字
* `sex`性别

```
{ answer: 5,
  post: 0,
  follower: 456,
  profileUrl: 'http://www.zhihu.com/people/shanelau1021',
  name: '狂飙蜗牛',
  sex: 'male' }

```
### questions
用户的提问列表
@TODO

### answers
用户的回答列表
@TODO
### zhuanlansFocus
用户关注的专栏
@TODO

### topic
## 用户关注的话题信息
@TODO



##专栏文章 API--Post
### Post.info(postUrl)
获取专栏文章的详细信息

* `postUrl`  文章的url地址    



**Example**

```
zhihu.Post.info(postUrl).then(function(data){
	//do something
});
```
** Result **  

* Object

[example](http://zhuanlan.zhihu.com/api/columns/bigertech/posts/19885136) 

### Post.page(name,options)
获取专栏文章列表

* `name` 专栏的英文名字， 例如：'bigertech'
*  `options`  {object}  ,默认值为10

   ```
     {
             limit: 10   //记录数 
             offset: 10  // 偏移量
     }
   ```

**Example**

[demo](http://zhuanlan.zhihu.com/api/columns/bigertech/posts?limit=1&offset=10)






### Post.likersDetail(postUrl)
获取文章的点赞者的详细信息

* `postUrl`  文章的url地址  

**Result**  

用户数组

* `{Array}`   //User


## 答案 API
### Answer.likers
获取答案的点赞者  
@TODO 

## 问题API--Question
### focus
问题的关注列表  
@TODO 

### collection
问题的收藏列表

### info
问题的详细信息
@TODO







