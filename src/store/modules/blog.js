import { selectAllPage, selectDetails, recommendPost, recentNews, information } from '@/api/blog';
import { unique } from '@/utils';

const state = {
    blogList: [], // 首页文章列表展示
    recommendList: [], // 推荐文章
    recentNewsList: [], // 最新推荐
    information: {},
    list: [],
    blogs: {}, // 详情blog
    pages: 0, // 总页数
    total: 0, // 总数据
};

const mutations = {
    // set blog list
    SET_BLOG_LIST(state, data) {
        data.records.forEach(e => state.blogList.push(e));
        state.blogList = unique(state.blogList);
        state.pages = data.pages;
        state.total = data.total;
    },
    // set blogs
    SET_BLOG_BLOG(state, data) {
        state.blogs = data;
    },
    // set recommend list
    SET_RECOMMEND_LIST(state, data) {
        // data.records && (state.recommendList = data.records);
        data && (state.recommendList = data);
    },
    // set recent news list
    SET_RECENTNEWS_LIST(state, data) {
        data && (state.recentNewsList = data);
    },
    // set information
    SET_INFORMATION(state, data) {
        state.information = data;
    },
};

const actions = {
    async getInformation({ commit }) {
        let { data, code, message } = await information();
        if (code !== 200) {
            return false;
        }
        // console.log(data);
        /**
         * blog data
         * recent-news
         * recommend-post
         */
        commit('SET_RECOMMEND_LIST', data._1);
        commit('SET_RECENTNEWS_LIST', data._2);
        commit('SET_INFORMATION', data._3);
        return true;
    },
    async getAllAndPage({ commit, state }, page) {
        let { data, code, message } = await selectAllPage(page);
        if (code !== 200) {
            return false;
        }
        commit('SET_BLOG_LIST', data);
        return true;
    },

    async getBlogDetail({ commit }, id) {
        let { data, code, message } = await selectDetails(id);
        if (code !== 200) {
            return false;
        }
        commit('SET_BLOG_BLOG', data);
        return true;
    },

    async getRecommendPost({ commit }) {
        let { data, code, message } = await recommendPost();
        if (code !== 200) {
            return false;
        }
        commit('SET_RECOMMEND_LIST', data);
        return true;
    },

    async getRecentNews({ commit }) {
        let { data, code, message } = await recentNews();
        if (code !== 200) {
            return false;
        }
        commit('SET_RECENTNEWS_LIST', data.records);
        return true;
    },
};

const getters = {
    information: state => state.information || {},
    blogList: state => state.blogList || [],
    recommendList: state => state.recommendList || [],
    recentNewsList: state => state.recentNewsList || [],
    blogs: state => state.blogs || {},
    pages: state => state.pages,
    total: state => state.total,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
