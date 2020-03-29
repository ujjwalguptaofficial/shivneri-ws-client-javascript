/*!
 * @license :shivneri-ws-client - V1.0.0 - 29/03/2020
 * https://github.com/ujjwalguptaofficial/shivneri-ws-client-javascript
 * Copyright (c) 2020 @Ujjwal Gupta; Licensed APACHE 2.0
 */
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/enums/connection_state.ts":
/*!***************************************!*\
  !*** ./src/enums/connection_state.ts ***!
  \***************************************/
/*! exports provided: CONNECTION_STATE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONNECTION_STATE", function() { return CONNECTION_STATE; });
var CONNECTION_STATE;
(function (CONNECTION_STATE) {
    CONNECTION_STATE[CONNECTION_STATE["CONNECTING"] = 0] = "CONNECTING";
    CONNECTION_STATE[CONNECTION_STATE["OPEN"] = 1] = "OPEN";
    CONNECTION_STATE[CONNECTION_STATE["CLOSING"] = 2] = "CLOSING";
    CONNECTION_STATE[CONNECTION_STATE["CLOSED"] = 3] = "CLOSED";
})(CONNECTION_STATE || (CONNECTION_STATE = {}));


/***/ }),

/***/ "./src/enums/error_type.ts":
/*!*********************************!*\
  !*** ./src/enums/error_type.ts ***!
  \*********************************/
/*! exports provided: ERROR_TYPE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERROR_TYPE", function() { return ERROR_TYPE; });
var ERROR_TYPE;
(function (ERROR_TYPE) {
    ERROR_TYPE["InvalidUrl"] = "invalid_url";
    ERROR_TYPE["NoUrlProvided"] = "no_url_provided";
})(ERROR_TYPE || (ERROR_TYPE = {}));


/***/ }),

/***/ "./src/enums/index.ts":
/*!****************************!*\
  !*** ./src/enums/index.ts ***!
  \****************************/
/*! exports provided: ERROR_TYPE, CONNECTION_STATE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _error_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./error_type */ "./src/enums/error_type.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERROR_TYPE", function() { return _error_type__WEBPACK_IMPORTED_MODULE_0__["ERROR_TYPE"]; });

/* harmony import */ var _connection_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./connection_state */ "./src/enums/connection_state.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CONNECTION_STATE", function() { return _connection_state__WEBPACK_IMPORTED_MODULE_1__["CONNECTION_STATE"]; });





/***/ }),

/***/ "./src/helpers/convert_message.ts":
/*!****************************************!*\
  !*** ./src/helpers/convert_message.ts ***!
  \****************************************/
/*! exports provided: convertMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertMessage", function() { return convertMessage; });
var convertMessage = function (message) {
    switch (message.data_type) {
        case "string":
            return message.data;
        case "number":
            return Number(message.data);
        case "json":
            return JSON.parse(message.data);
        case "bool":
        case "boolean":
            return message.data === "true";
    }
    return message.data;
};


/***/ }),

/***/ "./src/helpers/get_error.ts":
/*!**********************************!*\
  !*** ./src/helpers/get_error.ts ***!
  \**********************************/
/*! exports provided: getError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getError", function() { return getError; });
/* harmony import */ var _enums_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums/index */ "./src/enums/index.ts");

function getError(err, payload) {
    var getErrorMessage = function () {
        switch (err) {
            case _enums_index__WEBPACK_IMPORTED_MODULE_0__["ERROR_TYPE"].InvalidUrl:
                return "invalid web socket url " + payload;
            case _enums_index__WEBPACK_IMPORTED_MODULE_0__["ERROR_TYPE"].NoUrlProvided:
                return "provide url in constructor";
        }
    };
    return {
        type: err,
        message: getErrorMessage()
    };
}


/***/ }),

/***/ "./src/helpers/index.ts":
/*!******************************!*\
  !*** ./src/helpers/index.ts ***!
  \******************************/
/*! exports provided: getError, removeLastSlash, convertMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _get_error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get_error */ "./src/helpers/get_error.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getError", function() { return _get_error__WEBPACK_IMPORTED_MODULE_0__["getError"]; });

/* harmony import */ var _remove_last_slash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./remove_last_slash */ "./src/helpers/remove_last_slash.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "removeLastSlash", function() { return _remove_last_slash__WEBPACK_IMPORTED_MODULE_1__["removeLastSlash"]; });

/* harmony import */ var _convert_message__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./convert_message */ "./src/helpers/convert_message.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "convertMessage", function() { return _convert_message__WEBPACK_IMPORTED_MODULE_2__["convertMessage"]; });






/***/ }),

/***/ "./src/helpers/remove_last_slash.ts":
/*!******************************************!*\
  !*** ./src/helpers/remove_last_slash.ts ***!
  \******************************************/
