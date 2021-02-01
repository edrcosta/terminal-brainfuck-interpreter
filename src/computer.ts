import { InterpreterLang } from './interpreter'
import { iMemorySize, iOperation } from './interfaces'
import * as chalk from 'chalk'
import { Debugger } from './debugger'

export class Computer
{
    public regs = { x: 0, y: 0 }   
    public memory : any = []
    public codeStack: any = []
    public counters = {
        stack: 0,
        program: 0,
        clock: 0,
        executed: 0
    }

    public debugger = true

    constructor(memoryX: number, memoryY: number){
        this.resetMemory({ x: memoryX, y: memoryY})  
        Debugger.debugg(this)
    }
    
    resetMemory(memory: iMemorySize){
        for (let x = 0; x < memory.x; x++) {
            this.memory.push([])
            for (let y = 0; y < memory.y; y++) this.memory[x][y] = 0
        }
    }

    userInput = (code: any) => this.codeStack.push(Buffer.from(code))
  
    executeInstruction = (opCode: number) : iOperation | undefined => {
        const operation = InterpreterLang.getExec(opCode)

        if(!operation) console.log(chalk.red('unknow'), opCode, opCode.toString(16), opCode.toString(2))
        
        if(operation.regs){
            this.regs.x += operation.regs.x ? operation.regs.x : 0
            this.regs.y += operation.regs.y ? operation.regs.y : 0
        }

        if(operation.memory){
            this.memory[this.regs.y][this.regs.x] += operation.memory
        }

        return operation
    }

    /**
     * get a instruction thread and executes 
     */
    async fetchExecute(){   
        
        const thread = this.codeStack[this.counters.stack]

        this.executeInstruction(thread[this.counters.program])
        
        this.counters.program++
        if(this.counters.program  === thread.length ){
            this.counters.program = 0
            this.counters.stack++
            if(this.counters.stack === this.codeStack.length){
                this.counters.stack = 0
            }
        }

        Debugger.debugg(this)
    }

    start = () => setInterval(() => {


        this.fetchExecute()
    }, 1000)
}