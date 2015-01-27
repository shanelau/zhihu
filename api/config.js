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
    zhuanlan: 'http://zhuanlan.zhihu.com/',
    topic_url:  "http://www.zhihu.com/topic/",
    post: {
        info: 'http://zhuanlan.zhihu.com/api/columns/<%=name %>/posts/<%= postID%>',
        like: 'http://zhuanlan.zhihu.com/api/columns/<%=name %>/posts/<%=postID%>/likers',
        page: 'http://zhuanlan.zhihu.com/api/columns/<%=name %>/posts',
        zhuanlan: 'http://zhuanlan.zhihu.com/api/columns/'
    },
    answer: {
        likers: 'http://www.zhihu.com/node/AnswerFullVoteInfoV2'
    },
    user: {
        info: 'http://www.zhihu.com/node/MemberProfileCardV2'
    }
}
