import { world } from 'mojang-minecraft'
import player from '../../../utils/player.js'
import arrey from '../../../utils/Arrey.js'
import config from '../../../Data/config.js'

world.events.entityHit.subscribe(ev =>{
    const { entity, hitBlock, hitEntity } = ev
    entity.runCommand(`execute ${entity.nameTag} ~~~ scoreboard players add @s hitEntity 1`)
    entity.runCommand(`execute ${entity.nameTag} ~~~ scoreboard players add @s cps 1`)
    const overworld = world.getDimension('overworld')
    let cps = player.getScore({objective: 'cps', name: entity.nameTag, minimum: 0, maximum: 1000000})
    let cpstimer = player.getScore({objective: 'cpstimer', name: entity.nameTag, minimum: 0, maximum: 1000000})
    if (cps > config.modules.entityHit.maxCps && cpstimer >= 60) overworld.runCommand(`say §7${entity.nameTag} §7makes §c${cps} §7cps per 3 seconds`)
})
