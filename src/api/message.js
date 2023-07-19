// import request from '@/utils/request';
import request from '@/utils/message-request';

/**
 * @description 获取 message
 * @param {*} param0
 * @returns response
 */
export function queryMessage({ uId, type, paramObj }) {
    return request({
        url: `/message/${uId}/getMessage`,
        method: 'post',
        params: {
            type,
        },
        data: paramObj,
    });
}
