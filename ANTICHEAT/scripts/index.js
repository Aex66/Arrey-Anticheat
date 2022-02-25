import { world } from 'mojang-minecraft'
import './classes/manager/EventEmitter.js'
import './commands/import.js'
import { badwords } from './Events/beforeChat/badwords.js'
import './Events/import.js'
import { banTick } from './Events/tick/ban.js'

badwords
itemsBan();
anticrystal();
antitnt();
blockBan();
banTick();