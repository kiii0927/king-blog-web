import Cookies from 'js-cookie';

const TokenKey = 'kblog-Token';
const JWTKey = 'kblog-JWT';
// const JwtKey = 'f4e2e52034348f86b67cde581c0f9eb5';

/* token */
export function getToken() {
    // return localStorage.getItem(TokenKey);
    return Cookies.get(TokenKey);
}

export function setToken(value) {
    // localStorage.setItem(TokenKey, value);
    return Cookies.set(TokenKey, value);
}

export function removeToken() {
    // localStorage.removeItem(TokenKey);
    Cookies.remove(TokenKey);
}

/* jwt */
export function getJWT() {
    let v1 = localStorage.getItem(JWTKey);
    let v2 = Cookies.get(JWTKey);
    return v2 || v1;
}

export function setJWT(value) {
    localStorage.setItem(JWTKey, value);
    return Cookies.set(JWTKey, value, { expires: 30 });
}

export function removerJWT() {
    localStorage.removeItem(JWTKey);
    Cookies.remove(JWTKey);
}
