
describe("initiate database", function () {

    var websocket;
    var lastMessage, errMessage, lastGroupMessage

    function onError(evt) {
        errMessage = evt.data
    }

    function onDisconnected(evt) {
        writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
    }

    it("connect to socket without socket server start", async () => {
        websocket = new shivneriWsClient.Instance("localhost:9000/chat/");
        try {
            await websocket.init()
        } catch (error) {
            console.log("hit catch", error)
            expect(error).to.be.an("object").eql({
                type: "invalid_url",
                message: "invalid web socket url localhost:9000/chat/"
            })
        }
        //    .then(done).catch(error => {

        //         done();
        //     });
    })

    it("connect to socket", async () => {
        // startServer();
        websocket = new shivneriWsClient.Instance("localhost:5000/chat/")
        await websocket.init();
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

    it("connect to socket as new client", async () => {
        // startServer();
        let messageFromServer, groupMessageFromServer
        const websocket2 = new shivneriWsClient.Instance("localhost:5000/chat/");
        websocket2.on("receiveMessage", function (message) {
            messageFromServer = message;
        });
        websocket2.on("groupMessage", function (message) {
            groupMessageFromServer = message;
        });
        websocket2.onError = function (err) {
            console.error("websocket2", err);
        }
        await websocket2.init();
        expect(websocket2.isConnected).to.be.an('boolean').equal(true);

        websocket2.emit("join_room", "test");
        await promiseTimeout(100);
        // expect(messageFromServer).to.be.an('string').equal("Welcome to group test");
        expect(lastGroupMessage).to.equal("New member has joined")
        const message = "hey i love you"
        websocket2.emit("receive_message_from_group", {
            group_name: "test",
            data: message
        })
        await promiseTimeout(100);
        expect(lastGroupMessage).to.equal(message);
        expect(groupMessageFromServer).to.equal(message);
    })

})

