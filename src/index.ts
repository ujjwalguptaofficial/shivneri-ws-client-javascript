import { ERROR_TYPE } from "./enums/index";
import { removeLastSlash } from "./helpers/index";
import { IMessageFromServer } from "./interfaces/index";


let isConnectionEstablished = false;
let inputUrl: string;
let webSocket: WebSocket;

export function init(url: string) {
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

class SocketConnection {
    server = new Server();
}

class Server {
    eventStore = {};
    on(event: string, callback: (data) => void) {
        if (typeof callback != "function") {
            console.warn(`invalid event handler for event ${event}`)
            return;
        }
        this.eventStore[event] = callback;
    }

    emit(workerName: string, data) {
        data = {
            dataType: typeof data,
            data: data,
            eventName: workerName
        }
        webSocket.send(JSON.stringify(data));
    }
}

function establishWebSocketConnection(res, rej) {
    webSocket = new WebSocket("ws://" + inputUrl);
    const socketConnection = new SocketConnection()
    // websocket.
    webSocket.onopen = (evt) => {
        isConnectionEstablished = true;
        res(socketConnection);
    };
    webSocket.onclose = (evt) => {
        isConnectionEstablished = false;
    };
    webSocket.onmessage = (evt) => {
        const message: IMessageFromServer = JSON.parse(evt.data);
        if (socketConnection.server.eventStore[message.event_name]) {
            socketConnection.server.eventStore[message.event_name](message.data);
        }

    };
    webSocket.onerror = (evt) => {

    };
}

