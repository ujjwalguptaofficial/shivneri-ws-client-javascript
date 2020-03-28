import { ERROR_TYPE } from "./enums/index";
import { removeLastSlash, convertMessage, getError } from "./helpers/index";
import { IMessageFromServer, IOption } from "./interfaces/index";


let inputUrl: string;
let webSocket: WebSocket;
let pongTimer: number;

let webSocketOption: IOption = {
    pingInterval: 5000,
    pingTimeout: 5000
}

export function init(url: string, option: IOption) {
    Object.assign(webSocketOption, option);
    inputUrl = removeLastSlash(url);
    return new Promise((res, rej) => {
        fetch(`http://${inputUrl}/info`).then(response => {
            if (response.ok) {
                establishWebSocketConnection(res, rej);
            }
            else {
                rej(getError(ERROR_TYPE.InvalidUrl, url));
            }
        }).catch(err => {
            rej(getError(ERROR_TYPE.InvalidUrl, url));
        });
    });
}

// class Server {
//     static instance = new Server();

// }

class SocketConnection {

    isConnected = false;
    static instance = new SocketConnection();

    eventStore = {};

    close() {
        webSocket.close();
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
        webSocket.send(JSON.stringify(data));
    }

}


function sendPing() {
    setTimeout(() => {
        SocketConnection.instance.emit("ping", "ping");
        waitForPong();
    }, webSocketOption.pingInterval);
}

function waitForPong() {
    pongTimer = setTimeout(() => {
        SocketConnection.instance.close();
    }, webSocketOption.pingTimeout);
}

function establishWebSocketConnection(res, rej) {
    webSocket = new WebSocket("ws://" + inputUrl);
    const socketConnection = SocketConnection.instance;
    webSocket.onopen = (evt) => {
        socketConnection.isConnected = true;
        socketConnection.onConnected();
        res(socketConnection);
        sendPing();
    };
    webSocket.onclose = (evt) => {
        socketConnection.isConnected = false;
        socketConnection.onDisconnected();
    };
    webSocket.onmessage = (evt) => {
        const message: IMessageFromServer = JSON.parse(evt.data);
        if (socketConnection.eventStore[message.event_name]) {
            socketConnection.eventStore[message.event_name](
                convertMessage(message)
            );
        }
        else {
            switch (message.event_name) {
                case "pong":
                    clearTimeout(pongTimer);
                    sendPing();
                    break;
                case "ping":
                    socketConnection.emit("pong", "pong");
                    break;
                case "error":
                    socketConnection.onError({
                        data: message.data
                    });
            }
        }
    };
    webSocket.onerror = socketConnection.onError;

    // window.addEventListener('online', () => );
    window.addEventListener('offline', () => {
        socketConnection.close();
    });
}

