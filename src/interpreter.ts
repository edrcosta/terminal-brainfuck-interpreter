import * as arrayBuffer from "./array-buffer"
import { Debugger } from "./debugger"
import instructionTable, { iInstruction } from "./operands"

export class AtBrainInterpreter {
    memory: ArrayBuffer[]
    stack: Buffer[] = []
    memorySizeInBytes: number
    lanes: number
    startLoopIndex: number = -1
    registers = { x: 0, y: 0,}
    stackPointer = 0

    stringOuput: Buffer = Buffer.from('')

    constructor(memorySizeInBytes: number = 256, lanes: 4) {
        this.memorySizeInBytes = memorySizeInBytes
        this.lanes = lanes
        this.memory = this.resetMemory(memorySizeInBytes, lanes)

        Debugger.clear()
        Debugger.welcomeMessage(memorySizeInBytes)
        Debugger.currentState(this)
    }

    resetMemory = (memorySizeInBytes: number, lanes: number) => {
        return Array(lanes)
            .fill(null)
            .map(() => arrayBuffer.createFilledWith(memorySizeInBytes, 0));
    }

    pushToStack = (text: string) => {
        this.stack.push(
            ...text.split('').map(char => Buffer.from(char))
        )
    }

    loop = () => {
        const instruction = this.stack[this.stackPointer]
        const outbound = this.stackPointer > this.stack.length - 1

        if (!instruction || outbound) return;

        this.fetchAndExecute()
        this.stackPointer++
    }

    hasStack = () => this.stack.length > 0


    fetchAndExecute() {
        const opcode = this.stack[this.stackPointer]
        const operand = opcode.readInt8()

        if (!instructionTable[operand]) {
            Debugger.error(`invalid instruction: ${opcode} = ${operand}`, opcode.toString('hex'))
            return;
        }

        Debugger.clear()
        this.execute(instructionTable[operand])
        Debugger.currentState(this)
    }

    execute = (instruction: iInstruction) => {
        if (instruction.clearScreen)
            Debugger.clear()

        if (instruction?.regs?.x)
            this.registers.x += instruction.regs.x || 0

        if (instruction?.regs?.y)
            this.registers.y += instruction.regs.y || 0

        if (instruction.reset){
            this.registers = { x: 0, y: 0 }
            this.stackPointer = 0
            this.startLoopIndex = -1
            this.memory = this.resetMemory(this.memorySizeInBytes, this.lanes)
        }

        if (instruction?.memory)
            this.memory[this.registers.y] = arrayBuffer.incrementValueByIndex(
                this.memory[this.registers.y],
                this.registers.x,
                instruction.memory
            )

        if (instruction.loop) {
            this.startLoopIndex = this.stackPointer
        }

        if (instruction.endLoop) {
            if(this.startLoopIndex === -1){
                Debugger.error('ending loop before start, invalid instruction')
                return;
            }

            const currentValue = arrayBuffer.getByValueByIndex(this.memory[this.registers.y], this.registers.x)

            if(currentValue > 0){
                this.stackPointer = this.startLoopIndex
            }
        }

        if (instruction.print) {
            const view = new Uint8Array(this.memory[this.registers.y])
            const char = String.fromCharCode(view[this.registers.x])
            this.stringOuput = Buffer.from(char)
        }
    }
}
