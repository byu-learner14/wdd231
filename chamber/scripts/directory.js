const url = 'data/members.json';

const container = document.querySelector('#directory-container');
const gridBtn = document.getElementById('grid-btn');
const listBtn = document.getElementById('list-btn');

// Fetch members data
async function getMembers() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    console.error('Error loading members:', error);
    container.innerHTML = '<p>Sorry, we couldn\'t load the directory. Please try again later.</p>';
  }
}

// Display all member cards
const displayMembers = (members) => {
  container.innerHTML = '';   // Clear any previous content

  members.forEach(member => {
    const card = document.createElement('section');
    card.classList.add('member-card');

    card.innerHTML = `
      <img src="images/${member.image}" 
           alt="${member.name} business logo" 
           loading="lazy">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website →</a></p>
      <p class="membership ${member.membership.toLowerCase()}">
        <strong>${member.membership} Member</strong>
      </p>
    `;

    container.appendChild(card);
  });
};

// === View Toggle (Grid / List) ===
gridBtn.addEventListener('click', () => {
  container.classList.remove('list-view');
  container.classList.add('grid-view');
  
  gridBtn.classList.add('active');
  listBtn.classList.remove('active');
});

listBtn.addEventListener('click', () => {
  container.classList.remove('grid-view');
  container.classList.add('list-view');
  
  listBtn.classList.add('active');
  gridBtn.classList.remove('active');
});

// === Footer Dynamic Info ===
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// Start everything
getMembers();