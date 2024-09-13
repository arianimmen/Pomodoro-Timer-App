const root = document.documentElement;
const icons = document.querySelectorAll(".icon");
const mainModeIcon = document.querySelector(".main__mode__icon");

const toggler = document.querySelector(".setting__darkMode__Toggle__inner");

let darkModeIsActive = false;

class ThemeChange {
  setGreenTheme() {
    // ------------------- Changing the root Colors ------------------------
    if (!darkModeIsActive) {
      root.style.setProperty("--color-background", "#f5fef8");
      root.style.setProperty("--color-primary-color", "#15401D");
      root.style.setProperty("--color-primary-button", "#8CE7A1");
      root.style.setProperty("--color-secondary-button", "#DBFAE0");

      // ----------------------- Change Icons Color -------------------------
      icons.forEach((icon) => {
        icon.classList.remove("--whiteFilter");
        icon.classList.add("--greenFilter");
      });
    } else {
      root.style.setProperty("--color-primary-color", "#fff");
      root.style.setProperty("--color-background", "#000000");

      root.style.setProperty("--color-secondary-button", "#328C46");
      root.style.setProperty("--color-primary-button", "#0F2C15");

      icons.forEach((icon) => {
        icon.classList.add("--blueFilter");
        icon.classList.add("--greenFilter");
        icon.classList.add("--whiteFilter");
      });
    }

    // ---------------------- Change Mode Icon ----------------------------
    mainModeIcon.setAttribute(
      "xlink:href",
      "../assets/images/sprite.svg#coffee"
    );
  }

  setBlueTheme() {
    // ------------------- Changing the root Colors ------------------------
    if (!darkModeIsActive) {
      root.style.setProperty("--color-primary-color", "#153047");
      root.style.setProperty("--color-background", "#F2F9FF");
      root.style.setProperty("--color-primary-button", "#8BCAFF");
      root.style.setProperty("--color-secondary-button", "#D9EEFF");

      // ----------------------- Change Icons Color -------------------------
      icons.forEach((icon) => {
        icon.classList.remove("--whiteFilter");
        icon.classList.remove("--greenFilter");
        icon.classList.add("--blueFilter");
      });
    } else {
      root.style.setProperty("--color-primary-color", "#fff");
      root.style.setProperty("--color-background", "#000000");

      root.style.setProperty("--color-secondary-button", "#0E2231");
      root.style.setProperty("--color-primary-button", "#306EA3");

      icons.forEach((icon) => {
        icon.classList.add("--blueFilter");
        icon.classList.add("--greenFilter");
        icon.classList.add("--whiteFilter");
      });
    }

    // ---------------------- Change Mode Icon ----------------------------
    mainModeIcon.setAttribute(
      "xlink:href",
      "../assets/images/sprite.svg#coffee"
    );
  }

  setRedTheme() {
    // ------------------- Changing the root Colors ------------------------
    if (!darkModeIsActive) {
      root.style.setProperty("--color-secondary-button", "#ffe4e4");
      root.style.setProperty("--color-primary-color", "#471515");
      root.style.setProperty("--color-background", "#fff");
      root.style.setProperty("--color-primary-button", "#ff8080");

      // ----------------------- Change Icons Color -------------------------
      icons.forEach((icon) => {
        icon.classList.remove("--whiteFilter");
        icon.classList.remove("--greenFilter");
        icon.classList.remove("--blueFilter");
      });
    } else {
      root.style.setProperty("--color-primary-color", "#fff");
      root.style.setProperty("--color-background", "#000000");

      root.style.setProperty("--color-secondary-button", "#310E0E");
      root.style.setProperty("--color-primary-button", "#B93737");

      icons.forEach((icon) => {
        icon.classList.add("--blueFilter");
        icon.classList.add("--greenFilter");
        icon.classList.add("--whiteFilter");
      });
    }

    // ---------------------- Change Mode Icon ----------------------------
    mainModeIcon.setAttribute(
      "xlink:href",
      "../assets/images/sprite.svg#focus"
    );
  }

  setDarkMode() {
    darkModeIsActive = !darkModeIsActive;
    if (darkModeIsActive) {
      root.style.setProperty("--color-modal-background", "#000000");
      root.style.setProperty("--color-shadow", "#262626");
      root.style.setProperty("--color-chart-background", "#202020");
      toggler.style.marginLeft = "auto";
    } else {
      root.style.setProperty("--color-modal-background", "#F2F9FF");
      root.style.setProperty("--color-chart-background", "#eeeeee");
      root.style.setProperty("--color-shadow", "#bcbaba");

      toggler.style.marginLeft = "";
    }
  }
}

export default new ThemeChange();
