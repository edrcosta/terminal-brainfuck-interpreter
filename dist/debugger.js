"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Debugger = void 0;
const chalk = require("chalk");
class Debugger {
    static debugg(computer) {
        console.clear();
        console.log(chalk.grey('____________________________________________________________\n'));
        console.log(chalk.blue('BRAINFUCK_COMPUTER 1.0'));
        console.log(chalk.grey('____________________________________________________________\n'));
        if (!computer.debugger)
            return false;
        console.log(chalk.blue('COUNTERS '), computer.counters);
        console.log(chalk.blue('REGISTERS'), computer.regs, '\n');
        console.log(chalk.yellow('MEMORY'));
        computer.memory.forEach((row, y) => {
            row = row.map((cell, x) => {
                if (computer.regs.x === x && computer.regs.y === y)
                    return chalk.red(cell);
                return cell;
            });
            console.log(row.join(','));
        });
        console.log('~/ $');
    }
}
exports.Debugger = Debugger;
//# sourceMappingURL=debugger.js.map