(async function(Scratch) {
  'use strict';

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