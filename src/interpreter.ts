import { iOperation, iInstructionTable } from './interfaces'

export class InterpreterLang
{
    static instructionTable : iInstructionTable<Function> = {
        0x3e: ()  => { return  { regs: { x: +1 } } }, //>
        0x3c: ()  => { return  { regs: { x: -1 } } }, //<
        0x5e: ()  => { return  { regs: { y:+1} } }, //^
        0x2b: ()  => { return  { memory: +1 } }, //+
        0x2d: ()  => { return  { memory: -1 } }, //-
        0x5b: ()  => { return  { loop: true } }, // [
        0x5d: ()  => { return  { endLoop: true } }, // ]
    }

    static getExec  = (OPCODE: any) : iOperation => InterpreterLang.instructionTable[OPCODE]()
}