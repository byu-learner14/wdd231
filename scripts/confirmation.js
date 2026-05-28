// confirmation.js

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const resultsDiv = document.getElementById('results');

  if (params.toString() === '') {
    resultsDiv.innerHTML = `<p>No data received.</p>`;
    return;
  }

  let html = '<dl>';

  params.forEach((value, key) => {
    let label = key.charAt(0).toUpperCase() + key.slice(1);
    
    if (key === 'startdate' && value) {
      const date = new Date(value);
      value = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    html += `
      <dt><strong>${label}:</strong></dt>
      <dd>${value || 'Not provided'}</dd>
    `;
  });

  html += '</dl>';
  resultsDiv.innerHTML = html;
});

// Set year in footer
document.getElementById('year').textContent = new Date().getFullYear();