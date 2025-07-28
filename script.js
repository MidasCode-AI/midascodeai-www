// MidasCode.AI Website JavaScript

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAnimations();
    initializeScrollEffects();
    initializeParticles();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Smooth scrolling for all internal anchor links (including hero buttons)
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' && e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });

    // Active navigation highlighting
    window.addEventListener('scroll', updateActiveNavigation);
}

// Update active navigation based on scroll position
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Initialize scroll-triggered animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .stat, .about-visual, .contact-method');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Add CSS for animations
    addAnimationStyles();
}

// Add animation styles dynamically
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .feature-card,
        .stat,
        .about-visual,
        .contact-method {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-card.animate-in,
        .stat.animate-in,
        .about-visual.animate-in,
        .contact-method.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .feature-card:nth-child(even) {
            transition-delay: 0.2s;
        }
        
        .feature-card:nth-child(3n) {
            transition-delay: 0.4s;
        }
        
        .stat:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .stat:nth-child(3) {
            transition-delay: 0.4s;
        }
        
        .contact-method:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .contact-method:nth-child(3) {
            transition-delay: 0.4s;
        }
    `;
    document.head.appendChild(style);
}

// Parallax and scroll effects
function initializeScrollEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax effect for hero background
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
        
        // Navbar background opacity
        const navbar = document.querySelector('.navbar');
        const opacity = Math.min(scrolled / 100, 0.95);
        navbar.style.background = `rgba(10, 10, 10, ${opacity})`;
        
        // Golden particles movement
        const particles = document.querySelector('.golden-particles');
        if (particles) {
            particles.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    });
}

// Enhanced particle system
function initializeParticles() {
    createFloatingElements();
    createMouseTrail();
}

// Create floating golden elements
function createFloatingElements() {
    const hero = document.querySelector('.hero');
    const elementCount = 15;
    
    for (let i = 0; i < elementCount; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 215, 0, ${Math.random() * 0.8 + 0.2});
            border-radius: 50%;
            pointer-events: none;
            animation: float-random ${Math.random() * 10 + 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
        `;
        hero.appendChild(element);
    }
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-random {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Mouse trail effect
function createMouseTrail() {
    const trail = [];
    const trailLength = 20;
    
    // Create trail elements
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'trail-dot';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(255, 215, 0, ${1 - i / trailLength});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    // Mouse move handler
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animate trail
    function animateTrail() {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        
        trail.forEach((dot, index) => {
            const nextDot = trail[index + 1] || { offsetLeft: currentX, offsetTop: currentY };
            
            dot.style.left = lerp(dot.offsetLeft, nextDot.offsetLeft, 0.6) + 'px';
            dot.style.top = lerp(dot.offsetTop, nextDot.offsetTop, 0.6) + 'px';
            
            if (index === 0) {
                dot.style.left = currentX + 'px';
                dot.style.top = currentY + 'px';
            }
        });
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

// Linear interpolation helper
function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

// Button hover effects
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0px) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
    });
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const isPercentage = target.includes('%');
        const isMs = target.includes('ms');
        const is247 = target.includes('24/7');
        const isSubMs = target.includes('<1ms');
        
        // Don't animate 24/7 or <1ms - just show them as is
        if (is247) {
            counter.textContent = '24/7';
            return;
        }
        
        if (isSubMs) {
            counter.textContent = '<1ms';
            return;
        }
        
        if (!isPercentage && !isMs) return;
        
        let current = 0;
        const increment = isPercentage ? 0.5 : 1;
        const targetNum = parseFloat(target);
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= targetNum) {
                current = targetNum;
                clearInterval(timer);
            }
            
            if (isPercentage) {
                counter.textContent = current.toFixed(1) + '%';
            } else if (isMs) {
                counter.textContent = Math.floor(current) + 'ms';
            }
        }, 50);
    });
}

// Initialize counter animation when stats come into view
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Typing effect for hero title
function initializeTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    
    // Use plain text instead of HTML to avoid breaking tags
    const originalText = "Turn Every Investment into Gold";
    const words = originalText.split(' ');
    
    heroTitle.innerHTML = '';
    
    let wordIndex = 0;
    
    function typeWord() {
        if (wordIndex < words.length) {
            const word = words[wordIndex];
            const span = document.createElement('span');
            
            if (word === 'Gold') {
                span.className = 'golden-text';
            }
            
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.innerHTML = word + ' ';
            
            heroTitle.appendChild(span);
            
            // Animate word in
            setTimeout(() => {
                span.style.transition = 'all 0.5s ease';
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, 100);
            
            wordIndex++;
            setTimeout(typeWord, 300);
        }
    }
    
    setTimeout(typeWord, 1000);
}

// Initialize typing effect
setTimeout(initializeTypingEffect, 500);

// Easter egg: Konami code
let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let konamiIndex = 0;

document.addEventListener('keydown', function(e) {
    if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateGoldenMode();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateGoldenMode() {
    document.body.style.filter = 'hue-rotate(45deg) saturate(1.5)';
    
    // Create golden explosion effect
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: gold;
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            left: 50%;
            top: 50%;
            animation: explode ${Math.random() * 2 + 1}s ease-out forwards;
        `;
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 3000);
    }
    
    // Add explosion keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes explode {
            to {
                transform: translate(${(Math.random() - 0.5) * 1000}px, ${(Math.random() - 0.5) * 1000}px) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        document.body.style.filter = '';
    }, 5000);
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll handlers
const throttledScrollHandler = throttle(function() {
    updateActiveNavigation();
    initializeScrollEffects();
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);
