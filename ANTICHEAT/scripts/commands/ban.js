import CommandBuilder from "../classes/builders/CommandBuilder.js"
import CommandHandler from "../classes/CommandRegistration.js"

import * as Minecraft from "mojang-minecraft"
import { world } from "mojang-minecraft"

const registration = new CommandBuilder()
 .setName('ban')
 .setDescription('this command allows you to ban players from your world for a defined amount')
 .setUsage(['ban [player: playerName] [reason: string] [time: int-string ex: 2 days]'])