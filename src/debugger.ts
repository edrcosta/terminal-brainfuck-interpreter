import * as chalk from 'chalk'
import { Computer } from './computer'

export class Debugger {
    static count = 0

    static header(computer: Computer) {
        console.log(chalk.grey('____________________________________________________________\n'))
        console.log(chalk.blue('BRAINFUCK_COMPUTER 1.0'))
        console.log(chalk.grey('____________________________________________________________\n'))
    }

    static registers(computer: Computer) {
        console.log(chalk.blue('REGISTERS'), '\n\n', computer.regs, '\n')
        console.log(chalk.green('CODE MEMORY'), '\n')
    }

    static codeMemory(computer: Computer) {
        computer.code.forEach((thread: Array<Buffer>, i: number) => {
            let code = thread.join('')
            let index: string = `${i}`

            if (computer.regs.program.y === i) {
                code = chalk.blue(code.substr(0, computer.regs.program.x)) + chalk.green(code.substr(computer.regs.program.x))
                index = chalk.green(`${i}`)
            } else {
                code = chalk.grey(code)
            }
            console.log(index, code, chalk.red(computer.regs.program.x))
        })
    }

    static memory(computer: Computer) {
        console.log('\n', chalk.yellow('MEMORY'), '\n')
        computer.memory.forEach((row: Array<number>, y: number) => {
            console.log(
                row.map((cell: number, x: number): string => {
                    return computer.regs.x === x && computer.regs.y === y ? chalk.red(cell) : `${cell}`
                }).join(',')
            )
        })
    }

    static debugg(computer: Computer) {
        if (!computer.debugger) return false

        console.clear()

        Debugger.header(computer)
        Debugger.registers(computer)
        Debugger.codeMemory(computer)
        Debugger.memory(computer)

        console.log('~/ $')
    }
}