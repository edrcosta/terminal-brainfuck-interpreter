"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterpreterLang = void 0;
class InterpreterLang {
}
exports.InterpreterLang = InterpreterLang;
InterpreterLang.instructionTable = {
    0x3e: () => { return { regs: { x: +1 } }; },
    0x3c: () => { return { regs: { x: -1 } }; },
    0x5e: () => { return { regs: { y: +1 } }; },
    0x2b: () => { return { memory: +1 }; },
    0x2d: () => { return { memory: -1 }; },
    0x5b: () => { return { loop: true }; },
    0x5d: () => { return { loop: false }; }, // ]
};
InterpreterLang.getExec = (OPCODE) => InterpreterLang.instructionTable[OPCODE]();
//# sourceMappingURL=interpreter.js.map