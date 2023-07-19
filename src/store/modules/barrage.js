import { say, query, memorial } from '@/api/barrage';

const state = {
    /* messageList: [
        {
            id: '001',
            name: 'king',
            avatar: 'https://q1.qlogo.cn/g?b=qq&nk=3511896104&s=100',
            province: '湖南',
            time: '2023-05-29 19:40:50',
            message: '弹幕快慢、字体颜色都是随机的是吗？',
            children: [
                {
                    id: '001-1',
                    name: '心月云',
                    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=3223398545&s=100',
                    province: '贵州',
                    time: '2023-05-29 19:49:16',
                    message: '嗯嗯',
                },
            ],
        },
        {
            id: '002',
            name: 'king',
            avatar: 'https://q1.qlogo.cn/g?b=qq&nk=3511896104&s=100',
            province: '湖南',
            time: '2023-05-29 19:40:50',
            message: '弹幕快慢、字体颜色都是随机的是吗？',
            children: [
                {
                    id: '002-1',
                    name: '心月云',
                    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=3223398545&s=100',
                    province: '贵州',
                    time: '2023-05-29 19:49:16',
                    message: '嗯嗯1',
                },
            ],
        },
        {
            id: '003',
            name: 'king',
            avatar: 'https://q1.qlogo.cn/g?b=qq&nk=3511896104&s=100',
            province: '湖南',
            time: '2023-05-29 19:40:50',
            message: '弹幕快慢、字体颜色都是随机的是吗？',
            children: [],
        },
        {
            id: '004',
            name: 'king',
            avatar: 'https://q1.qlogo.cn/g?b=qq&nk=3511896104&s=100',
            province: '湖南',
            time: '2023-05-29 19:40:50',
            message: '弹幕快慢、字体颜色都是随机的是吗？',
            children: [],
        },
        {
            id: '005',
            name: 'king',
            avatar: 'https://q1.qlogo.cn/g?b=qq&nk=3511896104&s=100',
            province: '湖南',
            time: '2023-05-29 19:40:50',
            message: '弹幕快慢、字体颜色都是随机的是吗？',
            children: [
                {
                    id: '005-1',
                    name: '心月云',
                    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=3223398545&s=100',
                    province: '贵州',
                    time: '2023-05-29 19:49:16',
                    message: '嗯嗯',
                },
            ],
        },
    ], */
    messageList: [],
    memorials: {},
    pages: 0,
    total: 0,
    extras: {},
    waitBulletList: [],
    loading: true,
};

const mutations = {
    SET_LOADING(state, val) {
        state.loading = val;
    },
    SET_WAIT_BULLET_LIST(state, data) {
        if (!data) {
            state.waitBulletList.splice(0);
        } else {
            state.waitBulletList.push(data);
        }
    },
    SET_MEMORIALS(state, data) {
        data && (state.memorials = data);
    },
    SET_MESSAGE_LIST(state, data) {
        if (data) {
            data.total && (state.total = data.total), data.pages && (state.pages = data.pages);
            // 删除数组中所有的数据
            data.records && state.messageList.splice(0), (state.messageList = data.records);
            data.extras && (state.extras = data.extras);
        }
    },
    COMMENT_SET_MESSAGE_LIST(state, data) {
        if (data) {
            // 超过分页大小时删除最后一个
            state.messageList.length >= 5 && state.messageList.pop();
            // 向头部添加
            state.messageList.unshift(data);
        }
    },
    REPLY_SET_MESSAGE_LIST(state, data) {
        if (data) {
            state.messageList.some(el => {
                if (el.commentId == data.commentId) {
                    el.replyList?.length >= 5 && el.replyList?.pop();
                    el.replyList?.unshift(data);
                }
            });
        }
    },
};

const actions = {
    async addBarrage({ commit, state }, params) {
        let { data, code, message } = await say(params);
        if (code !== 200) {
            return Promise.reject(new Error(message));
        }
        if (params.type === 'comment') {
            commit('COMMENT_SET_MESSAGE_LIST', data);
        } else {
            commit('REPLY_SET_MESSAGE_LIST', data);
        }
        commit('SET_WAIT_BULLET_LIST', data);
        return Promise.resolve({ data, code, message });
    },

    async getBarrage({ commit, state }, params) {
        let { data, code, message } = await query(params);
        if (code !== 200) {
            return Promise.reject(new Error(message));
        }
        commit('SET_MESSAGE_LIST', data);
        return Promise.resolve({ data, code, message });
    },

    async getMemorial({ commit, state }, params) {
        let { data, code, message } = await memorial(params);
        if (code !== 200) {
            return Promise.reject(new Error(message));
        }
        commit('SET_MEMORIALS', data);
        return Promise.resolve({ data, code, message });
    },
};

const getters = {
    messageList: state => state.messageList,
    pages: state => state.pages,
    total: state => state.total,
    memorials: state => state.memorials,
    extras: state => state.extras,
    waitBulletList: state => state.waitBulletList,
    loading: state => state.loading,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
