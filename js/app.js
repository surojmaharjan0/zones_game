// Zone data
const zones = [
    'Bagmati', 'Bheri', 'Dhawalagiri', 'Gandaki', 'Janakpur', 'Karnali', 'Koshi', 'Lumbini', 'Mahakali', 'Mechi', 'Narayani', 'Rapti', 'Sagarmatha', 'Seti'
];

//UI elements
const shuffleBtn = document.querySelector('.shuffle');
const playBtn = document.querySelector('.play');
const replayBtn = document.querySelector('.replay');


const guessUI = document.querySelector('.guess');
const guessFormUI = document.querySelector('form');
const guessZoneUI = document.querySelector('.guessedZone');
const scoreUI = document.querySelector('#scoreboard .score span');
const timeUI = document.querySelector('#scoreboard .time span');

// game variables
let timeRemaining = 30 * 1000;
let score = 0;
let currentZoneNumber = '';
let currentZoneName = '';
let gameCounter = '';

// Functions
const getRandomZoneNumber = () => {
    return Math.ceil(Math.random() * 14);
}
const displayZoneNumber = (zoneNumber) => {
    guessUI.innerHTML = `Guess zone <span># ${zoneNumber}</span>`;
}
const updateScore = () => {
    scoreUI.textContent = score;
}
const updateTime = () => {
    timeUI.textContent = `${timeRemaining / 1000} s`
}
const checkGameOver = () => {
    if (timeRemaining === 0) {
        clearInterval(gameCounter);
        guessUI.innerHTML = score >= 35 ? `<p><span class="text-red"> GAME OVER !!</span> <br>🎉🎉🎉<br> 
        Your Score :<span class="text-red"> ${score}</span></p>` : `<p><span class="text-red">
        GAME OVER !!</span> <br>😝😝😝<br> Your Score :<span class="text-red"> ${score}</span></p>`;
        guessZoneUI.disabled = true;
        shuffleBtn.hidden = true;
        replayBtn.hidden = false;
    }
}
const trackTime = () => {
    gameCounter = setInterval(() => {
        timeRemaining -= 1000;
        checkGameOver();
        updateTime();
    }, 1000);
}
const beginGame = () => {
    currentZoneNumber = getRandomZoneNumber();
    displayZoneNumber(currentZoneNumber);
    guessZoneUI.disabled = false;
}
const checkGuess = (e) => {
    e.preventDefault();
    const guess = guessZoneUI.value.toLowerCase();
    currentZoneName = zones[currentZoneNumber - 1].toLowerCase();
    if (currentZoneName !== guess) {
        guessUI.innerHTML = `<p>👎👎👎</p>`;
    } else {
        score += 5;
        timeRemaining += 3000;
        guessUI.innerHTML = `<p>👍👍👍</p>`;
        updateScore();
    }
    guessZoneUI.value = '';
    guessZoneUI.disabled = true;
}
// Event Listeners
shuffleBtn.addEventListener('click', beginGame);
guessFormUI.addEventListener('submit', checkGuess);
playBtn.addEventListener('click', () => {
    playBtn.style.display = 'none';
    shuffleBtn.hidden = false;
    trackTime();
});
replayBtn.addEventListener('click', () => {
    location.reload();
});



