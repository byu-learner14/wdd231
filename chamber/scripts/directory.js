const url = 'data/members.json';

const container = document.querySelector('#directory-container');
const gridBtn = document.getElementById('grid-btn');
const listBtn = document.getElementById('list-btn');
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

// Fetch and display members
async function getMembers() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    console.error('Error loading members:', error);
    container.innerHTML = `
      <p style="grid-column: 1 / -1; text-align: center; color: #d32f2f; padding: 3rem 1rem;">
        Sorry, we couldn't load the directory. Please try again later.
      </p>`;
  }
}

// Display members
const displayMembers = (members) => {
  container.innerHTML = '';
  container.style.opacity = '0';

  members.forEach(member => {
    const card = document.createElement('section');
    card.classList.add('member-card');

    card.innerHTML = `
      <img src="images/${member.image}" 
            alt="${member.name} business logo" 
            loading="lazy"
            width="300" 
            height="200">
      <h2>${member.name}</h2>   ← Changed to h2
      <p>${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website →</a></p>
      <p class="membership ${member.membership.toLowerCase()}">
        <strong>${member.membership} Member</strong>
      </p>
    `;

    container.appendChild(card);
  });

  // Fade in effect
  setTimeout(() => {
    container.style.transition = 'opacity 0.4s ease';
    container.style.opacity = '1';
  }, 50);
};

// View Toggle (Grid / List)
function setView(view) {
  container.classList.remove('grid-view', 'list-view');
  container.classList.add(view + '-view');
  
  gridBtn.classList.toggle('active', view === 'grid');
  listBtn.classList.toggle('active', view === 'list');
}

gridBtn.addEventListener('click', () => setView('grid'));
listBtn.addEventListener('click', () => setView('list'));

// Footer info
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// Initialize
getMembers();