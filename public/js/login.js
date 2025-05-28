document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-form");
  const selectMode = document.querySelector(".login__select");
  const selectDifficulty = document.querySelector(".difficulty-select");
  const input = document.querySelector(".login__input");
  const button = document.querySelector(".login__button");

  form.addEventListener("submit", function(event) {
    event.preventDefault(); // 🚨 Impede recarregamento da página!

    console.log("Evento de submit capturado!"); // ⚡ Debug para testar

    const playerName = input.value.trim();
    const gameMode = selectMode.value;
    const difficulty = selectDifficulty.value;

    if (!playerName || !gameMode || !difficulty) {
      alert("Por favor, preencha seu nome, modo e dificuldade.");
      return;
    }

    // Salva os dados no localStorage
    localStorage.setItem("player", playerName);
    localStorage.setItem("difficulty", difficulty);
    localStorage.setItem("theme", gameMode);

    console.log(`Redirecionando para ${gameMode === "rickmorty" ? "/game.html" : "/gamenaruto.html"}`); // ⚡ Debug

    // Redireciona corretamente para a página do jogo
    window.location.href = gameMode === "rickmorty" ? "/game.html" : "/gamenaruto.html";
  });

  // Ativa ou desativa o botão baseado no nome do jogador
  input.addEventListener("input", () => {
    button.disabled = input.value.trim().length <= 2;
  });
});
