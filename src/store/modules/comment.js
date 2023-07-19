import { save, reply, selectByBlogIdPage, selectMoreReplyByCommentId } from '@/api/comment';

const state = {
    total: undefined,
    pages: undefined,
    previous: undefined,
    next: undefined,
    commentList: [],
};

function SET_COMMENT_DATA_COMMON(state, data) {
    state.next = data.next;
    state.previous = data.previous;
    state.total = data.total;
    state.pages = data.pages;
}

const mutations = {
    SET_COMMENT_DATA(state, data) {
        state.commentList = data.records;
        SET_COMMENT_DATA_COMMON(state, data);
    },
    SET_COMMENT_DATA_LOAD_MORE(state, data) {
        data.records.forEach(e => state.commentList.push(e));
        SET_COMMENT_DATA_COMMON(state, data);
    },
    SET_COMMENT_LIST_SAVE(state, data) {
        if (state.commentList.length >= 5) {
            // 把最后一个元素删除
            state.commentList.pop();
        }
        // 向数组开头添加最新的评论
        state.commentList.unshift(data);
    },
    SET_COMMENT_LIST_REPLY(state, data) {
        // console.log(data);
        state.commentList.forEach((item, index) => {
            if (item.id === data.commentId) {
                if (item.replyList.length >= 5) {
                    // 把最后一个元素删除
                    state.commentList[index].replyList.pop();
                }
                // 向数组开头添加最新的评论
                state.commentList[index].replyList.unshift(data);
            }
        });
    },
    SET_COMMENT_DATA_MORE_REPLY(state, data) {
        if (data.data.records?.length) {
            state.commentList.forEach((e, i) => {
                if (e.id === data.commentId) {
                    data.data.records.forEach(e => state.commentList[i].replyList.push(e));
                    // state.commentList[i].isHasMoreReply = data.next;
                    state.commentList[i].HasMoreReply = data.next;
                }
            });
        }
    },
};

const actions = {
    async save({ commit }, comments) {
        let { data, code, message } = await save(comments);
        if (code !== 200) {
            return false;
        }
        commit('SET_COMMENT_LIST_SAVE', data);
        return true;
    },

    async reply({ commit }, comments) {
        let { data, code, message } = await reply(comments);
        if (code !== 200) {
            return false;
        }
        commit('SET_COMMENT_LIST_REPLY', data || comments);
        return true;
    },

    async select({ commit }, { bid, page }) {
        let { data, code, message } = await selectByBlogIdPage({ bid, page });
        if (code !== 200) {
            return false;
        }
        commit('SET_COMMENT_DATA', data);
        return true;
    },
    async selectLoadMore({ commit }, { bid, page }) {
        let { data, code, message } = await selectByBlogIdPage({ bid, page });
        if (code !== 200) {
            return false;
        }
        commit('SET_COMMENT_DATA_LOAD_MORE', data);
        return true;
    },
    async selectMoreReply({ commit }, { commentId, pageSize, dateTime }) {
        let { data, code, message } = await selectMoreReplyByCommentId({
            commentId,
            pageSize,
            dateTime,
        });
        if (code !== 200) {
            return false;
        }
        commit('SET_COMMENT_DATA_MORE_REPLY', { data, commentId });
    },
};

const getters = {
    commentList: state => state.commentList || [],
    total: state => state.total || 0,
    pages: state => state.pages || 0,
    next: state => state.next || false,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
