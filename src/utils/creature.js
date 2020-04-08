import {Types} from "./types";
import * as names from "./names";

const Creature = {
  create(creatureId) {
    const typeId = this.getRandomIntInclusive(1, 4);
    const type = Types.find(type => type.id === typeId);
    const strength = this.getRandomIntInclusive(
      type.strength[0],
      type.strength[1]
    );
    const health = this.getRandomIntInclusive(type.health[0], type.health[1]);
    const name = this.getRandomNameByType(type, creatureId);

    return {
      id: creatureId,
      name: name,
      type: type,
      strength: strength,
      strengthMax: strength,
      health: health,
      healthMax: health,
      specialPower: type.specialPower
    }
  },

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //Il max è incluso e il min è incluso
  },

  getRandomNameByType(type, index) {
    return names[type.slug][index]
  }
};

export default Creature;
