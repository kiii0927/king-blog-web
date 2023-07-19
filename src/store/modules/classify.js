import { selectAll, selectOneAll, searchSelect } from '@/api/classify';

/**
 * @description 数组去重
 * @param {*} arr
 * @returns
 */
function unique(arr) {
    const res = new Map();
    return arr.filter(a => !res.has(a.id) && res.set(a.id, 1));
}

const state = {
    classifyList: [],
    blogList: [],
    type: {
        newVla: 0,
        oldVla: 0,
    },
    pages: 0, // 总页数
    total: 0, // 总数据
};

const mutations = {
    SET_CLASSIFY_LIST(state, data) {
        state.classifyList = data;
    },
    SET_BLOG_LIST(state, data) {
        if (state.type.newVla !== state.type.oldVla) {
            state.blogList = data.records;
            state.type.oldVla = state.type.newVla;
        } else {
            data.records.forEach(e => state.blogList.push(e));
            state.blogList = unique(state.blogList);
        }
        state.pages = data.pages;
        state.total = data.total;
    },
    SET_BLOG_LIST_2(state, data) {
        state.blogList.splice(0);
        state.pages = data.pages;
        state.total = data.total;
        data.records.forEach(e => state.blogList.push(e));
    },
    SET_TYPE(state, data) {
        state.blogList.splice(0);
        state.type.newVla = data;
    },
};

const actions = {
    async getAll({ commit, state }) {
        let { data, code, message } = await selectAll();
        if (code !== 200) {
            return false;
        }
        commit('SET_CLASSIFY_LIST', data);
        return true;
    },
    async getOneAll({ commit, state }, { type, page, search }) {
        // let { data, code, message } = await selectOneAll({ type, page, search });
        let { data, code, message } = await searchSelect({ type, page, search });
        if (code !== 200) {
            return false;
        }
        commit('SET_BLOG_LIST', data);
        return true;
    },

    async search({ commit }, { type, page, search }) {
        let { data, code, message } = await searchSelect({ type, page, search });
        if (code !== 200) {
            return false;
        }
        commit('SET_BLOG_LIST_2', data);
        return true;
    },
};

const getters = {
    classifyList: state => state.classifyList || [],
    blogList: state => state.blogList || [],
    total: state => state.total || 0,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
