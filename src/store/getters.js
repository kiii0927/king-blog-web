const getters = {
    role: state => state.user.role || '',
    users: state => {
        let avatar = state.user?.users?.avatar || '';
        let flag =
            avatar.includes('/upload/') && !avatar.includes('/api') && !avatar.includes('htpp'); // 标识是在本地，自己上传的头像
        if (flag) {
            state.user.users.avatar = `/api${avatar}`;
        }
        return state.user?.users || {};
    },
    username: state => state.user.users.username || '',
    sex: state => state.userInfo?.gender,
    avatar: state => {
        let avatar = state.user.users.avatar || '';
        let flag =
            avatar.includes('/upload/') && !avatar.includes('/api') && !avatar.includes('htpp'); // 标识是在本地，自己上传的头像
        return flag ? `/api${avatar}` : avatar;
    },
    email: state => state.user.users.email || '',
    token: state => state.user.token || undefined,
    // uId: state => state.user.users.id || 0, // CommentList.vue
    uId: state => state.user.token, 
    websocket: state => state.common?.websocket || null,
    dots: state => state.message?.dots || {},
};
export default getters;
