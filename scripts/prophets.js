const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  
  // console.table(data.prophets); // Use this for testing
  displayProphets(data.prophets);
}

const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    let card = document.createElement('section');
    let fullName = document.createElement('h2');
    let portrait = document.createElement('img');
    let birthInfo = document.createElement('p');

    // Full name
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;

    // Portrait image
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    // Birth information
    birthInfo.innerHTML = `
      Date of Birth: ${prophet.birthdate}<br>
      Place of Birth: ${prophet.birthplace}
    `;

    // Append everything to the card
    card.appendChild(fullName);
    card.appendChild(portrait);
    card.appendChild(birthInfo);

    // Add card to the main container
    cards.appendChild(card);
  });
};

// Start the process
getProphetData();