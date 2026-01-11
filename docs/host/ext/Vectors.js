(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('Vector Math must run unsandboxed');
  }
  const isPM = Scratch.isPenguinMod

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

  const { COMMAND, REPORTER, BOOLEAN, BUTTON } = Scratch.BlockType
  const { NUMBER, STRING } = Scratch.ArgumentType
  const { LEAF } = Scratch?.BlockShape || 0

  const [ color1, color2, color3 ] = [ "#00a74e", "#00803c", "#00612d" ];

  const { Cast } = Scratch;
  class Vector {
    constructor(input) {
      this.vec = Array.isArray(input) ? input.slice() : [];
    }

    toString() {
      return "(" + this.vec.join(', ') + ")";
    }
    toReporterContent() { // scratch reporter content
      const wrap = document.createElement('em');
      wrap.textContent = this.toString();
      return wrap;
    }
    fromListEditor(edit) { // scratch list editor
      return Vector.fromString(edit);
    }

    static fromString(str) {
      const vec = str.replace(/[()]/g, '').split(", ").map((val) => Cast.toNumber(val));
      return new Vector(vec);
    }

    sameDimensions(b) {
      return this.dimensions() === b.dimensions()
    }
    
    dimensions() {
        return this.vec.length;
    }
    
    add(b) {
      if (!this.sameDimensions(b)) {
        console.warn(this.toString() + " and " + b.toString() + "do not have the same dimensions!")
        return this;
      }

        const result = this.vec.map((val, i) => val + b.vec[i]);  
        return new Vector(result);
    }
    subtract(b) {
      if (!this.sameDimensions(b)) {
        console.warn(this.toString() + " and " + b.toString() + "do not have the same dimensions!")
        return this;
      }

      const result = this.vec.map((val, i) => val - b.vec[i]);  
      return new Vector(result);
    }
    dot(b) {
      if (!this.sameDimensions(b)) {
        console.warn(this.toString() + " and " + b.toString() + "do not have the same dimensions!")
        return 0;
      }
      return this.vec.reduce((sum, val, i) => sum + val * b.vec[i], 0);
    }
    dilate(num) {
      if (typeof num !== 'number') {
        console.warn(num + " is not a number");
        return this;
      }
      const result = this.vec.map((val) => val * num);  
      return new Vector(result);
    }
    mult(b) {
      if (!(b instanceof Vector)) {
        console.warn(b.toString() + " is not a Vector")
        return this;
      }
      const result = this.vec.map((val, i) => val * b.vec[i]);  
      return new Vector(result);
    }

    normalize() {
      const length = this.length();
      if (length === 0) {
        return this;
      }
      const result = this.vec.map((val) => val / length);
      return new Vector(result);
    }
    rotate2D(deg) {
      if (this.dimensions() !== 2) {
        console.warn(this.toString() + " is not a 2D Vector");
        return this;
      }

      const angle = -(deg * (Math.PI / 180)); 
      const s = Math.sin(angle);
      const c = Math.cos(angle);

      const [x, y] = this.vec;
      
      const rotVec = [
        (x * c) - (y * s),
        (x * s) + (y * c)
      ];
      
      return new Vector(rotVec);
    }
    rotate3D(deg, axis) {
      if (this.dimensions() !== 3) {
        console.warn(this.toString() + " is not a 3D Vector");
        return this;
      }
      const numAxis = NamedComps.get(axis);
      if (numAxis === undefined) return;

      const rotIdx = [0, 1, 2].filter(i => i !== numAxis);
      
      const planeVec = new Vector([
        this.vec[rotIdx[0]], 
        this.vec[rotIdx[1]]
      ]);
      
      const rotatedPlane = planeVec.rotate2D(deg);
      
      const result = [];
      result[numAxis] = this.vec[numAxis];
      result[rotIdx[0]] = rotatedPlane.vec[0];
      result[rotIdx[1]] = rotatedPlane.vec[1];
      
      return new Vector(result);
    }

    project3Dto2D(focal) {
      if (!(this.dimensions() === 3)) {
        console.warn(this.toString() + "is not a 3D Vector");
        return this;
      }
      const x = this.vec[0] * (focal / this.vec[2])
      const y = this.vec[1] * (focal / this.vec[2])

      return new Vector([x, y])
    }
    setDimension(D) {
      
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
      const Vec = {
        arg: {
          exemptFromNormalization: true,
          shape: LEAF,
          check: "Vec"
        },
        reporter: {
          blockType: REPORTER,
          blockShape: LEAF,
          forceOutputType: "Vec",
          disableMonitor: true
        }
      }
      return {
        id: 'cgVectormath',
        name: 'Vector Math',
        color1,
        color2,
        color3,
        /*
        menuIconURI,
        */
        blocks: [
          {
            opcode: "info",
            callFunc: this.info(),
            text: "Info",
            blockType: BUTTON
          },
          {
            opcode: "newVector2",
            text: "2D vector: ([x], [y])",
            arguments: { x: { type: NUMBER }, y: { type: NUMBER } },
            ...Vec.reporter
          },
          {
            opcode: "newVector3",
            text: "3D vector: ([x], [y], [z])",
            arguments: { x: { type: NUMBER }, y: { type: NUMBER }, z: { type: NUMBER } },
            ...Vec.reporter
          },
          {
            opcode: "arrayToVec",
            text: "string array: [ARRAY] to vector",
            arguments: { ARRAY: { type: STRING } },
            ...Vec.reporter
          },
          "---",
          {
            opcode: "plus",
            text: "[A] + [B]",
            arguments: { A: Vec.arg, B: Vec.arg },
            ...Vec.reporter
          },
          {
            opcode: "minus",
            text: "[A] - [B]",
            arguments: { A: Vec.arg, B: Vec.arg },
            ...Vec.reporter
          },
          {
            opcode: "dotProd",
            text: "[A] dot [B]",
            arguments: { A: Vec.arg, B: Vec.arg },
            ...Vec.reporter
          },
          {
            opcode: "dilate",
            text: "[A] * [NUM]",
            arguments: { A: Vec.arg, NUM: { type: NUMBER } },
            ...Vec.reporter
          },
          {
            opcode: "mult",
            text: "[A] * [B]",
            arguments: { A: Vec.arg, B: Vec.arg },
            ...Vec.reporter
          },
          {
            opcode: "normalize",
            text: "normalize [V]",
            arguments: { V: Vec.arg },
            ...Vec.reporter
          },
          "---",
          {
            opcode: "rot2D",
            text: "rotate (2D) [V] [deg] degrees",
            arguments: { V: Vec.arg, deg: { type: NUMBER } },
            ...Vec.reporter
          },
          {
            opcode: "rot3D",
            text: "rotate (3D) [V] [deg] degrees on the [XYZ] axis",
            arguments: { V: Vec.arg, deg: { type: NUMBER }, XYZ: { type: STRING, menu: "xyz" } },
            ...Vec.reporter
          },
          "---",
          {
            opcode: "length",
            text: "magnitude of [V]",
            blockType: REPORTER,
            arguments: { V: Vec.arg }
          },
          {
            opcode: "dim",
            text: "dimensions of [V]",
            blockType: REPORTER,
            arguments: { V: Vec.arg }
          },
          {
            opcode: "stringify",
            text: "[V] to string",
            blockType: REPORTER,
            arguments: { V: Vec.arg }
          },
          "---",
          {
            opcode: "isVector",
            text: "[V] is vector?",
            blockType: BOOLEAN,
            arguments: { V: { type: STRING } }
          },
          {
            opcode: "sameDim",
            text: "[A] equi-dimensional to [B]?",
            blockType: BOOLEAN,
            arguments: { A: Vec.arg, B: Vec.arg }
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
              VEC: Vec.arg
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
              VEC: Vec.arg
            }
          },
          "---",
          {
            opcode: "vectorPos",
            text: "position",
            ...Vec.reporter
          },
          {
            opcode: "setVecPos",
            text: "set position to: [V]",
            blockType: COMMAND,
            arguments: { V: Vec.arg }
          }
        ],
        menus: {
          namedComponents: {
            acceptReporters: true,
            items: NamedCompsMenu
          },
          xyz: {
            acceptReporters: true,
            items: ['x', 'y', 'z']
          }
        }
      };
    }
    info() {
      const str = 
`This extension is:
  Very experimental
  Unfinished
  Somewhat buggy

  Inspired by jwklong's Vector extension;
  despite this it is not compatible with said extension

  Not compatible with TurboWarp

PenguimMod is recommended
`
      alert(str)
    }

    static zeroArrayOfLength(length) {
      return new Array(length).fill(0)
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

    isVector({V}) {
      return V instanceof Vector;
    }
    sameDim({A,B}) {
      if (!(A instanceof Vector)) {
        return false;
      }
      if (!(B instanceof Vector)) {
        return false;
      }
      return A.sameDimensions(B);
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
    dilate({A,NUM}) {
      if (!(A instanceof Vector)) {
        return new Vector([0,0]);
      }
      const num = Cast.toNumber(NUM);

      return A.dilate(num);
    }
    mult({A,B}) {
      if (!(A instanceof Vector)) {
        return new Vector([0,0]);
      }
      if (!(B instanceof Vector)) {
        return new Vector([0,0]);
      }
      return A.mult(B);
    }
    normalize({V}) {
      if (!(V instanceof Vector)) {
        return new Vector([0,0])
      }
      return V.normalize();
    }

    rot2D({V,deg}) {
      if (!(V instanceof Vector)) {
        return new Vector([0,0]);
      }
      const angle = Cast.toNumber(deg);

      return V.rotate2D(angle);
    }
    rot3D({V,deg,XYZ}) {
      if (!(V instanceof Vector)) {
        return new Vector([0,0,0]);
      }
      if (!(typeof XYZ === 'string' || typeof XYZ === 'number')) {
        return V;
      }
      const angle = Cast.toNumber(deg);

      return V.rotate3D(angle, XYZ);
    }

    length({V}) {
      if (!(V instanceof Vector)) {
        return 0;
      }
      return V.length();
    }
    dim({V}) {
      if (!(V instanceof Vector)) {
        return 1;
      }
      return V.dimensions();
    }
    stringify({V}) {
      return Cast.toString(V);
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
      return VEC.getNumberedComp(COMP);
    }

    vectorPos(_, util) {
      const target = util.target;
      return new Vector([target.x, target.y]);
    }
    setVecPos({V}, util) {
      if (!(V instanceof Vector)) {
        util.target.setXY(0, 0);
        return;
      }
      /*
      if (V.dimensions() != 2) {
        util.target.setXY(0, 0);
        return;
      }
      */
      util.target.setXY(V.vec[0], V.vec[1])
    }
  }
  Scratch.extensions.register(new Ext());
})(Scratch);