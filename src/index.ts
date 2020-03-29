import { ERROR_TYPE } from "./enums/index";
import { removeLastSlash, convertMessage, getError } from "./helpers/index";
import { IMessageFromServer, IOption } from "./interfaces/index";

export class Instance {
    socketUrl: string;
    inputUrl: string;
    webSocket: WebSocket;
    pongTimer: number;
    option: IOption = {
        pingInterval: 10000,
        pingTimeout: 10000
    };
    isConnected = false;

    constructor(url: string) {
        this.inputUrl = url;
        if (url) {
            this.socketUrl = removeLastSlash(url);
        }
        else {
            throw getError(ERROR_TYPE.NoUrlProvided);
        }
    }

    init(option: IOption) {
        Object.assign(this.option, option);
        return new Promise((res, rej) => {
            fetch(`http://${this.socketUrl}/info`).then(response => {
                if (response.ok) {
                    this.establishWebSocketConnection().then(res).catch(rej);
                }
                else {
                    rej(getError(ERROR_TYPE.InvalidUrl, this.socketUrl));
                }
            }).catch(err => {
                rej(getError(ERROR_TYPE.InvalidUrl, this.inputUrl));
            });
        });
    }

    eventStore = {};

    close() {
        return new Promise((res) => {
            if (this.isConnected) {
                this.webSocket.close();
                const checkForClose = () => {
                    setTimeout(() => {
                        if (this.isConnected) {
                            res();
                        }
                        else {
                            checkForClose();
                        }
                    }, 100);
                }
                checkForClose();
            }
            else {
                res();
            }
        })
    }

    onError = function (error) {

    }

    onConnected = function () {

    }

    onDisconnected = function () {

    }


    on(event: string, callback: (data) => void) {
        if (typeof callback != "function") {
            console.warn(`invalid event handler for event ${event}`)
            return;
        }
        this.eventStore[event] = callback;
    }

    emit(eventName: string, data) {
        data = {
            dataType: typeof data,
            data: data || null,
            eventName: eventName
        }
        if (this.isConnected === true) {
            this.webSocket.send(JSON.stringify(data));
        }
    }

    sendPing() {
        setTimeout(() => {
            if (this.isConnected === true) {
                this.emit("ping", "ping");
                this.waitForPong();
            }
        }, this.option.pingInterval);
    }

    waitForPong() {
        this.pongTimer = setTimeout(() => {
            this.close();
        }, this.option.pingTimeout);
    }

    establishWebSocketConnection() {
        return new Promise((res) => {
            this.webSocket = new WebSocket("ws://" + this.socketUrl);
            this.webSocket.onopen = (evt) => {
                this.isConnected = true;
                this.onConnected();
                res();
                this.sendPing();
            };
            this.webSocket.onclose = (evt) => {
                this.isConnected = false;
                window.removeEventListener('offline', this.onOffline);
                this.onDisconnected();
            };
            this.webSocket.onmessage = (evt) => {
                const message: IMessageFromServer = JSON.parse(evt.data);
                if (this.eventStore[message.event_name]) {
                    this.eventStore[message.event_name](
                        convertMessage(message)
                    );
                }
                else {
                    switch (message.event_name) {
                        case "pong":
                            clearTimeout(this.pongTimer);
                            this.sendPing();
                            break;
                        case "ping":
                            this.emit("pong", "pong");
                            break;
                        case "error":
                            this.onError({
                                data: message.data
                            });
                    }
                }
            };
            this.webSocket.onerror = this.onError;

            window.addEventListener('offline', this.onOffline);
        })

    }

    onOffline() {
        this.close()
    }

}




