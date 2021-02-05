import * as chalk from 'chalk'
import { Computer } from './computer'

export class Debugger{
    static count = 0

    static debugg(computer: Computer){
        console.log(chalk.grey('____________________________________________________________\n'))
        console.log(chalk.blue('BRAINFUCK_COMPUTER 1.0'))
        console.log(chalk.grey('____________________________________________________________\n'))      
        
        console.log(chalk.grey('____________________________________________________________\n'))
        console.log(chalk.blue('COUNTERS '), computer.counters)
        console.log(chalk.blue('REGISTERS'), computer.regs, '\n')
        
        console.log(chalk.green('CODE MEMORY - CLOCK'), computer.clockCounter+1)
        computer.codeMemory.forEach((thread : Buffer, i : number) => {
            let code = thread.join('')
            if(computer.counters.program.y === i) {
                code = chalk.blue(code.substr(0, computer.counters.program.x)) + chalk.grey(code.substr(computer.counters.program.x))
            }
            console.log(code)
        })

        console.log(chalk.yellow('MEMORY'))
        computer.memory.forEach((row: any, y: number) => {
            row = row.map((cell: any, x: number) => {
                if(computer.regs.x === x && computer.regs.y === y) return chalk.red(cell)
                return cell
            })
            console.log(row.join(','))
        })

        console.log('~/ $')
    }
}