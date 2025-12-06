class Complex {
    constructor(real, imag) {
        this.real = real;
        this.imag = imag;
    }

    add(b) {
        let that = Complex.toComplex(b);

        this.real += that.real;
        this.imag += that.imag;
        return this;
    }
    subtract(b) {
        let that = Complex.toComplex(b);

        this.real -= that.real;
        this.imag -= that.imag;
        return this;
    }
    multiply(b) {
        let that = Complex.toComplex(b);

        let A = (this.real * that.real) - (this.imag * that.imag);
        let B = (this.real * that.imag) + (this.imag * that.real);

        this.real = A;
        this.imag = B;

        return this;
    }
    divide(b) {
        let that = Complex.toComplex(b);

        let denominator = (that.real * that.real) + (that.imag * that.imag);

        let numeratorA = (this.real * that.real) + (this.imag * that.imag);
        let numeratorB = (this.imag * that.real) - (this.real * that.imag);

        if (denominator == 0) {
            throw new Error('Cannot divide by zero')
        }

        this.real = numeratorA / denominator
        this.imag = numeratorB / denominator

        return this;
    }

    /**
    * Returns the distance from 0 + 0i to a complex number
    */
    abs() {
        return Math.sqrt((this.real * this.real) + (this.imag * this.imag))
    }
    conj() {
        this.imag = -this.imag;
        return this;
    }

    stringify() {
        if (this.real === 0) {
            if (this.imag === 0) {
                return '0';
            } else {
                return `${this.imag}i`;
            }
        }
        if (this.imag === 0) {
            return `${this.real}`;
        } else if (this.imag > 0) {
            return `${this.real} + ${Math.abs(this.imag)}i`
        } else {
            return `${this.real} - ${Math.abs(this.imag)}i`
        }
    }

    static parseComplex(input) {
        let tokens = [];

        for(let i = 0; i < input.length; i++) {
            let char = input[i]
            
            if (/\d/.test(char)) {
                let value = '';
                while (/\d/.test(char) && i < input.length) {
                    value += char;
                    char = input[++i];
                }
                tokens.push(Number(value));
                continue;
            }
        }
        return new Complex(tokens[0], tokens[1])
    }
    static toComplex(num) {
        if (num instanceof Complex) {
            return num;
        } else if (typeof num === "string") {
            try {
                parseComplex(num)
            } catch (error) {
                return new Complex(Number(num), 0);
            }
        } else {
            return new Complex(Number(num), 0);
        }
    }
}
(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('Extension must run unsandboxed');
  }

/*
  const menuIconURI = ""
*/
  const { vm, Cast } = Scratch;
  const runtime = vm.runtime;

  const { COMMAND, REPORTER, BOOLEAN, LOOP, LABEL, BUTTON, CONDITIONAL} = Scratch.BlockType
  const { NUMBER, STRING } = Scratch.ArgumentType

  class ComplexNumbers {
    getInfo() {
      return {
        id: 'complex',
        name: 'Complex',
        docsURI: "https://docs.penguinmod.com/development/extensions/",
        color1: "#008cff",
        color2: "#005fad",
        color3: "#002f55",
        /*
        menuIconURI,
        */
        blocks: [
            {
                opcode: "add",
                text: "[A] + [B]",
                blockType: REPORTER,
                arguments: {
                    A: {
                      type: STRING,
                      defaultValue: "1 + 2i"
                    },
                    B: {
                      type: STRING,
                      defaultValue: "3 + 4i"
                    }
                }
            }
        ]
      };
    }
    add({A, B}) {
      return Complex.toComplex(A).add(B).stringify();
    }
  }
  Scratch.extensions.register(new ComplexNumbers());
})(Scratch);