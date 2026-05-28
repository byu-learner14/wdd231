// scripts/courses.js

const courses = [
    { code: "CSE 110", title: "Introduction to Programming", credits: 3, category: "CSE", completed: true, 
      description: "Introduction to programming concepts and problem solving.", 
      certificate: "Programming", technology: ["Python", "JavaScript"] },
    { code: "WDD 130", title: "Web Fundamentals", credits: 3, category: "WDD", completed: true,
      description: "Learn the foundational skills of web development.", 
      certificate: "Web Design", technology: ["HTML", "CSS"] },
    { code: "CSE 111", title: "Programming with Functions", credits: 3, category: "CSE", completed: true,
      description: "Advanced programming techniques using functions.", 
      certificate: "Programming", technology: ["Python"] },
    { code: "WDD 131", title: "Dynamic Web Fundamentals", credits: 3, category: "WDD", completed: true,
      description: "Build dynamic and interactive websites.", 
      certificate: "Web Development", technology: ["JavaScript"] },
    { code: "WDD 231", title: "Web Frontend Development I", credits: 3, category: "WDD", completed: false,
      description: "Master modern frontend development with JavaScript and APIs.", 
      certificate: "Web Development", technology: ["JavaScript", "HTML", "CSS"] }
];

// Get modal element
const courseDetails = document.getElementById('course-details');

// Display course details in modal
function displayCourseDetails(course) {
    courseDetails.innerHTML = `
        <button id="closeModal">❌</button>
        <h2>${course.code}</h2>
        <h3>${course.title}</h3>
        <p><strong>Credits:</strong> ${course.credits}</p>
        <p><strong>Certificate:</strong> ${course.certificate}</p>
        <p>${course.description}</p>
        <p><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
    `;

    courseDetails.showModal();

    // Close button
    document.getElementById('closeModal').addEventListener('click', () => {
        courseDetails.close();
    });

    // Close when clicking outside the modal
    courseDetails.addEventListener('click', (e) => {
        if (e.target === courseDetails) {
            courseDetails.close();
        }
    });
}

// Render courses
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

        // Click to open modal
        card.addEventListener('click', () => {
            displayCourseDetails(course);
        });

        container.appendChild(card);
    });

    const total = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById('credit-count').textContent = total;
}

// Filter and setup
function filterCourses(filter) {
    let filtered = courses;
    if (filter === 'WDD') filtered = courses.filter(c => c.category === 'WDD');
    if (filter === 'CSE') filtered = courses.filter(c => c.category === 'CSE');
    renderCourses(filtered);
}

function setupFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterCourses(button.getAttribute('data-filter'));
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderCourses(courses);
    setupFilters();
});