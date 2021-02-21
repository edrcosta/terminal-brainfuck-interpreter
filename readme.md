### Brainfuck interpreter

A simple typescritp interpreter made for fun

![Running interpreter](https://github.com/edrcosta/terminal-brainfuck-interpreter/blob/master/print.png?raw=true)


#### Explaining this

this is an "just in time interpreter" 

this mean that users can input commands and wait into the result that will be executed after an list of other comands been executed
the comands are inputed into an stack of comands... 

the computer will then get one by one and "get an interpretation" that i call "operand" or "operation" that is just an data representation with what the computer must do for example the opcode 0x3e that means + or "plus 1 in the current memory location" this is just a 

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