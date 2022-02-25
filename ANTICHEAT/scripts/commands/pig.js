//import minecraft modules
import * as Minecraft from "mojang-minecraft"
const World = Minecraft.world
//import Builders
import CommandBuilder from '../classes/builders/CommandBuilder.js'
import CommandHandler from '../classes/CommandRegistration.js'

const registration = new CommandBuilder()
.setName('pig')
.setAliases(['p'])
.setDescription("Summon your's pig")
.setUsage(['pig <spawn | s  | despawn | d> <x y z>'])
.setCancelMessage(true)
.setCooldown('2 minutes')
.addGroup(group => group.setName('spawn').setAliases(['s']).setDescription("Spawn pig's").addInput(input => input.setRequired(true).setType('int').setName('x')).addInput(input => input.setRequired(true).setType('int').setName('y')).addInput(input => input.setRequired(true).setType('int').setName('z')).addInput(input => input.setRequired(true).setType('int').setName('count')))
.addGroup(group => group.setName('despawn').setAliases(['d']).setDescription('Disappear all your pigs in a certain radius').addInput(input => input.setRequired(true).setType('int').setName('radius')))

CommandHandler.register(registration, (interaction) => {
  const group = interaction.command.getRanGroup()
  if(!group) return;
  
  switch(group.getName()) {
    case 'spawn':
        const x = group.getInput('x').getValue()
        const y = group.getInput('y').getValue()
        const z = group.getInput('z').getValue()
        const count = group.getInput('count').getValue()
        
        if (count > 50) return interaction.player.runCommand(`§c${count} son muchos cerdos no?`)
        for(let c = 0; c < count;) interaction.player.runCommand(`summon minecraft:pig ${x} ${y} ${z} minecraft:on_saddled "§7${interaction.player.nameTag}'s §dpig"`), c++
        interaction.player.runCommand(`tellraw "${interaction.player.nameTag}" {"rawtext":[{"text":"§c${count == 1 ? `§c1 §dPig` : count + ' ' + '§dPigs'} §bSpawned! §ain §e${x} §a${y} §b${z}§7."}]}`)
      break;
    case 'despawn':
      let radius = group.getInput('radius').getValue()
      try {
      interaction.player.runCommand(`kill @e[type=pig, name="§7${interaction.player.nameTag}'s §dpig", r=${radius}]`)
      interaction.player.runCommand(`tellraw "${interaction.player.nameTag}" {"rawtext":[{"text":"§eHas matado a todos los cerdos con el nombre §7${interaction.player.nameTag}'s §dpig §7en el radio: §c${radius} §acon exito!"}]}`)
      } catch (error) {
        World.getDimension('overworld').runCommand(`tellraw "${interaction.player.nameTag}" {"rawtext":[{"text":"§cNo se han podido encontrar cerdos con tu nombre en el radio: ${radius}"}]}`)
      }
  }
})