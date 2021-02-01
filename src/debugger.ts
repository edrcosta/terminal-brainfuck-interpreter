import * as chalk from 'chalk'
import { Computer } from './computer'

export class Debugger{
    static debugg(computer: Computer){
        console.clear()
        console.log(chalk.grey('____________________________________________________________\n'))
        console.log(chalk.blue('BRAINFUCK_COMPUTER 1.0'))
        console.log(chalk.grey('____________________________________________________________\n'))
        
        if(!computer.debugger) return false

        console.log(chalk.blue('COUNTERS '), computer.counters)
        console.log(chalk.blue('REGISTERS'), computer.regs, '\n')
        
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