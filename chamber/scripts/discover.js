// scripts/discover.js

import discoverData from '../data/discover.js';

// ====================== HAMBURGER MENU ======================
const menuButton = document.getElementById('menu');
const navigation = document.getElementById('navigation');

menuButton.addEventListener('click', () => {
  navigation.classList.toggle('show');
  
  if (navigation.classList.contains('show')) {
    menuButton.textContent = '✕';
    menuButton.setAttribute('aria-expanded', 'true');
  } else {
    menuButton.textContent = '☰';
    menuButton.setAttribute('aria-expanded', 'false');
  }
});

// ====================== LOCALSTORAGE VISIT MESSAGE ======================
function showVisitMessage() {
  const visitMessage = document.getElementById('visit-message');
  const lastVisit = localStorage.getItem('lastVisit');
  const now = Date.now();

  if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const daysSince = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));

    if (daysSince < 1) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else {
      visitMessage.textContent = `You last visited ${daysSince} day${daysSince === 1 ? '' : 's'} ago.`;
    }
  }

  localStorage.setItem('lastVisit', now);
}

// ====================== BUILD DISCOVER CARDS ======================
function buildDiscoverCards() {
  const container = document.getElementById('discover-grid');
  container.innerHTML = '';

  discoverData.items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'discover-card';

    card.innerHTML = `
      <figure>
        <img src="${item.image}" 
             alt="Photo of ${item.name} in Honolulu, Hawaii" 
             loading="lazy"
             width="300" 
             height="200">
      </figure>
      <h2>${item.name}</h2>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button class="learn-more">Learn More</button>
    `;

    container.appendChild(card);
  });
}

// ====================== INITIALIZE ======================
document.addEventListener('DOMContentLoaded', () => {
  showVisitMessage();
  buildDiscoverCards();
});