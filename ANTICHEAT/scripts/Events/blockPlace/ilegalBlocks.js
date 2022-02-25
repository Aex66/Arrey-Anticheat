import { world, MinecraftBlockTypes, BlockLocation} from 'mojang-minecraft'
import config from '../../Data/config.js'
import { illegalblocks } from '../../Data/ilegalThings.js'
import  playerBuilder from '../../utils/player.js'
import arrey from '../../utils/Arrey.js'

const blockBan = () => {
world.events.blockPlace.subscribe(ev => {
    [...world.getPlayers()].forEach(pl => {
    const { block, player, dimension } = ev
    const { x, y, z} = block.location

    if(illegalblocks.includes(block.id)) {
        let oldBlock = block.id
        dimension.getBlock(new BlockLocation(x, y, z)).setType(MinecraftBlockTypes.air)
        arrey.flag({ name: player.nameTag, flagType: '§cIlegal blocks', score: 'ilegalBlocks', debug: true})
            if(playerBuilder.hasTag({tag: 'staff', name: pl.nameTag}) && config.logs) {
                player.runCommand(`tellraw @a[tag=staff] {"rawtext":[{"text":"§cAlert! §7${player.nameTag} §cplaced a ilegalBlock:§e${oldBlock} §ain §c${x} ${y} ${z}"}]}`)
            }
        }
    })
})}

export { blockBan };