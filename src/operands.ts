export interface iInstruction {
    regs?: {
        x?: number
        y?: number
    },
    memory?: number
    loop?: boolean
    endLoop?: boolean
    print?: boolean
    clearScreen?: boolean
    reset?: boolean
}

interface iInstructionTable<iInstruction> {
    [key: number]: iInstruction
}

const instructionTable: iInstructionTable<iInstruction> = {
    // interpreter control 
    0x63: { clearScreen: true },// c, clear screen
    0x72: { reset: true },      // r, reset interpreter
    // brainfuck modified
    0x3e: { regs: { x: +1 } },  // >, move pointer to the right
    0x3c: { regs: { x: -1 } },  // <, move pointer to the left
    0x2b: { memory: +1 },       // +, increment the memory cell at the pointer
    0x2d: { memory: -1 },       // -, decrement the memory cell at the pointer
    0x5b: { loop: true },       // [, jump forward to the command after the matching ] if the memory cell at the pointer is 0
    0x5d: { endLoop: true },    // ], jump back to the command after the matching [ if the memory cell at the pointer is nonzero
    0x2e: { print: true },      // ., output the character at the memory cell at the pointer
    0x2c: { print: true },      // ,, accept one byte of input, storing its value in the memory cell at the pointer
    0x5e: { regs: { y: +1 } },  // ^ increment the Y register to change lanes (multithreading)
}

export default instructionTable