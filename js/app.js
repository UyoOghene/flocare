// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

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
        const email = emailInput.value;
        
        if (email) {
            // In a real app, you would send this to a server
            alert(`Thank you for subscribing with ${email}! You'll receive updates about FloCare products.`);
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
        }
    });
}

// Product Packaging Interactive Effect
const productPackaging = document.querySelector(".product-packaging");
if (productPackaging) {
    // Auto flip every 10 seconds
    setInterval(() => {
        productPackaging.classList.toggle("flipped");
    }, 10000);
    
    // Manual flip on click
    productPackaging.addEventListener("click", () => {
        productPackaging.classList.toggle("flipped");
    });
}

// Add flipped class for CSS animation
document.addEventListener("DOMContentLoaded", () => {
    if (productPackaging) {
        productPackaging.classList.add("flipped");
        setTimeout(() => {
            productPackaging.classList.remove("flipped");
        }, 500);
    }
});

// Product Cards Hover Effect Enhancement
const productCards = document.querySelectorAll(".product-card");
productCards.forEach(card => {
    card.addEventListener("mouseenter", function() {
        this.style.transform = "translateY(-10px)";
    });
    
    card.addEventListener("mouseleave", function() {
        this.style.transform = "translateY(0)";
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.createElement("button");
scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
scrollToTopBtn.className = "scroll-to-top";
scrollToTopBtn.style.position = "fixed";
scrollToTopBtn.style.bottom = "30px";
scrollToTopBtn.style.right = "30px";
scrollToTopBtn.style.width = "50px";
scrollToTopBtn.style.height = "50px";
scrollToTopBtn.style.borderRadius = "50%";
scrollToTopBtn.style.backgroundColor = "var(--primary-purple)";
scrollToTopBtn.style.color = "var(--white)";
scrollToTopBtn.style.border = "none";
scrollToTopBtn.style.fontSize = "1.2rem";
scrollToTopBtn.style.cursor = "pointer";
scrollToTopBtn.style.zIndex = "999";
scrollToTopBtn.style.display = "none";
scrollToTopBtn.style.justifyContent = "center";
scrollToTopBtn.style.alignItems = "center";
scrollToTopBtn.style.boxShadow = "var(--shadow)";
scrollToTopBtn.style.transition = "all 0.3s ease";

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
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = "flex";
    } else {
        scrollToTopBtn.style.display = "none";
    }
});

// Add animation to elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animated");
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll(".feature-card, .product-slide, .product-detail-card").forEach(el => {
    observer.observe(el);
});

// Feature cards animation
const featureCards = document.querySelectorAll(".feature-card");
featureCards.forEach(card => {
    card.addEventListener("mouseenter", function() {
        const icon = this.querySelector(".feature-icon");
        icon.style.transform = "scale(1.1) rotate(5deg)";
    });
    
    card.addEventListener("mouseleave", function() {
        const icon = this.querySelector(".feature-icon");
        icon.style.transform = "scale(1) rotate(0)";
    });
});

// Header scroll effect
window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    if (window.scrollY > 50) {
        header.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.1)";
        header.style.padding = "0 0";
    } else {
        header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.05)";
    }
});

