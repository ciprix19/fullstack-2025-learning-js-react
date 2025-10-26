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
    // setTheme(theme == 'light' ? 'dark' : 'light');
    if (theme == 'light') { // change to dark
        theme = 'dark';

    } else if (theme == 'dark') { // change to light
        theme = 'light';
    }
    setTheme(theme);
}

// handle change theme button
let theme = 'light'; // theme on startup
const button = document.querySelector('.change-theme-button');
button.addEventListener('click', handleTheme);

// handle hamburger menu

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// fetch data from URL
async function fetchData(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

// returns the elements required for displaying the review (h4, p, h2, img)
function createReviewFromCustomer(customer) {
    const customerNameAndRole = document.createElement('h4');
    const customerFeedback = document.createElement('p');
    const customerRating = document.createElement('h3');
    const customerPhoto = document.createElement('img');

    customerNameAndRole.textContent = customer.name + ', ' + customer.role;
    customerFeedback.textContent = `"${customer.feedback}"`;
    customerRating.textContent = customer.rating + '⭐';
    customerPhoto.setAttribute('src', './images/' + customer.photo);

    return {customerNameAndRole, customerFeedback, customerRating, customerPhoto};
}

// returns a div element created from a review
function createReviewLayout(review) {
    const newDiv = document.createElement('div');

    // create 3 divs for cool layout
    const leftDiv = document.createElement('div');
    leftDiv.appendChild(review.customerPhoto);

    const centerDiv = document.createElement('div');
    centerDiv.appendChild(review.customerNameAndRole);
    centerDiv.appendChild(review.customerFeedback);

    const rightDiv = document.createElement('div');
    rightDiv.appendChild(review.customerRating);

    newDiv.appendChild(leftDiv);
    newDiv.appendChild(centerDiv);
    newDiv.appendChild(rightDiv);
    newDiv.classList.add('card');
    newDiv.classList.add('feedback-card');
    newDiv.classList.add('three-column-layout');

    return newDiv;
}

async function displayReviews(url) {
    data = await fetchData(url); // :P
    // reviews is the object that holds the Arrays with the review data
    reviewsDiv = document.querySelector('.reviews');
    data.reviews.forEach(customer => {
        let reviewFromCustomer = createReviewFromCustomer(customer);
        let newDiv = createReviewLayout(reviewFromCustomer);
        reviewsDiv.appendChild(newDiv);
    });
}

displayReviews('https://raw.githubusercontent.com/ciprix19/fullstack-2025-learning-js-react/refs/heads/features/TASK-04_js_project/03_js/database/reviews.json');

// i guess these are inline styles?
// let burgerMenuStatus = 'closed';
// const burgerMenuDiv = document.querySelector('.hamburger-div');
// const burgerMenuIcon = document.querySelector('.hamburger-icon');
// const burgerMenu = document.querySelector('.hamburger-menu');

// // handle burger menu
// function openBurgerMenu() {
//     burgerMenuStatus = 'open';
//     burgerMenuIcon.style.display = 'none';
//     burgerMenu.style.display = 'block';
// }

// function closeBurgerMenu() {
//     burgerMenuStatus = 'closed';
//     burgerMenuIcon.style.display = 'block';
//     burgerMenu.style.display = 'none';
// }

// function handleBurgerMenu() {
//     if (burgerMenuStatus == 'closed') {
//         openBurgerMenu();
//     } else if (burgerMenuStatus == 'open') {
//         closeBurgerMenu();
//     }
// }

// burgerMenuDiv.addEventListener('click', handleBurgerMenu);

// let check = false;
// function handleResize() {
//     if (check == false && window.innerWidth < 700) {
//         check = true;
//         this.document.querySelector('.navbar').style.display = 'none';
//         this.document.querySelector('.change-theme').style.display = 'none';
//         this.document.querySelector('.hamburger-div').style.display = 'block';
//         closeBurgerMenu();
//     }
//     else if (check == true && window.innerWidth >= 700) {
//         check = false;
//         this.document.querySelector('.navbar').style.display = 'block';
//         this.document.querySelector('.change-theme').style.display = 'block';
//         this.document.querySelector('.hamburger-div').style.display = 'none';
//     }
// }

// handleResize(); // call this so that the burger menu loads, in case the window is smaller that 700px at startup
// window.onresize = handleResize;