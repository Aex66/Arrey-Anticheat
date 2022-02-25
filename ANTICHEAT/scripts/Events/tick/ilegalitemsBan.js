import * as Minecraft from "mojang-minecraft"
import config from "../../Data/config.js"
import { ilegalitems } from "../../Data/ilegalThings.js"
import playerBuilder from "../../utils/player.js"
import arrey from "../../utils/Arrey.js"

const World = Minecraft.world

const itemsBan = () => {
    World.events.tick.subscribe(tick => {
        [...World.getPlayers()].forEach(player => {

            let inventory = player.getComponent("minecraft:inventory").container;
            let inventory_items = [];

            for(let i = 0; i < inventory.size; i++) {
                 try {
                let inventory_i = inventory.getItem(i)
                inventory_items.push(inventory_i.id)
            } catch( err ) { }
        }

                //Detectar si el jugador tiene un item ilegal para eliminarlo de su inventario
                inventory_items.forEach(item => {
                    if(ilegalitems.includes(item) && !playerBuilder.hasTag({tag: 'staff', name: player.nameTag}) || item > config.modules.ilegalitems.maxStack && playerBuilder.hasTag({tag: 'staff', name: player.nameTag})) {

                        player.runCommand(`clear ${player.nameTag}`)
                        arrey.flag({ name: player.nameTag, flagType: '§cIlegal items', score: 'ilegalItems', debug: true})
                        //player.triggerEvent("AEXX:kick")
                    }
                })
        })
    })
}

export { itemsBan };