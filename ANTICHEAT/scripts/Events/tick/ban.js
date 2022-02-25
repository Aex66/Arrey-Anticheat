import { world } from 'mojang-minecraft'
        export const banTick = () => {
function getScore(objective, player, { minimum, maximum } = {}) {
    const data = player.runCommand(`scoreboard players test ${player.nameTag.startsWith('"') ? player.nameTag : `"${player.nameTag}"`} ${objective} ${minimum ? minimum : '*'} ${maximum ? maximum : '*'}`);
    if (data.error) {
        return;
    }
    return parseInt(data.statusMessage.match(/-?\d+/)[0]);
}

world.events.tick.subscribe(() => {

    [...world.getPlayers()].forEach(player => {

        try {
         
        let timeBanned = getScore("timeBanned", player, {minimum: 1, maximum: 10000000})
        let reason = getScore("reason", player, {minimum: 0, maximum: 100})
        if(reason == 1) reason = 'Cheating'
        if(reason == 2) reason = '2nd reason'

        for(let timeRemaining; timeBanned >= 1; timeRemaining++) {
            player.runCommand(`scoreboard players remove ${player.nameTag} timeBanned 1`)
            world.getDimension('overworld').runCommand(`kick ${player.nameTag} §cReason: ${reason} §aTime remaining: §e${timeRemaining} ticks`)
         }
       } catch (error) { }
    })
})}