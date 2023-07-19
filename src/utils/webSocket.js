/* handle webSocket */

const { serverSide } = require('@/settings');

const message = require('@/store/modules/message');

const { Notification } = require('element-ui');

var websock = null;

// 初始化weosocket
const initWebSocket = function (uid) {
    if ('WebSocket' in window) {
        const wsuri = `ws://${serverSide}/v1/echo/${uid}`;
        websock = new WebSocket(wsuri);
        (websock.onopen = onopen),
            (websock.onmessage = onmessage),
            (websock.onerror = onerror),
            (websock.onclose = onclose);
    } else {
        alert('当前浏览器 Not support websocket');
    }

    return websock;
};

// 连接建立时触发
const onopen = function (event) {
    // console.log('WebSocket连接成功', event);
    console.log('WebSocket is open now.', event);
};

// 通信发生错误时触发
const onerror = function (event) {
    console.log('WebSocket error: ', event);
};

// 客户端接收服务端数据时触发
const onmessage = function (event) {
    // console.log('接收到消息的回调：', event);
    console.log('Message from server ', event.data);
    const data = JSON.parse(event.data);
    Notification.info({
        title: '消息',
        message: data.message || '有新的消息的，请查收',
        duration: 0,
    });
    message.default?.mutations?.SET_DOTS(message.default.state, data.dots);
};

// 连接关闭时触发
const onclose = function (event) {
    // console.log('断开连接', event);
    console.log('WebSocket is closed now.', event);
};

module.exports = {
    initWebSocket,
    onopen,
    onerror,
    onmessage,
};
