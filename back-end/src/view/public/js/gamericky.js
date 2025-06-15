const grid = document.getElementById('gameGrid');
const playerNameSpan = document.getElementById('playerName');
const timerSpan = document.getElementById('timer');
const movesSpan = document.getElementById('moves');
const scoreDisplay = document.querySelector('.score');
const restartButton = document.getElementById('restartButton');

let score = 0;
let moves = 0;
let firstCard = null;
let secondCard = null;
let totalPairs = 0;
let loop = null;

const updateMoves = () => {
  moves++;
  movesSpan.textContent = moves;
};

const characters = [
  'beth',
  'jerry',
  'jessica',
  'morty',
  'pessoa-passaro',
  'pickle-rick',
  'rick',
  'summer',
  'meeseeks',
  'scroopy',
  'summer1',
  'jerry1',
  'morty1',
  'rick1',
  'rick-morty'
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

const saveGameResult = async () => {
  const playerName = localStorage.getItem('playerName');
  const [minutes, seconds] = timerSpan.textContent.split(':').map(Number);
  const time = minutes * 60 + seconds;
  const theme = 'rickandmorty';
  const difficulty = totalPairs;

  if (!playerName) {
    alert('Nome do jogador não encontrado! Por favor, volte à tela inicial.');
    window.location.href = '/';
    return;
  }

  const data = {
    playerName,
    theme,
    score,
    time,
    difficulty
  };

  try {
    const response = await fetch('/api/scores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao salvar pontuação: ${response.status} ${errorText}`);
    }

    const result = await response.json();
    console.log('✅ Pontuação salva com sucesso:', result);
    alert(`🎮 Jogo finalizado!\n\n👤 Jogador: ${playerName}\n🎯 Pontuação: ${score}\n⏱️ Tempo: ${time} segundos\n🎲 Jogadas: ${moves}`);
  } catch (error) {
    console.error('❌ Erro ao salvar pontuação:', error);
    alert('Erro ao salvar a pontuação. Por favor, tente novamente.');
  }
};

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === totalPairs * 2) {
    clearInterval(loop);
    saveGameResult();
  }
};

const checkCards = () => {
  if (!firstCard || !secondCard) return;

  updateMoves();

  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {
    firstCard.classList.add('disabled-card');
    secondCard.classList.add('disabled-card');
    score += 10;
    scoreDisplay.textContent = `🏆 Pontuação: ${score}`;

    firstCard = null;
    secondCard = null;

    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');
      score = Math.max(0, score - 1);
      scoreDisplay.textContent = `🏆 Pontuação: ${score}`;

      firstCard = null;
      secondCard = null;
    }, 500);
  }
};

const revealCard = ({ target }) => {
  if (target.parentNode.classList.contains('reveal-card') || 
      target.parentNode.classList.contains('disabled-card')) {
    return;
  }

  if (!firstCard) {
    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;
  } else if (!secondCard) {
    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;
    setTimeout(checkCards, 500);
  }
};

const createCard = (character) => {
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('/assets/images/ricky/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character);

  return card;
};

const loadGame = () => {
  grid.innerHTML = '';
  const difficulty = parseInt(localStorage.getItem('difficulty')) || 10;
  totalPairs = difficulty;

  const selectedCharacters = characters.sort(() => 0.5 - Math.random()).slice(0, totalPairs);
  const gameCharacters = [...selectedCharacters, ...selectedCharacters].sort(() => Math.random() - 0.5);

  gameCharacters.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
};

const startTimer = () => {
  timerSpan.textContent = '00:00';
  let seconds = 0;
  
  loop = setInterval(() => {
    seconds++;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timerSpan.textContent = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }, 1000);
};

const resetGame = () => {
  clearInterval(loop);
  score = 0;
  moves = 0;
  firstCard = null;
  secondCard = null;
  movesSpan.textContent = '0';
  scoreDisplay.textContent = '🏆 Pontuação: 0';
  loadGame();
  startTimer();
};

window.onload = () => {
  const playerName = localStorage.getItem('playerName');
  if (!playerName) {
    alert('Nome do jogador não encontrado! Por favor, faça login novamente.');
    window.location.href = '/';
    return;
  }
  
  playerNameSpan.textContent = playerName;
  restartButton.addEventListener('click', resetGame);
  resetGame();
}; 