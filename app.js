
let finalScore, scores, roundScore, activePlayer, gamePlaying, previousDice;

function init() {
    finalScore = prompt("Enter the final score required to win the game");
    // finalScore = 50;
    finalScore = parseInt(finalScore);

    finalScore = (finalScore === NaN ? 100 : finalScore);

    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    previousDice = 1;

    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";

    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";

    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    
    document.querySelector(".player-0-panel").classList.add("active");
}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;
    
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";
}

init();

document.querySelector(".btn-roll").addEventListener("click", function() {
    if(gamePlaying) {
        // Generate Random number
        let dice1 = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result in the UI
        document.getElementById("dice-1").style.display = "block";
        document.getElementById("dice-2").style.display = "block";

        document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
        document.getElementById("dice-2").src = "dice-" + dice2 + ".png";

        // 3. Update the round score if the rolled number is not a 1
        if(dice1 !== 1 && dice2 !== 1) {
            roundScore += dice1 + dice2;
            document.getElementById("current-" + activePlayer).textContent = roundScore;
        } else {
            // Next Player
            nextPlayer();
        }
    }

});

document.querySelector(".btn-hold").addEventListener("click", function() {
    if(gamePlaying) {
        // Add the CURRENT score to the global score
        scores[activePlayer] += roundScore;

        // update the UI
        document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];

        // check if the current player won the game
        if(scores[activePlayer] >= finalScore) {
            document.getElementById("name-" + activePlayer).textContent = "WINNER!";
            
            document.getElementById("dice-1").style.display = "none";
            document.getElementById("dice-2").style.display = "none";

            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        } else {
            // next player
            nextPlayer();
        }
    }

}); 

document.querySelector(".btn-new").addEventListener("click", init);

























