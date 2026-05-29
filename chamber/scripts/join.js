// join.js

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

// Timestamp for hidden field
function setTimestamp() {
  const timestampField = document.getElementById('timestamp');
  if (timestampField) {
    timestampField.value = new Date().toISOString();
  }
}

// Membership Modals
function setupModals() {
  const modal = document.getElementById('membership-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalContent = document.getElementById('modal-content');
  const closeModalBtn = document.getElementById('close-modal');

  closeModalBtn.addEventListener('click', () => modal.close());

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
  });

  document.querySelectorAll('.membership-card').forEach(card => {
    card.addEventListener('click', () => {
      const level = card.getAttribute('data-level');
      let title = '';
      let content = '';

      switch(level) {
        case 'np':
          title = 'NP Membership (Non-Profit)';
          content = `<p><strong>Fee:</strong> $0/year</p><p>For non-profit organizations.</p>`;
          break;
        case 'bronze':
          title = 'Bronze Membership';
          content = `<p><strong>Fee:</strong> $150/year</p><p>Entry level for small businesses.</p>`;
          break;
        case 'silver':
          title = 'Silver Membership';
          content = `<p><strong>Fee:</strong> $300/year</p><p>For growing businesses.</p>`;
          break;
        case 'gold':
          title = 'Gold Membership';
          content = `<p><strong>Fee:</strong> $600/year</p><p>Premium membership.</p>`;
          break;
      }

      modalTitle.textContent = title;
      modalContent.innerHTML = content;
      modal.showModal();
    });
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  setTimestamp();
  setupModals();
});