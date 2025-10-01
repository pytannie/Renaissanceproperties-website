AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

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

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

document.querySelector('.view-more-btn')?.addEventListener('click', function() {
    const viewMoreText = this.querySelector('.view-more-text');
    const viewLessText = this.querySelector('.view-less-text');
    const icon = this.querySelector('.view-more-icon');
    
    viewMoreText.classList.toggle('d-none');
    viewLessText.classList.toggle('d-none');
    icon.style.transform = icon.style.transform === 'rotate(180deg)' ? 'rotate(0)' : 'rotate(180deg)';
});

document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
            loginModal.show();
        });
    }
    
    if (signupBtn) {
        signupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const signupModal = new bootstrap.Modal(document.getElementById('signupModal'));
            signupModal.show();
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const rememberMe = document.getElementById('rememberMe').checked;

            console.log('Login attempt:', { email, password, rememberMe });
            
            alert('Login successful!');
            const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            loginModal.hide();
        });
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const agreeTerms = document.getElementById('agreeTerms').checked;

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            if (!agreeTerms) {
                alert('Please agree to the Terms & Conditions');
                return;
            }

            console.log('Signup attempt:', { name, email, password });
            
            alert('Account created successfully!');
            const signupModal = bootstrap.Modal.getInstance(document.getElementById('signupModal'));
            signupModal.hide();
        });
    }

    // Forgot Password Form
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('resetEmail').value;

            console.log('Password reset requested for:', email);
            
            alert('Password reset link has been sent to your email!');
            const forgotPasswordModal = bootstrap.Modal.getInstance(document.getElementById('forgotPasswordModal'));
            forgotPasswordModal.hide();
        });
    }

    const forgotPasswordLink = document.querySelector('a[data-bs-target="#forgotPasswordModal"]');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            const forgotPasswordModal = new bootstrap.Modal(document.getElementById('forgotPasswordModal'));
            
            loginModal.hide();
            setTimeout(() => {
                forgotPasswordModal.show();
            }, 500);
        });
    }
});

// Google Sign-In functionality
function handleGoogleLogin() {
    gapi.load('auth2', function() {
        gapi.auth2.init({
            client_id: 'YOUR_GOOGLE_CLIENT_ID' 
        }).then(function(auth2) {
            auth2.signIn().then(function(googleUser) {
                const profile = googleUser.getBasicProfile();
                const userData = {
                    id: profile.getId(),
                    name: profile.getName(),
                    email: profile.getEmail(),
                    image: profile.getImageUrl()
                };
                
                console.log('Google login successful:', userData);
                
                alert('Successfully logged in with Google!');
                const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
                loginModal.hide();
            }).catch(function(error) {
                console.error('Google Sign-In error:', error);
                alert('Failed to sign in with Google. Please try again.');
            });
        });
    });
}

function handleGoogleSignup() {
    gapi.load('auth2', function() {
        gapi.auth2.init({
            client_id: 'GOOGLE_CLIENT_ID' 
        }).then(function(auth2) {
            auth2.signIn().then(function(googleUser) {
                const profile = googleUser.getBasicProfile();
                const userData = {
                    id: profile.getId(),
                    name: profile.getName(),
                    email: profile.getEmail(),
                    image: profile.getImageUrl()
                };
                
                console.log('Google signup successful:', userData);
                
                alert('Successfully signed up with Google!');
                const signupModal = bootstrap.Modal.getInstance(document.getElementById('signupModal'));
                signupModal.hide();
            }).catch(function(error) {
                console.error('Google Sign-In error:', error);
                alert('Failed to sign up with Google. Please try again.');
            });
        });
    });
}

document.getElementById('signupForm')?.addEventListener('input', function(e) {
    const password = document.getElementById('signupPassword');
    const confirm = document.getElementById('confirmPassword');
    
    if (confirm.value && password.value !== confirm.value) {
        confirm.setCustomValidity('Passwords do not match');
    } else {
        confirm.setCustomValidity('');
    }
});

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start) + '%';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statItems = entry.target.querySelectorAll('.stat-item h4');
            statItems.forEach(item => {
                const value = parseInt(item.innerHTML);
                animateValue(item, 0, value, 2000);
            });
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const marketStats = document.querySelector('.market-stats');
if (marketStats) {
    observer.observe(marketStats);
}

const animateStats = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statsElements = entry.target.querySelectorAll('.stat-box h5');
            statsElements.forEach(stat => {
                const value = parseInt(stat.textContent);
                animateStats(stat, 0, value, 2000);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelector('.stats-grid')?.forEach(grid => statsObserver.observe(grid));

document.querySelector('[data-bs-target="#moreRevenueRows"]')?.addEventListener('click', function() {
    const viewMore = this.querySelector('.view-more');
    const viewLess = this.querySelector('.view-less');
    viewMore.classList.toggle('d-none');
    viewLess.classList.toggle('d-none');
});

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    const slideInterval = 5000; // Change slide every 5 seconds

    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        const content = slides[currentSlide].querySelector('.hero-content');
        content.querySelectorAll('.animate__animated').forEach(el => {
            el.style.animation = 'none';
            el.offsetHeight; // Trigger reflow
            el.style.animation = null;
        });
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    let slideTimer = setInterval(nextSlide, slideInterval);

    const slider = document.querySelector('.hero-slider');
    slider.addEventListener('mouseenter', () => clearInterval(slideTimer));
    slider.addEventListener('mouseleave', () => {
        slideTimer = setInterval(nextSlide, slideInterval);
    });
});

function toggleRevenueRows() {
    const hiddenRows = document.querySelectorAll('.hidden-revenue-row');
    const viewMoreBtn = document.querySelector('.view-more-btn');
    const viewMoreText = viewMoreBtn.querySelector('.view-more-text');
    const chevronIcon = viewMoreBtn.querySelector('i');
    
    viewMoreBtn.classList.toggle('active');
    
    hiddenRows.forEach((row, index) => {
        if (row.style.display === 'none' || !row.classList.contains('show')) {
            row.style.display = 'table-row';
            setTimeout(() => {
                row.classList.add('show');
            }, 50 * (index + 1));
            viewMoreText.textContent = 'View Less';
            chevronIcon.style.transform = 'rotate(180deg)';
        } else {
            row.classList.remove('show');
            setTimeout(() => {
                row.style.display = 'none';
            }, 300);
            viewMoreText.textContent = 'View More';
            chevronIcon.style.transform = 'rotate(0deg)';
        }
    });
}

// Property Filters
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const propertyCards = document.querySelectorAll('.property-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            propertyCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});

// Load More Properties
document.querySelector('.load-more-btn')?.addEventListener('click', function() {
    this.innerHTML = '<span>No More Properties</span>';
    this.disabled = true;
    this.style.opacity = '0.5';
}); 