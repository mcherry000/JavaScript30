let countdown;
const timerDisplay = document.querySelector('.display__time-left');//selct the HTML tag to display the time left
const endTime = document.querySelector('.display__end-time');//grabbing HTML element to display end Time
const buttons = document.querySelectorAll('[data-time]');


//function to find start time, end time and countdown displayed evrey second
function timer(seconds) {
    clearInterval(countdown) //when runfor second time, clear previously running timers
    const now = Date.now(); //gives seconds value
    const then = now + seconds * 1000; //add desired break time
    displayTimeLeft(seconds);// to begin with display the sected duration

    countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);  
        if(secondsLeft < 0) { // check if we should stop it!
          clearInterval(countdown);
            return; 
        }
        displayTimeLeft(secondsLeft);
    }, 1000) //display every second
}

//Function to convert time left into readable minutes and seconds
function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
  }

  function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
  }
  
  function startTimer() {
    const seconds = parseInt(this.dataset.time); //this.dataset gives an object defined in HTML file. Then, dataset.time will give us a string of time
    timer(seconds);
  }
  
  buttons.forEach(button => button.addEventListener('click', startTimer));
  document.customForm.addEventListener('submit', function(e) { //customForm is the name in the form tag in HTML file
    e.preventDefault(); // forms by default launch a new page which we intend to stop
    const mins = this.minutes.value; //minutes is the name of the class on input tag in HTML FILE
    console.log(mins); 
    timer(mins * 60);
    this.reset();
  });
  