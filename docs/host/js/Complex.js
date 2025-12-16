export default class Complex {
    constructor(a, b) {
        switch (typeof a) {
            case "number":
                this.real = a;
                this.imag = (typeof b === "number") ? b : 0;
                break;
            case "object":
                if (a instanceof Complex) {
                    this.real = a.real;
                    this.imag = a.imag;
                } else {
                    throw new Error('Invalid object');
                }
                break;
            case "string":
                this.real = Complex.parseComplex(a).real;
                this.imag = Complex.parseComplex(a).imag;
                break;
            default: throw new Error('Invalid input');
        }
    }
    static validNumberChar(char) {
        return /\d/.test(char) // digit
        || char === 'i' || char === '.' // imaginary unit or decimal point
        || char === 'e' || char === 'E' // exponent
        || char === '+' || char === '-'; // exp sign
    }


    add(b) {
        const that = Complex.toComplex(b);

        this.real += that.real;
        this.imag += that.imag;
        return this;
    }
    subtract(b) {
        const that = Complex.toComplex(b);

        this.real -= that.real;
        this.imag -= that.imag;
        return this;
    }
    multiply(b) {
        const that = Complex.toComplex(b);

        const A = (this.real * that.real) - (this.imag * that.imag);
        const B = (this.real * that.imag) + (this.imag * that.real);

        this.real = A;
        this.imag = B;

        return this;
    }
    divide(b) {
        const that = Complex.toComplex(b);

        const denominator = (that.real * that.real) + (that.imag * that.imag);

        const numeratorA = (this.real * that.real) + (this.imag * that.imag);
        const numeratorB = (this.imag * that.real) - (this.real * that.imag);

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

    toString() {
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
        if (typeof input !== 'string') {
            throw new Error('Input must be a string');
        }

        const str = input.replace(/\s+/g, '');

        if (str.length === 0) {
            throw new Error('Empty string');
        }

        // Pure imaginary
        if (str === 'i' || s === '+i') {
            return new Complex(0, 1);
        }
        if (str === '-i') {
            return new Complex(0, -1);
        }

        // If it contains 'i', but isn't pure imaginary
        if (str.includes('i')) {
            // remove the trailing 'i'
            const txt = str.replace(/i/g, '');

            let idx = -1;
            for (let i = txt.length - 1; i > 0; i--) {
                if (txt[i] === '+' || txt[i] === '-') {
                    idx = i;
                    break;
                }
            }

            let realPart, imagPart;
            if (idx === -1) {
                realPart = '0';
                imagPart = t;
            } else {
                realPart = t.slice(0, idx);
                imagPart = t.slice(idx);
            }

            const real = realPart === '' ? 0 : Number(realPart);
            let imag = imagPart === '' ? 1 : Number(imagPart);

            if (Number.isNaN(real) || Number.isNaN(imag)) {
                throw new Error(`Could not parse number from '${input}'`);
            }

            return new Complex(real, imag);
        }

        // pure real
        const real = Number(s);
        if (Number.isNaN(real)) {
            throw new Error(`Could not parse complex number from '${input}'`);
        }
        return new Complex(real, 0);
    }
    static toComplex(num) {
        if (num instanceof Complex) {
            return num;
        } else if (typeof num === "string") {
            try {
                return Complex.parseComplex(num)
            } catch (error) {
                return new Complex(Number(num), 0);
            }
        } else {
            return new Complex(Number(num), 0);
        }
    }
}