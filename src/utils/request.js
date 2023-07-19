/* axios js */
import axios from 'axios';
import store from '@/store';
import { MessageBox, Message } from 'element-ui';
import { getCookie } from '@/utils/cookie';
import nprogress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style

// 基础路径, 发请求的时候, 路径当中会加上
// 创建 axios 实例
const instance = axios.create({
    baseURL: '/api/v1', // 基础路径, 发请求的时候, 路径当中会加上
    timeout: 5000, // 请求超时时间 5s
});

// 请求拦截器
instance.interceptors.request.use(
    config => {
        // shows the progress bar
        nprogress.start();
        // config: 配置对象，对象里面有一个属性很重要; `headers` 请求头
        config.headers = {
            identify: localStorage.getItem('kblog-JWT') || getCookie('identify') || '',
        };
        return config;
    },
    error => {
        console.error(error);
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    response => {
        nprogress.done(); // completes the progress

        const res = response.data;
        // && res.code !== 999
        if (res.code && res.code != 200 && res.code != -1) {
            // 50008: Illegal token;
            if (res.code == 50012) {
                // to re-login
                // You have been logged out, you can cancel to stay on this page, or log in again
                MessageBox.confirm(
                    res.message || '您已退出登录，您可以取消以留在此页面，或重新登录',
                    '确认注销',
                    {
                        confirmButtonText: '确认',
                        cancelButtonText: '取消',
                        type: 'warning',
                    }
                ).then(() => {
                    store.dispatch('user/resetToken').then(() => {
                        location.reload();
                    });
                });
                return res;
            } else {
                Message({
                    message: res.msg || res.message || 'Error',
                    type: 'error',
                    duration: 5 * 1000,
                });
                return Promise.reject(new Error(res.message || res || 'Error'));
            }
            // return res;
        } else {
            if (res.code == -1) {
                Message({
                    message: res.msg || res.message || 'succeed',
                    type: 'info',
                    duration: 5 * 1000,
                });
            }
            // 成功回调; 响应数据
            return res;
        }
    },
    error => {
        nprogress.done(); // completes the progress
        console.warn(error.response);
        if (error.response.status === 500) {
            Message({
                message: '服务器内部异常，请联系管理员！',
                type: 'error',
                duration: 5 * 1000,
            });
        } else {
            Message({
                message: error.message || error || 'faile',
                type: 'error',
                duration: 5 * 1000,
            });
        }
        // 失败回调
        return Promise.reject(error.response.statusText || error.message);
    }
);

// 对外暴露
export default instance;
