import { InterpreterLang } from './interpreter'
import { iMemorySize, iOpcodeExecutable } from './interfaces'
import * as chalk from 'chalk'

export class Computer
{
    public clockCounter = 0
    public regs = { x: 0, y: 0 }   
    private memory : any = []
    private codeStack: any = []
    private loopClock: any
        
    constructor(memoryX: number, memoryY: number){
        this.resetMemory({ x: memoryX, y: memoryY})       
    }

    resetMemory(memory: iMemorySize){
        for (let x = 0; x < memory.x; x++) {
            this.memory.push([])
            for (let y = 0; y < memory.y; y++) this.memory[x][y] = 0
        }
    }

    userInput = (code: any) => this.codeStack.push(Buffer.from(code))
    
    computerDebug(){
        console.log( '-------------------------------', '\n Registers\n\n', this.regs)
        console.log( '-------------------------------', '\n Memory\n')

        this.memory.forEach((row: any, y: number) => {
            row = row.map((cell: any, x: number) => {
                if(this.regs.x === x && this.regs.y === y){
                    return chalk.red(cell)
                }
                return cell
            })
            console.log(row.join(','))
        })
    }
    
    /**
     * Apply operation into memory and registers 
     * 
     * @param operation 
     */
    executeInstruction = (opCode: number, operation: iOpcodeExecutable) : iOpcodeExecutable | undefined => {

        if(!operation) {
            console.log('unknow', opCode, opCode.toString(16), opCode.toString(2))
        }

        if(operation.regs){
            this.regs.x += operation.regs.x ? operation.regs.x : 0
            this.regs.y += operation.regs.y ? operation.regs.y : 0
        }

        if(operation.memory){
            this.memory[this.regs.y][this.regs.x] += operation.memory
        }

        return operation
    }
    loopCounter : any = 0

    /**
     * get a instruction thread and executes 
     */
    async fetchExecute(){
        const nextThread = this.codeStack.pop()

        if(!nextThread) return false


        let start : any = false

        for (let i = 0; i < nextThread.length; i++) {
            const opCode = nextThread[i];
            
            const response :any = this.executeInstruction(opCode, InterpreterLang.getExec(opCode))

            if(response.loop && start === false){
                start = i
            }
            if(!response.loop && start !== false){
                if(this.memory[this.regs.y][this.regs.x] > 0){
                    i = start
                }
            }
        }
        // nextThread.forEach((opCode: number, i: number) => {
           

        // })
        console.clear()
        this.computerDebug()
    }

    start(){
        this.loopClock = setInterval(() => {
            this.fetchExecute()
            this.clockCounter++
        }, 3000)
    }
}