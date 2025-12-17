// Initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start promo timer
    setInterval(updateTimer, 1000);
    updateTimer();
    
    // Show minimized widget after delay
    setTimeout(() => {
        widgetMinimized.classList.add('active');
    }, 1500);
    
    // Widget scroll trigger
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
    
    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .pricing-card, .testimonial-card, .step, .knowledge-item, .faq-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

});
