(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('Extension must run unsandboxed');
  }

/*
  const menuIconURI = ""
*/
  const NamedComps = new Map([
    ["x", 0],
    ["y", 1],
    ["z", 2],
    ["w", 3],
    ["v", 4],
    ["u", 5],
    ["t", 6]
  ])

  const NamedCompsMenu = [...NamedComps.keys()];

  const { COMMAND, REPORTER, BOOLEAN, LABEL, BUTTON } = Scratch.BlockType // Use these as the blockType argument for each block
  const { NUMBER, STRING } = Scratch.ArgumentType

  const { Cast } = Scratch;
  class Vector {
    constructor(input) {
        /*
        if (input.length < 2) {
            throw new Error("Vector must have two components or more")
        }
        */
        this.vec = Array.isArray(input) ? input.slice() : [];
    }
    /**
    * (static) Returns true if two vectors have the same dimensions
    * @param {Vector} a The first vector to compare
    * @param {Vector} b The second vector to compare
    */
    static sameDimensions(a, b) {
        return a.dimensions() === b.dimensions()
    }
    /**
    * (non-static) Returns true if two vectors have the same dimensions
    * @param {Vector} b The vector to compare [this] with
    */ 
    sameDimensions(b) {
        return this.dimensions() === b.dimensions()
    }

    dimensions() {
        return this.vec.length;
    }

    toString() {
        return this.vec.join(', ');
    }
    
    add(b) {
        if (!this.sameDimensions(b)) {
            throw new Error('Vectors must have the same dimensions')
        }

        const result = this.vec.map((val, i) => val + b.vec[i]);  
        return new Vector(result);
    }
    subtract(b) {
        if (!this.sameDimensions(b)) {
          throw new Error('Vectors must have the same dimensions')
        }

        const result = this.vec.map((val, i) => val - b.vec[i]);  
        return new Vector(result);
    }
    dot(b) {
        if (!this.sameDimensions(b)) {
            throw new Error('Vectors must have the same dimensions')
        }
        return this.vec.reduce((sum, val, i) => sum + val * b.vec[i], 0);
    }
    mult(num) {
        const result = this.vec.map((val) => val * num);  
        return new Vector(result);
    }

    length() {
        const result = this.vec.reduce((sum, val) => sum + (val * val), 0);
        return Math.sqrt(result)
    }

    getNamedComp(comp) {
      const val = NamedComps.get(comp)
      return this.getNumberedComp(val)
    }
    getNumberedComp(comp) {
      const component = this.vec[comp]
      return Number.isNaN(component) ? null : component ?? null
    }
  }

  class Ext {
    getInfo() {
      return {
        id: 'vectormath',
        name: 'Vector Math',
        color1: "#00a74e",
        color2: "#00803c",
        color3: "#004621ff",
        /*
        menuIconURI,
        */
        blocks: [
          {
            opcode: "newVector2",
            text: "2D vector: ([x], [y])",
            blockType: REPORTER,
            arguments: { x: { type: NUMBER }, y: { type: NUMBER } }
          },
          {
            opcode: "newVector3",
            text: "3D vector: ([x], [y], [z])",
            blockType: REPORTER,
            arguments: { x: { type: NUMBER }, y: { type: NUMBER }, z: { type: NUMBER } }
          },
          {
            opcode: "arrayToVec",
            text: "convert array of numbers: [ARRAY] to vector",
            blockType: REPORTER,
            arguments: { ARRAY: { type: STRING } }
          },
          "---",
          {
            opcode: "plus",
            text: "[A] + [B]",
            blockType: REPORTER,
            arguments: { A: {}, B: {} }
          },
          {
            opcode: "minus",
            text: "[A] - [B]",
            blockType: REPORTER,
            arguments: { A: {}, B: {} }
          },
          {
            opcode: "dotProd",
            text: "[A] ⋅ [B]",
            blockType: REPORTER,
            arguments: { A: {}, B: {} }
          },
          {
            opcode: "mult",
            text: "[A] * [NUM]",
            blockType: REPORTER,
            arguments: { A: {}, NUM: { type: NUMBER } }
          },
          "---",
          {
            opcode: "length",
            text: "magnitude of [V]",
            blockType: REPORTER,
            arguments: { V: {} }
          },
          "---",
          {
            opcode: "getNamedComp",
            text: "named component [COMP] of [VEC]",
            blockType: REPORTER,
            arguments: {
              COMP: {
                type: STRING,
                menu: "namedComponents"
              },
              VEC: {}
            }
          },
          {
            opcode: "getNumedComp",
            text: "numbered component [COMP] of [VEC]",
            blockType: REPORTER,
            arguments: {
              COMP: {
                type: NUMBER,
              },
              VEC: {}
            }
          },
          {
            opcode: "vectorPos",
            text: "position",
            blockType: REPORTER
          },
          {
            opcode: "setVecPos",
            text: "set position to: [V]",
            blockType: COMMAND,
            arguments: { V: {} }
          }
        ],
        menus: {
          namedComponents: {
            acceptReporters: true,
            items: NamedCompsMenu
          }
        }
      };
    }
    newVector2({x,y}) {
      return new Vector([x, y]);
    }
    newVector3({x,y,z}) {
      return new Vector([x, y, z]);
    }
    arrayToVec({ARRAY}) {
      if (!ARRAY) { return } 
      const parse = JSON.parse(ARRAY)
      if (!(parse instanceof Array)) {
        const a = Cast.toNumber(parse)
        return a
      }
      if (parse.length < 2) {
        return parse[0]
      }

      const array = parse.filter((val) => {
        return typeof val === 'number';
      })
      return new Vector(array)
    }
    plus({A,B}) {
      if (!(A instanceof Vector)) {
        return new Vector([0,0]);
      }
      if (!(B instanceof Vector)) {
        return new Vector([0,0]);
      }

      return A.add(B);
    }
    minus({A,B}) {
      if (!(A instanceof Vector)) {
        return new Vector([0,0]);
      }
      if (!(B instanceof Vector)) {
        return new Vector([0,0]);
      }

      return A.subtract(B);
    }
    dotProd({A,B}) {
      if (!(A instanceof Vector)) {
        return undefined;
      }
      if (!(B instanceof Vector)) {
        return undefined;
      }

      return A.dot(B);
    }
    mult({A,NUM}) {
      if (!(A instanceof Vector)) {
        return new Vector([0,0]);
      }
      const num = Cast.toNumber(NUM);

      return A.mult(num);
    }

    length({V}) {
        return V.length();
    }

    getNamedComp({COMP, VEC}) {
      if (!(VEC instanceof Vector)) {
        return 0;
      }
      return VEC.getNamedComp(COMP);
    }
    getNumedComp({COMP, VEC}) {
      if (!(VEC instanceof Vector)) {
        return 0;
      }
      return VEC.getNumberedComp(COMP)
    }

    vectorPos(_, util) {
      const target = util.target;
      return new Vector([target.x, target.y]);
    }
    setVecPos({V}, util) {
      if (!(V instanceof Vector)) {
        util.target.setXY(0, 0)
        return
      }
      if (V.dimensions() != 2) {
        util.target.setXY(0, 0)
        return
      }
      util.target.setXY(V.vec[0], V.vec[1])
    }
  }
  Scratch.extensions.register(new Ext());
})(Scratch);