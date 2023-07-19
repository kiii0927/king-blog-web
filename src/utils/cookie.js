import Cookies from 'js-cookie';

/**
 * @description Create a cookie
 * @param {*} name
 * @param {*} value
 * @param {*} expires
 * @returns
 */
export function setCookie(name, value, expires = 1) {
    return Cookies.set(name, value, { expires });
}

/**
 * @description Read cookie
 * @param {*} name
 * @returns
 */
export function getCookie(name) {
    return Cookies.get(name);
}

/**
 * @description Delete cookie
 * @param {*} name
 */
export function removeCookie(name) {
    Cookies.remove(name);
}
