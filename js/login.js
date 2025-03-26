const input = document.querySelector('.login__input');
const button = document.querySelector('.login__button');
const buttonnaruto = document.querySelector('.loginnaruto__button');
const form = document.querySelector('.login-form');

const validateInput = ({ target }) => {
  if (target.value.length > 2) {
    button.removeAttribute('disabled');
    buttonnaruto.removeAttribute('disabled');
    return;
  }

  button.setAttribute('disabled', '');
  buttonnaruto.setAttribute('disabled', '');
};

const handleSubmit = (event) => {
  event.preventDefault();

  localStorage.setItem('player', input.value);
  window.location = 'pages/game.html';
};

const handleSubmitNaruto = (event) => {
  event.preventDefault();

  localStorage.setItem('player', input.value);
  window.location = 'pages/gamenaruto.html';
};

// Adicione eventos de clique para cada botão separadamente
button.addEventListener('click', handleSubmit);
buttonnaruto.addEventListener('click', handleSubmitNaruto);

// Validação do input
input.addEventListener('input', validateInput);
