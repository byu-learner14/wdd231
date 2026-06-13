// js/main.js
import { spots } from '../data/surf-spots.json' assert { type: 'json' };

document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu (shared across pages)
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }

    // Featured Spots on Home
    const featuredContainer = document.getElementById('featured-spots');
    if (featuredContainer) {
        const shuffled = [...spots].sort(() => 0.5 - Math.random());
        const featured = shuffled.slice(0, 3);

        featured.forEach(spot => {
            const cardHTML = `
                <div class="card">
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
                        <p>${spot.description.substring(0, 90)}...</p>
                        <a href="surf-spots.html" class="btn">View Details</a>
                    </div>
                </div>
            `;
            featuredContainer.innerHTML += cardHTML;
        });
    }

    // Current Conditions Widget
    const conditionsDiv = document.getElementById('conditions');
    if (conditionsDiv) {
        conditionsDiv.innerHTML = `
            <p><strong>North Shore Oahu:</strong> 3-5 ft waves • Moderate winds • ${new Date().toLocaleDateString()}</p>
            <p style="margin-top: 1rem; color: var(--secondary); font-weight: 500;">
                Check local forecasts and swim near lifeguards.
            </p>
        `;
    }
});

function getDifficultyColor(difficulty) {
    if (difficulty === 'Beginner') return '#4ade80';
    if (difficulty === 'Intermediate') return '#facc15';
    if (difficulty === 'Advanced') return '#fb923c';
    return '#ef4444';
}