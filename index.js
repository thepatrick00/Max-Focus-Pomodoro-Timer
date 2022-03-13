const timerDisplay = document.getElementById('time-display');
const endTime = document.getElementById('end-time-display');
const buttons = document.querySelectorAll('[data-time]'); // select all buttons with data-time attribute


let countdown;

function timer(seconds) {
    clearInterval(countdown); //clear any existing timers
    const now = Date.now() //get current miliseconds from Jan 1, 1970
    const then = now + seconds * 1000; //add our 25 minutes (in seconds) + to now variable
    displayTimeLeft(seconds);
    displayEndTime(then);
    
    /* set interval will repeatedly change the amount of time left every second*/
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if(secondsLeft < 0) {
            clearInterval(countdown) //once we reach 0 we can stop setInterval
            return;
        }
        displayTimeLeft(secondsLeft)
    }, 1000)
}

/* This function takes in secondsLeft as the parameter from above. Because seconds left changes each second, the display variable here changes each second*/
function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60 ;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    timerDisplay.textContent = display;
    document.title = display;
}


/* this function just need to run once. We have endtime set to 12 hours US standard, in settings I can allow people to switch it to 24 hour standard */
function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `End Time: ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer(){
    const seconds = parseInt(this.dataset.time); //this refers back to the button we pressed since ,this, is used only for the buttons callback function below. Dataset is used to read our buttons data attribute value;
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer)) //loop over every button with data-time attribue and add an event listener that runs startTimer();

//instead of traditionally selecting with querySelector or getElement you can actually select by the name attribute on HTML elements and then even select the childs name attribute (minutes).
document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
})

// timer(124)
// const date = new Date();
// const [minutes, seconds] = [date.getMinutes(), date.getSeconds()];