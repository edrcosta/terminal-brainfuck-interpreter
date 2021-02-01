import { iMemorySize, iOperation } from './interfaces';
export declare class Computer {
    regs: {
        x: number;
        y: number;
    };
    memory: any;
    codeStack: any;
    counters: {
        stack: number;
        program: number;
        clock: number;
        executed: number;
    };
    debugger: boolean;
    constructor(memoryX: number, memoryY: number);
    resetMemory(memory: iMemorySize): void;
    userInput: (code: any) => any;
    executeInstruction: (opCode: number) => iOperation | undefined;
    /**
     * get a instruction thread and executes
     */
    fetchExecute(): Promise<void>;
    start: () => number;
}
