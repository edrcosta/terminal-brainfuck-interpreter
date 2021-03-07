import { InterpreterLang } from './interpreter'
import { iMemorySize, iOperation } from './interfaces'
import { Debugger } from './debugger'

import * as chalk from 'chalk'

export class Computer 
{
    memory: Array<Array<number>> = [] // Computer memory (RAM) ex:[[0x5e, 0x5d, 0x3e]]
    code: Array<Array<Buffer>> = [] // Computer code memory (code stack)
    instructionCounter = 0 // Stores how much instructions the CPU executed
    clockSpeed = 100
    
    debugger = true // Enable console debugger output
    halt = false // Interrupt CPU
    bussy = false // Operation been executed

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
        Debugger.debugg(this)
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
     * deal with start and end loop operands
     * 
     * @param operation 
     */
    loopOperations = (operation: iOperation) => {
        // loop start
        operation.loop && this.regs.loop === -1 ? this.regs.loop = this.regs.program.x + 1 : false

        // loop end 
        const endLoop = operation.endLoop && this.regs.loop !== -1

        if (endLoop && this.memory[this.regs.y][this.regs.x] === 0) {
            this.regs.loop = -1 // stop loop
        } else if(endLoop) {
            this.regs.program.x = this.regs.loop // start over again
        } else {
            // loop iteration increment
            this.regs.program.x++
            if (this.regs.program.x === this.code[this.regs.program.y].length) {
                this.regs.program.x = 0
                this.regs.program.y++
            }
        }
    }
        
    /**
     * Get opcode operand and if exists execute it by applying changes into registers and memory 
     */
    applyInstruction = (opCode: Buffer): Promise<iOperation> | undefined => new Promise((resolve, reject) => {

        const operation = InterpreterLang.getExec(Uint8Array.from(opCode)[0])

        !operation ? console.log(chalk.red('unknow'), opCode, opCode) : false

        /**
         * CPU modifiers applyed by operand result
         */
        operation.regs?.x ? (this.regs.x += operation.regs.x ? operation.regs.x : 0): false
        operation.regs?.y ? (this.regs.y += operation.regs.y ? operation.regs.y : 0): false
        operation.memory ? this.memory[this.regs.y][this.regs.x] += operation.memory : false

        Debugger.debugg(this)

        if (operation?.print) console.log(chalk.green('OUTPUT:'), this.memory[this.regs.y][this.regs.y])

        resolve(operation)
    })

    // does what the name say
    fetchNextInstruction = () => {
        if (typeof this.code[this.regs.program.y] === 'undefined') return false
        if (typeof this.code[this.regs.program.y][this.regs.program.x] === 'undefined') return false

        const instruction: Buffer = this.code[this.regs.program.y][this.regs.program.x]

        if (typeof instruction === 'undefined') return false

        return instruction
    }

    /**
     * execute the current instruction in code memory addressed by regs.program.y and regs.program.x registers
     */
    fetchExecute = () => new Promise(async (resolve, reject) => {
        const instruction = this.fetchNextInstruction()

        return resolve(instruction ? await this.applyInstruction(instruction) : false)
    })

    /**
     * called every clock pulse
     */
    clock = () => {
        this.bussy = true
        this.fetchExecute().then(() => { this.bussy = false })
        this.instructionCounter++
    }

    /**
     * called every single loop
     */
    clockCicle = () => {
        if (!this.bussy) this.clock()
    }

    /**
     * Initialize the computer clock loop
     */
    start = () => setInterval(this.clockCicle, this.clockSpeed)
}