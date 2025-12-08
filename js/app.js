// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const body = document.body;

if (hamburger) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "";
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    body.style.overflow = "";
}));

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
    if (!e.target.closest(".navbar") && navMenu.classList.contains("active")) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        body.style.overflow = "";
    }
});

// Close mobile menu on resize to desktop
window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && navMenu.classList.contains("active")) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        body.style.overflow = "";
    }
});

// Swipe to close mobile menu on touch devices
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
    if (navMenu.classList.contains("active")) {
        touchStartX = e.changedTouches[0].screenX;
    }
});

document.addEventListener("touchend", (e) => {
    if (navMenu.classList.contains("active")) {
        touchEndX = e.changedTouches[0].screenX;
        const swipeDistance = touchEndX - touchStartX;
        
        if (swipeDistance < -100) {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
            body.style.overflow = "";
        }
    }
});

// Active navigation link based on current page
const currentPage = window.location.pathname.split("/").pop();
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {
    const linkPage = link.getAttribute("href");
    
    if (currentPage === "" && linkPage === "index.html") {
        link.classList.add("active");
    } else if (currentPage === linkPage) {
        link.classList.add("active");
    } else {
        link.classList.remove("active");
    }
});

// Newsletter Form Submission
const newsletterForm = document.getElementById("newsletter-form");
if (newsletterForm) {
    newsletterForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const emailInput = this.querySelector("input[type='email']");
        const email = emailInput.value.trim();
        
        if (email && validateEmail(email)) {
            // In a real app, you would send this to a server
            showNotification(`Thank you for subscribing with ${email}! You'll receive updates about FloCare products.`);
            emailInput.value = "";
            
            // Add a visual confirmation
            const button = this.querySelector("button");
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.style.backgroundColor = "var(--primary-green)";
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.backgroundColor = "";
            }, 2000);
        } else {
            showNotification("Please enter a valid email address.", "error");
        }
    });
}

// Email validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Notification function
function showNotification(message, type = "success") {
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === "error" ? "#f44336" : "var(--primary-green)"};
        color: white;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = "slideOut 0.3s ease";
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for notification animations
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Product Cards Animation on Scroll
const productCards = document.querySelectorAll(".product-card");
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
});

// Set initial styles and observe
productCards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
});

// Scroll to Top Button
const scrollToTopBtn = document.createElement("button");
scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--primary-purple);
    color: var(--white);
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    z-index: 1000;
    display: none;
    justify-content: center;
    align-items: center;
    box-shadow: var(--shadow);
    transition: var(--transition);
`;

document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener("mouseenter", function() {
    this.style.backgroundColor = "var(--primary-green)";
    this.style.transform = "scale(1.1)";
});

scrollToTopBtn.addEventListener("mouseleave", function() {
    this.style.backgroundColor = "var(--primary-purple)";
    this.style.transform = "scale(1)";
});

scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

window.addEventListener("scroll", () => {
    scrollToTopBtn.style.display = window.scrollY > 300 ? "flex" : "none";
});

// Header scroll effect
window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    if (window.scrollY > 50) {
        header.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.1)";
    } else {
        header.style.boxShadow = "0 2px 10px rgba(233, 230, 230, 0.05)";
    }
});

// Touch device optimizations
if ('ontouchstart' in window) {
    // Add touch-specific styles
    document.documentElement.classList.add("touch-device");
    
    // Increase tap targets for touch devices
    document.querySelectorAll(".btn, .nav-link, .quick-view-link, .view-all-btn, .cta-button").forEach(el => {
        el.style.minHeight = "44px";
        el.style.minWidth = "44px";
    });
}

// Initialize animations on page load
document.addEventListener("DOMContentLoaded", () => {
    // Add loaded class to body for CSS animations
    document.body.classList.add("loaded");
    
    // Animate stats counting
    const statNumbers = document.querySelectorAll(".stat-number");
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute("data-target"));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, 16);
    });
});

// Pause animations when page is not visible
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        document.body.style.animationPlayState = "paused";
    } else {
        document.body.style.animationPlayState = "running";
    }
});