import { Computer } from './computer'
import { commandLineInterface } from './terminal'

(() => {
    const instance = new Computer(5, 64)

    commandLineInterface(instance.userInput)
    instance.start()
})()