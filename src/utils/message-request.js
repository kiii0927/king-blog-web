/**
 * @description message request
 * @author king
 * @createDate 2023-4-28
 * @since 1.0
 */

import axios from 'axios';
import { MessageBox, Message } from 'element-ui';
import nprogress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { getCookie } from '@/utils/cookie';

// create axios instance
const instance = axios.create({
    baseURL: '/api/v1', // request base url
    timeout: 5000, // request timeout
});

// request interceptors
instance.interceptors.request.use(
    config => {
        // show the progress bar
        nprogress.start();

        // config headers
        config.headers = {
            // identify: localStorage.getItem('kblog-JWT') || getCookie('identify') || '',
        };
        return config;
    },
    error => {
        console.error(error);
        return Promise.reject(error);
    }
);

// response interceptors
instance.interceptors.response.use(
    response => {
        nprogress.done(); // completes the progress
        const res = response.data; // copy data
        if (res.code && res.code != 200 && res.code != -1) {
            Message({
                message: res.msg || res.message || 'Error',
                type: 'error',
                duration: 5 * 1000,
            });
            return Promise.reject(new Error(res.message || res || 'Error'));
        } else {
            if (res.code == -1) {
                Message({
                    message: res.msg || res.message || 'succeed',
                    type: 'info',
                    duration: 5 * 1000,
                });
            }
            return res;
        }
    },
    error => {
        nprogress.done(); // completes the progress
        console.log(error.message || error);
        Message({
            message: error.message || error || 'failed',
            type: 'error',
            duration: 5 * 1000,
        });
        return Promise.reject(error);
    }
);

export default instance;
