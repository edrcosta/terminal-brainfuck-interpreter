"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterpreterLang = void 0;
class InterpreterLang {
}
exports.InterpreterLang = InterpreterLang;
InterpreterLang.loop = false;
InterpreterLang.instructionTable = {
    0x3e: () => { return { loop: InterpreterLang.loop, regs: { x: +1 } }; },
    0x3c: () => { return { loop: InterpreterLang.loop, regs: { x: -1 } }; },
    0x5e: () => { return { loop: InterpreterLang.loop, regs: { y: +1 } }; },
    0x2b: () => { return { loop: InterpreterLang.loop, memory: +1 }; },
    0x2d: () => { return { loop: InterpreterLang.loop, memory: -1 }; },
    0x5b: () => { return { loop: InterpreterLang.loop = true }; },
    0x5d: () => { return { loop: InterpreterLang.loop = false }; }, // ]
};
InterpreterLang.getExec = (OPCODE) => InterpreterLang.instructionTable[OPCODE]();
//# sourceMappingURL=interpreter.js.map