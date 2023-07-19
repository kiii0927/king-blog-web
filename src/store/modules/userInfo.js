import { selectUserInfo, selectUserSex, updateUserInfo } from '@/api/userInfo';

const state = {
    UserInfo: {}, // 用户数据
    gender: undefined, // 性别
};

const mutations = {
    // set user data
    SET_USER_DATA(state, data) {
        state.UserInfo = data || {};
        state.gender = data.sex || data.gender;
    },
};

const actions = {
    async getUserInfo({ commit, state }, token) {
        let { data, code, message } = await selectUserInfo(token);
        if (code !== 200) {
            return false;
        }
        commit('SET_USER_DATA', data);
        return true;
    },

    // 修改用户
    async update({ commit }, user) {
        let { data, code, message } = await updateUserInfo(user);
        if (code !== 200) {
            return false;
        }
        commit('SET_USER_DATA', data);
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
