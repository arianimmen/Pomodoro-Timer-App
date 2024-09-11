import Storage from "./api.js";
import ThemeChange from "./uiThemeChange.js";

// -------------------- Selecting Media Controls ------------------------
const startBtn = document.querySelector(".main__controls__start");
const nextBtn = document.querySelector(".main__controls__next");
const settingBtn = document.querySelector(".main__controls__setting");

// -------------------- Selecting Timer Control -------------------------
const timerMin = document.querySelector(".main__timer__min");
const timerSec = document.querySelector(".main__timer__sec");

// ------------------  Selecting the Play/Pause Icon  -------------------
const playIcon = document.querySelector(".main__controls__start__icon");

// -------------------- Default Globals Values -----------------------
let totalTime = 0;
let isActive = false;
let intervalReference = 0;
let currentModeIndex = 0;
const allModes = Storage.getSetting();

class Timer {
  constructor() {
    startBtn.addEventListener("click", this.startCounter);
    nextBtn.addEventListener("click", () => {});
    settingBtn.addEventListener("click", () => {});
  }

  startCounter() {
    isActive = !isActive; // Toggling the active mode

    Timer.changePlayIcon(); // Changing the Play/Pause icon with the help of isActive

    if (isActive) {
      intervalReference = setInterval(Timer.timerLogic, 1000); // Start the count
    } else {
      clearInterval(intervalReference); // Stop the count
    }
  }

  // Change the Play/Stop icon based on the active status
  static changePlayIcon() {
    if (isActive) {
      playIcon.setAttribute("xlink:href", "../assets/images/sprite.svg#pause");
    } else {
      playIcon.setAttribute("xlink:href", "../assets/images/sprite.svg#start");
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
    currentModeIndex += 1;
    switch (currentModeIndex) {
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
        currentModeIndex = 0;
        Timer.changeToFocusMode();
        break;
    }
  }

  // ------------------ Different Modes Logic ---------------------------
  static changeToFocusMode() {
    Timer.setDefaultValues();
  }

  static changeToShortBreak() {
    Timer.setDefaultValues();
    ThemeChange.setGreenTheme();
  }

  static changeToLongBreak() {
    Timer.setDefaultValues();
  }

  // Reseting to default values and adjust the time value with the help of the currentModeIndex
  static setDefaultValues() {
    isActive = false;
    totalTime = allModes[currentModeIndex].time; // Setting the right time

    clearInterval(intervalReference); // Clearing our interval counter

    Timer.changePlayIcon(); // Changing the Play/Stop Icon
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
