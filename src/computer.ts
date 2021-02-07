import { InterpreterLang } from './interpreter'
import { iMemorySize, iOperation } from './interfaces'
import { Debugger } from './debugger'

import * as chalk from 'chalk'
import { timingSafeEqual } from 'crypto'

export class Computer
{

    public memory : any = []
    public codeMemory: any = []
    public clockCounter = 0
    public clockMulti = 0
    public debugger = true

    public regs = { 
        x: 0, 
        y: 0,
        loop: -1,
        stack: 0,
        program:{ x: 0, y: 0},
    }

    constructor(memoryX: number, memoryY: number){
        this.reset({ x: memoryX, y: memoryY})  
    }
    
    reset(memory: iMemorySize){
        for (let x = 0; x < memory.x; x++) {
            this.memory.push([])
            for (let y = 0; y < memory.y; y++) this.memory[x][y] = 0
        }
    }

    userInput = (code: any) => {
        this.codeMemory.push(code.split('').map((instruction: string) => Buffer.from(instruction)))
    }
  
    applyInstruction = (opCode: Buffer) : iOperation | undefined => {

        const operation = InterpreterLang.getExec(Uint8Array.from(opCode)[0])

        if(!operation) {
            console.log(chalk.red('unknow'), opCode, opCode)
            return operation
        }
        
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
            if(this.regs.program.x === this.codeMemory[this.regs.program.y].length){
                this.regs.program.x = 0
                this.regs.program.y++
            }
        }
        
        return operation
    }
    
    async fetchExecute(){   
        
        if(typeof this.codeMemory[this.regs.program.y] === 'undefined') return false
        
        const nextInstruction = this.codeMemory[this.regs.program.y][this.regs.program.x]

        if(!nextInstruction) return false

        if(nextInstruction) this.applyInstruction(nextInstruction)

        Debugger.debugg(this)
    }

    clock = () => { 
        this.fetchExecute() 
        this.clockCounter++
    }
    
    start = () => setInterval(this.clock, 100)
}