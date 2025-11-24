(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('Extension must run unsandboxed');
  }

/*
  const menuIconURI = ""
*/

  const COMMAND = Scratch.BlockType.COMMAND
  const REPORTER = Scratch.BlockType.REPORTER
  const BOOLEAN = Scratch.BlockType.BOOLEAN

  const NUMBER = Scratch.ArgumentType.NUMBER
  const STRING = Scratch.ArgumentType.STRING

  const LABEL = Scratch.BlockType.LABEL
  const BUTTON = Scratch.BlockType.BUTTON

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