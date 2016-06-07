# 知乎数据 API 接口 (node.js)

> 知乎已经更新为 https, 本项目 \< 1.0.0 不能再使用了. 请升级

[![](https://nodei.co/npm/zhihu.png?downloads=true)](https://nodei.co/npm/zhihu/)

[![](https://travis-ci.org/iplus26/zhihu.svg)](https://travis-ci.org/iplus26/zhihu/builds)

根据这些接口获取到知乎的数据，包括以下接口：

* [User API](#user-api) (用户信息)
* [Post API](#post-api) (专栏文章)
* [Answer API](#answer-api) (答案)
* [Question API](#question-api) (问题)
* [Topic API](#topic-api) (话题)

**欢迎贡献代码，一起完善知乎的接口**

## Getting Started

```javascript
var zhihu = require('zhihu');

var zhihuId = 'shanejs';

zhihu.User.getUserByName(zhihuId).then(function(user){
  console.log(user);
});

/* You'll get
{ 
  answer:     14,
  post:       0,
  follower:   529,
  profileUrl: 'https://www.zhihu.com/people/shanejs',
  name:       '狂飙蜗牛',
  sex:        'male' 
}
*/
```

## Usage 
### User API
#### User.info(username)
根据用户名获取到用户的简要信息，`username` 为用户的唯一标识，参见个人主页的 url，或者设置中的个性域名（只能修改一次）。

比如请求这个用户 shanelau ([zhihu.com/people/shanelau](https://www.zhihu.com/people/shanelau)): 

```javascript
var zhihu = require('zhihu');
var zhihuId = 'shanelau';

zhihu.User.getUserByName(zhihuId).then(function(user){
  console.log(user);
});
```

请求成功将会返回：

```javascript
/*
 * answer     (number) 答题数量
 * post       (number) 文章数量
 * follower   (number) 跟随者数量
 * profileUrl (string) 个人主页
 * name       (string) 名字
 * sex        (string) 性别
 */

 { 
   answer:       5,
   post:         0,
   follower:     456,
   profileUrl:   'https://www.zhihu.com/people/shanelau1021',
   name:         '狂飙蜗牛',
   sex:          'male' 
 }
```



#### User.questions
用户的提问列表  
@TODO

#### User.answers
用户的回答列表  
@TODO

#### User.zhuanlansFocus
用户关注的专栏  
@TODO

#### User.topic
用户关注的话题信息  
@TODO

### Post API
#### Post.info(postUrl)
获取专栏文章的详细信息

* `postUrl`  文章的url地址

**Example**

```javascript
zhihu.Post.info(postUrl).then(function(data){
  // do something
});
```

**Result**  

* Object

[example][9]

#### Post.page(name, options)
获取专栏文章列表

* `name` 专栏的英文名字， 例如：'bigertech'
* `options`  {object}  ,默认值为10

```javascript
{
  limit: 10   // 记录数
  offset: 10  // 偏移量
}
```

**Example**

[demo][10]


#### Post.likersDetail(postUrl)
获取文章的点赞者的详细信息

* `postUrl`  文章的url地址

**Result**  

用户数组

* `{Array}`   //User


#### Post.zhuanlanInfo(name)
获取专栏的信息

* `name`  专栏的名字，比如 `bigertech`

**Result**  

```javascript
{
  followersCount: 22614,
  description: '',
  creator:
	 { bio: '魅族营销中心招募设计师',
	 hash: '29c3654588fd4246bb90cbd345242d65',
	 description: '',
	 profileUrl: 'http://www.zhihu.com/people/linan',
	 avatar:
	 { id: '24f3a654b',
	   template: 'http://pic2.zhimg.com/{id}\_{size}.jpg' },
	   slug: 'linan',
	   name: '李楠' },
	 topics: [],
	 href: '/api/columns/bigertech',
	 acceptSubmission: true,
	 slug: 'bigertech',
	 name: '笔戈科技',
	 url: '/bigertech',
	 avatar:
	 { id: 'a4bf61d95',
	   template: 'http://pic3.zhimg.com/{id}\_{size}.jpg' },
	   commentPermission: 'anyone',
	   following: false,
	   postsCount: 173,
	   canPost: false,
	   activateAuthorRequested: false }
```



### Answer API
#### Answer.voters(answerId)

用 `answerId` 获取这个回答的点赞者。注意 `answerId` 与 `url_token` 的区别，`answerId` 可以在 DOM Tree 中找到，具体的对应关系仍在探索中。知乎的一篇回答的 URL 结构一般是：

```
zhihu.com/question/12345/answer/67890
                   ^^^^^        ^^^^^
          question token        answer token
              
zhihu.com/answer/12306/voters_profile
                 ^^^^^
                 answer id
```

@TODO 实现知乎支持的更多参数，比如 offset 等

### Question API
#### Question.answers(token[, offset])
#### Question.answers(options)
获取该问题的回答列表

```javascript
var Question = require('zhihu').Question;

Question.answers('19557271');
Question.answers('19557271', 10); // start from 10
Question.answers({token: '19557271', offset: 10});
```
    

### Collection API
问题的收藏列表

`url : http://www.zhihu.com/collection/25547043?page=1`


#### Collection.getAllPageData
获取所有的页面数据,遍历所有的页面

```javascript
Collection.getAllPageData(url);
```

#### Collection.getDataByPage
获取某一页的页面数据

```javascript
var url = 'http://www.zhihu.com/collection/25547043?page=1';
Collection.getDataByPage(url);
```

#### Collection.getPagination
获取改收藏列表的分页信息

```
{
  pages: 总页数，
  current： 当前页面
}
```

### Topic API

#### Topic.getTopicByID(topicID[, page])
根据话题id获取该话题下的问题，话题id为唯一标识，参见话题的url
- `topicID` 话题的ID

**Example**  

请求这个话题：[生活、艺术、文化与活动][11]  
`topicID` 为 `19778317`

```javascript
var topicID = '19778317';
zhihu.Topic.getTopicByID(topicID).then(function(result){
  console.log(result);
});
```


  **Result**

参数说明
  
```javascript
/* You'll get
 * name:      (string) 话题名称
 * page:      (number) 当前页数
 * totalPage: (number) 该话题下问题总页数
 * questions: (object) 当页问题
 * - title:   (string) 问题名字
 * - url:     (string) 问题链接
 * - postTime:(string) 问题最近更新时间
 */

{ 
  name: '生活、艺术、文化与活动',
  page: 1,
  totalPage: 47242,
  questions:
    { '0':
      { title: '为什么很多人能接受有过长期恋爱经历，却不能接受有过婚姻的人？',
        url: 'http://www.zhihu.com/question/27816723',
        postTime: '41 秒前' },
      '19':
      { title: '360卫士在C盘为什么不可以删掉？',
        url: 'http://www.zhihu.com/question/27816632',
        postTime: '5 分钟前' } 
    } 
}
```

## 贡献者
1. shanelau
2. Ivan Jiang (iplus26)

## 更新记录
#### 2016.5.23
1. 修复 https 问题
2. 修改部分bug
3. 加入 jscs 格式化代码风格

#### 2015.10.15
1. 新增收藏列表的数据抓取
2. 查询某个收藏下的所有数据和分页数据

[8]:	http://www.zhihu.com/people/shanelau1021
[9]:	https://zhuanlan.zhihu.com/api/columns/bigertech/posts/19885136
[10]:	https://zhuanlan.zhihu.com/api/columns/bigertech/posts?limit=1&offset=10
[11]:	http://www.zhihu.com/topic/19778317/questions

