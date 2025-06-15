import GameModelRicky from '../model/GameModelRicky.js';
import GameViewRicky from '../view/GameViewRicky.js';

class GameControllerRicky {
  constructor() {
    this.model = new GameModelRicky();
    this.view = new GameViewRicky();
    this.firstCard = null;
    this.secondCard = null;
    this.timerInterval = null;
    this.gameStartTime = null;
    this.gameCompleted = false;
    this.playerName = localStorage.getItem('player') || 'Jogador';
    this.difficulty = parseInt(localStorage.getItem('difficulty')) || 15;
  }

  startGame(difficulty) {
    this.difficulty = difficulty || this.difficulty;
    this.gameStartTime = Date.now();
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
      
      
      this.checkEndGame();
    } else {
      this.firstCard.classList.remove('reveal-card');
      this.secondCard.classList.remove('reveal-card');
      this.model.updateScore(-1);
    }

    this.view.updateScore(this.model.getScore());

    this.firstCard = null;
    this.secondCard = null;
  }

  checkEndGame() {
    const totalPairs = this.difficulty;
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === totalPairs * 2 && !this.gameCompleted) {
      this.gameCompleted = true;
      clearInterval(this.timerInterval);
      
      const finalTime = parseInt(this.view.timer.innerHTML);
      const finalScore = this.model.getScore();
      
      
      this.saveScore(this.playerName, finalScore, finalTime, 'rickandmorty', this.difficulty);
      
      setTimeout(() => {
        alert(`🎉 Parabéns, ${this.playerName}! 
Tempo: ${finalTime} segundos
Pontuação: ${finalScore} pontos
Tema: Rick and Morty`);
      }, 500);
    }
  }

  async saveScore(playerName, score, time, theme, difficulty) {
    try {
      const response = await fetch('/api/scores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerName,
          score,
          time,
          theme,
          difficulty
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('✅ Pontuação salva com sucesso:', data);
      } else {
        console.error('❌ Erro ao salvar pontuação:', data.error);
      }
    } catch (error) {
      console.error('❌ Erro na requisição:', error);
    }
  }
}

export default GameControllerRicky;