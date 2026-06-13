// js/surf.js - ES Module
let allSpots = [];

async function loadSurfSpots() {
    try {
        const response = await fetch('../data/surf-spots.json');
        if (!response.ok) throw new Error('Failed to load surf data');
        
        const data = await response.json();
        allSpots = data.spots;
        
        displaySpots(allSpots);
    } catch (error) {
        console.error('Error loading surf spots:', error);
        document.getElementById('spots-grid').innerHTML = `
            <p style="grid-column: 1 / -1; text-align: center; color: red;">
                Sorry, could not load surf spot data. Please try again later.
            </p>`;
    }
}

function displaySpots(spots) {
    const container = document.getElementById('spots-grid');
    container.innerHTML = '';

    spots.forEach(spot => {
        const cardHTML = `
            <div class="card" data-id="${spot.id}">
                <img src="../images/spot${(spot.id % 5) + 1}.jpg" 
                     alt="${spot.name} surf spot in ${spot.island}" 
                     loading="lazy"
                     width="400" height="200">
                <div class="card-content">
                    <span class="difficulty" style="background-color: ${getDifficultyColor(spot.difficulty)};">
                        ${spot.difficulty}
                    </span>
                    <h3>${spot.name}</h3>
                    <p><strong>${spot.island}</strong></p>
                    <p>${spot.description.substring(0, 100)}...</p>
                    <button class="btn view-details">View Details</button>
                </div>
            </div>
        `;
        container.innerHTML += cardHTML;
    });

    // Add click listeners for modal
    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            const spotId = parseInt(card.dataset.id);
            const spot = allSpots.find(s => s.id === spotId);
            if (spot) showModal(spot);
        });
    });
}

function getDifficultyColor(difficulty) {
    if (difficulty === 'Beginner') return '#4ade80';
    if (difficulty === 'Intermediate') return '#facc15';
    if (difficulty === 'Advanced') return '#fb923c';
    return '#ef4444';
}

function showModal(spot) {
    const modal = document.getElementById('spot-modal');
    const content = document.getElementById('modal-content');
    
    content.innerHTML = `
        <h2>${spot.name}</h2>
        <p><strong>Island:</strong> ${spot.island}</p>
        <p><strong>Difficulty:</strong> ${spot.difficulty}</p>
        <p><strong>Best Season:</strong> ${spot.bestSeason}</p>
        <p><strong>Swell Direction:</strong> ${spot.swellDirection}</p>
        <p><strong>Description:</strong> ${spot.description}</p>
        <p><strong>Coordinates:</strong> ${spot.latitude}, ${spot.longitude}</p>
    `;
    
    modal.style.display = 'flex';
}

document.addEventListener('DOMContentLoaded', () => {
    loadSurfSpots();

    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => mobileMenu.classList.toggle('active'));
    }

    // Close modal
    const closeModal = document.getElementById('close-modal');
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            document.getElementById('spot-modal').style.display = 'none';
        });
    }
});