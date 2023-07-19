import { getImgCode } from '@/api/user';

const state = {
    code: undefined, // 验证码
    image: undefined, // 图片
};

const mutations = {
    SET_DATA(state, data) {
        (state.code = data.code), (state.image = data.image);
    },
};

const actions = {
    async getImgCode({ commit, state }) {
        let { code, data, message } = await getImgCode();
        if (code !== 200) {
            return false;
        }
        commit('SET_DATA', data);
        return true;
    },
};

const getters = {
    code: state => state.code,
    image: state => state.image,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
