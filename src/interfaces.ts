export interface iMemorySize { x: number, y: number }

export interface iOpcodeExecutable {
    regs?: {
        x: number,
        y: number
    },
    memory?: number,
    loop?: boolean
}