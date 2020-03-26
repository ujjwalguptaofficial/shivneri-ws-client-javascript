import { ERROR_TYPE } from "./enums/index";
import { removeLastSlash, convertMessage } from "./helpers/index";
import { IMessageFromServer, IOption } from "./interfaces/index";


let isConnectionEstablished = false;
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
    return new Promise(function (res, rej) {
        fetch(`http://${inputUrl}/info`).then(response => {
            if (response.ok) {
                establishWebSocketConnection(res, rej);
            }
            else {
                rej(this.getError(ERROR_TYPE.InvalidUrl));
            }
        })
    });
}

class Server {
    static instance = new Server();
    eventStore = {};
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

class SocketConnection {
    static instance = new SocketConnection();
    server = Server.instance;

    close() {
        webSocket.close();
    }

    onError = function (error) {

    }

    onConnected = function () {

    }

    onDisconnected = function () {

    }

}


function sendPing() {
    setTimeout(() => {
        Server.instance.emit("ping", "ping");
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
        isConnectionEstablished = true;
        socketConnection.onConnected();
        res(socketConnection);
        sendPing();
    };
    webSocket.onclose = (evt) => {
        isConnectionEstablished = false;
        socketConnection.onDisconnected();
    };
    webSocket.onmessage = (evt) => {
        const message: IMessageFromServer = JSON.parse(evt.data);
        if (socketConnection.server.eventStore[message.event_name]) {
            socketConnection.server.eventStore[message.event_name](
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
                    Server.instance.emit("pong", "pong");
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

