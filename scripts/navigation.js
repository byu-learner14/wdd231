// scripts/navigation.js

const menuButton = document.getElementById('menu');
const navigation = document.getElementById('navigation');

menuButton.addEventListener('click', () => {
    // Toggle display
    if (navigation.style.display === 'block') {
        navigation.style.display = 'none';
    } else {
        navigation.style.display = 'block';
    }
});

// Close menu when a link is clicked
document.querySelectorAll('#navigation a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            navigation.style.display = 'none';
        }
    });
});