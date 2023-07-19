import request from '@/utils/request';

/**
 * @description 保存用户评论
 * @param {*} data
 * @returns
 */
export function save(comments) {
    return request({
        url: '/comment/save',
        method: 'post',
        data: comments,
    });
}

/**
 *  @description 保存用户回复评论
 * @param {*} comments
 * @returns
 */
export function reply(comments) {
    return request({
        url: '/comment/reply',
        method: 'post',
        data: comments,
    });
}

/**
 * @description 根据文章 ID 获取评论数据并分页
 * @param {*} page
 * @returns
 */
export function selectByBlogIdPage({ bid, page }) {
    return request({
        url: `/comment/${bid}`,
        method: 'get',
        params: page,
    });
}

/**
 * @description 根据评论模块 ID 获取更多回复评论
 * @param {*} param0
 * @returns
 */
export function selectMoreReplyByCommentId({ commentId, pageSize, dateTime }) {
    return request({
        url: '/comment/getMoreReplyByCommentId',
        method: 'get',
        params: {
            commentId,
            pageSize,
            dateTime,
        },
    });
}
