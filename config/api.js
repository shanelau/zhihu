/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author liuxing
 * @date  14-11-10
 * @description  zhihu api  url template ，知乎api 接口模板
 *
 */
'use strict';

const zhihu = 'https://www.zhihu.com',
  zhuanlan = 'https://zhuanlan.zhihu.com';

module.exports = {
  zhihu: zhihu,
  zhuanlan: zhuanlan,
  topic_url: zhihu + '/topic/',
  post: {
    info: zhuanlan + '/api/posts/<%= postID%>',
    likers: zhuanlan + '/api/posts/<%=postID%>/likers',
    page: zhuanlan + '/api/columns/<%=name %>/posts',
    zhuanlan: zhuanlan + '/api/columns/',
    comments:zhuanlan+'/api/posts/<%=postID%>/comments'
  },
  answer: {
    likers: zhihu + '/node/AnswerFullVoteInfoV2',
    voters: zhihu + '/answer/<%= answerId %>/voters_profile',
  },
  user: {
    info: zhihu + '/node/MemberProfileCardV2',
  },
  collection: {
    // full url: http://www.zhihu.com/collection/25547043?page=1
    url: zhihu + '/collection/',
  },
};
