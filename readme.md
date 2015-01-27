# 知乎数据API 接口  nodejs
======
根据这些接口获取到知乎的数据，包括用户、问答、专栏、话题信息

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



##用户 API
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


##专栏文章--Post
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


### Post.zhuanlanInfo(name)
获取专栏的信息

* `name`  专栏的名字，比如 `bigertech`  

**Result**  

```
{ followersCount: 22614,
  description: '',
  creator:
  { bio: '魅族营销中心招募设计师',
  hash: '29c3654588fd4246bb90cbd345242d65',
  description: '',
  profileUrl: 'http://www.zhihu.com/people/linan',
  avatar:
  { id: '24f3a654b',
  template: 'http://pic2.zhimg.com/{id}_{size}.jpg' },
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
  template: 'http://pic3.zhimg.com/{id}_{size}.jpg' },
  commentPermission: 'anyone',
  following: false,
  postsCount: 173,
  canPost: false,
  activateAuthorRequested: false }
```

* `{Array}`   //User


## 答案 Answer
### likers
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
用户关注的话题信息  
@TODO

## 话题API - Topic

### Topic.getTopicByID(topicID[, page])
根据话题id获取该话题下的问题，话题id为唯一标识，参见话题的url
- `topicID` 话题的ID

**Example**  

请求这个话题：[生活、艺术、文化与活动]( http://www.zhihu.com/topic/19791501/questions)  
`topicID` 为 `19791501`


    var topicID = '19791501';
        zhihu.Topic.getTopicByID(topicID).then(function(result){
        console.log(result);
    });


  **Result**

  参数说明

  * `name` 话题名称
  * `page` 当前页数
  * `totalPage` 该话题下问题总页数
  * `questions` 当页问题
      -    `title` 问题名字
      -    `url` 问题链接
      -    `postTime` 问题最近更新时间


```

  { name: '生活、艺术、文化与活动',
  page: 1,
  totalPage: 47242,
  questions:
  { '0':
  { title: '为什么很多人能接受有过长期恋爱经历，却不能接受有过婚姻的人？',
  url: 'http://www.zhihu.com/question/27816723',
  postTime: '41 秒前' },
  '1':
  { title: '嘴巴张合脸颊会发出咯的声音？为什么？',
  url: 'http://www.zhihu.com/question/27816716',
  postTime: '1 分钟前' },
  '2':
  { title: '如何有效率的学好粤语呢？',
  url: 'http://www.zhihu.com/question/27816709',
  postTime: '1 分钟前' },
  '3':
  { title: 'pc ssh连接到服务器每隔几十分钟掉线一次是什么问题？',
  url: 'http://www.zhihu.com/question/27816701',
  postTime: '1 分钟前' },
  '4':
  { title: '找对象该不该看长相？',
  url: 'http://www.zhihu.com/question/27816694',
  postTime: '2 分钟前' },
  '5':
  { title: '为什么很少有关于大阪的推荐？',
  url: 'http://www.zhihu.com/question/27816691',
  postTime: '2 分钟前' },
  '6':
  { title: '遇到偷东西朋友怎么办？',
  url: 'http://www.zhihu.com/question/27816684',
  postTime: '2 分钟前' },
  '7':
  { title: '自古以来，皇帝、权贵从小接受的是什么教育？东方与西方有哪些不同？',
  url: 'http://www.zhihu.com/question/27816683',
  postTime: '2 分钟前' },
  '8':
  { title: '还有什么小说像《东莞的森林》这样文艺的？',
  url: 'http://www.zhihu.com/question/27816680',
  postTime: '2 分钟前' },
  '9':
  { title: '韩国法律里，《匹诺曹》中哥哥应该会判什么刑？',
  url: 'http://www.zhihu.com/question/27816676',
  postTime: '3 分钟前' },
  '10':
  { title: '哪位作家出车祸丧失睡眠功能了？',
  url: 'http://www.zhihu.com/question/27816674',
  postTime: '3 分钟前' },
  '11':
  { title: '文字狱与同治中兴的关系？',
  url: 'http://www.zhihu.com/question/27816663',
  postTime: '3 分钟前' },
  '12':
  { title: '为什么到了年关有关婚姻的问题就多了起来呢？',
  url: 'http://www.zhihu.com/question/27816660',
  postTime: '3 分钟前' },
  '13':
  { title: 'Windows Holographic这样的全息产品是否会扼杀儿童的想象力?',
  url: 'http://www.zhihu.com/question/27816653',
  postTime: '4 分钟前' },
  '14':
  { title: '如何评价纳兰明珠？',
  url: 'http://www.zhihu.com/question/27816651',
  postTime: '4 分钟前' },
  '15':
  { title: '如何拍出有「领导人出游」感觉的照片？',
  url: 'http://www.zhihu.com/question/27816646',
  postTime: '4 分钟前' },
  '16':
  { title: '读大学本科第二年参加学校对外的交流项目到国外学习几个月，这样获得的证书是能认证的吗？',
  url: 'http://www.zhihu.com/question/27816645',
  postTime: '4 分钟前' },
  '17':
  { title: '什么情况下应该穿囚服？什么情况可以不穿？识别服和囚服一样么？有什么区别？希望有个详细解答！?',
  url: 'http://www.zhihu.com/question/27816641',
  postTime: '5 分钟前' },
  '18':
  { title: '何谓荷花厅？',
  url: 'http://www.zhihu.com/question/27816635',
  postTime: '5 分钟前' },
  '19':
  { title: '360卫士在C盘为什么不可以删掉？',
  url: 'http://www.zhihu.com/question/27816632',
  postTime: '5 分钟前' } } }

```
