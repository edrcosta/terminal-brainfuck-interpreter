/**
 * AT Brain Brainfuck interpreter
 */
import { AtBrainInterpreter } from './interpreter'
import { commandLineInterface } from './terminal'

(() => {
    const instance = new AtBrainInterpreter(5, 64)

    commandLineInterface(instance.userInput)
    instance.start()
})()