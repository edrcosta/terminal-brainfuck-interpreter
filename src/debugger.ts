import * as chalk from 'chalk'
import { Computer } from './computer'

export class Debugger{
    static count = 0

    static debugg(computer: Computer){
        console.clear()
        console.log(chalk.grey('____________________________________________________________\n'))
        console.log(chalk.blue('BRAINFUCK_COMPUTER 1.0'))
        console.log(chalk.grey('____________________________________________________________\n'))      
        
        console.log(chalk.grey('____________________________________________________________\n'))
        
        console.log(chalk.blue('REGISTERS'), '\n\n', computer.regs, '\n')
        console.log(chalk.green('CODE MEMORY'), '\n')

        computer.codeMemory.forEach((thread : Buffer, i : number) => {
            let code = thread.join('')
            let index: any = i
            if(computer.regs.program.y === i) {
                code = chalk.blue(code.substr(0, computer.regs.program.x)) + chalk.green(code.substr(computer.regs.program.x))
                index = chalk.green(`${i}`)
            }else{
                code = chalk.grey(code)
            }
            console.log(index, code, chalk.red(computer.regs.program.x))
        })

        console.log('\n', chalk.yellow('MEMORY'), '\n')
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