/**
 * Created by on 2022/1/19.
 *
 */

/**
 * @description Correct link
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
    return /^(http|https?:|mailto:|tel:)/.test(path);
}

/**
 * @description A valid user name
 * @param {string} username
 * @returns {Boolean}
 */
export function validUsername(username) {
    const valid_map = ['admin', 'editor'];
    return valid_map.indexOf(username.trim()) >= 0;
}

/**
 * @description Valid length  1 - 8
 * @param {string} str
 * @returns
 */
export function validStringLength(str) {
    return str.trim().length > 0 && str.trim().length < 9;
}

/**
 * @description Whether is empty
 * @param {string} value
 * @returns {Boolean}
 */
export function isEmpty(value) {
    const arg = value.trim();
    return arg.length < 1 || arg === '' || arg === null || arg === undefined;
}

/**
 * @description 检测密码强度
 * @param {*} str
 * @returns
 */
export function checkPass(str) {
    // /^[a-z0-9_-]{6,18}$/
    var Lv = 0;
    if (str.length < 6) {
        return Lv;
    }
    if (/[0-9]/.test(str)) {
        Lv++;
    }
    if (/[a-z]/.test(str)) {
        Lv++;
    }
    if (/[A-Z]/.test(str)) {
        Lv++;
    }
    if (/[\.|-|_]/.test(str)) {
        Lv++;
    }
    return Lv;
}

/**
 * @description 检查邮箱格式是否正确
 * @param {String} s
 * @returns Boolean
 */
export function isEmail(s) {
    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s);
}

/**
 * @description 校验年龄是否合法   1 - 99
 * @param {*} age
 * @returns
 */
export function validAge(age) {
    return age < 0 || age > 100;
}

/**
 * @description 校验手机号码是否合法
 * @param {*} phone
 * @returns
 */
export function validPhone(phone) {
    return /^[1][3-9][\d]{9}/.test(phone);
}

/**
 * @description 校验文件后缀名是否合法
 * @param {*} fileName
 * @returns
 */
export function validSuffix(fileName) {
    if (!fileName) {
        console.warn('`fileName` not undefined');
        return false;
    }
    let suffix = `(bmp|jpg|png|tif|gif|pcx|tga|exif|fpx|svg|psd|cdr|pcd|dxf|ufo|eps|ai|raw|WMF|webp|jpeg)`;
    let regular = new RegExp(`.*\.${suffix}`);
    return regular.test(fileName);
}

