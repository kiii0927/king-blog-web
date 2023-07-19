/**
 * @description 数组去重
 * @param {*} arr 数组
 * @returns array
 */
export function unique(arr) {
    return [...new Set(arr.map(v => JSON.stringify(v)))].map(s => JSON.parse(s));
}

/**
 * @description 数组对象去重
 * @param {*} arr 数组对象
 * @returns array
 */
export function arrObjUnique(arr) {
    const val = {};
    return arr.reduceRight((accumulator, currentValue) => {
        val[currentValue.id || currentValue.source]
            ? ''
            : (val[currentValue.id || currentValue.source] =
                  true && accumulator.push(currentValue));
        return accumulator;
    }, []);
}

/**
 * @description 清空对象属性的值
 * @param {*} obj
 * @returns
 */
export function clearObj(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            delete obj[key];
        }
    }
    return obj;
}
