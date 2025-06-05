const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const scoreDisplay = document.querySelector('.score'); 

let score = 0; 
let firstCard = null;
let secondCard = null;
let totalPairs = 0;

const updateScore = (points) => {
  score += points;
  scoreDisplay.innerHTML = `Pontuação: ${score}`;
};

const characters = [
  'naruto',
  'sasuke',
  'sakura',
  'kakashi',
  'pain',
  'madara',
  'itachi',
  'shikamaru',
  'minato',
  'orochimaru',
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

const saveGameResult = async () => {
  const playerName = localStorage.getItem('playerName');
  const time = parseInt(timer.innerHTML);
  const theme = localStorage.getItem('theme') || 'naruto';
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

  console.log('Tentando salvar resultado:', data);

  try {
    const response = await fetch('/api/scores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    const responseText = await response.text();
    console.log('Resposta do servidor:', response.status, responseText);

    if (!response.ok) {
      throw new Error(`Failed to save score: ${response.status} ${responseText}`);
    }

    const result = JSON.parse(responseText);
    console.log('Score saved successfully:', result);
    alert(`Pontuação salva com sucesso!\nJogador: ${playerName}\nTema: ${theme}\nPontuação: ${score}\nTempo: ${time} segundos`);
  } catch (error) {
    console.error('Error saving score:', error);
    alert('Erro ao salvar a pontuação. Por favor, tente novamente.');
  }
};

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === totalPairs * 2) {
    clearInterval(this.loop);
    saveGameResult().then(() => {
      alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML} segundos. Sua pontuação final foi: ${score} pontos.`);
    });
  }
};

const checkCards = () => {
  if (!firstCard || !secondCard) return;

  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {
    firstCard.classList.add('disabled-card');
    secondCard.classList.add('disabled-card');
    updateScore(10); 

    firstCard = null;
    secondCard = null;

    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');
      updateScore(-1); 

      firstCard = null;
      secondCard = null;
    }, 500);
  }
};

const revealCard = ({ target }) => {
  if (target.parentNode.classList.contains('reveal-card') || target.parentNode.classList.contains('disabled-card')) return;
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

  front.style.backgroundImage = `url('/assets/images/naruto/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character);

  return card;
};

const loadGame = () => {
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
  timer.innerHTML = '0';
  this.loop = setInterval(() => {
    timer.innerHTML = `${parseInt(timer.innerHTML) + 1}`;
  }, 1000);
};

window.onload = () => {
  const playerName = localStorage.getItem('playerName');
  if (!playerName) {
    alert('Nome do jogador não encontrado! Por favor, faça login novamente.');
    window.location.href = '/';
    return;
  }
  spanPlayer.innerHTML = playerName;
  startTimer();
  loadGame();
  updateScore(0); 
};
