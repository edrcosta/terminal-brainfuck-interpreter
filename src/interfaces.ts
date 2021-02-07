export interface iMemorySize { x: number, y: number }

export interface iOperation {
    regs?: {
        x?: number,
        y?: number
    },
    memory?: number,
    loop?: boolean,
    endLoop?: boolean
    print?: boolean
}

export interface iInstructionTable<iOperation> {
    [key: number]: iOperation
}
