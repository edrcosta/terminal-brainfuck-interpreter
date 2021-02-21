export interface iMemorySize { x: number, y: number }

/**
 * represents the result of an OPCODE in an "operand" what means what the computer must do in order to execute this instruction  
 */
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
