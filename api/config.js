/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author liuxing
 * @date  14-11-10
 * @description  zhihu api  url template ，知乎api 接口模板
 *
 */
module.exports = {
    zhihu : 'http://www.zhihu.com',
    post:{
        info: 'http://zhuanlan.zhihu.com/api/columns/<%=name %>/posts/<%= postID%>',
        like: 'http://zhuanlan.zhihu.com/api/columns/<%=name %>/posts/<%=postID%>/likers',
    },
    answer: {
        likers: 'http://www.zhihu.com/node/AnswerFullVoteInfoV2'
    },
    user: {
        info: 'http://www.zhihu.com/node/MemberProfileCardV2'
    }
}