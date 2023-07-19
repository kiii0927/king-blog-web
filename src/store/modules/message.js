import { queryMessage } from '@/api/message';

const state = {
    scrollResult: {},
    dots: {
        reply: false,
        love: false,
        attention: false,
        system: false,
    },
    noMore: false,
};

const mutations = {
    SET_RESULT(state, data) {
        if (data) {
            state.scrollResult = data;
            if (data.list) {
                if (data.list.length < 20) {
                    state.noMore = true;
                } else {
                    state.noMore = false;
                }
            } else {
                state.noMore = true;
            }
        }
    },

    SET_DOTS(state, data) {
        // console.log(state, data);
        if (state && data) {
            state.dots = data;
            localStorage.setItem('dots', JSON.stringify(data));
        }
    },

    SET_DOTS_SINGLE(state, { name, data }) {
        if (!name) {
            throw new Error('SET_DOTS_SINGLE `value` undefined');
        }
        state.dots[name] = data || false;
        localStorage.setItem('dots', JSON.stringify(state.dots));
    },
};

const actions = {
    async getMessage({ commit, state }, { uId, type, paramObj }) {
        let { code, data, message } = await queryMessage({ uId, type, paramObj });
        if (code !== 200) {
            return Promise.reject(new Error(message));
        }
        commit('SET_RESULT', data);
        return Promise.resolve({ code, data, message });
    },
};

const getters = {
    scrollResult: state => state.scrollResult || {},
    msgList: state => state.scrollResult.list || [],
    minTime: state => state.scrollResult.minTime || 0,
    offset: state => state.scrollResult.offset || 0,
    noMore: state => state.noMore,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
