// ====================== INDEX.JS - CHAMBER HOME PAGE ======================

const menuButton = document.getElementById('menu');
const navigation = document.getElementById('navigation');

// Hamburger Menu
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

// ====================== WEATHER SECTION ======================
const weatherContainer = document.getElementById('weather-container');

// Honolulu Coordinates
const lat = 21.31;
const lon = -157.86;
const apiKey = "6d36cd08c88816c65796dff3e51e3867"; // Your key

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

async function getWeather() {
  try {
    const response = await fetch(weatherUrl);
    if (!response.ok) throw new Error('Weather data not available');
    
    const data = await response.json();

    const html = `
      <p><strong>Temperature:</strong> ${Math.round(data.main.temp)}°F</p>
      <p><strong>Condition:</strong> ${data.weather[0].description}</p>
      <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" 
           alt="${data.weather[0].description}" style="width:80px;">
    `;
    
    weatherContainer.innerHTML = html;
  } catch (error) {
    console.error(error);
    weatherContainer.innerHTML = `<p>Unable to load weather data at this time.</p>`;
  }
}

// ====================== SPOTLIGHTS ======================
const spotlightContainer = document.getElementById('spotlight-container');

async function getSpotlights() {
  try {
    const response = await fetch('data/members.json');
    const data = await response.json();
    let members = data.members;

    // Filter only Gold and Silver members
    const premiumMembers = members.filter(member => 
      member.membership === "Gold" || member.membership === "Silver"
    );

    // Shuffle and pick 2 or 3 members
    const shuffled = premiumMembers.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3); // 2 or 3 spotlights

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
    console.error('Error loading spotlights:', error);
    spotlightContainer.innerHTML = `<p>Unable to load member spotlights at this time.</p>`;
  }
}

// ====================== FOOTER ======================
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// ====================== INITIALIZE ======================
getWeather();
getSpotlights();