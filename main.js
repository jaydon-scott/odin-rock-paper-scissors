// Game state tracking globals
let gameOverFlag = false;
let playerScore = 0;
let computerScore = 0;
const WINNING_SCORE = 5; // Score needed to win game

// Event Listeners for Rock, Paper, Scissors buttons
const choiceButtons = document.querySelectorAll(".choice-btn");

// Iterate through buttons and add event listeners
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    playRound(button.id.replace("-btn", ""));
  });

  // Mouse enter/leave event listeners to show border around image of choice on hover
  button.addEventListener("mouseenter", () => {
    button.classList.toggle("choice-img-border");
  });
  button.addEventListener("mouseleave", () => {
    button.classList.toggle("choice-img-border");
  });
});

// Event listener for Reset button
const resetBtn = document.querySelector("#reset-btn");
resetBtn.addEventListener("click", () => {
  resetGame();
  resetBtn.classList.toggle("btn-visibility");
});

// Runs on page load
function startGame() {
  gameOverFlag = false;
  playerScore = 0;
  computerScore = 0;
}

// Runs when reset button is clicked after game is over
function resetGame() {
  startGame();
  resetDisplays();
}

function resetDisplays() {
  const gameText = document.querySelector("#game-text");
  gameText.textContent = "Make a choice!";

  // Need to use innerHTML to use non-breaking space here
  const resultsDisplay = document.querySelector("#game-results");
  resultsDisplay.innerHTML = "&nbsp;";

  const playerDisplay = document.querySelector("#player-choice-text");
  playerDisplay.innerHTML = "&nbsp;";

  const computerDisplay = document.querySelector("#computer-choice-text");
  computerDisplay.innerHTML = "&nbsp;";
}

// Runs when the game is over via a score reaching 5
function gameOver(winner) {
  gameOverFlag = true;
  winner = winner.at(0).toUpperCase() + winner.slice(1);
  const gameText = document.querySelector("#game-text");
  gameText.textContent = `${winner} won the game! Click reset below to start a new game!`;
  const resetBtn = document.querySelector("#reset-btn");
  resetBtn.classList.toggle("btn-visibility");
}

startGame();

// Main game logic
function playRound(playerChoice) {
  if (gameOverFlag) return;

  displayPlayerChoice(playerChoice);

  // Get computer choice and display
  let computerChoice = getComputerChoice();
  displayComputerChoice(computerChoice);

  let roundWinner = determineRoundWinner(playerChoice, computerChoice);
  if (roundWinner === "player") {
    playerScore++;
  } else if (roundWinner === "computer") {
    computerScore++;
  }

  // Display results and score
  displayResults(roundWinner);

  // Check game state
  if (playerScore === WINNING_SCORE || computerScore === WINNING_SCORE) {
    gameOver(playerScore === WINNING_SCORE ? "player" : "computer");
  }
}

function getComputerChoice() {
  let choice;
  res = Math.random();
  if (res <= 0.33) {
    choice = "rock";
  } else if (res >= 0.66) {
    choice = "scissors";
  } else {
    choice = "paper";
  }
  return choice;
}

function determineRoundWinner(playerChoice, computerChoice) {
  // Core logic for determining who won
  if (playerChoice === computerChoice) {
    return "none";
  }

  // Win/Lose scenarios
  let playerWon = false;
  if (
    (playerChoice == "rock" && computerChoice == "scissors") ||
    (playerChoice == "paper" && computerChoice == "rock") ||
    (playerChoice == "scissors" && computerChoice == "paper")
  ) {
    playerWon = true;
  }
  return playerWon ? "player" : "computer";
}

function displayPlayerChoice(choice) {
  const playerDisplay = document.querySelector("#player-choice-text");
  playerDisplay.textContent = `You: ${choice}`;
}

function displayComputerChoice(choice) {
  const computerDisplay = document.querySelector("#computer-choice-text");
  computerDisplay.textContent = `Computer: ${choice}`;
}

function displayResults(roundWinner) {
  const gameText = document.querySelector("#game-text");
  if (roundWinner === "none") {
    gameText.textContent = "This round is a tie!";
  } else {
    roundWinner = roundWinner.at(0).toUpperCase() + roundWinner.slice(1);
    gameText.textContent = `${roundWinner} wins this round!`;
  }

  const resultsDisplay = document.querySelector("#game-results");
  resultsDisplay.textContent = `You: ${playerScore} Computer: ${computerScore}`;
}
