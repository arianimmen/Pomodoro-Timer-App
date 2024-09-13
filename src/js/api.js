// Default Setting
const defaultSetting = [
  {
    mode: "focus",
    time: 1500,
  },
  {
    mode: "shortRest",
    time: 300,
  },
  {
    mode: "longRest",
    time: 900,
  },
  {
    mode: "Number of Sessions",
    number: 4,
  },
];

const defaultDays = [
  { day: "Saturday", amount: 0 },
  { day: "Sunday", amount: 0 },
  { day: "Monday", amount: 0 },
  { day: "Tuesday", amount: 0 },
  { day: "Wednesday", amount: 0 },
  { day: "Thursday", amount: 0 },
  { day: "Friday", amount: 0 },
];

let dayTracker;
let todayDayFormat;
let startDate;

class Storage {
  setApp() {
    if (!JSON.parse(localStorage.getItem("timerSetting"))) {
      localStorage.setItem("timerSetting", JSON.stringify(defaultSetting));
    }
    todayDayFormat = new Date().toLocaleDateString("en-US", {
      weekday: "long",
    }); // 'long' gives full day name like "Friday"
  }

  // Getting the setting config from Local Storage
  getSetting() {
    return JSON.parse(localStorage.getItem("timerSetting")) || defaultSetting;
  }

  // Saving the new setting config
  saveSetting(data) {
    localStorage.setItem("timerSetting", JSON.stringify(data));
  }

  trackDateLogic() {
    startDate = JSON.parse(localStorage.getItem("startDate")) || "";

    // Check if startDate is null or not yet set
    if (startDate == "") {
      startDate = new Date(); // Set today's date as startDate if it's not yet stored
      localStorage.setItem("startDate", JSON.stringify(startDate));
      localStorage.setItem("dayTracker", JSON.stringify(defaultDays));
    } else {
      startDate = new Date(JSON.parse(localStorage.getItem("startDate"))); // Retrieve stored start date
    }

    // Get today's date
    let today = new Date();
    todayDayFormat = today.toLocaleDateString("en-US", { weekday: "long" }); // 'long' gives full day name like "Friday"

    // Calculate the difference in time (in milliseconds)
    const timeDifference = today - startDate;

    // Convert the time difference to days
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24); // Convert from ms to days

    // Check if 1min have passed
    if (daysDifference >= 7) {
      // Reset the tracking logic
      localStorage.setItem("dayTracker", JSON.stringify(defaultDays));

      // Set new start date to today and store it
      startDate = new Date();
      localStorage.setItem("startDate", JSON.stringify(startDate));
    }
  }

  updateNumberOfFocus(number) {
    // Update the amount of Focus per each focus time
    dayTracker = this.getDayTracker();

    const findDay = dayTracker.find((item) => item.day == todayDayFormat);

    findDay.amount += number;
    localStorage.setItem("dayTracker", JSON.stringify(dayTracker));
  }

  getDayTracker() {
    return JSON.parse(localStorage.getItem("dayTracker")) || [];
  }

  resetTimes() {
    startDate = "";
    localStorage.setItem("startDate", JSON.stringify(startDate));

    this.trackDateLogic();
  }
}

export default new Storage();
