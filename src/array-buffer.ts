export const createFilledWith = (size: number, data: number) => new Uint8Array(new ArrayBuffer(size)).map(() => data);

export const incrementValueByIndex = (arrayBuffer: ArrayBuffer, index: number, value: number) => {    
    const view = new Uint8Array(arrayBuffer)

    view.set([view[index] + value], index)

    return view.buffer
}

export const getByValueByIndex = (arrayBuffer: ArrayBuffer, index: number) => {
    const view = new Uint8Array(arrayBuffer)

    return view[index]
}