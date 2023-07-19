const state = {
    isZIndex: true,
    websocket: null, // websocket
    notCachePages: {
        // 'NotifyReply', 'NotifySystem', 'NotifyLove', 'NotifyAttention'
        messagePage: [], // message page not cache
    },
};

const mutations = {
    SET_Z_INDEX(state, param) {
        state.isZIndex = param;
    },
    SET_WEBSOCKET(state, websock) {
        if (websock) {
            state.websocket = websock;
        }
    },
    SET_NOT_CACHE_PAGES(state) {
        state.notCachePages.messagePage = [
            'NotifyReply',
            'NotifySystem',
            'NotifyLove',
            'NotifyAttention',
        ];
    },
    SET_CACHE_MESSAGE_PAGE(state, name) {
        if (!name) {
            throw new Error('SET_CACHE_MESSAGE_PAGE `value` undefined');
        }
        // console.log(name);
        state.notCachePages.messagePage = state.notCachePages.messagePage.filter(el => el != name);
    },
    SET_CACHE_MESSAGE_PAGE_ALL(state, data) {
        if (state.notCachePages.messagePage.length) {
            !data && state.notCachePages.messagePage.splice(0); // 删除所有
        }
    },
};

const actions = {};

const getters = {
    isZIndex: state => state.isZIndex,
    notCacheMessagePage: state => state.notCachePages?.messagePage,
    isCacheMessagePageSet: state => state.notCachePages?.messagePage.length > 0,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
