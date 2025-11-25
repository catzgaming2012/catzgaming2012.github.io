(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('Extension must run unsandboxed');
  }

/*
  const menuIconURI = ""
*/

  const { COMMAND, REPORTER, BOOLEAN, LOOP, LABEL, BUTTON, CONDITIONAL} = Scratch.BlockType
  const { NUMBER, STRING } = Scratch.ArgumentType

  class BaseExt {
    getInfo() {
      return {
        id: 'template',
        name: 'Template',
        docsURI: "https://docs.penguinmod.com/development/extensions/",
        color1: "#FF0000",
        color2: "#AA0000",
        color3: "#770000",
        /*
        menuIconURI,
        */
        blocks: [
          {
            text: "Label",
            blockType: LABEL,
          },
          {
            opcode: "button",
            text: "Button",
            blockType: BUTTON,
          },
          {
            opcode: "cmd",
            text: "command",
            blockType: COMMAND,
          },
          {
            opcode: "report",
            text: "reporter",
            blockType: REPORTER,
          },
          {
            opcode: "bool",
            text: "boolean",
            blockType: BOOLEAN,
          }
        ]
      };
    }

    // Loop Helpers
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

    // Opcodes
    button() {
      alert('Alert')
    }
    cmd() {
      console.log('i cant talk to you directly without erroring :(')
      return; // isn't necessary unless this isn't being used as a block opcode or is being used for reporters/booleans
    }
    report() {
      return "hey dont touch me >:(";
    }
    bool() {
      console.log('i can return but only true or false >:|')
      return false;
    }
  }
  Scratch.extensions.register(new BaseExt());
})(Scratch);