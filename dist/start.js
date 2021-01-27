"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const computer_1 = require("./computer");
const readline_1 = require("readline");
const instance = new computer_1.Computer(5, 5);
const rl = readline_1.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.on('line', instance.userInput);
rl.on("close", function () {
    console.log("\nTurning of computer instance, bye");
    process.exit(0);
});
instance.userInput('>+++[>+<-]');
instance.start();
//# sourceMappingURL=start.js.map