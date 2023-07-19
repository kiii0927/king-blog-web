import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// 解决：Uncaught (in promise) NavigationDuplicated;
const originalPush = Router.prototype.push; // 先保存一份 Router.prototype.push方法
const originalRepace = Router.prototype.replace;

Router.prototype.push = function push(location) {
    // call(); 篡改上下文    catch(); 捕获异常 ****
    return originalPush.call(this, location).catch(e => e);
};
Router.prototype.replace = function replace(location) {
    return originalRepace.call(this, location).catch(e => e);
};

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
const constantRoutes = [
    {
        path: '/',
        // redirect: '/home',
        name: 'Home',
        component: () => import('@/views/home'),
    },
    {
        path: '/home',
        name: 'Home',
        meta: { keepAlive: true },
        component: () => import('@/views/home'),
    },
    {
        path: '/timeline',
        name: 'Timeline',
        meta: { title: '时间线', keepAlive: true },
        component: () => import('@/views/time-line'),
    },
    {
        path: '/files',
        name: 'Files',
        meta: { title: '分类', keepAlive: true },
        component: () => import('@/views/files'),
    },
    {
        path: '/codepen',
        name: 'Codepen',
        meta: { title: 'Codepen', keepAlive: true },
        component: () => import('@/views/other/Codepen'),
    },
    {
        path: '/barrage',
        name: 'Barrage',
        meta: { title: '弹幕', keepAlive: true },
        component: () => import('@/views/other/barrage'),
    },
    {
        path: '/contact',
        name: 'Contact',
        meta: { title: '联系', keepAlive: true },
        component: () => import('@/views/other/Contact'),
    },
    {
        path: '/about',
        name: 'About',
        meta: { title: '关于', keepAlive: true },
        component: () => import('@/views/other/About'),
    },
    {
        path: '/login',
        name: 'Login',
        meta: { title: '登录', keepAlive: true },
        component: () => import('@/views/login'),
    },
    {
        path: '/authlogin',
        name: 'AuthLogin',
        meta: { title: '第三方登录', keepAlive: false },
        component: () => import('@/views/login/components/AuthLoginTransfer'),
    },
    {
        path: '/detail/:id',
        name: 'BlogDetail',
        meta: { title: '文章详情' },
        component: () => import('@/views/blog-detail'),
    },
    {
        path: '/test',
        name: 'Test',
        meta: { title: 'test', keepAlive: true },
        component: () => import('@/views/test.vue'),
    },
    {
        path: '/fake',
        name: 'Fake',
        meta: { title: 'fake', keepAlive: true },
        component: () => import('@/views/fake.vue'),
    },
    {
        path: '/404',
        meta: { title: '404', keepAlive: true },
        component: () => import('@/views/404'),
    },

    // 404 page must be placed at the end !!!
    {
        path: '*',
        redirect: '/404',
        hidden: true,
    },
];

/**
 * Login is required to access
 */
export const authRoutes = [
    {
        path: '/user',
        name: 'User',
        meta: { title: '用户', keepAlive: true },
        component: () => import('@/views/user'),
        children: [
            {
                path: '/user/home',
                name: 'UserHome',
                meta: { title: '用户首页', keepAlive: true },
                component: () => import('@/views/user/home'),
            },
            {
                path: '/user/profile',
                name: 'UserProfile',
                meta: { title: '用户信息', keepAlive: true },
                component: () => import('@/views/user/profile'),
            },
            {
                path: '/user/favor',
                name: 'UserFavor',
                meta: { title: '用户收藏', keepAlive: true },
                component: () => import('@/views/user/favor'),
            },
        ],
    },
    {
        path: '/notify',
        redirect: '/notify/reply',
        name: 'Notify',
        meta: { title: '消息中心', keepAlive: true },
        component: () => import('@/views/notify'),
        children: [
            {
                path: '/notify/reply',
                name: 'NotifyReply',
                meta: { title: '回复-消息', keepAlive: true },
                component: () => import('@/views/notify/reply'),
            },
            {
                path: '/notify/love',
                name: 'NotifyLove',
                meta: { title: '收到的赞-消息', keepAlive: true },
                component: () => import('@/views/notify/love'),
            },
            {
                path: '/notify/attention',
                name: 'NotifyAttention',
                meta: { title: '新增粉丝-消息', keepAlive: true },
                component: () => import('@/views/notify/attention'),
            },
            {
                path: '/notify/system',
                name: 'NotifySystem',
                meta: { title: '通知-消息', keepAlive: true },
                component: () => import('@/views/notify/system'),
            },
            {
                path: '/notify/setting',
                name: 'NotifySetting',
                meta: { title: '设置-消息', keepAlive: true },
                component: () => import('@/views/notify/setting'),
            },
        ],
    },
];

const createRouter = () =>
    new Router({
        // mode: 'history', // require service support
        scrollBehavior: (to, from, savedPosition) => {
            // see: https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html
            if (savedPosition) return savedPosition;
            let y = 0;
            if (to.path.indexOf('/user/profile') !== -1) {
                y = 400;
            }

            // 滚动到顶部
            return { y, behavior: 'smooth' };
        },
        routes: [...authRoutes, ...constantRoutes],
    });

const router = createRouter();

// detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

export default router;
