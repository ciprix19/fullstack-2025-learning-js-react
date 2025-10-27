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
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        data = await response.json();
        return data;
    } catch (e) {
        console.log(e);
    }
}

// returns the elements required for displaying the review (h4, p, h2, img)
function createReviewFromCustomer(customer) {
    const customerNameAndRole = document.createElement('h4');
    const customerFeedback = document.createElement('p');
    const customerRating = document.createElement('h3');
    const customerPhoto = document.createElement('img');

    customerNameAndRole.textContent = customer.id + ', ' +  customer.name + ', ' + customer.role;
    customerFeedback.textContent = `"${customer.feedback}"`;
    customerRating.textContent = customer.rating + '⭐';
    customerPhoto.setAttribute('src', './images/' + customer.photo);

    // use the color red to highlight those whose length is even
    if (customer.role.length % 2 == 0) {
        customerNameAndRole.classList.add('highlight-even');
    }

    return {customerNameAndRole, customerFeedback, customerRating, customerPhoto};
}

// returns a div element created from a review

// read data from the JSON file (like you would read from a database) and display this data
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

// sort by role length
function sortingFunction(a, b) {
    return b.role.length - a.role.length;
}

// sorted by role
async function displayReviews(url, position, nOfReviews) {
    console.log(position);
    if (allReviews == null) {
        allReviews = await fetchData(url); // :P
        // allReviews.reviews.sort(sortingFunction);
        allReviews.reviews.pop();
        console.log(allReviews.reviews);
    }
    // reviews is the object that holds the Arrays with the review data
    reviewsDiv = document.querySelector('.reviews');
    while (reviewsDiv.hasChildNodes()) {
        reviewsDiv.removeChild(reviewsDiv.firstChild);
    }
    for (let i = position; i < position + nOfReviews; i++) {
        if (i == allReviews.reviews.length) {
            break;
        }
        let reviewFromCustomer = createReviewFromCustomer(allReviews.reviews[i]);
        let newDiv = createReviewLayout(reviewFromCustomer);
        reviewsDiv.appendChild(newDiv);
    }
}

let allReviews = null;
let reviewPosition = 0;
let nOfReviews = 3; // how many reviews per page
url = 'https://raw.githubusercontent.com/ciprix19/fullstack-2025-learning-js-react/refs/heads/features/TASK-04_js_project/03_js/database/reviews.json';
displayReviews(url, 0, nOfReviews);
const buttonReviewLeft = document.querySelector('#left-arrow')
console.log(buttonReviewLeft);
buttonReviewLeft.addEventListener('click', () => {
    reviewPosition -= nOfReviews;
    // merry go rouuund
    // if allReviews.reviews.length is not divisible by nOfReviews, display % nOfReviews elements
    // tested by poping elements from the allReviews array
    if (reviewPosition < 0) {
        if (allReviews.reviews.length % nOfReviews === 0) {
            reviewPosition = allReviews.reviews.length - nOfReviews;
        } else {
            reviewPosition = allReviews.reviews.length - (allReviews.reviews.length % nOfReviews);
        }
    }
    displayReviews(url, reviewPosition, nOfReviews);
});

const buttonReviewRight = document.querySelector('#right-arrow')
console.log(buttonReviewRight);
buttonReviewRight.addEventListener('click', () => {
    reviewPosition += nOfReviews;
    // merry go rouuund
    if (reviewPosition >= allReviews.reviews.length) {
        reviewPosition = 0;
    }
    displayReviews(url, reviewPosition, nOfReviews);
});

// create a fact as an object and return it
function createFact(fact) {
    const factText = document.createElement('h2');
    const factSource = document.createElement('p');
    const factSourceUrl = document.createElement('a');

    factText.textContent = fact.text;
    factSource.textContent = fact.source;
    factSourceUrl.textContent = fact.source_url;
    factSourceUrl.setAttribute('href', fact.source_url);
    factSourceUrl.setAttribute('target', '_blank');

    return {factText, factSource, factSourceUrl};
}

function createFactLayout(fact) {
    const newDiv = document.createElement('div');
    newDiv.appendChild(fact.factText);
    newDiv.appendChild(fact.factSource);
    newDiv.appendChild(fact.factSourceUrl);
    newDiv.classList.add('card');
    return newDiv;
}

function createErrorLayout() {
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    h2.textContent = 'Uh-Oh!!! error!!!';
    div.appendChild(h2);
    return div;
}

// useless fact at the bottom of the page
async function displayUselessFact(url) {
    data = await fetchData(url);
    const divFact = document.querySelector('.fact');
    // remove the fact
    if (divFact.hasChildNodes()) {
        divFact.removeChild(divFact.firstChild);
    }
    // and add a new one if it exists
    if (data != undefined && data != null) {
        let fact = createFact(data);
        let newDiv = createFactLayout(fact);
        divFact.appendChild(newDiv);
    } else {
        const newDiv = createErrorLayout();
        divFact.appendChild(newDiv);
    }
}

displayUselessFact('https://uselessfacts.jsph.pl/api/v2/facts/random');
// displayUselessFact('https://uselessfacts.jsph.pl/api/v2/facts/randomAAAA');

const buttonFact = document.querySelector('.button-fact');
// i can pass variables inside functions using lambda
buttonFact.addEventListener('click', () => displayUselessFact('https://uselessfacts.jsph.pl/api/v2/facts/random'));

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