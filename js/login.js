const selectMode = document.querySelector(".login__select");
const selectDifficulty = document.querySelector(".difficulty-select");
const input = document.querySelector(".login__input");
const button = document.querySelector(".login__button");
const form = document.querySelector(".login-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const playerName = input.value.trim();
  const gameMode = selectMode.value;
  const difficulty = selectDifficulty.value;

  if (!playerName || !gameMode || !difficulty) {
    alert("Por favor, preencha seu nome, modo e dificuldade.");
    return;
  }

  localStorage.setItem("player", playerName);
  localStorage.setItem("difficulty", difficulty);

  if (gameMode === 'rickmorty') {
    window.location.href = './pages/game.html';
  } else if (gameMode === 'naruto') {
    window.location.href = './pages/gamenaruto.html';
  }
});


input.addEventListener("input", ({ target }) => {
  if (target.value.length > 2) {
    button.removeAttribute("disabled");
  } else {
    button.setAttribute("disabled", "");
  }
});
