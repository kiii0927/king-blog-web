import { getToken, setToken, setJWT, getJWT, removeToken, removerJWT } from '@/utils/auth';
import { isLogin, login, getUserInfo, uploadAvatar } from '@/api/user';

const state = {
    users: {}, // user data
    role: '',
    token: getToken(),
};

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    // set user info
    SET_USER_INFO(state, data) {
        state.users = data || {};
        setToken(data.token || '');
        // if (!state.token) state.token = data.token;
        state.token = data.token;
        state.role = data.permission || '';
    },
    // set user avatar
    SET_USER_AVATAR(state, data) {
        if (state.users.avatar) {
            // state.users.avatar = data === "" data;
            state.users.avatar = data;
        }
    },
};

const actions = {
    // logout
    // remove token
    resetToken({ commit, state }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '');
            removeToken();
            removerJWT();
            resolve();
        });
    },
    // is loging
    async isLogin({ commit, state }) {
        let jwt = getJWT();
        if (jwt) {
            let { data, code, message } = await isLogin(jwt);
            // 有效 jwt
            if (data.isLogin) {
                // 存储用户信息
                commit('SET_USER_INFO', data.user);
            }
            return data;
        }
        return false;
    },
    /* login */
    async login({ commit, state }, obj) {
        let { data, code, message } = await login(obj);
        if (code !== 200) {
            return false;
        }
        // save user data
        setJWT(data.jwt);
        commit('SET_USER_INFO', data.user);
        return true;
    },
    async getUserInfo({ commit, state }, token) {
        let { data, code, message } = await getUserInfo(token);
        if (code !== 200) {
            return false;
        }
        commit('SET_USER_INFO', data);
        return true;
    },
    async updateAvatar({ commit, state }, { file, token }) {
        let { data, code, message } = await uploadAvatar(file, token);
        if (code !== 200) {
            return false;
        }
        commit('SET_USER_AVATAR', data);
        return true;
    },
};

const getters = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
