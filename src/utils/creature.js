import { types } from "./types";
import * as names from "./names";
import Number from "./number";

const creature = {
  create(creatureId) {
    const typeId = Number.getRandomIntInclusive(1, 4);
    const type = types.find(type => type.id === typeId);
    const strength = Number.getRandomIntInclusive(
      type.strength[0],
      type.strength[1]
    );
    const health = Number.getRandomIntInclusive(type.health[0], type.health[1]);
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
    };
  },

  getRandomNameByType(type, index) {
    return names[type.slug][index];
  }
};

export default creature;
