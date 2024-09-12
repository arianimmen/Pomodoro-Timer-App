import Storage from "./api.js";
import ThemeChange from "./uiThemeChange.js";

// -------------------- Selecting Media Controls ------------------------
const startBtn = document.querySelector(".main__controls__start");
const nextBtn = document.querySelector(".main__controls__next");

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
let numberOfFocusSessions = 0;
let allModes = Storage.getSetting();

// ?-------------------------- Guide ------------------------------------
// currentModeIndex = 0  ==> Focus Mode
// currentModeIndex = 1  ==> Short Break
// currentModeIndex = 2  ==> Long  Break

class Timer {
  constructor() {
    startBtn.addEventListener("click", this.startCounter);
    nextBtn.addEventListener("click", Timer.nextModeManual);
  }

  setApp() {
    numberOfFocusSessions = 0;
    // Initialize the app with Focus Mode as the default
    Timer.changeToFocusMode();
  }

  // ------------------ Different Modes Logic ---------------------------
  // Switch to Focus Mode and apply corresponding theme
  static changeToFocusMode() {
    Timer.setDefaultValues();
    ThemeChange.setRedTheme();
  }

  // Switch to Short Break and apply corresponding theme
  static changeToShortBreak() {
    Timer.setDefaultValues();
    ThemeChange.setGreenTheme();
  }

  // Switch to Long Break and apply corresponding theme
  static changeToLongBreak() {
    Timer.setDefaultValues();
    ThemeChange.setBlueTheme();
  }
  // ---------------------------------------------------------------------

  // Toggle the timer state (start/stop) and change the play/pause icon accordingly
  startCounter() {
    isActive = !isActive; // Toggling the active mode

    Timer.changePlayIcon(); // Changing the Play/Pause icon with the help of isActive

    if (isActive) {
      const second = 1000;
      intervalReference = setInterval(Timer.timerLogic, second); // Start the count
    } else {
      clearInterval(intervalReference); // Stop the count
    }
  }

  // Update the play/pause icon based on whether the timer is active
  static changePlayIcon() {
    if (isActive) {
      playIcon.setAttribute("xlink:href", "../assets/images/sprite.svg#pause");
    } else {
      playIcon.setAttribute("xlink:href", "../assets/images/sprite.svg#start");
    }
  }

  // Handle the countdown logic: decrease time or switch to next mode if time runs out
  static timerLogic() {
    // Checking if the time is up
    if (totalTime == 0) {
      if (currentModeIndex == 0) {
        numberOfFocusSessions += 1;
      }
      Timer.nextModeAuto(); // Go to the next mode
    } else {
      totalTime -= 1;
      Timer.updateTheTimerInHtml();
    }
  }

  // Format time values (minutes/seconds) for display
  static formatTime(time) {
    return String(time).padStart(2, "0");
  }

  // Automatically switch to the next mode based on focus session count
  static nextModeAuto() {
    const numberOfSessions = Number(Storage.getSetting()[3].number); // Getting the number limit dynamicly from our Storage
    // Checking if the user pass the required number to have a long break
    console.log(numberOfSessions);

    if (numberOfFocusSessions >= numberOfSessions) {
      // Change to Long break
      currentModeIndex = 2;
      numberOfFocusSessions = 0;
      Timer.changeToLongBreak();
    } else if (currentModeIndex == 0) {
      // Change to Short Break
      currentModeIndex = 1;
      Timer.changeToShortBreak();
    } else {
      // Change to Focus Mode
      currentModeIndex = 0;
      Timer.changeToFocusMode();
    }
  }

  // Manually switch to the next mode, regardless of focus session count
  static nextModeManual() {
    currentModeIndex += 1;
    switch (currentModeIndex) {
      case 1:
        // Change to Short Break
        currentModeIndex = 1;
        Timer.changeToShortBreak();
        break;

      case 2:
        // Change to Long Break
        currentModeIndex = 2;
        Timer.changeToLongBreak();
        break;

      default:
        // Change to Focus Mode
        currentModeIndex = 0;
        Timer.changeToFocusMode();
        break;
    }
  }

  // Reset the timer and update display to match the current mode
  static setDefaultValues() {
    isActive = false;

    allModes = Storage.getSetting(); // Getting all the setting from our Storage
    totalTime = allModes[currentModeIndex].time; // Setting the right time

    clearInterval(intervalReference); // Clearing our interval counter

    Timer.changePlayIcon(); // Changing the Play/Stop Icon
    Timer.updateTheTimerInHtml(); // Update the html time
  }

  // Update the timer display in the HTML
  static updateTheTimerInHtml() {
    timerMin.textContent = Timer.formatTime(Math.floor(totalTime / 60));
    timerSec.textContent = Timer.formatTime(Math.floor(totalTime % 60));
  }
}

export default new Timer();
