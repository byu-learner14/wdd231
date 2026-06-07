// scripts/discover.js
import discoverData from '../data/discover.js';

// Hamburger Menu
const menuButton = document.getElementById('menu');
const navigation = document.getElementById('navigation');

menuButton.addEventListener('click', () => {
  navigation.classList.toggle('show');
  menuButton.textContent = navigation.classList.contains('show') ? '✕' : '☰';
  menuButton.setAttribute('aria-expanded', navigation.classList.contains('show'));
});

// Visit Message
function showVisitMessage() {
  const visitMessage = document.getElementById('visit-message');
  const lastVisit = localStorage.getItem('lastVisit');
  const now = Date.now();

  if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const daysSince = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    visitMessage.textContent = daysSince < 1 
      ? "Back so soon! Awesome!" 
      : `You last visited ${daysSince} day${daysSince === 1 ? '' : 's'} ago.`;
  }
  localStorage.setItem('lastVisit', now);
}

// Build Cards
function buildDiscoverCards() {
  const container = document.getElementById('discover-grid');
  container.innerHTML = '';

  discoverData.items.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'discover-card';

    const isFirst = index === 0;

    card.innerHTML = `
      <figure>
        <img src="${item.image}" 
             alt="Photo of ${item.name} in Honolulu, Hawaii" 
             loading="${isFirst ? 'eager' : 'lazy'}"
             fetchpriority="${isFirst ? 'high' : 'auto'}"
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  showVisitMessage();
  buildDiscoverCards();
});