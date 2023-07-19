const date = new Date();

/**
 * @description 获取当前时间与日期 (2022-01-22)
 * @returns
 */
export function getNowFormatDate() {
    var seperator1 = '-';
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = '0' + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return `${currentdate}`;
}

/**
 * @description 获取当前时间与日期 (2022/1/22 上午1:53:45)
 * @returns
 */
export function getDateTime() {
    return date.toLocaleString();
}
