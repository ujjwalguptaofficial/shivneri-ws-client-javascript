
describe("initiate database", function () {

    var wsUri = "ws://localhost:4000/chat/";
    var output, websocket;
    var lastMessage;




    function onError(evt) {
        writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
    }

    function onDisconnected(evt) {
        writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
    }

    // before(function () {
    //     console.log('initiate socket');
    //     websocket = await shivneriWsClient.init("localhost:4000/chat/");
    // })

    it("connect to socket without socket server start", (done) => {
        shivneriWsClient.init("localhost:5000/chat/").then(done).catch(err => {
            console.log("hit catch")
            expect(err).to.eql({
                type: "invalid_url",
                message: "invalid web socket url localhost:5000/chat/"
            })
            done();
        });
    })

    it("connect to socket", async () => {
        // startServer();
        websocket = await shivneriWsClient.init("localhost:4000/chat/");
        expect(websocket.isConnectionEstablished).to.be.an('boolean').equal(true);
        websocket.server.on("receiveMessage", function (message) {
            lastMessage = message;
        });
        websocket.onError = onError
        websocket.onDisconnected = onDisconnected
        // done();
    })

    it("send string message", (done) => {
        const message = "Hey";
        websocket.server.emit("receive_string_message", message);
        setTimeout(() => {
            expect(lastMessage).to.be.an('string').equal(message);
            done();
        }, 100);
    })

    it("send number message", (done) => {
        const message = "Hey";
        websocket.server.emit("receive_string_message", message);
        setTimeout(() => {
            expect(lastMessage).to.be.an('string').equal(message);
            done();
        }, 100);
    })

})

