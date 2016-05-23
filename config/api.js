/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author liuxing
 * @date  14-11-10
 * @description  zhihu api  url template ，知乎api 接口模板
 *
 */
module.exports = {
  zhihu: 'http://www.zhihu.com',
  zhuanlan: 'https://zhuanlan.zhihu.com/',
  topic_url: 'https://www.zhihu.com/topic/',
  post: {
    info: 'https://zhuanlan.zhihu.com/api/posts/<%= postID%>',
    likers: 'https://zhuanlan.zhihu.com/api/posts/<%=postID%>/likers',
    page: 'https://zhuanlan.zhihu.com/api/columns/<%=name %>/posts',
    zhuanlan: 'https://zhuanlan.zhihu.com/api/columns/',
  },
  answer: {
    likers: 'https://www.zhihu.com/node/AnswerFullVoteInfoV2',
  },
  user: {
    info: 'https://www.zhihu.com/node/MemberProfileCardV2',
  },
  collection: {
    // full url: http://www.zhihu.com/collection/25547043?page=1
    url: 'https://www.zhihu.com/collection/',
  },
};
