import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


// 解决：Uncaught (in promise) NavigationDuplicated; 
let originalPush = Router.prototype.push; // 先保存一份 Router.prototype.push方法
let originalRepace = Router.prototype.replace;

Router.prototype.push = function push(location) {
    // call(); 篡改上下文    catch(); 捕获异常 **** 
    return originalPush.call(this, location).catch(e => e);
}
Router.prototype.replace = function replace(location) {
    return originalRepace.call(this, location).catch(e => e);
}

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
    },

    {
        path: '/',
        // redirect: '/home',
        component: () => import('@/views/home'),
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home'),
    },
    {
        path: '/timeline',
        name: 'Timeline',
        component: () => import('@/views/time-line'),
    },
    {
        path: '/files',
        name: 'Files',
        component: () => import('@/views/files'),
    },
    {
        path: '/codepen',
        name: 'Codepen',
        component: () => import('@/views/other/Codepen'),
    },
    {
        path: '/contact',
        name: 'Contact',
        component: () => import('@/views/other/Contact'),
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('@/views/other/About'),
    },
    {
        path: '/detail/:id',
        name: 'BlogDetail',
        component: () => import('@/views/blog-detail'),
    },
    {
        path: '/404',
        meta: { title: '404' },
        component: () => import('@/views/404'),
    },

    // 404 page must be placed at the end !!!
    {
        path: '*',
        redirect: '/404',
        hidden: true,
    }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

export default router;
