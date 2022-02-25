import { world } from 'mojang-minecraft'
import * as Minecraft from 'mojang-minecraft'
import CommandBuilder from '../classes/builders/CommandBuilder.js'
import CommandHandler from '../classes/CommandRegistration.js'

const registration = new CommandBuilder()
.setName('math')
.setAliases(['m'])
.setDescription('Use this command to perform arithmetic operations')
.setUsage(['math < + | - | * | / > <number: int> <number: int>'])
.setCancelMessage(true)
.addGroup(group => group.setName('division').setAliases(['d', 'div', '/']).setDescription('Division operator').addInput(input => input.setRequired(true).setType('int').setName('nod')).addInput(input => input.setRequired(true).setType('int').setName('ntd')))
.addGroup(group => group.setName('multiplication').setAliases(['m', 'mult', '*']).setDescription('Multiplication operator').addInput(input => input.setRequired(true).setType('int').setName('nom')).addInput(input => input.setRequired(true).setType('int').setName('ntm')))
.addGroup(group => group.setName('addition').setAliases(['s', 'sum', '+']).setDescription('Addition operator').addInput(input => input.setRequired(true).setType('int').setName('nos')).addInput(input => input.setRequired(true).setType('int').setName('nts')))
.addGroup(group => group.setName('subtraction').setAliases(['r', 'rest', '-']).setDescription('Subtraction operator').addInput(input => input.setRequired(true).setType('int').setName('nor')).addInput(input => input.setRequired(true).setType('int').setName('ntr')))

CommandHandler.register(registration, (interaction) => {
    const group = interaction.command.getRanGroup()
    if(!group) return;

    switch(group.getName()) {
        case 'division':
            const nod = group.getInput('nod').getValue()
            const ntd = group.getInput('ntd').getValue()

            return interaction.player.runCommand(`tellraw "${interaction.player.nameTag}" {"rawtext":[{"text":"§c[§7Division§c] -§aResult: §a${nod / ntd}"}]}`)
            break;
        case 'multiplication':
            const nom = group.getInput('nom').getValue()
            const ntm = group.getInput('ntm').getValue()


            return interaction.player.runCommand(`tellraw "${interaction.player.nameTag}" {"rawtext":[{"text":"§c[§7Multiplication§c] -§aResult: §a${nom * ntm}"}]}`)
            break;
        case 'addition':
            const nos = group.getInput('nos').getValue()
            const nts = group.getInput('nts').getValue()


            return interaction.player.runCommand(`tellraw "${interaction.player.nameTag}" {"rawtext":[{"text":"§c[§7Addition§c] -§aResult: §a${nos + nts}"}]}`)
            break;
        case 'subtraction':
            const nor = group.getInput('nor').getValue()
            const ntr = group.getInput('ntr').getValue()


            return interaction.player.runCommand(`tellraw "${interaction.player.nameTag}" {"rawtext":[{"text":"§c[§7Subtraction§c] -§aResult: §a${nor - ntr}"}]}`)
            break;
    }
})