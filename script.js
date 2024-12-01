const colorTranslation = {
    "azul claro": "LightBlue",
    "azul escuro": "DarkBlue",
    "vermelho": "Red",
    "verde": "Green",
    "amarelo": "Yellow",
    "laranja": "Orange",
    "rosa": "Pink",
    "roxo": "Purple",
    "cinza": "Gray",
    "preto": "Black"
  };
  
  let gameColors, secretColorName, secretColorCss, attemptsLeft, score;
  
  function initGame() {
    gameColors = Object.keys(colorTranslation).sort(() => 0.5 - Math.random()).slice(0, 5);
    secretColorName = gameColors[Math.floor(Math.random() * gameColors.length)];
    secretColorCss = colorTranslation[secretColorName];
    attemptsLeft = 5;
    updateAttempts();
    updateAvailableColors();
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').className = '';
    document.getElementById('userColor').value = '';
    document.getElementById('guessButton').disabled = false;
    document.getElementById('resetButton').style.display = 'none';
    document.body.style.backgroundColor = 'var(--background-color)';
  }
  
  function updateAttempts() {
    document.getElementById("tentativas").textContent = `Tentativas restantes: ${attemptsLeft}`;
  }
  
  function updateAvailableColors() {
    document.getElementById("availableColors").textContent = `Cores disponíveis: ${gameColors.join(", ")}`;
  }
  
  function updateScore() {
    document.getElementById("score").textContent = `Pontuação: ${score}`;
  }
  
  function guessColor() {
    const userInput = document.getElementById("userColor").value.trim().toLowerCase();
    const feedbackElement = document.getElementById("feedback");
  
    if (!userInput) {
      feedbackElement.textContent = "Por favor, digite uma cor.";
      feedbackElement.className = "error";
      return;
    }
  
    if (!gameColors.includes(userInput)) {
      feedbackElement.textContent = "Por favor, escolha uma cor válida da lista.";
      feedbackElement.className = "error";
      return;
    }
  
    attemptsLeft--;
    updateAttempts();
  
    if (userInput === secretColorName) {
      feedbackElement.textContent = `Parabéns! Você acertou! A cor era ${secretColorName}.`;
      feedbackElement.className = "success";
      document.body.style.backgroundColor = secretColorCss;
      endGame(true);
    } else {
      if (attemptsLeft > 0) {
        const hint = userInput < secretColorName ? "A cor secreta vem depois da sua na ordem alfabética." : "A cor secreta vem antes da sua na ordem alfabética.";
        feedbackElement.textContent = `Errado! ${hint}`;
        feedbackElement.className = "warning";
      } else {
        feedbackElement.textContent = `Fim de jogo! Você perdeu. A cor secreta era ${secretColorName}.`;
        feedbackElement.className = "error";
        endGame(false);
      }
    }
  }
  
  function endGame(isWin) {
    document.getElementById('guessButton').disabled = true;
    document.getElementById('resetButton').style.display = 'inline-block';
    if (isWin) {
      score += attemptsLeft * 10;
    }
    updateScore();
  }
  
  // Inicialização
  document.addEventListener('DOMContentLoaded', () => {
    score = 0;
    initGame();
    document.getElementById('guessButton').addEventListener('click', guessColor);
    document.getElementById('resetButton').addEventListener('click', initGame);
    document.getElementById('userColor').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        guessColor();
      }
    });
  });
  
  