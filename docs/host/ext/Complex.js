(async function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('Extension must run unsandboxed');
  }

  const libSite = "https://catzgaming2012.github.io/host/js/Complex.js"
  if (await Scratch.canFetch(libSite)) {
    try {
        const lib = await import(libSite);
        var Complex = lib.default || lib.Complex;
  } catch (e) {
        throw new Error(`Failed to load Complex: ${e.message}`);
    }
  } else {
    throw new Error('Extension could not fetch Complex.js lib. Most likely due to user request or connection.');
  }

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('Extension must run unsandboxed');
  }
  
/*
  const menuIconURI = ""
*/

  const { COMMAND, REPORTER, BOOLEAN, LOOP, LABEL, BUTTON, CONDITIONAL} = Scratch.BlockType
  const { NUMBER, STRING } = Scratch.ArgumentType
  const { LEAF } = Scratch.BlockShape

  class Ext {
    getInfo() {
      return {
        id: 'complex',
        name: 'Complex Numbers',
        color1: "#7100bd",
        color2: "#520088",
        color3: "#37005c",
        /*
        menuIconURI,
        */
        blocks: [
          {
            opcode: "newComplex",
            text: "[REAL] + [IMAG]i",
            blockType: REPORTER,
            blockShape: LEAF,
            arguments: {
              REAL: { type: NUMBER, defaultValue: 27 },
              IMAG: { type: NUMBER, defaultValue: 63 }
            }
          },
          "---",
          {
            opcode: "add",
            text: "[a] + [b]",
            blockType: REPORTER,
            blockShape: LEAF,
            arguments: {
              a: { type: STRING, defaultValue: "2 - 7i" },
              b: { type: STRING, defaultValue: "6 - 3i" }
            }
          },
          {
            opcode: "sub",
            text: "[a] - [b]",
            blockType: REPORTER,
            blockShape: LEAF,
            arguments: {
              a: { type: STRING, defaultValue: "2 - 7i" },
              b: { type: STRING, defaultValue: "6 - 3i" }
            }
          },
          {
            opcode: "mul",
            text: "[a] * [b]",
            blockType: REPORTER,
            blockShape: LEAF,
            arguments: {
              a: { type: STRING, defaultValue: "2 - 7i" },
              b: { type: STRING, defaultValue: "6 - 3i" }
            }
          },
          {
            opcode: "div",
            text: "[a] / [b]",
            blockType: REPORTER,
            blockShape: LEAF,
            arguments: {
              a: { type: STRING, defaultValue: "2 - 7i" },
              b: { type: STRING, defaultValue: "6 - 3i" }
            }
          },
          "---",
          {
            opcode: "mag",
            text: "magnitude of [a]",
            blockType: REPORTER,
            arguments: {
              a: { type: STRING, defaultValue: "27 - 63i" }
            }
          }
        ]
      };
    }
    newComplex({REAL, IMAG}) {
        return new Complex(REAL, IMAG);
    }

    add({a, b}) {
      const A = new Complex(a);
      const B = new Complex(b);
      return A.add(B);
    }
    sub({a, b}) {
      const A = new Complex(a);
      const B = new Complex(b);
      return A.subtract(B);
    }
    mul({a, b}) {
      const A = new Complex(a);
      const B = new Complex(b);
      return A.multiply(B);
    }
    div({a, b}) {
      const A = new Complex(a);
      const B = new Complex(b);
      return A.divide(B);
    }

    mag({a}) {
      const A = new Complex(a);
      return A.abs();
    }
  }
  Scratch.extensions.register(new Ext());
})(Scratch);