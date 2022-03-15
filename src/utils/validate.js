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
    return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @description A valid user name
 * @param {string} username
 * @returns {Boolean}
 */
export function validUsername(username) {
    const valid_map = ['admin', 'editor']
    return valid_map.indexOf(username.trim()) >= 0
}

/**
 * @description Valid length
 * @param {string} str 
 * @returns 
 */
export function validStringLength(str) {
    return str.trim().length > 1 && str.trim().length < 9;
}

/**
 * @description Whether is empty
 * @param {string} value 
 * @returns {Boolean}
 */
export function isEmpty(value) {
    const arg = value.trim();
    return arg.length < 1 || arg === "" || arg === null || arg === undefined;
}