// Основные функции сайта ProfiDez

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
        const isActive = item.classList.contains('active');
        
        // Закрываем все другие активные элементы
        document.querySelectorAll('.faq-item.active').forEach(activeItem => {
            if (activeItem !== item) {
                activeItem.classList.remove('active');
            }
        });
        
        // Переключаем текущий элемент
        item.classList.toggle('active');
    });
});

// Knowledge Base Accordion
document.querySelectorAll('.knowledge-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentNode;
        const isActive = item.classList.contains('active');
        
        // Закрываем все другие активные элементы
        document.querySelectorAll('.knowledge-item.active').forEach(activeItem => {
            if (activeItem !== item) {
                activeItem.classList.remove('active');
            }
        });
        
        // Переключаем текущий элемент
        item.classList.toggle('active');
    });
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
        header.style.backdropFilter = 'blur(5px)';
    }
});

// WhatsApp Integration
function openWhatsApp(message) {
    const cleanMessage = encodeURIComponent(message);
    const phone = "996774032150";
    window.open(`https://wa.me/${phone}?text=${cleanMessage}`, '_blank');
}

// Promo Timer Implementation
function updateTimer() {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    
    const diff = endOfDay - now;
    
    if (diff <= 0) {
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }
    
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Запускаем таймер сразу и затем каждую секунду
updateTimer();
setInterval(updateTimer, 1000);

// Social Media Integration
function showInstagramMessage() {
    alert('Наш аккаунт в Instagram: @profidez_kg\nСледите за акциями и полезными советами!');
}

// Testimonials Management
const showMoreBtn = document.getElementById('showMoreReviews');
const hiddenReviews = document.querySelectorAll('.testimonial-card.hidden');
let allReviewsShown = false;

showMoreBtn.addEventListener('click', () => {
    if (!allReviewsShown) {
        hiddenReviews.forEach(review => {
            review.classList.remove('hidden');
            review.style.animation = 'fadeInUp 0.6s ease-out';
        });
        showMoreBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        allReviewsShown = true;
    } else {
        hiddenReviews.forEach(review => {
            review.classList.add('hidden');
        });
        showMoreBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
        allReviewsShown = false;
    }
});

// Form Submissions Handling
document.getElementById('reviewFormData').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('reviewName').value.trim();
    const phone = document.getElementById('reviewPhone').value.trim();
    const review = document.getElementById('reviewText').value.trim();
    const rating = document.querySelector('input[name="rating"]:checked')?.value || '5';
    
    if (!name || !phone || !review) {
        alert('Пожалуйста, заполните все обязательные поля.');
        return;
    }
    
    const text = `Новый отзыв с сайта ProfiDez:%0A%0A👤 Имя: ${name}%0A📞 Телефон: ${phone}%0A⭐ Оценка: ${rating}/5%0A📝 Отзыв: ${review}`;
    window.open(`https://wa.me/996774032150?text=${text}`, '_blank');
    
    alert('Спасибо за ваш отзыв! Мы свяжемся с вами в ближайшее время.');
    this.reset();
    document.querySelectorAll('input[name="rating"]').forEach(radio => {
        radio.checked = false;
    });
    closeReviewForm();
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Добавляем анимации появления для элементов
document.querySelectorAll('.service-card, .pricing-card, .testimonial-card, .step, .knowledge-item, .faq-item, .contact-item, .stat-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем класс для анимации логотипа
    document.querySelector('.logo').classList.add('visible');
    
    // Добавляем класс для анимации героя
    document.querySelector('.hero-content').classList.add('visible');
    
    console.log('ProfiDez сайт загружен успешно!');
});