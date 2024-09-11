import { createInterface } from 'readline'
import { AtBrainInterpreter } from './interpreter';

(() => {
    const clockSpeedInMs = 100
    const interpreter = new AtBrainInterpreter(32, 4)

    const rl = createInterface({ input: process.stdin, output: process.stdout });

    rl.on('line', interpreter.pushToStack)
    rl.on("close", () => (process.exit(0)))

    setInterval(() => {
        if(interpreter.hasStack())
            interpreter.loop()
    }, clockSpeedInMs)
})()
