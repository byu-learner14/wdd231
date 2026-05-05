// Select elements
const navBar = document.querySelector('#nav-bar');
const navButton = document.querySelector('#menu-button');

// Toggle menu when hamburger is clicked
navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
});