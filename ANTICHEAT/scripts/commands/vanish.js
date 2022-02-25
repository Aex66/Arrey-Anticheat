import CommandBuilder from "../classes/builders/CommandBuilder.js"
import CommandHandler from "../classes/CommandRegistration.js"
import { world } from "mojang-minecraft"

const registration = new CommandBuilder()
.setName('vanish')
.setAliases(['v'])
.setDescription('To make you inaccessible to sight')
.setUsage(['vanish','vanish on <player: playerName>', 'vanish off <player: playerName>'])
.setCancelMessage(true)
.setRequiredTags(['staff'])
.setCooldown('5 seconds')
.addGroup(group => group.setName('on').setAliases(['activate']).setDescription('Activate vanish').addInput(input => input.setRequired(true).setType('player').setName('player')))
.addGroup(group => group.setName('off').setAliases(['deactivate']).setDescription('deactivate vanish').addInput(input => input.setRequired(true).setType('player').setName('player')))
 

CommandHandler.register(registration, interaction => {
  const group = interaction.command.getRanGroup()
  if(!group) return //player ran base cmd
  
  const player = group.getInput('player').getValue()
  
  switch(group.getName()) {
    case "on":
        if(!player) player = interaction.player.nameTag
    player.runCommand(`effect ${player.nameTag} invisibility 99999 255 true`)
    break;
    case "off":
        if(!player) player = interaction.player.nameTag
    player.runCommand(`effect ${player.nameTag} clear`)
    break;
  }
})