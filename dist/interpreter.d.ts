import { iOperation, iInstructionTable } from './interfaces';
export declare class InterpreterLang {
    static instructionTable: iInstructionTable<Function>;
    static getExec: (OPCODE: any) => iOperation;
}
