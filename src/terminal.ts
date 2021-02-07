import { createInterface } from 'readline'

/**
 * Create an interface with command line every time a user type something a callback is called
 * 
 * @param callback 
 */
export const commandLineInterface = (callback: any) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout });

    rl.on('line', callback)
    rl.on("close", () => (process.exit(0)))
}