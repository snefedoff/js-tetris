function throttle(callback, limit, context) {
    var wait = false;
    return function () {
        if (!wait) {
            callback.apply(context, arguments);
            wait = true;
            setTimeout(function () {
                wait = false;
            }, limit);
        }
    }
}

export {throttle};
