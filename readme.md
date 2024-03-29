### Brainfuck interpreter

A simple typescritp interpreter made for fun

![Running interpreter](https://github.com/edrcosta/terminal-brainfuck-interpreter/blob/master/print.png?raw=true)


#### Explaining this

this is an terminal application 

 that users can input commands and wait into the result that will be executed after an list of other comands been executed
the comands are inputed into an stack of comands... 

the computer will then get one by one and "get an interpretation" that i call "operand" or "operation" that is just an data representation with what the computer must do for example the opcode 0x3e that means + or "plus 1 in the current memory location" this is just a 



im not using the usual brainfuck implementation... because i wanto extends the interpreter to be brainfuck compatible but also become a personal programming language boilerplate.

so the operands are implemented by mapping instruction OPcodes to hardware operations, this way i can implement instructions on the fly by just mapping new OPCODES to the hardware operations i want to execute... in a real hardware this will allow to use combinational logic to implement instructions.


Example (operands.ts): 

each hex value map a character instruction from brainfuck language, and the object assign to it describe something that must be executed

```
0x3e: { regs: { x: +1 } }, // >
0x3c: { regs: { x: -1 } }, // <
0x2b: { memory: +1 }, // +
0x2d: { memory: -1 }, // -
0x5b: { loop: true }, // [
0x5d: { endLoop: true }, // ]
0x2e: { print: true }, // .
// just for fun extended instruction set "my own lang"
0x5e: { regs: { y: +1 } }, // ^ increment the Y register to change lanes
```

- `regs` means that will apply a math operation to the register indicated (the interpreter has 2 memory registers (bascicly index pointers to an array), X and Y to a multidimensional memory where X are a position in a memory block and Y its the memory block).

- `memory` means that will apply a math operation to the current memory location 
- `loop` if true starts a loop if false stops a loop if the current memory location its 0
- `print` makes the CPU prints the current memory location as ascii

so lets imagine that i want to implement a instruction thats sum +42 to the memory i just have to map { memory: +42 }... and any new functionality can be added by a combination of the interpreter capabilities.

#### Dependencies

- Node 10+
- NPM

#### Running 

1. clone this repo
2. in terminal go into the root folder
3. run `npm install``
4. npm start

*development*

1. run `tsc -w` (to build with wacth)

#### Instruction set

1. `>` Increment memory pointer 
2. `<` Decrement Memory pointer
3. `+` increment +1 memory address[y][x]
4. `-` decrement -1 memory address[y][x]
5. `.` print output 
6. `[` starts loop 
7. `]` end loop if(memmory[y][x] === 0)

#### How it works 

1. when a code is loaded is converted into an Array of Buffers (Buffer are a hexadecimal number in Node)
2. if an valid instruciton is loaded into code memory stack 
    - An instruction operand is researched in the interpreted code (the operand is how i call an object that describes exacly what that instruction does into the computer, what registers are changes and how much, if has output, if an loop started or ended... imagine that as a meta instruction thats describe to the CPU what must be done when that operation code (OPCODE), was executed)
    - the CPU apply the operand data into the computer registers, cpu etc.
3. when the instruciton was finished the code registers regs.program.y and regs.program.x are incremented 

#### @todo 

- -255 to 255 value limits 
- unit tests 
- input instruction
- ascci code output
