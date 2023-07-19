import request from '@/utils/request';

/**
 * @description 查询所有类别
 * @returns
 */
export function selectAll() {
    return request({
        url: '/classify/selectAll',
        method: 'get',
    });
}

/**
 * @description 查询单个classify并分页
 * @deprecated searchSelect() 方法已将代替
 * @param {*} param0
 * @returns
 */
export function selectOneAll({ type, page, search }) {
    return request({
        url: `/classify/selectOneAll/${type}`,
        method: 'post',
        params: page,
        data: search,
    });
}

/**
 * @description 搜索查询
 * @param {*} param0
 * @returns
 */
export function searchSelect({ type, page, search }) {
    return request({
        url: `/classify/search/${type}`,
        method: 'post',
        params: page,
        data: search,
    });
}
