(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('Chance must run unsandboxed');
  }

  const menuIconURI = 
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJzdmc0IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA2OS41NjUgNjkuNTY1IiBoZWlnaHQ9IjY5LjU2NSIgd2lkdGg9IjY5LjU2NSI+CiAgPGRlZnMgaWQ9ImRlZnM0Ij48L2RlZnM+CiAgCiAgPGNpcmNsZSByPSIzMi43ODMwMDEiIGN5PSIzNC43ODMwMDEiIGN4PSIzNC43ODMwMDEiIGlkPSJwYXRoNSIgc3R5bGU9ImZpbGw6I2JmMTlmZjtmaWxsLW9wYWNpdHk6MTtzdHJva2U6I2E5MDBjNztzdHJva2Utd2lkdGg6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MSI+PC9jaXJjbGU+CiAgPHBhdGggc3R5bGU9InN0cm9rZS13aWR0aDowLjA1MDQxNjtmaWxsOiM3NzAwOGM7ZmlsbC1vcGFjaXR5OjEiIGlkPSJwYXRoMSIgZD0ibSAyNS45MjUxMjYsNDcuMDk5ODMzIHEgMS4yNjAzOTksMCAyLjE0MjY3OCwtMC44ODIyOCAwLjg4MjI4LC0wLjg4MjI3OSAwLjg4MjI4LC0yLjE0MjY3OSAwLC0xLjI2MDM5OSAtMC44ODIyOCwtMi4xNDI2NzggLTAuODgyMjc5LC0wLjg4MjI4IC0yLjE0MjY3OCwtMC44ODIyOCAtMS4yNjA0LDAgLTIuMTQyNjc5LDAuODgyMjggLTAuODgyMjgsMC44ODIyNzkgLTAuODgyMjgsMi4xNDI2NzggMCwxLjI2MDQgMC44ODIyOCwyLjE0MjY3OSAwLjg4MjI3OSwwLjg4MjI4IDIuMTQyNjc5LDAuODgyMjggeiBtIDAsLTE4LjE0OTc0OSBxIDEuMjYwMzk5LDAgMi4xNDI2NzgsLTAuODgyMjggMC44ODIyOCwtMC44ODIyNzkgMC44ODIyOCwtMi4xNDI2NzggMCwtMS4yNjA0IC0wLjg4MjI4LC0yLjE0MjY3OSAtMC44ODIyNzksLTAuODgyMjggLTIuMTQyNjc4LC0wLjg4MjI4IC0xLjI2MDQsMCAtMi4xNDI2NzksMC44ODIyOCAtMC44ODIyOCwwLjg4MjI3OSAtMC44ODIyOCwyLjE0MjY3OSAwLDEuMjYwMzk5IDAuODgyMjgsMi4xNDI2NzggMC44ODIyNzksMC44ODIyOCAyLjE0MjY3OSwwLjg4MjI4IHogTSAzNSwzOC4wMjQ5NTggcSAxLjI2MDM5OSwwIDIuMTQyNjc5LC0wLjg4MjI3OSAwLjg4MjI3OSwtMC44ODIyOCAwLjg4MjI3OSwtMi4xNDI2NzkgMCwtMS4yNjAzOTkgLTAuODgyMjc5LC0yLjE0MjY3OSBRIDM2LjI2MDM5OSwzMS45NzUwNDIgMzUsMzEuOTc1MDQyIHEgLTEuMjYwMzk5LDAgLTIuMTQyNjc5LDAuODgyMjc5IC0wLjg4MjI3OSwwLjg4MjI4IC0wLjg4MjI3OSwyLjE0MjY3OSAwLDEuMjYwMzk5IDAuODgyMjc5LDIuMTQyNjc5IDAuODgyMjgsMC44ODIyNzkgMi4xNDI2NzksMC44ODIyNzkgeiBtIDkuMDc0ODc0LDkuMDc0ODc1IHEgMS4yNjA0LDAgMi4xNDI2NzksLTAuODgyMjggMC44ODIyOCwtMC44ODIyNzkgMC44ODIyOCwtMi4xNDI2NzkgMCwtMS4yNjAzOTkgLTAuODgyMjgsLTIuMTQyNjc4IC0wLjg4MjI3OSwtMC44ODIyOCAtMi4xNDI2NzksLTAuODgyMjggLTEuMjYwMzk5LDAgLTIuMTQyNjc4LDAuODgyMjggLTAuODgyMjgsMC44ODIyNzkgLTAuODgyMjgsMi4xNDI2NzggMCwxLjI2MDQgMC44ODIyOCwyLjE0MjY3OSAwLjg4MjI3OSwwLjg4MjI4IDIuMTQyNjc4LDAuODgyMjggeiBtIDAsLTE4LjE0OTc0OSBxIDEuMjYwNCwwIDIuMTQyNjc5LC0wLjg4MjI4IDAuODgyMjgsLTAuODgyMjc5IDAuODgyMjgsLTIuMTQyNjc4IDAsLTEuMjYwNCAtMC44ODIyOCwtMi4xNDI2NzkgLTAuODgyMjc5LC0wLjg4MjI4IC0yLjE0MjY3OSwtMC44ODIyOCAtMS4yNjAzOTksMCAtMi4xNDI2NzgsMC44ODIyOCAtMC44ODIyOCwwLjg4MjI3OSAtMC44ODIyOCwyLjE0MjY3OSAwLDEuMjYwMzk5IDAuODgyMjgsMi4xNDI2NzggMC44ODIyNzksMC44ODIyOCAyLjE0MjY3OCwwLjg4MjI4IHogTSAyMC44ODM1MjksNTMuMTQ5NzQ5IHEgLTEuNjYzNzI3LDAgLTIuODQ4NTAzLC0xLjE4NDc3NSAtMS4xODQ3NzUsLTEuMTg0Nzc2IC0xLjE4NDc3NSwtMi44NDg1MDMgViAyMC44ODM1MjkgcSAwLC0xLjY2MzcyNyAxLjE4NDc3NSwtMi44NDg1MDMgMS4xODQ3NzYsLTEuMTg0Nzc1IDIuODQ4NTAzLC0xLjE4NDc3NSBoIDI4LjIzMjk0MiBxIDEuNjYzNzI3LDAgMi44NDg1MDMsMS4xODQ3NzUgMS4xODQ3NzUsMS4xODQ3NzYgMS4xODQ3NzUsMi44NDg1MDMgdiAyOC4yMzI5NDIgcSAwLDEuNjYzNzI3IC0xLjE4NDc3NSwyLjg0ODUwMyAtMS4xODQ3NzYsMS4xODQ3NzUgLTIuODQ4NTAzLDEuMTg0Nzc1IHogbSAwLC00LjAzMzI3OCBIIDQ5LjExNjQ3MSBWIDIwLjg4MzUyOSBIIDIwLjg4MzUyOSBaIG0gMCwtMjguMjMyOTQyIHYgMjguMjMyOTQyIHoiPjwvcGF0aD4KPC9zdmc+Cg=="

  var bonuses = new Map()

  const COMMAND = Scratch.BlockType.COMMAND
  const REPORTER = Scratch.BlockType.REPORTER
  const BOOLEAN = Scratch.BlockType.BOOLEAN

  const NUMBER = Scratch.ArgumentType.NUMBER
  const STRING = Scratch.ArgumentType.STRING

  const LABEL = Scratch.BlockType.LABEL

  function newBlock(type, op, txt, monitor = false) {
    return {opcode: op, blockType: type, text: txt, disableMonitor: !monitor};
  }
  function newMisc(type, txt) {
    return {blockType: type, text: txt};
  }
  function rollDice(SIDES) {
      return Math.round(Math.random() * (SIDES - 1)) + 1
  }
  function addAllBonuses() {
    var sum = 0
    bonuses.forEach (function(value) {
      sum += value;
    })
    return sum
  }
  class Chance {
    getInfo() {
      return {
        id: 'chance',
        name: 'Chance',
        color1: "#BF19FF",
        color2: "#A900C7",
        color3: "#77008C",
        menuIconURI,
        blocks: [
          newMisc(LABEL, "Coin Flips"),
          newBlock(BOOLEAN, "twentyEighty", "very likely"),
          newBlock(BOOLEAN, "fiftyFifty", "maybe"),
          newBlock(BOOLEAN, "eightyTwenty", "very unlikely"),
          "---",
          {
            opcode: "customPercent",
            blockType: BOOLEAN,
            text: "[PERCENT]% chance for true",
            disableMonitor: true,
            arguments: {
              PERCENT: {
                type: NUMBER,
                defaultValue: 60
              }
            }
          },
          newMisc(LABEL, "Dice Rolls"),
          /* 
          before you flame me for using the plural dice instead of singular version,
          online moderation is the process of overseeing and managing content and behavior
          in online communities to ensure they are safe and respectful.
          */
          {
            opcode: "rollSingleDice",
            blockType: REPORTER,
            text: "roll a [SIDES]-sided dice",
            disableMonitor: true,
            arguments: {
              SIDES: {
                type: NUMBER,
                defaultValue: 20
              }
            }
          },
          {
            opcode: "multiRollDice",
            blockType: REPORTER,
            text: "sum of [NUM] rolls of a [SIDES]-sided dice",
            disableMonitor: true,
            arguments: {
              SIDES: {
                type: NUMBER,
                defaultValue: 20
              },
              NUM: {
                type: NUMBER,
                defaultValue: 2
              }
            }
          },
          newMisc(LABEL, "Roll Bonuses"),
          newBlock(REPORTER, "returnBonuses", "bonuses"),
          {
            opcode: "setBonus",
            blockType: COMMAND,
            text: "set bonus [NAME] amount [BONUS]",
            disableMonitor: true,
            arguments: {
              NAME: {
                type: STRING,
                defaultValue: "proficiency"
              },
              BONUS: {
                type: NUMBER,
                defaultValue: 3
              }
            }
          },
          newBlock(COMMAND, "removeAllBonuses", "remove all bonuses"),
          {
            opcode: "removeBonus",
            blockType: COMMAND,
            text: "remove bonus [NAME]",
            disableMonitor: true,
            arguments: {
              NAME: {
                type: STRING,
                defaultValue: "proficiency"
              }
            }
          },
          "---",
          {
            opcode: "applyAllBonuses",
            blockType: REPORTER,
            text: "[ROLL] apply all bonuses",
            disableMonitor: true,
            arguments: {
              ROLL: {
                type: NUMBER,
                defaultValue: 0
              }
            }
          },
          {
            opcode: "applyOneBonus",
            blockType: REPORTER,
            text: "[ROLL] apply bonus [NAME]",
            disableMonitor: true,
            arguments: {
              NAME: {
                type: STRING,
                defaultValue: "proficiency"
              },
              ROLL: {
                type: NUMBER,
                defaultValue: 0
              }
            }
          },
        ]
      };
    }
    fiftyFifty() {
      return Math.random() > 0.5;
    }
    eightyTwenty() {
      return Math.random() > 0.8;
    }
    twentyEighty() {
      return Math.random() > 0.2;
    }
    customPercent(args) {
      return Math.random() < (args.PERCENT / 100)
    }
    rollSingleDice(args) {
      return rollDice(args.SIDES)
    }
    multiRollDice(args) {
      var sum = 0
      for (let i = 0; i < args.NUM; i++) {
        sum += rollDice(args.SIDES)
      }
      return sum
    }

    returnBonuses() {return bonuses}
    setBonus(args) {
      bonuses.set(args.NAME, args.BONUS)
      console.log(bonuses)
    }
    removeAllBonuses() {
      bonuses.clear()
      console.log(bonuses)
    }
    removeBonus(args) {
      bonuses.delete(args.NAME)
      console.log(bonuses)
    }

    applyAllBonuses(args) {return args.ROLL + addAllBonuses()}
    applyOneBonus(args) {return args.ROLL + bonuses.get(args.NAME)}
  }
  Scratch.extensions.register(new Chance());
})(Scratch);