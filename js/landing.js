// Landing Section Interactive Effects
document.addEventListener('DOMContentLoaded', function() {
    // Animate brand values on scroll
    const valueItems = document.querySelectorAll('.value-item');
    const storyStats = document.querySelectorAll('.story-stat');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation for value items
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Set initial styles for animation
    valueItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
    
    storyStats.forEach(stat => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(20px)';
        stat.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(stat);
    });
    
    // Animate stats numbers
    const statNumbers = document.querySelectorAll('.story-stat .stat-number');
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
    
    // Add hover effect for brand circle
    const brandCircle = document.querySelector('.brand-circle');
    if (brandCircle) {
        brandCircle.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'scale(1.1) rotate(10deg)';
        });
        
        brandCircle.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = '';
        });
        
        // Click effect for brand circle
        brandCircle.addEventListener('click', function() {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.width = '100%';
            ripple.style.height = '100%';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)';
            ripple.style.animation = 'circleRipple 0.6s ease-out';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
    
    // Add ripple animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes circleRipple {
            from {
                transform: scale(0.5);
                opacity: 1;
            }
            to {
                transform: scale(1.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Interactive quote hover
    const imageCaption = document.querySelector('.image-caption');
    if (imageCaption && window.innerWidth > 768) {
        // Don't show caption on mobile - it's always visible
        const womanImageContainer = document.querySelector('.woman-image-container');
        
        womanImageContainer.addEventListener('mouseenter', function() {
            const caption = this.querySelector('.image-caption');
            caption.style.transform = 'translateY(0)';
        });
        
        womanImageContainer.addEventListener('mouseleave', function() {
            const caption = this.querySelector('.image-caption');
            caption.style.transform = 'translateY(100%)';
        });
    }
    
    // Parallax effect for wave separator on scroll
    window.addEventListener('scroll', function() {
        const waveSeparator = document.querySelector('.wave-separator svg');
        if (waveSeparator) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.2;
            waveSeparator.style.transform = `translateY(${rate}px)`;
        }
    });
});