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
            default:
                try {
                    this.real = Number(a);
                    this.imag = Number(b);
                } catch (error) {
                    
                }
        }
    }
    
    clone() {
        return new Complex(this.real, this.imag);
    }

    add(b) {
        const that = Complex.toComplex(b);
        const me = this.clone();

        me.real += that.real;
        me.imag += that.imag;
        return me;
    }
    subtract(b) {
        const that = Complex.toComplex(b);
        const me = this.clone();

        me.real -= that.real;
        me.imag -= that.imag;
        return me;
    }
    multiply(b) {
        const that = Complex.toComplex(b);
        const me = this.clone();

        const A = (me.real * that.real) - (me.imag * that.imag);
        const B = (me.real * that.imag) + (me.imag * that.real);

        me.real = A;
        me.imag = B;

        return me;
    }
    divide(b) {
        const that = Complex.toComplex(b);
        const me = this.clone();

        const denominator = (that.real * that.real) + (that.imag * that.imag);

        const numeratorA = (me.real * that.real) + (me.imag * that.imag);
        const numeratorB = (me.imag * that.real) - (me.real * that.imag);

        if (denominator == 0) {
            throw new Error('Cannot divide by zero')
        }

        me.real = numeratorA / denominator
        me.imag = numeratorB / denominator

        return me;
    }

    /**
    * Returns the distance from 0 + 0i to a complex number
    */
    abs() {
        return Math.sqrt((this.real * this.real) + (this.imag * this.imag))
    }
    conj() {
        const me = this.clone();
        me.imag = -me.imag;
        return me;
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
            return new Complex(0)
        }

        // Pure imaginary
        if (str === 'i' || str === '+i') {
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
            /*
            if (Number.isNaN(real) || Number.isNaN(imag)) {
                throw new Error(`Could not parse number from '${input}'`);
            }
            */
            return new Complex(real, imag);
        }

        // pure real
        const real = Number(s);
        /*
        if (Number.isNaN(real)) {
            throw new Error(`Could not parse complex number from '${input}'`);
        }
        */
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

    i = new Complex("i");
}

console.log(Complex.i);