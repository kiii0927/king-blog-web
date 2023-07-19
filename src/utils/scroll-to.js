/**
 * @description 页面垂直平滑滚动到指定滚动高度
 */
export function scrollSmoothTo(position) {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback, element) {
            return setTimeout(callback, 17);
        };
    }
    // 当前滚动高度
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // 滚动step方法
    var step = function () {
        // 距离目标滚动距离
        var distance = position - scrollTop;
        // 目标滚动位置
        scrollTop = scrollTop + distance / 5;
        if (Math.abs(distance) < 1) {
            window.scrollTo(0, position);
        } else {
            window.scrollTo(0, scrollTop);
            requestAnimationFrame(step);
        }
    };
    step();
}

Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) {
        return (c / 2) * t * t + b;
    }
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
};

// requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
var requestAnimFrame = (function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        }
    );
})();

/**
 * Because it's so fucking difficult to detect the scrolling element, just move them all
 * @param {number} amount
 */
function move(amount) {
    document.documentElement.scrollTop = amount;
    document.body.parentNode.scrollTop = amount;
    document.body.scrollTop = amount;
}

function position() {
    return (
        document.documentElement.scrollTop ||
        document.body.parentNode.scrollTop ||
        document.body.scrollTop
    );
}

/**
 * @param {number} to
 * @param {number} duration
 * @param {Function} callback
 */
export function scrollTo(to, duration, callback) {
    const start = position();
    const change = to - start;
    const increment = 20;
    let currentTime = 0;
    duration = typeof duration === 'undefined' ? 500 : duration;
    var animateScroll = function () {
        // increment the time
        currentTime += increment;
        // find the value with the quadratic in-out easing function
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
        // move the document.body
        move(val);
        // do the animation unless its over
        if (currentTime < duration) {
            requestAnimFrame(animateScroll);
        } else {
            if (callback && typeof callback === 'function') {
                // the animation is done so lets callback
                callback();
            }
        }
    };
    animateScroll();
}
