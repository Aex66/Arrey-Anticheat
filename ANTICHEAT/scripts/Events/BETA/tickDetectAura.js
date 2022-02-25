import { world } from 'mojang-minecraft'
import player from '../../utils/player.js'
import arrey from '../../utils/Arrey.js'
import config from '../../Data/config.js'
world.events.tick.subscribe(() => {
    [...world.getPlayers()].forEach(pl => {
    const overworld = world.getDimension('overworld')

       
       let entityHitScore = player.getScore({objective: 'entityHit', name: pl.nameTag, minimum: 0, maximum: 1000000})
       let entityHitTimerScore = player.getScore({objective: 'entityHitTimer', name: pl.nameTag, minimum: 0, maximum: 1000000})
       overworld.runCommand(`scoreboard players add @a[scores={cps=1..}] cpstimer 1`)
       if (entityHitScore >= 1) overworld.runCommand(`scoreboard players add @a[scores={entityHit=1..}] entityHitTimer 1`)
       if (entityHitScore >= 8 && entityHitTimerScore >= 60) overworld.runCommand(`scoreboard players add @a[scores={entityHit=8.., entityHitTimer=60..}] killaura 1`)
       if (entityHitScore >= 8 && entityHitTimerScore >= 60) overworld.runCommand(`scoreboard players reset @a[scores={entityHit=8.., entityHitTimer=60..}] entityHit`)
       if (entityHitTimerScore >= 60) overworld.runCommand(`scoreboard players reset @a[scores={entityHitTimer=60..}] entityHitTimer`)
       overworld.runCommand(`scoreboard players reset @a[scores={cps=8.., cpstimer=60..}] cps`)
       overworld.runCommand(`scoreboard players reset @a[scores={cpstimer=60..}] cpstimer`)
    })
})