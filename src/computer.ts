import { InterpreterLang } from './interpreter'
import { iMemorySize, iOperation } from './interfaces'
import { Debugger } from './debugger'

import * as chalk from 'chalk'

export class Computer {
    memory: Array<Array<number>> = [] // Computer memory (RAM) ex:[[0x5e, 0x5d, 0x3e]]
    code: Array<Array<Buffer>> = [] // Computer code memory (code stack)
    instructionCounter = 0 // Stores how much instructions the CPU executed
    clockSpeed = 500
    debugger = true

    regs = {
        x: 0, // Memory address X
        y: 0, // Memory address Y
        loop: -1, // Loop index register
        program: {
            x: 0, // Code memory address X 
            y: 0 // Code memory address Y 
        },
    }

    constructor(memoryX: number, memoryY: number) {
        this.reset({ x: memoryX, y: memoryY })
    }

    /**
     * create a array of arrays with an x y size
     */
    reset(memory: iMemorySize) {
        for (let x = 0; x < memory.x; x++) {
            this.memory.push([])
            for (let y = 0; y < memory.y; y++) this.memory[x][y] = 0
        }
    }

    /**
     * Insert code into code stack
     */
    userInput = (code: any) => (
        this.code.push(code.split('').map((instruction: string) => Buffer.from(instruction)))
    )

    /**
     * Get opcode operand and if exists execute it by applying changes into registers and memory 
     */
    applyInstruction = (opCode: Buffer): iOperation | undefined => {

        const operation = InterpreterLang.getExec(Uint8Array.from(opCode)[0])

        if (!operation) console.log(chalk.red('unknow'), opCode, opCode)

        // Apply register changes
        if (operation.regs) {
            this.regs.x += operation.regs.x ? operation.regs.x : 0
            this.regs.y += operation.regs.y ? operation.regs.y : 0
        }

        // Apply memory changes
        if (operation.memory) this.memory[this.regs.y][this.regs.x] += operation.memory

        // loop start
        if (operation.loop && this.regs.loop === -1) this.regs.loop = this.regs.program.x + 1

        // loop end 
        if (operation.endLoop && this.regs.loop !== -1) {
            if (this.memory[this.regs.y][this.regs.x] === 0) {
                this.regs.loop = -1 // stop loop
            } else {
                this.regs.program.x = this.regs.loop // start over again
            }
        } else {
            // regular program registers increment
            this.regs.program.x++
            if (this.regs.program.x === this.code[this.regs.program.y].length) {
                this.regs.program.x = 0
                this.regs.program.y++
            }
        }

        Debugger.debugg(this)

        if (operation?.print) console.log(chalk.green('OUTPUT:'), this.memory[this.regs.y][this.regs.y])

        return operation
    }

    /**
     * execute the current instruction in code memory addressed by regs.program.y and regs.program.x registers
     */
    async fetchExecute() {
        if (typeof this.code[this.regs.program.y][this.regs.program.x] === 'undefined') return false

        const instruction: Buffer = this.code[this.regs.program.y][this.regs.program.x]

        if (typeof instruction === 'undefined') return false

        return instruction ? this.applyInstruction(instruction) : Debugger.debugg(this)
    }

    /**
     * called every clock pulse
     */
    clock = () => {
        this.fetchExecute()
        this.instructionCounter++
    }

    /**
     * Initialize the computer clock loop
     */
    start = () => setInterval(this.clock, this.clockSpeed)
}