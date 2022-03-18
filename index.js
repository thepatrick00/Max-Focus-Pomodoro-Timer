const timerDisplay = document.getElementById('time-display');
const endTime = document.getElementById('endTimeDisplay');

const addTimeBtn = document.querySelector('.timer__btn--add');
const subtractTimeBtn = document.querySelector('.timer__btn--subtract');

const workBtn = document.querySelector('.timer__btn--work');
const shortBreakBtn = document.querySelector('.timer__btn--shortBreak');
const longBreakBtn = document.querySelector('.timer__btn--longBreak');


let minutes = 25;
let seconds = minutes*60;
let secondsLeft = seconds; //keep this the same as seconds because if wasButtonClick is rapidly clicked twice the coundown interval won't run and secondsLeft will be NaN;
let countdown;


function timer(s) {
    clearInterval(countdown); 
    const now = Date.now();
    const then = now + s * 1000;
    s = !wasBtnClicked ? seconds : secondsLeft;
    displayTimeLeft(s);
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

function displayTimeLeft(s) {
    const minutes = Math.floor(s / 60);
    const remainderSeconds = s % 60 ;
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
/* wasBtnClicked is a VERY IMPORTANT variable for this whole app to function correctly. It tells us weather the work button was click yet. If it was not then we use startTimer(seconds). Otherwise we use startTimer(secondsLeft) */
let wasBtnClicked = false;
/* START BUTTON */
workBtn.addEventListener('click', e => {
    
    if(paused && !wasBtnClicked){
        startTimer(seconds)
        workBtn.textContent = 'Stop'
    } else if(paused){
        startTimer(secondsLeft)
        workBtn.textContent = 'Stop' 
    } else if(!paused){
        clearInterval(countdown)
        workBtn.textContent = 'Start'
    }
    paused = !paused
    wasBtnClicked = true;
})

//Have the time displayed before the timer is even clicked.
displayTimeLeft(!wasBtnClicked ? seconds : secondsLeft)


addTimeBtn.addEventListener('click', function(){
    if(!wasBtnClicked){
        seconds += 30
        startTimer(seconds)
        clearInterval(countdown)
    } else {
        secondsLeft += 30
        startTimer(secondsLeft)
        clearInterval(countdown)
        displayTimeLeft(secondsLeft)
        workBtn.textContent = 'Start'
    }
    console.log('ADD BTN: ', 'seconds:', seconds, ' secondsLeft:', secondsLeft)
})


subtractTimeBtn.addEventListener('click', function(){
    if(!wasBtnClicked){
        seconds -= 30
        startTimer(seconds)
        clearInterval(countdown)
    } else {
        secondsLeft -= 30
        startTimer(secondsLeft)
        clearInterval(countdown)
        displayTimeLeft(secondsLeft)
        workBtn.textContent = 'Start'
    }
    console.log('ADD BTN: ', 'seconds:', seconds, ' secondsLeft:', secondsLeft)
})