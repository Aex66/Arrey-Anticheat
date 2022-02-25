import * as Minecraft from 'mojang-minecraft'
import { world } from 'mojang-minecraft'
import CommandBuilder from '../classes/builders/CommandBuilder.js'
import CommandHandler from '../classes/CommandRegistration.js'

const registration = new CommandBuilder()
.setName('invsee')
.setAliases(['inven', 'isee'])
.setDescription('This command allows you to see the inventory of the players')
.setUsage(['invsee <player>'])
.setCancelMessage(true)
.setCooldown('2 seconds')
.setRequiredTags(['staff'])
.addInput(input => input.setRequired(true).setType('player').setName('player'))

CommandHandler.register(registration, (interaction) => {
    const player = interaction.command.getInput('player').getValue()

    const inventory = player.getComponent('minecraft:inventory').container

    interaction.player.runCommand(`tellraw "${interaction.player.nameTag}" {"rawtext":[{"text":"§7${player.nameTag}'s inventory:\n\n"}]}`)
    for(let i =0; i < inventory.size; i++) if (inventory.getItem(i)) {
    let item = inventory.getItem(i)
    let data = item.getComponent('minecraft:durability')
    let enchants = item.getComponent('minecraft:enchantments')
    interaction.player.runCommand(`tellraw "${interaction.player.nameTag}" {"rawtext":[{"text":"§7Slot: §a${i} \n §7Data: §a${item.data == 0  ? '§0' : item.data} \n  §7ID: §a${item.id} \n   §7Amount: §a${item.amount} \n    §7Enchants: §a${enchants}\n"}]}`)
    }
})