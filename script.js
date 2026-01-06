// Load About Section from JSON
fetch('about.json')
    .then(response => response.json())
    .then(data => {
        const aboutGrid = document.getElementById('aboutGrid');
        data.about.forEach(item => {
            const aboutCard = document.createElement('div');
            aboutCard.className = 'about-card';
            aboutCard.innerHTML = `
                <i class="fas fa-${item.icon}"></i>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            `;
            aboutGrid.appendChild(aboutCard);
        });
    })
    .catch(error => console.error('Error loading about:', error));

// Load Events from JSON
fetch('events.json')
    .then(response => response.json())
    .then(data => {
        const eventsGrid = document.getElementById('eventsGrid');
        data.events.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            eventCard.innerHTML = `
                <div class="event-date">
                    <span class="day">${event.day}</span>
                    <span class="month">${event.month}</span>
                </div>
                <div class="event-details">
                    <h3>${event.title}</h3>
                    <p><i class="fas fa-clock"></i> ${event.time}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                    <p>${event.description}</p>
                </div>
            `;
            eventsGrid.appendChild(eventCard);
        });
    })
    .catch(error => console.error('Error loading events:', error));

// Load Members from JSON
fetch('members.json')
    .then(response => response.json())
    .then(data => {
        const membersGrid = document.getElementById('membersGrid');
        data.members.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.className = 'member-card';
            memberCard.innerHTML = `
                <div class="member-image">
                    <i class="fas fa-user-circle"></i>
                </div>
                <h3>${member.name}</h3>
                <p class="position">${member.position}</p>
                <p class="bio">${member.bio}</p>
            `;
            membersGrid.appendChild(memberCard);
        });
    })
    .catch(error => console.error('Error loading members:', error));

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Scroll Animation for Cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.about-card, .member-card, .event-card').forEach(card => {
    observer.observe(card);
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});
