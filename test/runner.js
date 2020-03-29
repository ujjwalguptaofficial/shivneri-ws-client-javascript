const { exec, ChildProcessWithoutNullStreams, spawn } = require("child_process");

// const runCommand = function (cmd) {
//     return new Promise(function (res, rej) {
//         var command = exec(cmd);
//         command.on("error", function (err) {
//             rej(err);
//         })
//         command.stdout.on('data', function (data) {
//             console.log(data.toString());
//         });
//         command.stderr.on('data', function (data) {
//             console.log(data.toString());
//         });
//         command.on('exit', function (code) {
//             res(code);
//         });
//     });
// }



class CommandRunner {
    // cmdString: string
    //   childProcess_: ChildProcessWithoutNullStreams
    //   onResolve_;
    //   onReject_;


    constructor(cmd) {
        this.cmdString = cmd;
        // this.event = new EventEmitter();
    }

    run() {
        return new Promise((res, rej) => {
            this.onResolve_ = res;
            this.onReject_ = rej;
            this.childProcess_ = spawn(this.cmdString, {
                detached: true,
                stdio: 'pipe',
                shell: true
            });
            //exec(this.cmdString);
            this.childProcess_.stdout.on('data', (data) => {
                console.log("data", data.toString())
            });
            this.childProcess_.stderr.on('data', (data) => {
                console.log("error", data.toString())
            });
            this.childProcess_.on("error", (err) => {
                rej(err);
            })
            this.childProcess_.on('exit', (code) => {
                res(code);
            });
        })
    }



    async quit() {
        process.kill(-this.childProcess_.pid);
    }

}

let serverCommand;

async function startServer() {
    console.log("starting server");
    serverCommand = new CommandRunner("cd server && crystal src/chat.cr");
    serverCommand.run();
}

function startTest() {
    console.log("starting test");
    setTimeout(async () => {
        await new CommandRunner("npm run karma:dev").run();
        if (serverCommand) {
            serverCommand.quit()
        }
    }, 10000);

}

startServer();
startTest();