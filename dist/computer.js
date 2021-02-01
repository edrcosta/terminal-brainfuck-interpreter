"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Computer = void 0;
const interpreter_1 = require("./interpreter");
const chalk = require("chalk");
const debugger_1 = require("./debugger");
class Computer {
    constructor(memoryX, memoryY) {
        this.regs = { x: 0, y: 0 };
        this.memory = [];
        this.codeStack = [];
        this.counters = {
            stack: 0,
            program: 0,
            clock: 0,
            executed: 0
        };
        this.debugger = true;
        this.userInput = (code) => this.codeStack.push(Buffer.from(code));
        this.executeInstruction = (opCode) => {
            const operation = interpreter_1.InterpreterLang.getExec(opCode);
            if (!operation)
                console.log(chalk.red('unknow'), opCode, opCode.toString(16), opCode.toString(2));
            if (operation.regs) {
                this.regs.x += operation.regs.x ? operation.regs.x : 0;
                this.regs.y += operation.regs.y ? operation.regs.y : 0;
            }
            if (operation.memory) {
                this.memory[this.regs.y][this.regs.x] += operation.memory;
            }
            return operation;
        };
        this.start = () => setInterval(() => {
            this.fetchExecute();
        }, 1000);
        this.resetMemory({ x: memoryX, y: memoryY });
        debugger_1.Debugger.debugg(this);
    }
    resetMemory(memory) {
        for (let x = 0; x < memory.x; x++) {
            this.memory.push([]);
            for (let y = 0; y < memory.y; y++)
                this.memory[x][y] = 0;
        }
    }
    /**
     * get a instruction thread and executes
     */
    fetchExecute() {
        return __awaiter(this, void 0, void 0, function* () {
            const thread = this.codeStack[this.counters.stack];
            this.executeInstruction(thread[this.counters.program]);
            this.counters.program++;
            if (this.counters.program === thread.length) {
                this.counters.program = 0;
                this.counters.stack++;
                if (this.counters.stack === this.codeStack.length) {
                    this.counters.stack = 0;
                }
            }
            debugger_1.Debugger.debugg(this);
        });
    }
}
exports.Computer = Computer;
//# sourceMappingURL=computer.js.map