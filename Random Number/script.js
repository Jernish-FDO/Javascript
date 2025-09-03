let randomNumber;
let attempts;
let score;
let hearts;
const MAX_HEARTS = 5;
const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const message = document.getElementById('message');
const attemptsDiv = document.getElementById('attempts');
const restartBtn = document.getElementById('restartBtn');
const scoreSpan = document.getElementById('score');
const heartsSpan = document.getElementById('hearts');

function updateHearts() {
  heartsSpan.textContent = '❤️'.repeat(hearts) + '🤍'.repeat(MAX_HEARTS - hearts);
}

function initGame() {
  randomNumber = Math.floor(Math.random() * 10) + 1;
  attempts = 0;
  score = score === undefined ? 0 : score;
  hearts = MAX_HEARTS;
  message.textContent = '';
  attemptsDiv.textContent = '';
  guessInput.value = '';
  guessInput.disabled = false;
  guessBtn.disabled = false;
  restartBtn.style.display = 'none';
  scoreSpan.textContent = `Score: ${score}`;
  updateHearts();
}

function checkGuess() {
  const guess = Number(guessInput.value);
  if (!guess || guess < 1 || guess > 10) {
    message.textContent = 'Please enter a number between 1 and 10.';
    return;
  }
  attempts++;
  if (guess === randomNumber) {
    message.textContent = `🎉 Correct! The number was ${randomNumber}.`;
    attemptsDiv.textContent = `Attempts: ${attempts}`;
    score++;
    scoreSpan.textContent = `Score: ${score}`;
    guessInput.disabled = true;
    guessBtn.disabled = true;
    restartBtn.style.display = 'inline-block';
  } else {
    hearts--;
    updateHearts();
    if (hearts === 0) {
      message.textContent = `💔 Game Over! The number was ${randomNumber}.`;
      guessInput.disabled = true;
      guessBtn.disabled = true;
      restartBtn.style.display = 'inline-block';
    } else {
      message.textContent = guess < randomNumber ? 'Too low! Try again.' : 'Too high! Try again.';
      attemptsDiv.textContent = `Attempts: ${attempts}`;
    }
  }
}

guessBtn.addEventListener('click', checkGuess);
guessInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') checkGuess();
});
restartBtn.addEventListener('click', initGame);

initGame();