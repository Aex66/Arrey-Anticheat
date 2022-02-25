import * as Minecraft from "mojang-minecraft"
import playerBuilder from "../../utils/player.js"
import config from "../../Data/config.js"
const World = Minecraft.world

const anticrystal = () => {
World.events.beforeExplosion.subscribe(ex => {
  [...World.getPlayers()].forEach(player => {
    let x = Math.trunc(ex.source.location.x);
    let y = Math.trunc(ex.source.location.y);
    let z = Math.trunc(ex.source.location.z);
    let dimension = World.getDimension('overworld');

    if (ex.source.id == "minecraft:ender_crystal") {
      ex.cancel = true
      if(playerBuilder.hasTag({tag: 'staff', name: player.nameTag}) && config.logs) {      
        dimension.runCommand(`tellraw @a[tag=staff] {"rawtext":[{"text":"§c${ex.source.id} §fExplodes!\n§fLocation: §c${x}§f, §a${y}§f, §b${z}"}]}`)
      }
     }
   })
  })
}

export { anticrystal };