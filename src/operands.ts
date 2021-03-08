import { iOperation, iInstructionTable } from './interfaces'

export class LangOperands 
{
    /**
     * this describes what updates the interpreter must in order to execute that instruction
     * this allow to a simple adition of new instructions into the language and also a possibility of have more complex instructions 
     * that operands represent a combination of all CPU capabilities
     */
    static instructionTable: iInstructionTable<iOperation> = {
        // default Brainfuck instruction set
        0x3e: { regs: { x: +1 } }, // >
        0x3c: { regs: { x: -1 } }, // <
        0x2b: { memory: +1 }, // +
        0x2d: { memory: -1 }, // -
        0x5b: { loop: true }, // [
        0x5d: { endLoop: true }, // ]
        0x2e: { print: true }, // .
        // just for fun extended instruction set "my own lang"
        0x5e: { regs: { y: +1 } }, // ^ increment the Y register to change lanes
    }

    static getExecutableOperand = (OPCODE: number) : iOperation => LangOperands.instructionTable[OPCODE]
}