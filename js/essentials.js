// Mobile Navigation Management
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');
const closeMenu = document.getElementById('closeMenu');
const mobileOverlay = document.getElementById('mobileOverlay');
const menuIcon = document.getElementById('menuIcon');

function toggleMobileMenu() {
    const isOpening = !navLinks.classList.contains('show');
    
    navLinks.classList.toggle('show');
    mobileOverlay.classList.toggle('active');
    
    if (navLinks.classList.contains('show')) {
        menuIcon.className = 'fas fa-times';
        document.body.style.overflow = 'hidden';
    } else {
        menuIcon.className = 'fas fa-bars';
        document.body.style.overflow = '';
    }
}

function closeMobileMenu() {
    navLinks.classList.remove('show');
    mobileOverlay.classList.remove('active');
    menuIcon.className = 'fas fa-bars';
    document.body.style.overflow = '';
}

mobileMenu.addEventListener('click', toggleMobileMenu);
closeMenu.addEventListener('click', closeMobileMenu);
mobileOverlay.addEventListener('click', closeMobileMenu);

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('show')) {
        closeMobileMenu();
    }
});

// Smooth Scrolling Implementation
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

// FAQ Accordion Functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentNode;
        item.classList.toggle('active');
    });
});

// Knowledge Base Accordion
document.querySelectorAll('.knowledge-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentNode;
        item.classList.toggle('active');
    });
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
    }
});

// WhatsApp Integration
function openWhatsApp(message) {
    const cleanMessage = message;
    const phone = "996774032150";
    const text = encodeURIComponent(cleanMessage);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
}

// Promo Timer Implementation
function updateTimer() {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    
    const diff = endOfDay - now;
    
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Social Media Integration
function showInstagramMessage() {
    alert('Наш аккаунт в Instagram пока в разработке. Следите за обновлениями!');
}