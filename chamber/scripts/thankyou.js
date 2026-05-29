// thankyou.js

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const resultsDiv = document.getElementById('confirmation-results');

  if (params.toString() === '') {
    resultsDiv.innerHTML = `<p>No application data received.</p>`;
    return;
  }

  let html = '<dl class="confirmation-list">';

  // Loop through all submitted parameters
  params.forEach((value, key) => {
    let label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');

    // Format timestamp nicely
    if (key === 'timestamp' && value) {
      const date = new Date(value);
      value = date.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      });
      label = "Submission Date";
    }

    // Format membership level nicely
    if (key === 'membership') {
      const levels = {
        'np': 'NP Membership (Non-Profit)',
        'bronze': 'Bronze Membership',
        'silver': 'Silver Membership',
        'gold': 'Gold Membership'
      };
      value = levels[value] || value;
    }

    html += `
      <dt><strong>${label}:</strong></dt>
      <dd>${value || 'Not provided'}</dd>
    `;
  });

  html += '</dl>';
  resultsDiv.innerHTML = html;
});

// Footer information
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;