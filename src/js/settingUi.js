// ---------------------------  Modal ----------------------------
const settingBtn = document.querySelector(".main__controls__setting");
const secttingBackground = document.querySelector(".setting-background");
const closeSettingIcon = document.querySelector(".closeSettingIcon");
// ------ Inputs ------
const inputFocus = document.querySelector(".input__focus");
const inputFocusSessions = document.querySelector(".input__focusSessions");
const inputShortBreak = document.querySelector(".input__shortBreak");
const inputLongBreak = document.querySelector(".input__longBreak");

const setting = document.querySelector(".setting");

class SettingUi {
  constructor() {
    settingBtn.addEventListener("click", this.openSettingModal);
    closeSettingIcon.addEventListener("click", this.closeSettingModal);
    secttingBackground.addEventListener("click", this.closeSettingModal);
  }

  // Opening the setting Modal
  openSettingModal() {
    setting.classList.remove("--hidden-setting");
    secttingBackground.classList.remove("--hidden-setting");
  }

  // Closing the setting Modal
  closeSettingModal() {
    setting.classList.add("--hidden-setting");
    secttingBackground.classList.add("--hidden-setting");
  }

  setApp() {
    inputFocus.value = "32";
  }
}

export default new SettingUi();
