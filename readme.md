### Brainfuck/AtBrain interpreter

A simple typescritp interpreter made for fun

#### Explaining this

This is my own interpreter made to learning how to build a interpreter initialy for brainfuck and now for what im calling AtBrain 
Atbrain is a simple programing language that will be ported to Atmega328p as part of my Tricorder Handheld project
the main goal is having somthing that can be ported to C or C++ and compiled to run in my handheld arthictecture.

my thinking in made this in typescritp is that learn how to make an interpreter is hard so i will learn in the confort of something i know well

for achieve this goal im avoiding use any high level javascritp abstraction not available at low level... you will not find any array here
im using classes but not in a OO style more as a namespace than as objects so this may be ugly to some. 

Atbrain has what im calling lanes, that are different memory spaces in a brainfuck way its like you have multiple bf interpreters stacked
so you can use this to separate different prograns and have some kind of multitasking 

im also thinking in implement utility functions like increment memory with direct values and also some aritimetic structure

#### Dependencies

- Node 22+
- typescript
- NPM

#### Running 

1. clone this repo
2. in terminal go into the root folder
3. run `npm install``
4. npm start

*development*

1. run `tsc -w` (to build with wacth)

#### Instruction set

**Control methods**

1. `c` clears the screen
2. `r` reset the entire memory

**Regular brainfuck**

1. `>` Increment memory pointer 
2. `<` Decrement Memory pointer
3. `+` increment +1 memory address[y][x]
4. `-` decrement -1 memory address[y][x]
5. `.` print output 
6. `[` starts loop 
7. `]` end loop if(memmory[y][x] === 0)
