// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Form submission handling with email
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        try {
            // Here you would typically send the data to your server
            // For now, we'll simulate sending an email
            const emailContent = `
                Name: ${data.name}
                Email: ${data.email}
                Message: ${data.message}
            `;
            
            // Open default email client
            window.location.href = `mailto:info@renaissanceproperties.com?subject=Website Inquiry&body=${encodeURIComponent(emailContent)}`;
            
            // Show success message
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            this.reset();
        } catch (error) {
            showNotification('There was an error sending your message. Please try again.', 'error');
        }
    });
}

// Login form handling
const loginForm = document.querySelector('#loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        try {
            // Here you would typically authenticate with your server
            console.log('Login attempt:', data);
            showNotification('Login successful!', 'success');
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.querySelector('#loginModal'));
            modal.hide();
        } catch (error) {
            showNotification('Login failed. Please check your credentials.', 'error');
        }
    });
}

// Signup form handling
const signupForm = document.querySelector('#signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validate passwords match
        if (data.password !== data.confirmPassword) {
            showNotification('Passwords do not match!', 'error');
            return;
        }
        
        try {
            // Here you would typically register with your server
            console.log('Signup attempt:', data);
            showNotification('Registration successful!', 'success');
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.querySelector('#signupModal'));
            modal.hide();
        } catch (error) {
            showNotification('Registration failed. Please try again.', 'error');
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add active class to navigation links on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href*=${sectionId}]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
});

// Image loading animation
document.querySelectorAll('img').forEach(img => {
    img.classList.add('loading');
    img.addEventListener('load', function() {
        this.classList.remove('loading');
        this.classList.add('loaded');
    });
});

// Revenue table row animation
const revenueRows = document.querySelectorAll('.revenue-row');
revenueRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
        row.style.transform = 'scale(1.01)';
        row.style.backgroundColor = 'var(--light-bg)';
    });
    
    row.addEventListener('mouseleave', () => {
        row.style.transform = 'scale(1)';
        row.style.backgroundColor = '';
    });
});

// Service card hover effect
document.querySelectorAll('.service-card').forEach(card => {
    const image = card.querySelector('.service-image img');
    
    card.addEventListener('mouseenter', () => {
        image.style.transform = 'scale(1.1)';
    });
    
    card.addEventListener('mouseleave', () => {
        image.style.transform = 'scale(1)';
    });
});

// Intersection Observer for fade-in elements
const fadeElements = document.querySelectorAll('.fade-in');
const fadeOptions = {
    threshold: 0.5
};

const fadeOnScroll = new IntersectionObserver(function(entries, fadeOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            fadeOnScroll.unobserve(entry.target);
        }
    });
}, fadeOptions);

fadeElements.forEach(element => {
    fadeOnScroll.observe(element);
}); 