import GameControllerRicky from './controller/GameControllerRicky.js';
import GameControllerNaruto from './controller/GameControllerNaruto.js';

window.onload = () => {
  const difficulty = parseInt(localStorage.getItem('difficulty')) || 10;
  const gameMode = localStorage.getItem('theme'); 

  if (gameMode === 'rickmorty') {
    const gameController = new GameControllerRicky();
    gameController.startGame(difficulty);
  } else if (gameMode === 'naruto') {
    const gameController = new GameControllerNaruto();
    gameController.startGame(difficulty);
  } else {
    console.error("Modo de jogo inválido!");
  }
};
