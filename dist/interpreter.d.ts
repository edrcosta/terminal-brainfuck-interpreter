import { iOpcodeExecutable } from './interfaces';
export declare class InterpreterLang {
    static loop: boolean;
    static instructionTable: any;
    static getExec: (OPCODE: any) => iOpcodeExecutable;
}
