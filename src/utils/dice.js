import Number from "./number";

const dice = {
  roll(currentRound) {
    let roll1 = Number.getRandomIntInclusive(1, 6);
    let roll2 = Number.getRandomIntInclusive(1, 6);

    let specialPowerLevel = roll1 === roll2 ? roll1 : 0;

    if (specialPowerLevel) {
      // handle special power
      console.log("Special power!!");
    }
    return {
      id: currentRound,
      roll1: roll1,
      roll2: roll2,
      specialPowerLevel: specialPowerLevel,
      specialPowers: []
    };
  }
};

export default dice;
