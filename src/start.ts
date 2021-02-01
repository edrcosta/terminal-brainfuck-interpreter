import { Computer } from './computer'
import { createInterface } from 'readline'

const instance = new Computer(5, 5)

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', instance.userInput)

rl.on("close", function() {
    console.log("\nTurning of computer instance, bye")
    process.exit(0)
})

instance.userInput('+++>>>')

instance.userInput('<<<-')
instance.start()
