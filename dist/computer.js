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
class Computer {
    constructor(memoryX, memoryY) {
        this.clockCounter = 0;
        this.regs = { x: 0, y: 0 };
        this.memory = [];
        this.codeStack = [];
        this.userInput = (code) => {
            this.codeStack.push(Buffer.from(code));
        };
        /**
         * Apply operation into memory and registers
         *
         * @param operation
         */
        this.executeInstruction = (opCode, operation) => {
            if (!operation) {
                console.log('unknow', opCode, opCode.toString(16), opCode.toString(2));
            }
            if (operation.regs) {
                this.regs.x += operation.regs.x ? operation.regs.x : 0;
                this.regs.y += operation.regs.y ? operation.regs.y : 0;
            }
            if (operation.memory) {
                this.memory[this.regs.y][this.regs.x] += operation.memory;
            }
            return operation;
        };
        this.loopCounter = 0;
        this.resetMemory({ x: memoryX, y: memoryY });
    }
    resetMemory(memory) {
        for (let x = 0; x < memory.x; x++) {
            this.memory.push([]);
            for (let y = 0; y < memory.y; y++)
                this.memory[x][y] = 0;
        }
    }
    computerDebug() {
        console.log('-------------------------------', '\n Registers\n\n', this.regs);
        console.log('-------------------------------', '\n Memory\n');
        this.memory.forEach((row, y) => {
            row = row.map((cell, x) => {
                if (this.regs.x === x && this.regs.y === y) {
                    return chalk.red(cell);
                }
                return cell;
            });
            console.log(row.join(','));
        });
    }
    /**
     * get a instruction thread and executes
     */
    fetchExecute() {
        return __awaiter(this, void 0, void 0, function* () {
            const nextThread = this.codeStack.pop();
            if (!nextThread)
                return false;
            let start = false;
            for (let i = 0; i < nextThread.length; i++) {
                const opCode = nextThread[i];
                const response = this.executeInstruction(opCode, interpreter_1.InterpreterLang.getExec(opCode));
                if (response.loop && start === false) {
                    start = i;
                }
                if (!response.loop && start !== false) {
                    if (this.memory[this.regs.y][this.regs.x] > 0) {
                        i = start;
                    }
                }
            }
            // nextThread.forEach((opCode: number, i: number) => {
            // })
            console.clear();
            this.computerDebug();
        });
    }
    start() {
        this.loopClock = setInterval(() => {
            this.fetchExecute();
            this.clockCounter++;
        }, 3000);
    }
}
exports.Computer = Computer;
//# sourceMappingURL=computer.js.map