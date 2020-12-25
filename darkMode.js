const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById("nav");
const toggleIcon = document.getElementById("toggle-icon");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");
const textBox = document.getElementById("text-box");

const DARK_THEME = "dark";
const LIGHT_THEME = "light";
let isLight;

function imageMode(mode) {
  image1.src = `image/undraw_Preferences_re_${mode}.svg`;
  image2.src = `image/undraw_Segmentation_re_${mode}.svg`;
  image3.src = `image/undraw_Social_media_re_${mode}.svg`;
}

function toggleLightDarkMode(isLight) {
  nav.style.backgroundColor = isLight
    ? "rgb(255 255 255/ 50%)"
    : "rgb(0 0 0 / 50%)";
  textBox.style.backgroundColor = isLight
    ? "rgb(0 0 0 / 50%)"
    : "rgb(255 255 255 / 50%)";
  toggleIcon.children[0].textContent = isLight ? "Light Mode" : "Dark Mode";

  if (isLight) {
    toggleIcon.children[1].classList.replace("fa-moon", "fa-sun");
    imageMode(LIGHT_THEME);
  } else {
    toggleIcon.children[1].classList.replace("fa-sun", "fa-moon");
    imageMode(DARK_THEME);
  }
}

function switchTheme(event) {
  if (event.target.checked) {
    document.documentElement.setAttribute("data-theme", DARK_THEME);
    localStorage.setItem("theme", DARK_THEME);
    isLight = false;
    toggleLightDarkMode(isLight);
  } else {
    document.documentElement.setAttribute("data-theme", LIGHT_THEME);
    localStorage.setItem("theme", LIGHT_THEME);
    isLight = true;
    toggleLightDarkMode(isLight);
  }
}

// Event Listener
toggleSwitch.addEventListener("change", switchTheme);

// Check Local Storage For Theme
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === DARK_THEME) {
    toggleSwitch.checked = true;
    toggleLightDarkMode(false);
  }
}
