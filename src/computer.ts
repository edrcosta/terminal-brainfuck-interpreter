import { InterpreterLang } from './interpreter'
import { iMemorySize, iOperation } from './interfaces'
import { Debugger } from './debugger'

import * as chalk from 'chalk'

export class Computer
{
    public regs = { x: 0, y: 0 }
    public memory : any = []
    public codeMemory: any = []
    public clockCounter = 0
    public clockMulti = 0
    public counters = {
        stack: 0,
        program:{ x: 0, y: 0},
        clock: 0
    }

    public debugger = true

    constructor(memoryX: number, memoryY: number){
        this.resetMemory({ x: memoryX, y: memoryY})  
    }
    
    resetMemory(memory: iMemorySize){
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

        if(!operation) console.log(chalk.red('unknow'), opCode, opCode)
        
        if(operation.regs){
            this.regs.x += operation.regs.x ? operation.regs.x : 0
            this.regs.y += operation.regs.y ? operation.regs.y : 0
        }

        if(operation.loop){
            console.log('start')
        }

        if(operation.memory) this.memory[this.regs.y][this.regs.x] += operation.memory

        this.increaseInstructionCounters()
        return operation
    }
    
    increaseInstructionCounters(){
        this.counters.program.x++
        if(this.counters.program.x === this.codeMemory[this.counters.program.y].length){
            this.counters.program.x = 0
            this.counters.program.y++
        }
    }

    async fetchExecute(){   
        
        if(typeof this.codeMemory[this.counters.program.y] === 'undefined') return console.log('stack-end')
        
        const nextInstruction = this.codeMemory[this.counters.program.y][this.counters.program.x]

        if(!nextInstruction) return false

        if(nextInstruction) this.applyInstruction(nextInstruction)

        Debugger.debugg(this, 4)

    }

    // every clock pulse do:
    clock = () => { 
        this.fetchExecute() 
        this.clockCounter++
    }
    start = () => setInterval(this.clock, 1000)
}