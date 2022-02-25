import { world } from 'mojang-minecraft'
import playerBuilder from './player.js'

class ArreyBuilder {
    constructor() {}
    /**
     * @name flag
     * @param {object} name -Player's nameTag 
     * @param {string} hackType - Type of hack
     * @param {string} score - Scoreboard to which the flag will be added (1 point)
     * @param {number} slot - In case you want to remove an item from the flagged user, the slot will be removed
     * @param {boolean} debug - notify all players with tag 'staff' who was flagged and why
     * @param {object} 
     */
    flag({ name, flagType, score, slot, debug}) {
        if(!name) return
        if(!flagType) return
        if(!score) return
            const overworld = world.getDimension('overworld')
            if (debug === true) overworld.runCommand(`tellraw @a[tag=staff] {"rawtext":[{"text":"§7[§aArrey§eAnticheat§7] §c${name} have been flagged for §${flagType}"}]}`)
        overworld.runCommand(`scoreboard players add ${name} ${score} 1`)
        if (slot) overworld.runCommand(`replaceitem entity ${name} slot.inventory ${slot} air`)
    }
}

const arrey = new ArreyBuilder()
export default arrey