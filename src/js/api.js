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

const defaultNumber = 4;
class Storage {
  getSetting() {
    return JSON.parse(localStorage.getItem("timerSetting")) || defaultSetting;
  }
  getNumberOfFoucsSessions() {
    return (
      JSON.parse(localStorage.getItem("numberOfFocusSessions")) || defaultNumber
    );
  }
}

export default new Storage();
