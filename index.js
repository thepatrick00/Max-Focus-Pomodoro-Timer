const timerDisplay = document.getElementById('time-display');
const endTime = document.getElementById('end-time-display');
const buttons = document.querySelectorAll('[data-time]');
const workButton = document.querySelector('.timer__button--work');
const addTimeBtn = document.querySelector('.timer__btn--add')
const subtractTimeBtn = document.querySelector('.timer__btn--subtract')


let countdown;
let secondsLeft;

addTimeBtn.addEventListener('click', ()=>{
    secondsLeft += 30
    displayTimeLeft(secondsLeft)
})



function timer(seconds) {
    clearInterval(countdown); 
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);
    
    countdown = setInterval(() => {
        secondsLeft = Math.round((then - Date.now()) / 1000); //then is a set time and Date.now() will keep going up and reach then eventually.
        if(secondsLeft < 0) {
            clearInterval(countdown)
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
let defaultTime = 1500; //seconds
displayTimeLeft(defaultTime)

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

/* Set time for all buttons */
// buttons.forEach(button => button.addEventListener('click', e => {
//     startTimer(e.target.dataset.time)
// }))

/* Set time for start/pause button */
//see if I can recode this. Kind of hard to read.
var paused = true;
let firstClick = true;
workButton.addEventListener('click', function(e) {

    //after initial - change end time & add time left to 
    if (paused && !firstClick){
        startTimer(secondsLeft);
        paused = false;
        workButton.textContent = 'Stop' 
        
    } else if(!paused){
        paused = true;
        workButton.textContent = 'Start'
        clearInterval(countdown)
        console.log(secondsLeft)
    }

    if(firstClick){
        startTimer(e.target.dataset.time);
        workButton.textContent = 'Stop'
        paused = false;
        firstClick = false;
    }
})


/* Form to input minutes manually */
/*
//instead of traditionally selecting with querySelector or getElement you can actually select by the name attribute on HTML elements and then even select the childs name attribute (minutes).
document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
})
*/

// const date = new Date();
// const [minutes, seconds] = [date.getMinutes(), date.getSeconds()];