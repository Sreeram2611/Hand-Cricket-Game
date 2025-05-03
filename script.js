let playerScore = 0;
let compScore = 0;
let isPlayerBatting = true;
let isFirstInnings = true;
let target = null;
let gameOver = false;

const statusText = document.getElementById('status');
const playerScoreEl = document.getElementById('playerScore');
const compScoreEl = document.getElementById('compScore');
const turnInfo = document.getElementById('turnInfo');
const restartBtn = document.getElementById('restartBtn');

const tossSection = document.getElementById('tossSection');
const chooseBatBowl = document.getElementById('chooseBatBowl');
const buttonsDiv = document.querySelector('.buttons');
const scoreboardDiv = document.querySelector('.scoreboard');

function toss(choice) {
  const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
  if (choice === result) {
    tossSection.style.display = 'none';
    chooseBatBowl.style.display = 'block';
  } else {
    tossSection.style.display = 'none';
    isPlayerBatting = Math.random() < 0.5;
    startGame();
  }
}

function setBatting(playerWantsToBat) {
  isPlayerBatting = playerWantsToBat;
  chooseBatBowl.style.display = 'none';
  startGame();
}

function startGame() {
  buttonsDiv.style.display = 'block';
  scoreboardDiv.style.display = 'block';
  statusText.style.display = 'block';

  updateTurnDisplay();
}

function playTurn(playerChoice) {
  if (gameOver) return;

  const compChoice = Math.floor(Math.random() * 6) + 1;

  if (isPlayerBatting) {
    if (playerChoice === compChoice) {
      playerScoreEl.innerText = playerScore;
      statusText.innerText = `You're OUT! You scored ${playerScore} runs.`;
      isPlayerBatting = false;
      isFirstInnings = false;
      target = playerScore + 1;
      turnInfo.innerText = 'Computer Batting';
      statusText.innerText += ` Target for Computer: ${target}`;
    } else {
      playerScore += playerChoice;
      playerScoreEl.innerText = playerScore;
      if (!isFirstInnings && playerScore >= target) {
        declareWinner();
        return;
      }
      statusText.innerText = `You chose ${playerChoice}, Computer chose ${compChoice}.`;
    }
  } else {
    if (playerChoice === compChoice) {
      compScoreEl.innerText = compScore;
      statusText.innerText = `Computer is OUT! It scored ${compScore} runs.`;
      if (isFirstInnings) {
        isPlayerBatting = true;
        isFirstInnings = false;
        target = compScore + 1;
        turnInfo.innerText = 'Player Batting';
        statusText.innerText += ` Target for You: ${target}`;
      } else {
        declareWinner();
      }
    } else {
      compScore += compChoice;
      compScoreEl.innerText = compScore;
      if (!isFirstInnings && compScore >= target) {
        declareWinner();
        return;
      }
      statusText.innerText = `You chose ${playerChoice}, Computer chose ${compChoice}.`;
    }
  }

  updateTurnDisplay();
}

function updateTurnDisplay() {
  if (gameOver) {
    turnInfo.innerText = 'Game Over';
    return;
  }
  turnInfo.innerText = isPlayerBatting ? 'Player Batting' : 'Computer Batting';
  statusText.innerText += ` Choose a number (1-6):`;
}

function declareWinner() {
  gameOver = true;
  buttonsDiv.style.display = 'none';

  if (playerScore >= target) {
    statusText.innerText = `You win! 🎉 Final Score: You ${playerScore} - ${compScore} Computer`;
  } else if (compScore >= target) {
    statusText.innerText = `Computer wins! 💻 Final Score: Computer ${compScore} - ${playerScore} You`;
  } else {
    statusText.innerText = `It's a tie! 🤝 Final Score: You ${playerScore} - ${compScore} Computer`;
  }

  turnInfo.innerText = 'Game Over';
  restartBtn.style.display = 'block';
}

function restartGame() {
  playerScore = 0;
  compScore = 0;
  isPlayerBatting = true;
  isFirstInnings = true;
  target = null;
  gameOver = false;

  playerScoreEl.innerText = '0';
  compScoreEl.innerText = '0';
  statusText.innerText = '';
  turnInfo.innerText = '-';

  tossSection.style.display = 'block';
  chooseBatBowl.style.display = 'none';
  buttonsDiv.style.display = 'none';
  scoreboardDiv.style.display = 'none';
  statusText.style.display = 'none';
  restartBtn.style.display = 'none';
}
