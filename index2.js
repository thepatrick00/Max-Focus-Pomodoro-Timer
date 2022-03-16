const timerDisplay = document.getElementById('time-display');
const endTime = document.getElementById('end-time-display');

const workButton = document.querySelector('.timer__button--work');
const addTimeBtn = document.querySelector('.timer__btn--add');
const subtractTimeBtn = document.querySelector('.timer__btn--subtract');


let minutes = 1;
let seconds = minutes*60;
let secondsLeft;
let countdown;

function timer(seconds) {
    clearInterval(countdown); 
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);
    
    countdown = setInterval(() => {
        secondsLeft = Math.round( (then - Date.now()) / 1000); //Divide by 1000 to get it back to seconds
        if(secondsLeft < 0) {
            clearInterval(countdown)
            console.log("timerStopped")
            return;
        }
        displayTimeLeft(secondsLeft)
    }, 1000)
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60 ;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    timerDisplay.textContent = display;
    document.title = display + "- Time to focus!"
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `End Time: ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer(secondsStr){
    const seconds = parseInt(secondsStr); 
    timer(seconds);
}

//see if I can recode this. Kind of hard to read.
let paused = true;

/* START BUTTON */
workButton.addEventListener('click', e => {
    if(paused){
        startTimer(seconds)
        workButton.textContent = 'Stop' 
    } else if(!paused){
        clearInterval(countdown)
        workButton.textContent = 'Start'
    }
    paused = !paused
    wasBtnClicked = true;
})

//Have the time displayed before the timer is even clicked.
displayTimeLeft(seconds)

/* ADD TIME */
addTimeBtn.addEventListener('click', e => {
    seconds += 30
    displayTimeLeft(seconds)  
    console.log(seconds)
})

subtractTimeBtn.addEventListener('click', e => {
    seconds -= 30
    displayTimeLeft(seconds)  
    console.log(seconds)
})