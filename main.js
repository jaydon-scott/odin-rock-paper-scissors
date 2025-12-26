console.log("Welcome to Odin Rock Paper Scissors!");

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

function getHumanChoice() {
  let choice = prompt("Make a choice (rock, paper, scissors): ");
  return choice;
}

function playRound(humanChoice, computerChoice) {
  humanChoice = humanChoice.toLowerCase();

  // Common strings
  let rockVsScissor = "Rock beats Scissors";
  let scissorVsPaper = "Scissor beats Paper";
  let paperVsRock = "Paper beats Rock";

  // Core game logic
  // If the choices are the same then it is a tie
  if (humanChoice === computerChoice) {
    console.log("Tie! No one wins!");
    return "none";
  }

  // Win/Lose scenarios
  let playerWon = false;
  if (
    (humanChoice == "rock" && computerChoice == "scissors") ||
    (humanChoice == "paper" && computerChoice == "rock") ||
    (humanChoice == "scissors" && computerChoice == "paper")
  ) {
    playerWon = true;
  }
  humanChoice = humanChoice.at(0).toUpperCase() + humanChoice.slice(1);
  computerChoice = computerChoice.at(0).toUpperCase() + computerChoice.slice(1);
  console.log(
    `You ${playerWon ? "win" : "lose"}! ${playerWon ? humanChoice : computerChoice} beats ${
      playerWon ? computerChoice : humanChoice
    }`
  );
  return playerWon ? "player" : "computer";
}

function playGame() {
  let numOfRounds = 0;
  let humanScore = 0;
  let computerScore = 0;

  while (numOfRounds < 5) {
    const humanChoice = getHumanChoice();
    const computerChoice = getComputerChoice();

    console.log(humanChoice);
    console.log(computerChoice);

    let res = playRound(humanChoice, computerChoice);

    if (res === "player") {
      humanScore++;
    } else if (res === "computer") {
      computerScore++;
    }
    console.log(`Current Score: Player: ${humanScore}, Computer: ${computerScore}`);

    numOfRounds++;
  }

  console.log(`Game Over! Player: ${humanScore}, Computer: ${computerScore}`);
  if (humanScore === computerScore) {
    console.log("Equal scores. Tie game!");
  } else {
    console.log(`${humanScore > computerScore ? "Player" : "Computer"} wins!`);
  }
}
