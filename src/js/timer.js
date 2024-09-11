// todo:
// 1- Add event listener to the media controls
// 2- control the timer
// 3- adding three modes
// 4- changing the focus modes

import Storage from "./api.js";

// -------------------- Selecting Media Controls ------------------------
const startBtn = document.querySelector(".main__controls__start");
const nextBtn = document.querySelector(".main__controls__next");
const settingBtn = document.querySelector(".main__controls__setting");

// -------------------- Selecting Timer Control -------------------------
const timerMin = document.querySelector(".main__timer__min");
const timerSec = document.querySelector(".main__timer__sec");

let totalTime = 0;
let isActive = false;
let intervalRefrence = 0;
const allModes = Storage.getSetting();
let tracker = 0;

class Timer {
  constructor() {
    startBtn.addEventListener("click", this.startCounter);
    nextBtn.addEventListener("click", () => {});
    settingBtn.addEventListener("click", () => {});
  }

  startCounter() {
    isActive = !isActive; // Toggling the active mode

    if (isActive) {
      intervalRefrence = setInterval(Timer.timerLogic, 1000); // Start the count
    } else {
      clearInterval(intervalRefrence); // Stop the count
    }
  }
  // This method will do the counting down tasks
  static timerLogic() {
    // Checking if the time is up
    if (totalTime == 0) {
      Timer.nextMode(); // Go to the next mode
    } else {
      totalTime -= 1;
      Timer.updateTheTimerInHtml();
    }
  }

  // Formating the time
  static formatTime(time) {
    return String(time).padStart(2, "0");
  }

  // This method will find out which mode should play at the moment
  static nextMode() {
    tracker += 1;
    switch (tracker) {
      case 0:
        Timer.changeToFocusMode();
        break;

      case 1:
        Timer.changeToShortBreak();
        break;

      case 2:
        Timer.changeToLongBreak();
        break;

      default:
        tracker = 0;
        Timer.changeToFocusMode();
        break;
    }
  }

  static changeToFocusMode() {
    Timer.setDefaultValues();
  }

  static changeToShortBreak() {
    Timer.setDefaultValues();
  }

  // Reseting to default values and adjust the time value with the help of the tracker
  static setDefaultValues() {
    isActive = false;
    clearInterval(intervalRefrence); // Clearing our interval counter
    totalTime = allModes[tracker].time; // Setting the right time
    Timer.updateTheTimerInHtml(); // Update the html time
  }

  // Updating the values of our counter in the HTML
  static updateTheTimerInHtml() {
    timerMin.textContent = Timer.formatTime(Math.floor(totalTime / 60));
    timerSec.textContent = Timer.formatTime(Math.floor(totalTime % 60));
  }

  setApp() {
    Timer.changeToFocusMode();
  }
}

export default new Timer();
