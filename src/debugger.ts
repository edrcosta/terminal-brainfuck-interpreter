import { AtBrainInterpreter } from "./interpreter"

export class Debugger{
    static welcomeMessage(memorySizeInBytes: number){
        console.log('Welcome to this Brainfuck interpreter, press enter to start')
        console.log(`memory initialized with: ${memorySizeInBytes} bytes`)
    }

    static currentState(computerInstance: AtBrainInterpreter){
        const {memorySizeInBytes, memory, stringOuput, registers: {x, y}} = computerInstance

        Debugger.welcomeMessage(memorySizeInBytes)
        Debugger.showMemory(memory, x, y)
        Debugger.showTextOutput(stringOuput)
    }

    static clear = console.clear

    static error = console.error

    static showMemory(memory: ArrayBuffer[], x:number, y: number){
        console.log("\nMemory Content:");

        const debugLineOfMemory = (memoryBlock: ArrayBuffer, yy: number) => {
            const indicator =  y === yy ? '->' : '  '
            const memory = Array.from(new Uint8Array(memoryBlock))
            const debugLine = memory.map((char, xx) => x === xx && y === yy ? '\x1b[31m' + char + '\x1b[0m' : char)

            console.log(yy, indicator, debugLine.join(','))
        }

        memory.forEach(debugLineOfMemory)
    }

    static showTextOutput(text: Buffer){
        console.log(text.toString('utf-8'))
    }
}