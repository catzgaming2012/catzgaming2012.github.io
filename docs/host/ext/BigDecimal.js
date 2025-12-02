require('bigdecimal.js')

(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('Extension must run unsandboxed');
  }

/*
  const menuIconURI = ""
*/

  const { COMMAND, LOOP, CONDITIONAL, REPORTER, BOOLEAN, LABEL, BUTTON } = Scratch.BlockType
  const { NUMBER, STRING } = Scratch.ArgumentType

  const { vm, Cast } = Scratch;
  const runtime = vm.runtime;

  class BigDecimal {
    getInfo() {
      return {
        id: 'bigdecimal',
        name: 'BigDecimal',
        color1: "#00c288",
        color2: "#007e58",
        color3: "#005e42",
        /*
        menuIconURI,
        */
        blocks: [
          {
            opcode: "bigAdd",
            text: "[A] + [B]",
            blockType: REPORTER,
            arguments: { A: { type: NUMBER }, B: { type: NUMBER } }
          }
        ]
      };
    }
    bigAdd(args) {
        const a = new BigDec(args.A); // Get A
        const b = a.add(args.B); // Add B
        return b;
    }
  }
  Scratch.extensions.register(new BigDecimal());
})(Scratch);