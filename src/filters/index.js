import * as timeago from 'timeago.js'; // timeago js

/**
 * 格式化时间
 * 2022-03-22T21:18:42 格式化成下面
 * 2022.03.22
 * @param {*} time
 * @returns
 */
export function formatTime(time) {
    return time.replace(/-/g, '.').split('T')[0];
}
// export function formatTime2(time) {
//     return time.replace(/-/g, '.').split('T')[0];
// }

/**
 * 格式化时间
 * 2022-03-22T21:18:42 格式化成下面
 * 2022.03.22 21:18:42
 * @param {*} time
 * @returns
 */
export function formatTimePro(time) {
    return time.replace(/-/g, '.').replace(/T/g, ' ');
}

/**
 * @description 格式胡时间为  xxx 时间前、xxx 时间后;  "3小时前..."
 * @param {*} date 时间 YYYY-MM-dd HH:mm:ss
 */
export function formatTimeAgo(date) {
    return timeago.format(date, 'zh_CN');
}
