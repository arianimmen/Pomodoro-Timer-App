import Timer from "./timer.js";
import SettingUi from "./settingUi.js";
import Statistics from "./statistics.js";
import Storage from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  Storage.setApp();
  Timer.setApp();
  SettingUi.setApp();
  Storage.trackDateLogic();
});
