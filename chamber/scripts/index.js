// ====================== CHAMBER HOME PAGE - index.js ======================

// Hamburger Menu
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

// ====================== WEATHER ======================
const weatherContainer = document.getElementById('weather-container');

async function getWeather() {
  const lat = 21.31;
  const lon = -157.86;
  const apiKey = "360cfb4e7d5288c2e9af58d44d784161";

// === TEMPORARY TEST KEY (for debugging) ===
// const apiKey = "bd5e378503939ddaee76f12ad7a97608";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
    );

    if (!response.ok) throw new Error("Weather unavailable");

    const data = await response.json();

    weatherContainer.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; flex-wrap: wrap;">
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" 
             alt="${data.weather[0].description}" style="width: 85px;">
        
        <div>
          <span class="temperature">${Math.round(data.main.temp)}°F</span>
          <p style="margin: 0.4rem 0 0 0; text-transform: capitalize; font-size: 1.1rem;">
            ${data.weather[0].description}
          </p>
        </div>
      </div>
    `;
  } catch (error) {
    console.error(error);
    weatherContainer.innerHTML = `<p>Weather information is temporarily unavailable.</p>`;
  }
}

// ====================== MEMBER SPOTLIGHTS ======================
const spotlightContainer = document.getElementById('spotlight-container');

async function getSpotlights() {
  try {
    const response = await fetch('data/members.json');
    const data = await response.json();
    
    // Filter Gold and Silver members only
    let premium = data.members.filter(m => 
      m.membership === "Gold" || m.membership === "Silver"
    );

    // Randomly select 2 or 3
    const shuffled = premium.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    spotlightContainer.innerHTML = '';

    selected.forEach(member => {
      const card = document.createElement('section');
      card.classList.add('spotlight-card');

      card.innerHTML = `
        <img src="images/${member.image}" 
             alt="${member.name} business logo" 
             loading="lazy"
             width="300" height="200">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website →</a></p>
        <p class="membership ${member.membership.toLowerCase()}">
          <strong>${member.membership} Member</strong>
        </p>
      `;

      spotlightContainer.appendChild(card);
    });

  } catch (error) {
    console.error('Spotlights error:', error);
    spotlightContainer.innerHTML = `<p>Member spotlights are temporarily unavailable.</p>`;
  }
}

// ====================== FOOTER ======================
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// ====================== INITIALIZE ======================
getWeather();
getSpotlights();