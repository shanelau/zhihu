# 知乎数据API 接口
======
根据这些接口获取到知乎的数据，包括用户、问答、专栏信息

## 快速开始

```
var zhihu = require('zhihu');
```
## 获取用户的信息
```
var username = 'shanelau1021';
zhihu.User.getUserByName(name).then(function(user){
    console.log(user);
});
```

##用户
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


##专栏文章
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


### Post.likersDetail(postUrl)
获取文章的点赞者的详细信息

* `postUrl`  文章的url地址  

**Result**  

用户数组

* `{Array}`   //User


### 答案
### Answer.likers
获取答案的点赞者








