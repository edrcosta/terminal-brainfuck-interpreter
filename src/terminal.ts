import { createInterface } from 'readline'

export const std = { input: process.stdin, output: process.stdout }

/**
 * Create an interface with command line every time a user type something a callback is called
 * 
 * @param callback 
 */
export const commandLineInterface = (callback: any) => {
    const rl = createInterface(std);

    rl.on('line', callback)
    rl.on("close", () => (process.exit(0)))
}