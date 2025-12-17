// Floating Widget Management
const floatingWidget = document.getElementById('floatingWidget');
const widgetMinimized = document.getElementById('widgetMinimized');
const closeWidget = document.getElementById('closeWidget');

let widgetState = 'minimized';
let widgetTimer;
let autoCloseTimer;
let widgetShown = false;

function showFullWidget() {
    if (widgetState === 'minimized') {
        floatingWidget.classList.add('active');
        widgetMinimized.classList.remove('active');
        widgetState = 'visible';
        
        autoCloseTimer = setTimeout(() => {
            minimizeWidget();
        }, 15000);
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
        
        autoCloseTimer = setTimeout(() => {
            minimizeWidget();
        }, 15000);
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
    document.getElementById('reviewForm').classList.add('active');
    document.getElementById('reviewForm').scrollIntoView({ behavior: 'smooth', block: 'center' });
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
    reviewFormTimer = setTimeout(closeReviewForm, 10000);
}

function resetReviewFormTimer() {
    clearTimeout(reviewFormTimer);
    startReviewFormTimer();
}

document.getElementById('reviewForm').addEventListener('input', resetReviewFormTimer);
document.getElementById('reviewForm').addEventListener('click', resetReviewFormTimer);

document.getElementById('reviewForm').addEventListener('mouseenter', () => {
    clearTimeout(reviewFormTimer);
});

document.getElementById('reviewForm').addEventListener('mouseleave', () => {
    startReviewFormTimer();
});

// Testimonials Management
const showMoreBtn = document.getElementById('showMoreReviews');
const hiddenReviews = document.querySelectorAll('.testimonial-card.hidden');
let allReviewsShown = false;

showMoreBtn.addEventListener('click', () => {
    if (!allReviewsShown) {
        hiddenReviews.forEach(review => {
            review.classList.remove('hidden');
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
    const name = document.getElementById('reviewName').value;
    const phone = document.getElementById('reviewPhone').value;
    const review = document.getElementById('reviewText').value;
    const rating = document.querySelector('input[name="rating"]:checked')?.value || 'Не указано';
    
    const text = `Новый отзыв с сайта:%0AИмя: ${name}%0AТелефон: ${phone}%0AОценка: ${rating} звезд%0AОтзыв: ${review}`;
    window.open(`https://wa.me/996774032150?text=${text}`, '_blank');
    
    alert('Спасибо за ваш отзыв! Он будет проверен и опубликован в течение 24 часов.');
    this.reset();
    document.querySelectorAll('input[name="rating"]').forEach(radio => {
        radio.checked = false;
    });
    closeReviewForm();
});