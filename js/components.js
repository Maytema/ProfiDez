// Компоненты и виджеты сайта ProfiDez

// Floating Widget Management
const floatingWidget = document.getElementById('floatingWidget');
const widgetMinimized = document.getElementById('widgetMinimized');
const closeWidget = document.getElementById('closeWidget');

let widgetState = 'minimized';
let widgetTimer;
let autoCloseTimer;
let widgetShown = false;

// Показываем минимизированный виджет через 2 секунды
setTimeout(() => {
    widgetMinimized.classList.add('active');
}, 2000);

// Показываем полный виджет при скролле до раздела с ценами
window.addEventListener('scroll', () => {
    const pricingSection = document.getElementById('pricing');
    if (!pricingSection) return;
    
    const pricingPosition = pricingSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.5;
    
    if (pricingPosition < screenPosition && widgetState === 'minimized' && !widgetShown) {
        showFullWidget();
        widgetShown = true;
    }
});

function showFullWidget() {
    if (widgetState === 'minimized') {
        floatingWidget.classList.add('active');
        widgetMinimized.classList.remove('active');
        widgetState = 'visible';
        
        // Автоматическое закрытие через 20 секунд
        autoCloseTimer = setTimeout(() => {
            minimizeWidget();
        }, 20000);
    }
}

function minimizeWidget() {
    if (widgetState === 'visible') {
        floatingWidget.classList.remove('active');
        widgetMinimized.classList.add('active');
        widgetState = 'minimized';
        clearTimeout(autoCloseTimer);
    }
}

function expandWidget() {
    if (widgetState === 'minimized') {
        floatingWidget.classList.add('active');
        widgetMinimized.classList.remove('active');
        widgetState = 'visible';
        
        // Автоматическое закрытие через 20 секунд
        autoCloseTimer = setTimeout(() => {
            minimizeWidget();
        }, 20000);
    }
}

closeWidget.addEventListener('click', (e) => {
    e.stopPropagation();
    minimizeWidget();
});

widgetMinimized.addEventListener('click', function(e) {
    e.stopPropagation();
    expandWidget();
});

floatingWidget.addEventListener('click', function(e) {
    if (!floatingWidget.classList.contains('active')) {
        e.stopPropagation();
    }
});

// Review Form Management
function openReviewForm() {
    const form = document.getElementById('reviewForm');
    form.classList.add('active');
    form.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
    });
    startReviewFormTimer();
}

function closeReviewForm() {
    const form = document.getElementById('reviewForm');
    form.classList.add('closing');
    
    setTimeout(() => {
        form.classList.remove('active');
        form.classList.remove('closing');
        clearTimeout(reviewFormTimer);
    }, 400);
}

let reviewFormTimer;

function startReviewFormTimer() {
    reviewFormTimer = setTimeout(closeReviewForm, 15000);
}

function resetReviewFormTimer() {
    clearTimeout(reviewFormTimer);
    startReviewFormTimer();
}

// Сброс таймера при взаимодействии с формой
const reviewForm = document.getElementById('reviewForm');
if (reviewForm) {
    reviewForm.addEventListener('input', resetReviewFormTimer);
    reviewForm.addEventListener('click', resetReviewFormTimer);
    
    reviewForm.addEventListener('mouseenter', () => {
        clearTimeout(reviewFormTimer);
    });
    
    reviewForm.addEventListener('mouseleave', () => {
        startReviewFormTimer();
    });
}

// Phone Click Tracking
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function() {
        console.log('Телефонный звонок: ' + this.href);
    });
});

// WhatsApp Click Tracking
document.querySelectorAll('a[href*="whatsapp"]').forEach(link => {
    link.addEventListener('click', function() {
        console.log('WhatsApp клик: ' + this.href);
    });
});

// Telegram Click Tracking
document.querySelectorAll('a[href*="telegram"]').forEach(link => {
    link.addEventListener('click', function() {
        console.log('Telegram клик: ' + this.href);
    });
});

// Service Order Buttons
document.querySelectorAll('.service-card .btn').forEach(button => {
    button.addEventListener('click', function() {
        const serviceName = this.closest('.service-card').querySelector('h3').textContent;
        console.log('Заказ услуги: ' + serviceName);
    });
});

// Pricing Plan Order Buttons
document.querySelectorAll('.pricing-card .btn').forEach(button => {
    button.addEventListener('click', function() {
        const planName = this.closest('.pricing-card').querySelector('h3').textContent;
        console.log('Заказ тарифа: ' + planName);
    });
});

// Contact Items Click Tracking
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('click', function() {
        const contactType = this.querySelector('h4').textContent;
        console.log('Клик по контакту: ' + contactType);
    });
});

// Back to Top Functionality
let backToTopBtn;

// Создаем кнопку "Наверх" если её нет
function createBackToTopButton() {
    if (document.getElementById('backToTop')) return;
    
    backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTop';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 5px 15px rgba(37, 99, 235, 0.3);
        transition: all 0.3s;
        z-index: 999;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Показываем/скрываем кнопку при скролле
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
}

// Создаем кнопку при загрузке
document.addEventListener('DOMContentLoaded', createBackToTopButton);

// Form Validation Helper
function validatePhone(phone) {
    const phoneRegex = /^[\+]?[996]?[0-9]{9,12}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Copy Phone Number Function
function copyPhoneNumber() {
    const phone = '+996774032150';
    navigator.clipboard.writeText(phone).then(() => {
        alert('Номер телефона скопирован: ' + phone);
    }).catch(err => {
        console.error('Ошибка копирования: ', err);
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем возможность копирования номера телефона
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            copyPhoneNumber();
        });
    });
    
    console.log('Компоненты ProfiDez инициализированы');
});