(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('Extension must run unsandboxed');
  }

  const Complex = require("../js/Complex.js");
/*
  const menuIconURI = ""
*/
  const { vm, Cast } = Scratch;
  const runtime = vm.runtime;

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
                REAL: { type: NUMBER, defaultValue: 2 },
                IMAG: { type: NUMBER, defaultValue: 5}
            }
          }
        ]
      };
    }
    //
    newComplex({REAL, IMAG}) {
        return new Complex(REAL, IMAG);
    }
  }
  Scratch.extensions.register(new Ext());
})(Scratch);