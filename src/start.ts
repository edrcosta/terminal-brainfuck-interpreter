import { Computer } from './computer'
import { commandLineInterface } from './terminal'

(() => {
    const instance = new Computer(5, 5)

    commandLineInterface(instance.userInput)

    instance.userInput('+++.')
    instance.userInput('+++.')
    instance.userInput('+++.')
    instance.userInput('+++.')
    instance.userInput('+++.')
    instance.start()
})()