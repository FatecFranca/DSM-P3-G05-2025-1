class GameModelNaruto {
  constructor() {
    this.characters = [
      'naruto', 'sasuke', 'sakura', 'kakashi', 'pain',
      'madara', 'itachi', 'shikamaru', 'minato', 'orochimaru'
    ];

    this.difficulty = 10;
    this.score = 0;
    this.cards = [];
  }

  initializeGame(difficulty) {
    this.difficulty = difficulty;
    const selectedCharacters = this.characters.sort(() => Math.random() - 0.5).slice(0, difficulty);
    this.cards = [...selectedCharacters, ...selectedCharacters].sort(() => Math.random() - 0.5);
    this.score = 0;
  }

  updateScore(points) {
    this.score += points;
  }

  getScore() {
    return this.score;
  }

  getCards() {
    return this.cards;
  }
}

export default GameModelNaruto;
