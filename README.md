[![GitHub version](https://badge.fury.io/gh/ujjwalguptaofficial%2Fshivneri-ws-client-javascript.svg)](https://badge.fury.io/gh/ujjwalguptaofficial%2Fshivneri-ws-client-javascript) ![Node.js CI](https://github.com/ujjwalguptaofficial/shivneri-ws-client-javascript/workflows/Node.js%20CI/badge.svg)  

# shivneri-ws-client-javascript
Shivneri framework web socket client library for javascript


# Installation 

* npm - npm i shivneri-ws-client
* cdn - https://cdn.jsdelivr.net/npm/shivneri-ws-client/dist/shivneri-ws-client.js
* raw file - https://github.com/ujjwalguptaofficial/shivneri-ws-client-javascript/releases

# How to use

```
var socket = new shivneriWsClient.Instance();

// subscribe to event message which will be emited from server        
socket.on("message", (msg) => {
   console.log("message is", msg);
})

// connect to server

await socket.init(`localhost:4000/chat`);

// emit an event message to server
socket.emit("message","Hello world")

```

# Docs

## create instance

```
 var socket = new shivneriWsClient.Instance();
```

## subsribe to events

```
// subscribe to event message which will be emited from server        
socket.on("message", (msg) => {
   console.log("message is", msg);
})

```

## send a message to server

```
// emit an event message to server
socket.emit("message","Hello world")
```

## sunscribe to system events

```
socket.onConnected = () => {
    console.log("connected")
}

socket.onDisconnected = () => {
    console.log("Disconnected")
}

socket.onError = (evt) => {
    console.log("error message is", evt.data)
}

```

## close connection

```
socket.close();
```

## Socket state

```
connectionState = socket.state;
if(connectionState==0){
    console.log("connecting")
}
else if(connectionState==1){
    console.log("connected")
}
else if(connectionState==2){
    console.log("closing")
}
else if(connectionState==3){
    console.log("closed")
}
```

## confiure ping pong time

By default pingInterval is `10ms` & pingTimeout is `10ms`

```
socket.init("websocket url", {
    pingInterval: 5000,
    pingTimeout: 5000
})
```


