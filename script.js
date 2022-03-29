let clickSound = new Audio("sounds/swish.m4a");
let winSound = new Audio("sounds/yayy.mp3");
let loseSound = new Audio("sounds/aww.mp3");

function soundPlay([finalDecision]) {
    if (finalDecision === 0) {
        return loseSound.play();
    } else if (finalDecision === 1) {
        return winSound.play();
    }

}

function rpsGame(yourChoice) {
    let humanChoice, botChoice;

    humanChoice = yourChoice.id; //  selected by human

    botChoice = numberToChoose(randToRpsInt()); //  selected by computer

    result = selectWinner(humanChoice, botChoice); // result shown by [1,0], [0.5,0.5] or [0,1] [humanChoice | botChoice ]

    message = finalDecision(result); // message displayed according to result

    rpsFrontEnd(humanChoice, botChoice, message); // how all displyed in front end

    clickSound.play();
    soundPlay(result);
}

// to choose a random number between 0 , 1 and 2
function randToRpsInt() {
    return Math.floor(Math.random() * 3);
}
//to select rock paper or scissor using random number between 0, 1 and 2.
function numberToChoose(number) {
    return ['rock', 'paper', 'scissor'][number];
}

// to select the winner , for example [1,0] -> humanChoice:win | botChoice:lose
function selectWinner(humanChoice, computerChoice) {
    let rpsDatabase = {
        'rock': { 'scissor': 1, 'rock': 0.5, 'paper': 0 },
        'paper': { 'rock': 1, 'paper': 0.5, 'scissor': 0 },
        'scissor': { 'paper': 1, 'scissor': 0.5, 'rock': 0 }
    }

    let humanScore = rpsDatabase[humanChoice][computerChoice];
    let computerScore = rpsDatabase[computerChoice][humanChoice];

    return [humanScore, computerScore];
}

//to display weather you lost, tied or win 
function finalDecision([humanChoice, botChoice]) {
    if (humanChoice === 0) {
        return { 'message': 'You lost!', 'color': 'red' }
    } else if (humanChoice === 0.5) {
        return { 'message': 'You tied!', 'color': 'yellow' }
    } else {
        return { 'message': 'You win!', 'color': 'green' }
    }
}

//frontEnd view of human choice, message and bot choice display
function rpsFrontEnd(humanImageChoice, botImageChoice, finalDecision) {
    let imageDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissor': document.getElementById('scissor').src
    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    let humanDiv = document.createElement('div');
    let botDiv = document.createElement('div');
    let messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imageDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow:0 10px 30px blue;'>"
    messageDiv.innerHTML = "<h2 style='color:" + finalDecision['color'] + "; font-size:60px; padding:10px;'>" + finalDecision['message'] + " </h2>"
    botDiv.innerHTML = "<img src='" + imageDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow:0 10px 30px red;'>"

    document.getElementById('container-rps').appendChild(humanDiv);
    document.getElementById('container-rps').appendChild(messageDiv);
    document.getElementById('container-rps').appendChild(botDiv);


}