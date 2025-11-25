// Name: More Loops
// ID: moreloops
// Description: More Loops. What else did you expect?
// By: catzcodingonpm
// License: MIT
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

  class MoreLoops {
    getInfo() {
      return {
        id: 'moreloops',
        name: 'More Loops',
        /*
        menuIconURI,
        */
        blocks: [
            {
              opcode: "repeatAifElseB",
              text: ["repeat [A] if [CON]", "else repeat [B]"],
              extensions: ['colours_control'],
              blockType: LOOP,
              branchCount: 1,
              arguments: {
                A: {type: NUMBER, defaultValue: 5},
                B: {type: NUMBER, defaultValue: 10},
                CON: {type: BOOLEAN}
              },
            },
            {
              opcode: "repeatNumOrUntil",
              text: "repeat [NUM] or until [CON]",
              extensions: ['colours_control'],
              blockType: LOOP,
              branchCount: 1,
              arguments: {
                NUM: {type: NUMBER, defaultValue: 10},
                CON: {type: BOOLEAN}
              }
            }
        ]
      };
    }

    // Helper Functions
    branchOnCondition(util, condition, branch = 1) {
      if (condition) {
          util.startBranch(branch, true);
      }
    }
    initializeLoopCounter(num, util) {
      if (typeof util.stackFrame.loopCounter === "undefined") {
        util.stackFrame.loopCounter = Math.round(Cast.toNumber(num));
        loopCount = undefined;
      }
    }
    repeat(num, util, branch = 1) {
      this.initializeLoopCounter(num, util)

      util.stackFrame.loopCounter--;
      loopCount = util.stackFrame.loopCounter;

      this.branchOnCondition(util, (util.stackFrame.loopCounter >= 0), branch);
    }

    // Block Functions
    repeatAifElseB(args, util) {
      if (Cast.toBoolean(args.CON)) {
        this.repeat(args.A, util)
      } else {
        this.repeat(args.B, util)
      }
    }
    repeatNumOrUntil(args, util) {
      this.initializeLoopCounter(args.NUM, util)

      util.stackFrame.loopCounter--;

      this.branchOnCondition(util, (util.stackFrame.loopCounter >= 0 && !args.CON));
    }
  }
  Scratch.extensions.register(new MoreLoops());
})(Scratch);