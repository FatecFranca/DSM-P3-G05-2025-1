const input = document.querySelector('.login__input');
const buttonnaruto = document.querySelector('.loginnaruto__button');
const formnaruto = document.querySelector('.loginnaruto-form');

const validateInputNaruto = ({ target }) => {
  if (target.value.length > 2) {
    buttonnaruto.removeAttribute('disabled');
    return;
  }

  buttonnaruto.setAttribute('disabled', '');
}

const handleSubmitNaruto = (event) => {
  event.preventDefault();

  localStorage.setItem('player', input.value);
  window.location = 'pages/gamenaruto.html';
}


input.addEventListener('input', validateInputNaruto);
formnaruto.addEventListener('submit', handleSubmitNaruto);
