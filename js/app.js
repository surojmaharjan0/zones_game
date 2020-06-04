// District Data
const districts = [
    'Bhaktapur', 'Terhathum', 'Mahottari', 'Nawalparasi West', 'Kathmandu',
    'Parbat', 'Ramechhap', 'Surkhet', 'Lalitpur', 'Dolpa',
    'Darchula', 'Taplejung', 'Dang', 'Kaski', 'Morang',
    'Dhading', 'Rukum West', 'Parsa', 'Kanchanpur', 'Rasuwa',
    'Udayapur', 'Humla', 'Banke', 'Manang', 'Jumla',
    'Kailali', 'Gulmi', 'Panchthar', 'Baitadi', 'Sankhuwasabha',
    'Mustang', 'Bardiya', 'Ilam', 'Chitawan', 'Mugu',
    'Bajhang', 'Gorkha', 'Dadeldhura', 'Bara', 'Sindhupalchok',
    'Jhapa', 'Solukhumbu', 'Sarlahi', 'Doti', 'Myagdi',
    'Kapilbastu', 'Saptari', 'Lamjung', 'Bhojpur', 'Bajura',
    'Sunsari', 'Okhaldhunga', 'Rukum East', 'Sindhuli', 'Salyan',
    'Tanahu', 'Rautahat', 'Dolakha', 'Makawanpur', 'Siraha',
    'Achham', 'Nawalparasi East', 'Kavrepalanchok', 'Palpa', 'Khotang',
    'Rolpa', 'Syangja', 'Jajarkot', 'Dhankuta', 'Dailekh',
    'Dhanusa', 'Arghakhanchi', 'Nuwakot', 'Kalikot', 'Rupandehi',
    'Baglung', 'Pyuthan'

]

//UI elements
const shuffleBtn = document.querySelector('.shuffle');
const playBtn = document.querySelector('.play');
const replayBtn = document.querySelector('.replay');


const guessUI = document.querySelector('.guess');
const guessFormUI = document.querySelector('form');
const guessDistrictUI = document.querySelector('.guessedDistrict');
const scoreUI = document.querySelector('#scoreboard .score span');
const timeUI = document.querySelector('#scoreboard .time span');

// game variables
let timeRemaining = 60 * 1000;
let score = 0;
let currentDistrictNumber = '';
let currentDistrictName = '';
let gameCounter = '';

// Functions
const getRandomDistrictNumber = () => {
    return Math.ceil(Math.random() * 14);
}
const displayDistrictNumber = (districtNumber) => {
    guessUI.innerHTML = `Guess district <span># ${districtNumber}</span>`;
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
        guessDistrictUI.disabled = true;
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
    currentDistrictNumber = getRandomDistrictNumber();
    displayDistrictNumber(currentDistrictNumber);
    guessDistrictUI.disabled = false;
}
const checkGuess = (e) => {
    e.preventDefault();
    const guess = guessDistrictUI.value.toLowerCase();
    currentDistrictName = districts[currentDistrictNumber - 1].toLowerCase();
    if (currentDistrictName !== guess) {
        guessUI.innerHTML = `<p>👎👎👎</p>`;
    } else {
        score += 5;
        timeRemaining += 3000;
        guessUI.innerHTML = `<p>👍👍👍</p>`;
        updateScore();
    }
    guessDistrictUI.value = '';
    guessDistrictUI.disabled = true;
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



