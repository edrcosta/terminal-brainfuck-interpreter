import { iOpcodeExecutable } from './interfaces'

export class InterpreterLang
{
    static loop = false

    static instructionTable : any = {
        0x3e: () => { return  { loop: InterpreterLang.loop, regs: { x: +1 } } },
        0x3c: () => { return  { loop: InterpreterLang.loop, regs: { x: -1 } } },
        0x5e: () => { return  { loop: InterpreterLang.loop, regs: { y:+1} } },
        0x2b: () => { return  { loop: InterpreterLang.loop, memory: +1 } },
        0x2d: () => { return  { loop: InterpreterLang.loop, memory: -1 } },
        0x5b: () => { return  { loop: InterpreterLang.loop = true } }, // [
        0x5d: () => { return  { loop: InterpreterLang.loop = false } },// ]
    }

    static getExec  = (OPCODE: any) : iOpcodeExecutable => InterpreterLang.instructionTable[OPCODE]()
}