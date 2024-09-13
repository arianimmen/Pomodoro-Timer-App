import SettingUi from "./settingUi.js";
import Storage from "./api.js";

// ----------------- Selecting the Statistics Modal ----------------------
const statisticModal = document.querySelector(".statistics-modal");
const statisticsBackground = document.querySelector(".statistics-background");

// statistics Button
const statisticBtn = document.querySelector(".setting__Statistics__icon");
const statisticsCancelBtn = document.querySelector(".statistics__cancel");
const totalValue = document.querySelector(".statistics-modal__info__total");
const perDay = document.querySelector(".statistics-modal__info__perDay");
// --------------------------- Container -----------------------------------
const statistics = document.querySelector(".statistics");

class Statistics {
  constructor() {
    // Adding event Listeners
    statisticBtn.addEventListener("click", () => {
      this.openStatisticsModal();

      this.updateCharts();
    });

    statisticsBackground.addEventListener("click", () => {
      this.closeStatisticsModal();
    });

    statisticsCancelBtn.addEventListener("click", () => {
      this.closeStatisticsModal();
    });
  }

  openStatisticsModal() {
    SettingUi.closeSettingModal(); // Closing the setting modal

    // Opening the Statistics Modal
    statisticModal.classList.remove("--hidden-statistics");
    statisticsBackground.classList.remove("--hidden-statistics");
  }

  closeStatisticsModal() {
    // Closing the Statistics Modal
    statisticModal.classList.add("--hidden-statistics");
    statisticsBackground.classList.add("--hidden-statistics");
  }

  updateCharts() {
    // Update our charts
    statistics.innerHTML = "";
    const AllDaysInfos = Storage.getDayTracker();
    const focusTime = Storage.getSetting()[0].time; // Based on seconds

    let result = "";

    AllDaysInfos.forEach((element) => {
      result += this.createBarHtml(element, focusTime);
    });

    totalValue.textContent = this.calculateTotal(focusTime);

    perDay.textContent = this.calculatePerDay(focusTime);

    statistics.innerHTML = result;
  }

  createBarHtml(dayInfo, foucsTime) {
    const percent = ((dayInfo.amount * foucsTime) / 3600 / 24) * 100;

    return `<div class="statistics__charts">
      <div class="statistics__${dayInfo.day.toLowerCase()}">
        <div class="statistics__${dayInfo.day.toLowerCase()}__bar"  style="height: ${percent}%"></div>
      </div>
      <p>${dayInfo.day[0]}</p>
    </div>`;
  }

  calculateTotal(focusTime) {
    const AllDaysInfos = Storage.getDayTracker();
    let total = 0;
    AllDaysInfos.forEach((element) => {
      total += element.amount;
    });
    total *= focusTime;
    const totalHours = total / 3600;
    return `Total: ${totalHours.toFixed(2)} hours`;
  }

  calculatePerDay(focusTime) {
    const AllDaysInfos = Storage.getDayTracker();
    let total = 0;
    AllDaysInfos.forEach((element) => {
      total += element.amount;
    });
    total *= focusTime;
    const averageFocusHours = total / 3600 / 7;

    return `Daily Average Focus Time: ${averageFocusHours.toFixed(2)} h`;
  }
}

export default new Statistics();
