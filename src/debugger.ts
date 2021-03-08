import * as chalk from 'chalk'
import { AtBrainInterpreter } from './interpreter'

export class Debugger 
{
    static count = 0

    static header(computer: AtBrainInterpreter) {
        console.log(chalk.bgGreen.whiteBright('AT Brain'), chalk.bgBlue.whiteBright('1.0.0'), '\n')
    }

    static registers(computer: AtBrainInterpreter) {
        console.log(chalk.blue('REGISTERS'), '\n\n', computer.regs, '\n')
        console.log(chalk.green('CODE MEMORY'), '\n')
    }

    static codeMemory(computer: AtBrainInterpreter) {
        computer.code.forEach((thread: Array<Buffer>, i: number) => {
            let code = thread.join('')
            if (computer.regs.program.y === i) {
                code = chalk.blue(code.substr(0, computer.regs.program.x)) + chalk.green(code.substr(computer.regs.program.x))
            } else {
                code = chalk.grey(code)
            }
            console.log(i,':', code, i === computer.regs.program.y ? chalk.red(computer.regs.program.x) : '')
        })
    }

    static memory(computer: AtBrainInterpreter) {
        console.log('\n', chalk.yellow('MEMORY'), '\n')
        computer.memory.forEach((row: Array<number>, y: number) => {
            console.log(
                row.map((cell: number, x: number): string => {
                    return computer.regs.x === x && computer.regs.y === y ? chalk.red(cell) : `${cell}`
                }).join(',')
            )
        })
    }

    static debugg(computer: AtBrainInterpreter) {
        if (!computer.debugger) return false
        console.clear()
        Debugger.header(computer)
        Debugger.registers(computer)
        Debugger.codeMemory(computer)
        Debugger.memory(computer)

        console.log('~/ $')
    }
}