import { InterpreterLang } from './interpreter'
import { iMemorySize, iOperation } from './interfaces'
import { Debugger } from './debugger'

import * as chalk from 'chalk'

export class Computer
{
    public memory : Array<Array<number>> = [] // Computer memory (RAM)
    public code: Array<Buffer> = [] // Computer code memory (code stack)
    public instructionCounter = 0 // Stores how much instructions the CPU executed
    public clockSpeed  = 100
    public debugger = true

    public regs = { 
        x: 0, // Memory address X
        y: 0, // Memory address Y
        loop: -1, // Loop index register
        program:{ 
            x: 0, // Code memory address X 
            y: 0 // Code memory address Y 
        },
    }

    constructor(memoryX: number, memoryY: number){
        this.reset({ x: memoryX, y: memoryY})
    }
    
    /**
     * create a array of arrays with an x y size
     */
    reset(memory: iMemorySize){
        for (let x = 0; x < memory.x; x++) {
            this.memory.push([])
            for (let y = 0; y < memory.y; y++) this.memory[x][y] = 0
        }
    }

    /**
     * Insert code into code stack
     */
    userInput = (code: any) => (this.code.push(code.split('').map((instruction: string) => Buffer.from(instruction))))

    /**
     * Get opcode operand and if exists execute it by applying changes into registers and memory 
     */
    applyInstruction = (opCode: Buffer) : iOperation | undefined => {

        const operation = InterpreterLang.getExec(Uint8Array.from(opCode)[0])

        if(!operation) console.log(chalk.red('unknow'), opCode, opCode)
        
        if(operation.regs){
            this.regs.x += operation.regs.x ? operation.regs.x : 0
            this.regs.y += operation.regs.y ? operation.regs.y : 0
        }

        if(operation.memory) this.memory[this.regs.y][this.regs.x] += operation.memory

        if(operation.loop && this.regs.loop === -1) this.regs.loop = this.regs.program.x+1

        if(operation.endLoop && this.regs.loop !== -1){
            if(this.memory[this.regs.y][this.regs.x] === 0){
                this.regs.loop = -1
            }else{
                this.regs.program.x = this.regs.loop
            }
        }else{
            this.regs.program.x++
            if(this.regs.program.x === this.code[this.regs.program.y].length){
                this.regs.program.x = 0
                this.regs.program.y++
            }
        }
        
        return operation
    }
    
    /**
     * execute the current instruction in code memory addressed by regs.program.y and regs.program.x registers
     */
    async fetchExecute(){        
        if(typeof this.code[this.regs.program.y] === 'undefined') return false
        
        const instruction : any = this.code[this.regs.program.y][this.regs.program.x]

        if(!instruction) return false

        if(instruction) this.applyInstruction(instruction)

        if(this.debugger) Debugger.debugg(this)
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