/*! exports provided: removeLastSlash */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeLastSlash", function() { return removeLastSlash; });
var removeLastSlash = function (url) {
    var urlLength = url.length;
    // removing / from url;
    if (url[urlLength - 1] === "/") {
        return url.substr(0, urlLength - 1);
    }
    return url;
};


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: Instance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Instance", function() { return Instance; });
/* harmony import */ var _enums_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums/index */ "./src/enums/index.ts");
/* harmony import */ var _helpers_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/index */ "./src/helpers/index.ts");


var Instance = /** @class */ (function () {
    function Instance() {
        this.option = {
            pingInterval: 10000,
            pingTimeout: 10000
        };
        this.isConnected = false;
        this.eventStore = {};
        this.onError = function (error) {
        };
        this.onConnected = function () {
        };
        this.onDisconnected = function () {
        };
    }
    Object.defineProperty(Instance.prototype, "state", {
        get: function () {
            return this.webSocket.readyState;
        },
        enumerable: true,
        configurable: true
    });
    Instance.prototype.init = function (url, option) {
        var _this = this;
        this.inputUrl = url;
        if (url) {
            this.socketUrl = Object(_helpers_index__WEBPACK_IMPORTED_MODULE_1__["removeLastSlash"])(url);
        }
        else {
            throw Object(_helpers_index__WEBPACK_IMPORTED_MODULE_1__["getError"])(_enums_index__WEBPACK_IMPORTED_MODULE_0__["ERROR_TYPE"].NoUrlProvided);
        }
        Object.assign(this.option, option);
        return new Promise(function (res, rej) {
            fetch("http://" + _this.socketUrl + "/info").then(function (response) {
                if (response.ok) {
                    _this.establishWebSocketConnection().then(res).catch(rej);
                }
                else {
                    rej(Object(_helpers_index__WEBPACK_IMPORTED_MODULE_1__["getError"])(_enums_index__WEBPACK_IMPORTED_MODULE_0__["ERROR_TYPE"].InvalidUrl, _this.socketUrl));
                }
            }).catch(function (err) {
                rej(Object(_helpers_index__WEBPACK_IMPORTED_MODULE_1__["getError"])(_enums_index__WEBPACK_IMPORTED_MODULE_0__["ERROR_TYPE"].InvalidUrl, _this.inputUrl));
            });
        });
    };
    Instance.prototype.close = function (message) {
        var _this = this;
        return new Promise(function (res) {
            if (_this.isConnected) {
                _this.webSocket.close(1000, message || "Manually closing");
                var checkForClose_1 = function () {
                    setTimeout(function () {
                        if (_this.isConnected) {
                            checkForClose_1();
                        }
                        else {
                            res();
                        }
                    }, 100);
                };
                checkForClose_1();
            }
            else {
                res();
            }
        });
    };
    Instance.prototype.on = function (event, callback) {
        if (typeof callback != "function") {
            console.warn("invalid event handler for event " + event);
            return;
        }
        this.eventStore[event] = callback;
    };
    Instance.prototype.emit = function (eventName, data) {
        data = {
            dataType: typeof data,
            data: data || null,
            eventName: eventName
        };
        this.webSocket.send(JSON.stringify(data));
    };
    Instance.prototype.sendPing = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.state === _enums_index__WEBPACK_IMPORTED_MODULE_0__["CONNECTION_STATE"].OPEN) {
                _this.emit("ping", "ping");
                _this.waitForPong();
            }
        }, this.option.pingInterval);
    };
    Instance.prototype.waitForPong = function () {
        var _this = this;
        this.pongTimer = setTimeout(function () {
            _this.close("pong not received within speified time");
        }, this.option.pingTimeout);
    };
    Instance.prototype.establishWebSocketConnection = function () {
        var _this = this;
        return new Promise(function (res) {
            _this.webSocket = new WebSocket("ws://" + _this.socketUrl);
            _this.webSocket.onopen = function (evt) {
                _this.isConnected = true;
                _this.onConnected();
                res();
                _this.sendPing();
            };
            _this.webSocket.onclose = function (evt) {
                _this.isConnected = false;
                window.removeEventListener('offline', _this.onOffline);
                _this.onDisconnected();
            };
            _this.webSocket.onmessage = function (evt) {
                var message = JSON.parse(evt.data);
                if (_this.eventStore[message.event_name]) {
                    _this.eventStore[message.event_name](Object(_helpers_index__WEBPACK_IMPORTED_MODULE_1__["convertMessage"])(message));
                }
                else {
                    switch (message.event_name) {
                        case "pong":
                            clearTimeout(_this.pongTimer);
                            _this.sendPing();
                            break;
                        case "ping":
                            _this.emit("pong", "pong");
                            break;
                        case "error":
                            _this.onError({
                                data: message.data
                            });
                    }
                }
            };
            _this.webSocket.onerror = _this.onError;
            window.addEventListener('offline', _this.onOffline);
        });
    };
    Instance.prototype.onOffline = function () {
        this.close("offline detected");
    };
    return Instance;
}());



/***/ })

/******/ });
//# sourceMappingURL=shivneri-ws-client.commonjs2.js.map