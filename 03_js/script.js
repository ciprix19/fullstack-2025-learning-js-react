function setTheme(theme) {
    var r = document.documentElement;
    var rs = getComputedStyle(r);
    let themeArr = [
        rs.getPropertyValue(`--${theme}-one`),
        rs.getPropertyValue(`--${theme}-two`),
        rs.getPropertyValue(`--${theme}-three`),
        rs.getPropertyValue(`--${theme}-four`)
    ];
    r.style.setProperty('--color-one', themeArr[0]);
    r.style.setProperty('--color-two', themeArr[1]);
    r.style.setProperty('--color-three', themeArr[2]);
    r.style.setProperty('--color-four', themeArr[3]);
}

function handleTheme() {
    // setTheme(theme == "light" ? "dark" : "light");
    if (theme == "light") { // change to dark
        theme = "dark";

    } else if (theme == "dark") { // change to light
        theme = "light";
    }
    setTheme(theme);
}

// handle change theme button
const button = document.querySelector(".change-theme");
let theme = "light";
button.addEventListener("click", handleTheme);

// handle burger menu
window.onresize = function() {
    let check = false;
    if (window.innerWidth < 700 && check == false) {
        console.log("mai mic");
        check = true;
        const navbar = this.document.querySelector(".navbar");
        navbar.style.display = "none";
    }
    else if (window.innerWidth >= 700 && check == true) {
        console.log("mai mare");
        check = false;
        const navbar = this.document.querySelector(".navbar");
        navbar.style.display = "block";
    }
};