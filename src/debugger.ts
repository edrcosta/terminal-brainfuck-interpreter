import * as chalk from 'chalk'
import { Computer } from './computer'

export class Debugger{
    static count = 0

    static debugg(computer: Computer){
        if(!computer.debugger) return false
        console.clear()
        console.log(chalk.grey('____________________________________________________________\n'))
        console.log(chalk.blue('BRAINFUCK_COMPUTER 1.0'))
        console.log(chalk.grey('____________________________________________________________\n'))      
        
        console.log(chalk.grey('____________________________________________________________\n'))
        
        console.log(chalk.blue('REGISTERS'), '\n\n', computer.regs, '\n')
        console.log(chalk.green('CODE MEMORY'), '\n')

        computer.code.forEach((thread : Buffer, i : number) => {
            let code = thread.join('')
            let index: string = `${i}`
            if(computer.regs.program.y === i) {
                code = chalk.blue(code.substr(0, computer.regs.program.x)) + chalk.green(code.substr(computer.regs.program.x))
                index = chalk.green(`${i}`)
            }else{
                code = chalk.grey(code)
            }
            console.log(index, code, chalk.red(computer.regs.program.x))
        })

        console.log('\n', chalk.yellow('MEMORY'), '\n')
        computer.memory.forEach((row: Array<number>, y: number) => {
            console.log(
                row.map((cell: number, x: number) : string => {
                    return computer.regs.x === x && computer.regs.y === y ?  chalk.red(cell): `${cell}`
                }).join(',')
            )
        })

        console.log('~/ $')
    }
}