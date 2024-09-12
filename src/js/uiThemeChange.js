const root = document.documentElement;
const icons = document.querySelectorAll(".icon");
const mainModeIcon = document.querySelector(".main__mode__icon");

class ThemeChange {
  setGreenTheme() {
    // ------------------- Changing the root Colors ------------------------
    root.style.setProperty("--color-primary-color", "#15401D");
    root.style.setProperty("--color-primary-button", "#8CE7A1");
    root.style.setProperty("--color-secondary-button", "#DBFAE0");
    root.style.setProperty("--color-background", "#F1FFF5");
    // root.style.setProperty("--color-shadow", "#888888");
    // root.style.setProperty("--color-toggle-background", "#ffcccc");
    // root.style.setProperty("--color-chart-background", "#ffddaa");

    // ----------------------- Change Icons Color -------------------------
    icons.forEach((icon) => {
      icon.classList.add("--greenFilter");
    });

    // ---------------------- Change Mode Icon ----------------------------

    mainModeIcon.setAttribute(
      "xlink:href",
      "../assets/images/sprite.svg#coffee"
    );
  }

  setBlueTheme() {
    // ------------------- Changing the root Colors ------------------------
    root.style.setProperty("--color-primary-color", "#153047");
    root.style.setProperty("--color-primary-button", "#8BCAFF");
    root.style.setProperty("--color-secondary-button", "#D9EEFF");
    root.style.setProperty("--color-background", "#F2F9FF");
    // root.style.setProperty("--color-shadow", "#888888");
    // root.style.setProperty("--color-toggle-background", "#ffcccc");
    // root.style.setProperty("--color-chart-background", "#ffddaa");

    // ----------------------- Change Icons Color -------------------------
    icons.forEach((icon) => {
      icon.classList.remove("--greenFilter");
      icon.classList.add("--blueFilter");
    });

    // ---------------------- Change Mode Icon ----------------------------

    mainModeIcon.setAttribute(
      "xlink:href",
      "../assets/images/sprite.svg#coffee"
    );
  }

  setRedTheme() {
    // ------------------- Changing the root Colors ------------------------
    root.style.setProperty("--color-primary-color", "#471515");
    root.style.setProperty("--color-primary-button", "#ff8080");
    root.style.setProperty("--color-secondary-button", "#ffe4e4");
    root.style.setProperty("--color-background", "#fff");
    // root.style.setProperty("--color-shadow", "#888888");
    // root.style.setProperty("--color-toggle-background", "#ffcccc");
    // root.style.setProperty("--color-chart-background", "#ffddaa");

    // ----------------------- Change Icons Color -------------------------
    icons.forEach((icon) => {
      icon.classList.remove("--greenFilter");
      icon.classList.remove("--blueFilter");
    });

    // ---------------------- Change Mode Icon ----------------------------

    mainModeIcon.setAttribute(
      "xlink:href",
      "../assets/images/sprite.svg#focus"
    );
  }
}

export default new ThemeChange();
