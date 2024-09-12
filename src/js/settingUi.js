import Storage from "./api.js";
import Timer from "./timer.js";
import ThemeChange from "./uiThemeChange.js";

// ---------------------------  Modal ----------------------------
const settingBtn = document.querySelector(".main__controls__setting");
const secttingBackground = document.querySelector(".setting-background");
const closeSettingIcon = document.querySelector(".closeSettingIcon");
const submitButton = document.querySelector(".setting__Statistics__button");
// ------ Inputs ------
const inputFocus = document.querySelector(".input__focus");
const inputFocusSessions = document.querySelector(".input__focusSessions");
const inputShortBreak = document.querySelector(".input__shortBreak");
const inputLongBreak = document.querySelector(".input__longBreak");

// ------------------------ Button -------------------------------
const setting = document.querySelector(".setting");

// ------------------------ Toggle -------------------------------
const darkModeToggler = document.querySelector(".setting__darkMode__Toggle");

let isDarkModeActive = false;

class SettingUi {
  constructor() {
    // Adding event Listeners
    settingBtn.addEventListener("click", () => {
      this.openSettingModal();
    });
    closeSettingIcon.addEventListener("click", () => {
      this.closeSettingModal();
    });
    secttingBackground.addEventListener("click", () => {
      this.closeSettingModal();
    });
    submitButton.addEventListener("click", () => {
      this.submitLogic();
    });
    darkModeToggler.addEventListener("click", () => {
      this.darkModeToggle();
    });
  }

  setApp() {
    this.updateInputsValue();
  }

  darkModeToggle() {
    ThemeChange.setDarkMode();
    Timer.setApp();
  }

  submitLogic() {
    const newSetting = [
      {
        mode: "focus",
        time: Number(inputFocus.value) * 60,
      },
      {
        mode: "shortRest",
        time: Number(inputShortBreak.value) * 60,
      },
      {
        mode: "longRest",
        time: Number(inputLongBreak.value) * 60,
      },
      {
        mode: "Number of Sessions",
        number: Number(inputFocusSessions.value),
      },
    ];

    Storage.saveSetting(newSetting); // Saving the new Data

    Timer.setApp(); // Updating and restarting our Timer logic

    this.closeSettingModal(); // Closing the Modal
  }

  // Opening the setting Modal
  openSettingModal() {
    setting.classList.remove("--hidden-setting");
    secttingBackground.classList.remove("--hidden-setting");

    this.updateInputsValue(); // Update our input Values
  }

  // Closing the setting Modal
  closeSettingModal() {
    setting.classList.add("--hidden-setting");
    secttingBackground.classList.add("--hidden-setting");
  }

  updateInputsValue() {
    // Getting the default setting value and update our setting modal
    const [focus, shortRest, longRest, NumberofSessions] = Storage.getSetting();

    // * Time is based on seconds so we convert them to minutes!
    inputFocus.value = Math.floor(focus.time / 60);
    inputShortBreak.value = Math.floor(shortRest.time / 60);
    inputLongBreak.value = Math.floor(longRest.time / 60);

    inputFocusSessions.value = NumberofSessions.number;
  }
}

export default new SettingUi();
