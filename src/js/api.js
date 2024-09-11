const defaultSetting = [
  {
    mode: "focus",
    time: 3,
  },
  {
    mode: "shortRest",
    time: 5,
  },
  {
    mode: "longRest",
    time: 6,
  },
];

class Storage {
  getSetting() {
    return JSON.parse(localStorage.getItem("timerSetting")) || defaultSetting;
  }
}

export default new Storage();
