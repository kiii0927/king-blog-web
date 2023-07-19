import router from './router';
import { Notification } from 'element-ui';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { getToken } from '@/utils/auth'; // get token from cookie
import getPageTitle from '@/utils/get-page-title';
import { authRoutes } from '@/router';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

let authList = []; // Login is required to access
filterRouter(authRoutes);

/**
 * @description 过滤路由
 * @param {*} router
 * @param {*} array
 */
function filterRouter(array) {
    array.forEach(e => {
        if (e.children) {
            authList.push(e.path);
            filterRouter(e.children);
        } else {
            authList.push(e.path);
        }
    });
    return authList;
}

router.beforeEach((to, from, next) => {
    // start progress bar
    NProgress.start();


    // set page title
    document.title = getPageTitle(to.meta.title);

    // determine whether the user has logged in
    const hasToken = getToken();

    if (hasToken) {
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({ path: '/' });
            NProgress.done();
        } else next();
    } else {
        /* has no token */
        if (authList.includes(to.path)) {
            // console.log('没有权限访问其他的页面, 将被被重定向到登录页面');
            Notification.warning({
                title: '警告',
                message: '请先登录！',
            });
            NProgress.done();
            // pages that do not have permission to access are redirected to the login page.
            // next(`/login?redirect=${to.path}`);
            next(`/login`);
        } else next();
    }
});

router.afterEach(() => {
    // finish progress bar
    NProgress.done();
});

export function filterAsyncRoutes(routes, roles) {
    const res = [];
    routes.forEach(route => {
        const tmp = { ...route };
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles);
            }
            res.push(tmp);
        }
    });
    return res;
}
