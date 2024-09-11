const defaultSetting = [
  {
    mode: "focus",
    time: 3,
  },
  {
    mode: "shortRest",
    time: 300,
  },
  {
    mode: "longRest",
    time: 900,
  },
];

class Storage {
  getSetting() {
    return JSON.parse(localStorage.getItem("timerSetting")) || defaultSetting;
  }
}

export default new Storage();
