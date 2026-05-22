// Hamburger Menu
const menuButton = document.getElementById('menu');
const navigation = document.getElementById('navigation');

menuButton.addEventListener('click', () => {
  navigation.classList.toggle('show');
  menuButton.textContent = navigation.classList.contains('show') ? '✕' : '☰';
  menuButton.setAttribute('aria-expanded', navigation.classList.contains('show'));
});

// Weather
const weatherContainer = document.getElementById('weather-container');
const lat = 21.31;
const lon = -157.86;
const apiKey = "360cfb4e7d5288c2e9af58d44d784161";

// === TEMPORARY TEST KEY (for debugging) ===
// const apiKey = "bd5e378503939ddaee76f12ad7a97608";

async function getWeather() {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`);
    if (!res.ok) throw new Error();
    const data = await res.json();

    weatherContainer.innerHTML = `
      <div style="display:flex; align-items:center; justify-content:center; gap:1rem; flex-wrap:wrap;">
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}" style="width:90px;">
        <div>
          <p style="font-size:2.2rem; margin:0; font-weight:700;">${Math.round(data.main.temp)}°F</p>
          <p style="margin:0.3rem 0 0 0; text-transform:capitalize;">${data.weather[0].description}</p>
        </div>
      </div>
    `;
  } catch {
    weatherContainer.innerHTML = `<p>Weather data temporarily unavailable.</p>`;
  }
}

// Spotlights
const spotlightContainer = document.getElementById('spotlight-container');

async function getSpotlights() {
  try {
    const res = await fetch('data/members.json');
    const data = await res.json();
    let members = data.members.filter(m => m.membership === "Gold" || m.membership === "Silver");
    
    const selected = members.sort(() => 0.5 - Math.random()).slice(0, 3);

    spotlightContainer.innerHTML = '';
    selected.forEach(member => {
      const card = document.createElement('section');
      card.classList.add('spotlight-card');
      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><a href="${member.website}" target="_blank">Visit Website →</a></p>
        <p class="membership ${member.membership.toLowerCase()}"><strong>${member.membership} Member</strong></p>
      `;
      spotlightContainer.appendChild(card);
    });
  } catch (e) {
    spotlightContainer.innerHTML = `<p>Spotlights temporarily unavailable.</p>`;
  }
}

// Footer
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// Initialize
getWeather();
getSpotlights();