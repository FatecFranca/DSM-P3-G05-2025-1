
class GameModelNaruto {
  constructor() {
    this.characters = [
      'naruto', 'sasuke', 'sakura', 'kakashi', 'pain',
      'madara', 'itachi', 'shikamaru', 'minato', 'orochimaru',
      'obito', 'kiba', 'hinata', 'jiraya', 'bee'
    ];

    this.difficulty = 10; 
    this.score = 0;      
    this.cards = [];     
  }

  /**
   * 
   * @param {number} difficulty - 
   */
  initializeGame(difficulty) {
    this.difficulty = difficulty;
    const selectedCharacters = this.characters.sort(() => Math.random() - 0.5).slice(0, difficulty);
    this.cards = [...selectedCharacters, ...selectedCharacters].sort(() => Math.random() - 0.5);
    this.score = 0;
  }

  /**
   *
   * @param {number} points - 
   */
  updateScore(points) {
    this.score += points;
  }

  /**
   * 
   * @returns {number} 
   */
  getScore() {
    return this.score;
  }

  /**
   * 
   * @returns {string[]} 
   */
  getCards() {
    return this.cards;
  }
}

export default GameModelNaruto; 