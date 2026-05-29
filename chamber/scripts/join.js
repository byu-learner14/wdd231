// join.js

// ====================== HAMBURGER MENU ======================
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

// ====================== TIMESTAMP ======================
function setTimestamp() {
  const timestampField = document.getElementById('timestamp');
  if (timestampField) {
    const now = new Date();
    timestampField.value = now.toISOString();
  }
}

// ====================== MEMBERSHIP MODALS ======================
function setupModals() {
  const modal = document.getElementById('membership-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalContent = document.getElementById('modal-content');
  const closeModalBtn = document.getElementById('close-modal');

  // Close button
  closeModalBtn.addEventListener('click', () => {
    modal.close();
  });

  // Close when clicking outside the modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.close();
    }
  });

  // Add click listeners to membership cards
  document.querySelectorAll('.membership-card').forEach(card => {
    card.addEventListener('click', () => {
      const level = card.getAttribute('data-level');
      
      let title = '';
      let content = '';

      switch(level) {
        case 'np':
          title = 'NP Membership (Non-Profit)';
          content = `
            <p><strong>Annual Fee:</strong> $0</p>
            <p>Designed for non-profit organizations that want to connect with the business community.</p>
            <ul>
              <li>Networking opportunities</li>
              <li>Access to member directory</li>
              <li>Monthly newsletter</li>
              <li>Community recognition</li>
            </ul>
          `;
          break;

        case 'bronze':
          title = 'Bronze Membership';
          content = `
            <p><strong>Annual Fee:</strong> $150</p>
            <p>Perfect entry-level membership for small businesses.</p>
            <ul>
              <li>All NP benefits</li>
              <li>Business spotlight (1x per year)</li>
              <li>Event discounts</li>
              <li>Member directory listing</li>
            </ul>
          `;
          break;

        case 'silver':
          title = 'Silver Membership';
          content = `
            <p><strong>Annual Fee:</strong> $300</p>
            <p>Popular choice for growing businesses.</p>
            <ul>
              <li>All Bronze benefits</li>
              <li>Featured in newsletter</li>
              <li>2x business spotlights per year</li>
              <li>Priority event registration</li>
            </ul>
          `;
          break;

        case 'gold':
          title = 'Gold Membership';
          content = `
            <p><strong>Annual Fee:</strong> $600</p>
            <p>Premium membership for established organizations.</p>
            <ul>
              <li>All Silver benefits</li>
              <li>Homepage spotlight rotation</li>
              <li>Exclusive networking events</li>
              <li>Marketing and promotion support</li>
              <li>Board nomination eligibility</li>
            </ul>
          `;
          break;
      }

      modalTitle.textContent = title;
      modalContent.innerHTML = content;
      modal.showModal();
    });
  });
}

// ====================== FOOTER ======================
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// ====================== INITIALIZE ======================
document.addEventListener('DOMContentLoaded', () => {
  setTimestamp();
  setupModals();
});