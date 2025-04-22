const select = document.querySelector('.login__select');
const input = document.querySelector('.login__input');
const button = document.querySelector('.login__button');
const form = document.querySelector('.login-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const playerName = input.value.trim();
  const gameMode = select.value;
  
  if (!playerName || !gameMode) {
    alert('Por favor, preencha seu nome e selecione um modo de jogo.');
    return;
  }
  
  localStorage.setItem('player', playerName);
  
  if (gameMode === 'rickmorty') {
    window.location.href = './pages/game.html';
  } else if (gameMode === 'naruto') {
    window.location.href = './pages/gamenaruto.html';
  }
});

input.addEventListener('input', ({ target }) => {
  if (target.value.length > 2) {
    button.removeAttribute('disabled');
  } else {
    button.setAttribute('disabled', '');
  }
});
