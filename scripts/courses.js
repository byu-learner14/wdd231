// scripts/courses.js

// Course Data Array
const courses = [
    {
        code: "CSE 110",
        title: "Introduction to Programming",
        credits: 3,
        category: "CSE",
        completed: true
    },
    {
        code: "WDD 130",
        title: "Web Fundamentals",
        credits: 3,
        category: "WDD",
        completed: true
    },
    {
        code: "CSE 111",
        title: "Programming with Functions",
        credits: 3,
        category: "CSE",
        completed: true
    },
    {
        code: "WDD 131",
        title: "Dynamic Web Fundamentals",
        credits: 3,
        category: "WDD",
        completed: true
    },
    {
        code: "WDD 231",
        title: "Web Frontend Development I",
        credits: 3,
        category: "WDD",
        completed: false
    }
];

// Render courses function
function renderCourses(filteredCourses) {
    const container = document.getElementById('course-list');
    container.innerHTML = '';

    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.className = `course-card ${course.completed ? 'completed' : ''}`;
        
        card.innerHTML = `
            <h3>${course.code}</h3>
            <p>${course.title}</p>
            <p class="credits">${course.credits} credits</p>
        `;
        
        container.appendChild(card);
    });

    // Update total credits
    const total = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById('credit-count').textContent = total;
}

// Filter courses
function filterCourses(filter) {
    let filtered = courses;
    
    if (filter === 'WDD') {
        filtered = courses.filter(course => course.category === 'WDD');
    } else if (filter === 'CSE') {
        filtered = courses.filter(course => course.category === 'CSE');
    }
    
    renderCourses(filtered);
}

// Set up filter buttons
function setupFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterType = button.getAttribute('data-filter');
            filterCourses(filterType);
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderCourses(courses); // Show all by default
    setupFilters();
});