const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const scoreDisplay = document.querySelector('.score'); // Adicionando a referência ao elemento de pontuação

let score = 0; // Inicializando a pontuação
let firstCard = null;
let secondCard = null;
let totalPairs = 0;

const updateScore = (points) => {
  score += points;
  scoreDisplay.innerHTML = `Pontuação: ${score}`;
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
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === totalPairs * 2) {
    clearInterval(this.loop);
    alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML} segundos. Sua pontuação final foi: ${score} pontos.`);
  }
};

const checkCards = () => {
  if (!firstCard || !secondCard) return;

  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {
    firstCard.classList.add('disabled-card');
    secondCard.classList.add('disabled-card');
    updateScore(10); // Adiciona 10 pontos ao acertar um par

    firstCard = null;
    secondCard = null;

    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');
      updateScore(-1); // Deduz 1 ponto ao errar

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
    setTimeout(checkCards, 500); // Chamando checkCards com um pequeno atraso para permitir visualização
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
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
  updateScore(0); // Exibir pontuação inicial
};
