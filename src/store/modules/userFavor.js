import { selAll, selExist, saveFavor, deleteFavor } from '@/api/userFavor';

const state = {
    favorList: [], // 用户收藏的数据
    status: 0,
};

const mutations = {
    // set favor data
    SET_FAVORLIST_LIST(state, data) {
        // data.forEach(e => state.favorList.push(e));
        state.favorList = data;
    },
    // set status
    SET_STATUS(state, data) {
        state.status = data;
    },
};

const actions = {
    async save({ commit }, obj) {
        let { data, code, message } = await saveFavor(obj);
        if (code !== 200) {
            return false;
        }
        return true;
    },

    async delete({ commit }, obj) {
        let { data, code, message } = await deleteFavor(obj);
        if (code !== 200) {
            return false;
        }
        commit('SET_FAVORLIST_LIST', data);
        return true;
    },

    async isExist({ commit }, params) {
        let { data, code, message } = await selExist(params);
        if (code !== 200) {
            return data;
        }
        return data;
    },

    async selectList({ commit }, identify) {
        let { data, code, message } = await selAll(identify);
        if (code !== 200) {
            return false;
        }
        commit('SET_FAVORLIST_LIST', data);
        return true;
    },
};

const getters = {
    favorList: state => state.favorList,
    status: state => state.status,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
