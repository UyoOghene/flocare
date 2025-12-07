// Hero Section Interactive Effects
document.addEventListener('DOMContentLoaded', function() {
    // Parallax effect on scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const pad3d = document.querySelector('.pad-3d');
        
        if (hero && pad3d) {
            const rate = scrolled * -0.5;
            hero.style.backgroundPosition = `0px ${rate}px`;
            
            // Subtle rotation on scroll
            const rotation = scrolled * 0.1;
            pad3d.style.transform = `translate(-50%, -50%) rotateX(${5 + rotation * 0.1}deg) rotateY(${5 + rotation * 0.1}deg)`;
        }
    });

    // Interactive pad click effect
    const pad3d = document.querySelector('.pad-3d');
    if (pad3d) {
        pad3d.addEventListener('click', function() {
            const drop = document.querySelector('.pad-drop');
            drop.style.animation = 'none';
            drop.style.opacity = '1';
            drop.style.transform = 'translateX(-50%) scale(1.2)';
            
            // Reset animation after click
            setTimeout(() => {
                drop.style.animation = '';
                drop.style.opacity = '';
                drop.style.transform = '';
            }, 500);
            
            // Create ripple effect
            createRipple(this, event);
        });
        
        // Hover effect
        pad3d.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease';
            this.style.transform = 'translate(-50%, -50%) rotateX(10deg) rotateY(10deg) scale(1.05)';
        });
        
        pad3d.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(-50%, -50%) rotateX(5deg) rotateY(5deg) scale(1)';
        });
    }
    
    // Create ripple effect function
    function createRipple(element, event) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.backgroundColor = 'rgba(156, 39, 176, 0.2)';
        ripple.style.borderRadius = '50%';
        ripple.style.position = 'absolute';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s linear';
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Add ripple animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            from {
                transform: scale(0);
                opacity: 1;
            }
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Watch Demo button functionality
    const demoBtn = document.querySelector('.btn-secondary');
    if (demoBtn) {
        demoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // In a real application, this would open a video modal
            // For now, show a message and scroll to features
            const message = document.createElement('div');
            message.className = 'demo-message';
            message.innerHTML = `
                <div class="message-content">
                    <i class="fas fa-video"></i>
                    <h4>Product Demo Video</h4>
                    <p>Coming soon! Explore our features below.</p>
                </div>
            `;
            
            // Style the message
            const messageStyle = document.createElement('style');
            messageStyle.textContent = `
                .demo-message {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: var(--white);
                    padding: 30px;
                    border-radius: var(--border-radius);
                    box-shadow: var(--shadow-lg);
                    z-index: 1000;
                    animation: fadeIn 0.3s ease;
                    max-width: 300px;
                    text-align: center;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translate(-50%, -40%); }
                    to { opacity: 1; transform: translate(-50%, -50%); }
                }
                
                .message-content i {
                    font-size: 3rem;
                    color: var(--primary-purple);
                    margin-bottom: 20px;
                }
                
                .message-content h4 {
                    margin-bottom: 10px;
                    color: var(--primary-purple);
                }
            `;
            document.head.appendChild(messageStyle);
            
            document.body.appendChild(message);
            
            // Remove message after 3 seconds and scroll to features
            setTimeout(() => {
                message.remove();
                messageStyle.remove();
                document.querySelector('#features').scrollIntoView({
                    behavior: 'smooth'
                });
            }, 3000);
        });
    }
    
    // Animate stats on scroll into view
    const stats = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => observer.observe(stat));
    
    function animateNumbers(element) {
        const target = parseInt(element.textContent.replace('%', '').replace('mm', ''));
        let current = 0;
        const increment = target / 30;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = element.textContent.includes('%') ? '100%' : 
                                    element.textContent.includes('mm') ? '320mm' : '8-Hour';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + 
                    (element.textContent.includes('%') ? '%' : 
                     element.textContent.includes('mm') ? 'mm' : '');
            }
        }, 50);
    }
});

/* Add this JavaScript for interactive features */
document.addEventListener('DOMContentLoaded', function() {
    // Animated number counters
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const increment = target / 50;
        let current = 0;
        
        const updateNumber = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current);
                setTimeout(updateNumber, 50);
            } else {
                stat.textContent = target + (stat.getAttribute('data-target') === '100' ? '%' : '');
            }
        };
        
        // Start animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateNumber();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(stat.parentElement);
    });
    
    // Interactive dots
    const dots = document.querySelectorAll('.dot');
    const featureCards = document.querySelectorAll('.feature-card');
    
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const feature = this.getAttribute('data-feature');
            
            // Highlight corresponding feature card
            featureCards.forEach(card => {
                if (card.getAttribute('data-feature') === feature) {
                    card.style.transform = 'scale(1.1)';
                    card.style.boxShadow = '0 20px 50px rgba(156, 39, 176, 0.3)';
                    
                    setTimeout(() => {
                        card.style.transform = 'scale(1)';
                        card.style.boxShadow = '0 15px 40px rgba(0,0,0,0.1)';
                    }, 1000);
                }
            });
            
            // Add pulse effect to clicked dot
            this.style.animation = 'pulseDot 0.5s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });
    
    // Parallax effect on scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const productImage = document.querySelector('.product-image-wrapper');
        
        if (productImage) {
            const rate = scrolled * -0.2;
            productImage.style.transform = `translateY(${rate}px)`;
        }
    });
});
