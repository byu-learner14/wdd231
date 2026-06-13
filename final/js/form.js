// js/form.js
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const display = document.getElementById('report-display');

    // Try URL params first, fallback to localStorage
    const name = params.get('name') || 'N/A';
    const location = params.get('location') || 'N/A';
    const issue = params.get('issue') || 'N/A';

    if (name !== 'N/A') {
        display.innerHTML = `
            <h2>Report Details</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Issue:</strong> ${issue}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        `;
    } else {
        // Fallback from localStorage (from safety.js)
        const savedReport = localStorage.getItem('latestReport');
        if (savedReport) {
            const report = JSON.parse(savedReport);
            display.innerHTML = `
                <h2>Report Details</h2>
                <p><strong>Name:</strong> ${report.name}</p>
                <p><strong>Location:</strong> ${report.location}</p>
                <p><strong>Issue:</strong> ${report.issue}</p>
                <p><strong>Submitted:</strong> ${report.date}</p>
            `;
        } else {
            display.innerHTML = `<p>No report data found.</p>`;
        }
    }

    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (hamburger) {
        hamburger.addEventListener('click', () => mobileMenu.classList.toggle('active'));
    }
});