import * as Minecraft from "mojang-minecraft"
import { wordban } from "../../Data/wordban.js"
import arrey from "../../utils/Arrey.js"
const World = Minecraft.world


const badwords = () => {
    World.events.beforeChat.subscribe(eventData => {
        const {message, sender } = eventData

            

            wordban.forEach(a => {
                if(message.toLowerCase().includes(a)) {
                    eventData.cancel = true
                    sender.runCommand(`tellraw ${sender.nameTag} {"rawtext":[{"text":"§c${sender.nameTag} §7No uses malas palabras"}]}`)
                    arrey.flag({name: sender.nameTag, flagType: '§cBadwords', score: 'badwords', debug: true})

                }
            })
    })
}

export { badwords };