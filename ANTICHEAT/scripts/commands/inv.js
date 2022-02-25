import { world, Enchantment, MinecraftEnchantmentTypes } from 'mojang-minecraft'
import CommandBuilder from '../classes/builders/CommandBuilder.js'
import CommandHandler from '../classes/CommandRegistration.js'

const registration = new CommandBuilder()
.setName('inv')
.setDescription('This command allows you to control the players inventory and their enderchest')
.setRequiredTags(['staff'])
.setUsage(['inv <see | clear> [player: playerNametag]', 'inv <add> [player: playerNametag] [item: itemStack] [count: int] [slot: int]'])
.setCancelMessage(true)
.addGroup(group => group.setName('see').setDescription("see players's inventory").setAliases(['s']).addInput(input => input.setName('player').setType('player').setRequired(true)))
.addGroup(group => group.setName('clear').setDescription("clear players's inventory").setAliases(['c']).addInput(input => input.setName('player').setType('player').setRequired(true)))
.addGroup(group => group.setName('add').setDescription("adds an item to the player's inventory").setAliases(['a']).addInput(input => input.setName('player').setType('player').setRequired(true)).addInput(input => input.setName('item').setType('string').setRequired(true)).addInput(input => input.setName('count').setType('int').setRequired(true)).addInput(input => input.setName('slot').setType('int').setRequired(true)))

CommandHandler.register(registration, (interaction) => {
    const group = interaction.command.getRanGroup()
    if (!group) return
    
    const player = group.getInpt('player').getValue()
    switch(group.getName()) {
        
        case 'see':
            const allEnchants = Object.values(MinecraftEnchantmentTypes)
            const inventory = player.getComponent('minecraft:inventory').container

            interaction.player.runCommand(`tellraw ${interaction.player.nameTag} {"rawtext":[{"text":"§e${player.nameTag}'s inventory:\n\n"}]}`)
            
            for(let i = 0; i < inventory.size; i++) if (inventory.getItem(i)) {

                let item = inventory.getItem(i)
                let enchants = item.getComponent('minecraft:enchantments').enchantments;
                for (let ench of allEnchants) {
                    let enchLvl = enchants.hasEnchantment(ench)
                interaction.player.runCommand(`tellraw ${interaction.player.nameTag} {"rawtext":[{"text":"§7Slot: §a${i}; §7ID: §a${item.id}; §7Data: §a${item.data == 0 ? '§c0' : item.data}; §7Amount: §a${item.amount}; §7Enchants: §a${ench.id} §7Level: §a${enchLvl}"}]}`)

                }
            }
        break;
        case 'clear':
            interaction.player.runCommand(`clear ${player.nameTag}`)
        break;
        case 'add':
            const item = group.getInput('item').getValue()
            const count = group.getInput('count').getValue()
            const slot = group.getInput('slot').getValue()
            interaction.player.runCommand(`replaceitem entity ${player.nameTag} slot.inventory ${slot} ${item} ${count}`)
        break;    
    }
})