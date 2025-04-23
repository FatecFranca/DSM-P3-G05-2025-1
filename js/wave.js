document.addEventListener("DOMContentLoaded", () => {
    const waveText = document.getElementById("wave");
    const chars = waveText.textContent.split("");
    waveText.textContent = "";
  
    chars.forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.classList.add("wave-letter");
      span.style.animationDelay = `${i * 0.1}s`;
      waveText.appendChild(span);
    });
  });
  