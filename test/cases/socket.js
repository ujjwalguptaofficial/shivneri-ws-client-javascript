
describe("initiate database", function () {

    var websocket;
    var lastMessage, errMessage, lastGroupMessage

    function onError(evt) {
        errMessage = evt.data
    }

    function onDisconnected(evt) {
        writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
    }

    it("connect to socket without socket server start", (done) => {
        shivneriWsClient.init("localhost:9000/chat/").then(done).catch(err => {
            console.log("hit catch")
            expect(err).to.eql({
                type: "invalid_url",
                message: "invalid web socket url localhost:9000/chat/"
            })
            done();
        });
    })

    it("connect to socket", async () => {
        // startServer();
        websocket = await shivneriWsClient.init("localhost:5000/chat/");
        expect(websocket.isConnected).to.be.an('boolean').equal(true);
        websocket.on("receiveMessage", function (message) {
            lastMessage = message;
        });
        websocket.on("groupMessage", function (message) {
            lastGroupMessage = message;
        });
        websocket.onError = onError
        websocket.onDisconnected = onDisconnected
        // done();
    })

    it("send string message", (done) => {
        const message = "Hey";
        websocket.emit("receive_string_message", message);
        setTimeout(() => {
            expect(lastMessage).to.be.an('string').equal(message);
            lastMessage = null;
            done();
        }, 100);
    })

    it("send number message", (done) => {
        const message = 12345;
        websocket.emit("receive_number_message", message);
        setTimeout(() => {
            expect(lastMessage).to.be.an('number').equal(message);
            lastMessage = null;
            done();
        }, 100);
    })

    // it("send number message but with string value", (done) => {
    //     const message = "123s45";
    //     websocket.emit("receive_number_message", message);
    //     setTimeout(() => {
    //         expect(errMessage).to.equal("")
    //         done();
    //     }, 100);
    // })

    it("send json message", (done) => {
        const message = { hello: 'world' };
        websocket.emit("receive_json_message", message);
        setTimeout(() => {
            expect(lastMessage).to.be.an('object').eql(message);
            lastMessage = null;
            done();
        }, 100);
    })

    it("send bool message", (done) => {
        const message = true;
        websocket.emit("receive_bool_message", message);
        setTimeout(() => {
            expect(lastMessage).to.be.an('boolean').equal(message);
            lastMessage = null;
            done();
        }, 100);
    })

    it("join room test", (done) => {
        websocket.emit("join_room", "test");
        setTimeout(() => {
            expect(lastMessage).to.be.an('string').equal("Welcome to group test");
            lastMessage = null;
            done();
        }, 100);
    })

    it("join room demo", (done) => {
        websocket.emit("join_room", "demo");
        setTimeout(() => {
            expect(lastMessage).to.be.an('string').equal("Welcome to group demo");
            lastMessage = null;
            done();
        }, 100);
    })

    // it("connect to socket as new client", async () => {
    //     // startServer();
    //     let messageFromServer, groupMessageFromServer
    //     const websocket2 = await shivneriWsClient.init("localhost:5000/chat/");
    //     expect(websocket2.isConnected).to.be.an('boolean').equal(true);
    //     websocket2.on("receiveMessage", function (message) {
    //         messageFromServer = message;
    //     });
    //     websocket2.on("groupMessage", function (message) {
    //         groupMessageFromServer = message;
    //     });
    //     websocket2.emit("join_group", "test");
    //     await promiseTimeout(100);
    //     // expect(messageFromServer).to.be.an('string').equal("Welcome to group test");
    //     expect(lastGroupMessage).to.equal("New member has joined")
    // })

})

