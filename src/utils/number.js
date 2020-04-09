const number = {
  /**
   * Get random number with min and max included
   * @param min
   * @param max
   * @returns {number}
   */
  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

export default number;
