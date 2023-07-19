import request from '@/utils/request';

/**
 * @description 查询所有并分页
 * @param {*} page
 * @returns
 */
export function selectAllPage(page) {
    return request({
        url: '/blog/selectAll',
        method: 'get',
        params: page,
    });
}

/**
 * @description 通过 ID 获取 blog 详情
 * @param {*} id
 * @returns
 */
export function selectDetails(id) {
    return request({
        url: `/blog/getBlogDetail/${id}`,
        method: 'get',
    });
}

/**
 * @description 更新 blog views
 * @param {*} id
 * @returns
 */
export function updateViews(id) {
    return request({
        url: `/blog/updateViews/${id}`,
        method: 'put',
    });
}

/**
 * @description 推荐文章
 * @returns
 */
export function recommendPost() {
    return request({
        url: '/blog/recommend',
        method: 'get',
    });
}

/**
 * @description 获取最新动态
 * @returns
 */
export function recentNews() {
    return request({
        url: '/blog/recentNews',
        method: 'get',
    });
}

/**
 * @description 获取 blog 数量\访问\评论  数据
 * @returns
 */
export function information() {
    return request({
        url: '/blog/information',
        method: 'get',
    });
}

/**
 * @description 获取时间轴数据
 * @returns
 */
export function archives(params) {
    return request({
        url: '/blog/archives',
        method: 'get',
        params,
    });
}
