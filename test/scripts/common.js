function GetBrowserName() {
    return (navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf("OPR")) != -1 ? "Opera" : navigator.userAgent.indexOf("Chrome") != -1 ? "Chrome" : navigator.userAgent.indexOf("Safari") != -1 ? "Safari" : navigator.userAgent.indexOf("Firefox") != -1 ? "Firefox" : navigator.userAgent.indexOf("MSIE") != -1 || !!document.documentMode == !0 ? "IE" : "unknown"
}

function promiseTimeout(timeout) {
    return new Promise((res) => {
        setTimeout(() => {
            res();
        }, timeout);
    })
}