/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author liuxing
 * @date  14-11-10
 * @description
 *
 */
var Post = require('../api/Post');
var url = 'http://zhuanlan.zhihu.com/riobard/19856704';
Post.postLikersDetail(url).then(function(data){
    console.log(data);
});
