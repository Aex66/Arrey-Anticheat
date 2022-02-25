import { world } from 'mojang-minecraft'

class playerBuilder {
  constructor() {
    this.dimension = world.getDimension('overworld')
  }
  
  getTags({ name }) {
    const tag_data = this.dimension.runCommand(`tag "${name}" list`)
    if(!tag_data?.statusMessage) return []
    
    let tags = tag_data.statusMessage.match(/(?<=: ).*$/)
    if(!tags || !tags[0]) return []
    
    return tags[0].split('§r, §a') 
  }
  
  hasTag({ tag, name }) {
    const allTags = this.getTags({ name });
        if (!allTags)
            return false;
        for (const Tag of allTags)
            if (Tag.replace(/§./g, '').match(new RegExp(`^${tag.replace(/§./g, '')}$`)))
                return true;
        return false;
  }
  
  hasAllTags({ name, tags }) {
    return tags.every(tag => this.hasTag({ name, tag }))
  }
  
  exists({ name }) {
    return [...world.getPlayers()].some(player => player.nameTag == name || player.name == name)
  }
  
  find({ name }) {
    if(!this.exists({ name })) return
    return [...world.getPlayers()].find(player => player.nameTag == name || player.name == name)     
  }

  getScore({ objective, name, minimum, maximum }) {
    const data = player.runCommand(`scoreboard players test ${name.startsWith('"') ? name : `"${name}"`} ${objective} ${minimum ? minimum : '*'} ${maximum ? maximum : '*'}`);
    if (data.error)
    return;
    return parseInt(data.statusMessage.match(/-?\d+/)[0])
  }

  removeTag({ tag, name }) {
    const player = this.find(name);
    return player.removeTag(tag)
  }

  getPos({ name }) {
    const player = this.find(name)
    return {
      x: player.location.x,
      y: player.location.z,
      z: player.location.z,
    }
  }

  getItemCount({ itemIdentifier, itemData, name }) {
    let itemCount = [];
    const data = world.getDimension("overworld").runCommand(`clear "${name}" ${itemIdentifier} ${itemData ? itemData : "0"} 0`);
    if(data.error) return itemCount;
    data.playerTest.forEach((element) => {
      const count = parseInt(element.match(/(?<=.*?\().+?(?=\))/)[0]);
      const player = element.match(/^.*(?= \(\d+\))/)[0];
      itemCount.push({ player, count });
    })
        return itemCount ? itemCount : [];
  }

  getDimension({ name }) {
    const player = this.find(name)
    for (const dimension of ['overworld', 'nether', 'the end']) {
      if (player.dimension == world.getDimension(dimension)) return dimension;
    }
  }
}

const player = new playerBuilder()
export default player
