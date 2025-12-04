(function(Scratch) {
  'use strict';

  const name = 'Numbers N\' Stuff'

  if (!Scratch.extensions.unsandboxed) {
    throw new Error(name + ' must run unsandboxed');
  }

/*
  const menuIconURI = ""
*/

  const { COMMAND, LOOP, CONDITIONAL, REPORTER, BOOLEAN, LABEL, BUTTON } = Scratch.BlockType
  const { NUMBER, STRING } = Scratch.ArgumentType

  const { Cast } = Scratch;

  class NumsNStuff {
    getInfo() {
      return {
        id: 'numsnstuff',
        name,
        color1: "#FF0000",
        color2: "#AA0000",
        color3: "#770000",
        /*
        menuIconURI,
        */
        blocks: [
          {
            opcode: "maxSafe",
            text: "max safe integer",
            blockType: REPORTER,
            disableMonitor: true
          },
         {
            opcode: "minSafe",
            text: "min safe integer",
            blockType: REPORTER,
            disableMonitor: true
          },
          "---",
          {
            opcode: "epsilon",
            text: "epsilon",
            blockType: REPORTER,
            disableMonitor: true
          },
          {
            opcode: "pi",
            text: "pi",
            blockType: REPORTER,
            disableMonitor: true
          },
          {
            opcode: "e",
            text: "e",
            blockType: REPORTER,
            disableMonitor: true
          },
          {
            opcode: "goldenRatio",
            text: "phi",
            blockType: REPORTER,
            disableMonitor: true
          },
          {
            opcode: "eulerMaschConst",
            text: "euler-mascheroni",
            blockType: REPORTER,
            disableMonitor: true
          },
          "---",
          {
            opcode: "fibonacci",
            text: "get term [TERM] of fib-series with roots [A] and [B]",
            blockType: REPORTER,
            disableMonitor: true,
            arguments: {
              TERM: {
                type: NUMBER,
                defaultValue: 1
              },
              A: {
                type: NUMBER,
                defaultValue: 0
              },
              B: {
                type: NUMBER,
                defaultValue: 1
              },
            }
          },
        ]
      };
    }
    toInt(num) {
      return Math.trunc(Cast.toNumber(num));
    }

    maxSafe() { return Number.MAX_SAFE_INTEGER; }
    minSafe() { return Number.MIN_SAFE_INTEGER; }
    epsilon() { return Number.EPSILON; }
    pi() { return Math.PI; }
    e() { return Math.E; }
    goldenRatio() { return (1 + Math.sqrt(5)) / 2; }
    eulerMaschConst(args) { return 0.57721566490153286060651209008240243; } // doesnt need to be this accurate but whatevs
    fibonacci(args) {
      var sequence = [args.A, args.B]
      for (let i = 2; i < this.toInt(args.TERM); i++) {
        sequence[i] = sequence[i - 2] + sequence[i - 1]
      };
      return sequence[this.toInt(args.TERM) - 1];
    }
  }
  Scratch.extensions.register(new NumsNStuff());
})(Scratch);