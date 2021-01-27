import { iMemorySize, iOpcodeExecutable } from './interfaces';
export declare class Computer {
    clockCounter: number;
    regs: {
        x: number;
        y: number;
    };
    private memory;
    private codeStack;
    private loopClock;
    constructor(memoryX: number, memoryY: number);
    resetMemory(memory: iMemorySize): void;
    userInput: (code: any) => void;
    computerDebug(): void;
    /**
     * Apply operation into memory and registers
     *
     * @param operation
     */
    executeInstruction: (opCode: number, operation: iOpcodeExecutable) => iOpcodeExecutable | undefined;
    loopCounter: any;
    /**
     * get a instruction thread and executes
     */
    fetchExecute(): Promise<false | undefined>;
    start(): void;
}
