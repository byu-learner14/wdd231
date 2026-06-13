// js/safety.js
const safetyTips = [
    { id: 1, title: "Rip Currents", text: "Never swim against a rip current. Swim parallel to the shore until free." },
    { id: 2, title: "Marine Life", text: "Respect sea turtles and reef. Maintain distance from marine animals." },
    { id: 3, title: "Reef-Safe Sunscreen", text: "Use mineral sunscreen to protect Hawai‘i’s coral reefs." },
    { id: 4, title: "Beach Flags", text: "Red flag = high hazard. Double red = beach closed." },
    { id: 5, title: "Buddy System", text: "Always surf or swim with a friend." }
];

function displaySafetyTips() {
    const container = document.getElementById('safety-tips');
    container.innerHTML = safetyTips.map(tip => `
        <div class="card">
            <div class="card-content">
                <h3>${tip.title}</h3>
                <p>${tip.text}</p>
                <button class="btn save-tip" data-id="${tip.id}">Save Tip</button>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.save-tip').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            const tip = safetyTips.find(t => t.id === id);
            let saved = JSON.parse(localStorage.getItem('savedTips')) || [];
            if (!saved.find(t => t.id === id)) {
                saved.push(tip);
                localStorage.setItem('savedTips', JSON.stringify(saved));
                alert(`✅ Saved: ${tip.title}`);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    displaySafetyTips();

    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => mobileMenu.classList.toggle('active'));
    }

    // Form handling
    const form = document.getElementById('safety-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = encodeURIComponent(document.getElementById('name').value);
            const location = encodeURIComponent(document.getElementById('location').value);
            const issue = encodeURIComponent(document.getElementById('issue').value);
            window.location.href = `form-submission.html?name=${name}&location=${location}&issue=${issue}`;
        });
    }
});