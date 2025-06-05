class GameViewNaruto {
  constructor() {
    this.grid = document.querySelector('.grid');
    this.timer = document.querySelector('.timer');
    this.spanPlayer = document.querySelector('.player');
    this.scoreDisplay = document.querySelector('.score');
  }

  renderGameBoard(cards) {
    this.grid.innerHTML = '';
    cards.forEach((character) => {
      const card = this.createCard(character);
      this.grid.appendChild(card);
    });
  }

  createCard(character) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-character', character);
    
    const front = document.createElement('div');
    front.classList.add('face', 'front');
    front.style.backgroundImage = `url('../assets/images/naruto/${character}.png')`;

    const back = document.createElement('div');
    back.classList.add('face', 'back');

    card.appendChild(front);
    card.appendChild(back);

    return card;
  }

  updateTimer(time) {
    this.timer.innerHTML = time;
  }

  updateScore(score) {
    this.scoreDisplay.innerHTML = `Pontuação: ${score}`;
  }
}

export default GameViewNaruto;
