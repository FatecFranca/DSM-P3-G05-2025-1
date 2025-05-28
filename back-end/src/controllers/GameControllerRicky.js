import GameModelRicky from '../model/GameModelRicky.js';
import GameViewRicky from '../view/GameViewRicky.js';

class GameControllerRicky {
  constructor() {
    this.model = new GameModelRicky();
    this.view = new GameViewRicky();
    this.firstCard = null;
    this.secondCard = null;
    this.timerInterval = null;
  }

  startGame(difficulty) {
    this.model.initializeGame(difficulty);
    this.view.renderGameBoard(this.model.getCards());
    this.view.updateScore(this.model.getScore());
    this.startTimer();
    
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', (event) => this.handleCardClick(event.target.parentNode));
    });
  }

  startTimer() {
    this.view.updateTimer('0');
    this.timerInterval = setInterval(() => {
      this.view.updateTimer(parseInt(this.view.timer.innerHTML) + 1);
    }, 1000);
  }

  handleCardClick(card) {
    if (card.classList.contains('reveal-card') || card.classList.contains('disabled-card')) return;

    if (!this.firstCard) {
      card.classList.add('reveal-card');
      this.firstCard = card;
    } else if (!this.secondCard) {
      card.classList.add('reveal-card');
      this.secondCard = card;
      
      setTimeout(() => this.checkCards(), 500);
    }
  }

  checkCards() {
    const firstCharacter = this.firstCard.getAttribute('data-character');
    const secondCharacter = this.secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {
      this.firstCard.classList.add('disabled-card');
      this.secondCard.classList.add('disabled-card');
      this.model.updateScore(10);
    } else {
      this.firstCard.classList.remove('reveal-card');
      this.secondCard.classList.remove('reveal-card');
      this.model.updateScore(-1);
    }

    this.view.updateScore(this.model.getScore());

    this.firstCard = null;
    this.secondCard = null;
  }
}

export default GameControllerRicky;
