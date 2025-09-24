// ==========================================
// DUMPSTER NOTE LANDING PAGE JAVASCRIPT
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();
    initParallaxEffects();
    initScreenshotGallery();
    initHoverEffects();
    initAnalytics();
});

// ==========================================
// MOBILE MENU
// ==========================================
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('mobile-active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('mobile-active');
            });
        });
    }
}

// ==========================================
// SMOOTH SCROLLING
// ==========================================
function initSmoothScrolling() {
    // Handle smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .feature-card, .step, .benefit-item, .pricing-card');
    
    // Add animate-on-scroll class to elements that don't have it
    animatedElements.forEach(element => {
        if (!element.classList.contains('animate-on-scroll')) {
            element.classList.add('animate-on-scroll');
        }
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Add stagger effect to cards
                if (entry.target.classList.contains('feature-card') || 
                    entry.target.classList.contains('pricing-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.animationDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ==========================================
// PARALLAX EFFECTS
// ==========================================
function initParallaxEffects() {
    const raccoonMascot = document.querySelector('.raccoon-mascot');
    const heroSection = document.querySelector('.hero');
    
    if (raccoonMascot && heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroHeight = heroSection.offsetHeight;
            const scrollPercent = scrolled / heroHeight;
            
            if (scrollPercent <= 1) {
                // Gentle floating effect that responds to scroll
                const translateY = scrollPercent * 50;
                const rotate = Math.sin(scrollPercent * Math.PI * 2) * 5;
                raccoonMascot.style.transform = `translateY(${translateY}px) rotate(${5 + rotate}deg)`;
            }
        });
    }

    // Parallax for background elements
    const parallaxElements = document.querySelectorAll('.phone-mockup');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0) rotate(-5deg)`;
        });
    });
}

// ==========================================
// SCREENSHOT GALLERY
// ==========================================
function initScreenshotGallery() {
    const screenshotsContainer = document.querySelector('.screenshots-container');
    
    if (screenshotsContainer) {
        // Add touch/drag scrolling for mobile
        let isDown = false;
        let startX;
        let scrollLeft;

        screenshotsContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            screenshotsContainer.classList.add('active');
            startX = e.pageX - screenshotsContainer.offsetLeft;
            scrollLeft = screenshotsContainer.scrollLeft;
        });

        screenshotsContainer.addEventListener('mouseleave', () => {
            isDown = false;
            screenshotsContainer.classList.remove('active');
        });

        screenshotsContainer.addEventListener('mouseup', () => {
            isDown = false;
            screenshotsContainer.classList.remove('active');
        });

        screenshotsContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - screenshotsContainer.offsetLeft;
            const walk = (x - startX) * 2;
            screenshotsContainer.scrollLeft = scrollLeft - walk;
        });

        // Screenshot lightbox (simple version)
        document.querySelectorAll('.screenshot-item img').forEach(img => {
            img.addEventListener('click', function() {
                createLightbox(this.src, this.alt);
            });
        });
    }
}

function createLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${src}" alt="${alt}">
            <button class="lightbox-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            animation: fadeIn 0.3s ease forwards;
        }
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        .lightbox img {
            max-width: 100%;
            max-height: 100%;
            border-radius: 16px;
            box-shadow: 0 25px 100px rgba(0, 0, 0, 0.5);
        }
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: -40px;
            background: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        @keyframes fadeIn {
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Close functionality
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(lightbox);
                document.head.removeChild(style);
            }, 300);
        }
    });
}

// ==========================================
// HOVER EFFECTS
// ==========================================
function initHoverEffects() {
    // Enhanced button hover effects
    document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Card tilt effect on hover
    document.querySelectorAll('.feature-card, .pricing-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ==========================================
// PERFORMANCE OPTIMIZATIONS
// ==========================================
function debounce(func, wait) {
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

// Debounce scroll events
const debouncedScrollHandler = debounce(() => {
    // Any additional scroll handling can go here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// ==========================================
// ANALYTICS (Privacy-friendly)
// ==========================================
function initAnalytics() {
    // Track button clicks
    document.querySelectorAll('.btn-primary, .btn-secondary, .app-store-button').forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent || this.alt || 'Unknown Button';
            console.log(`Button clicked: ${buttonText}`);
            // Replace with your analytics service
        });
    });

    // Track section views
    const sections = document.querySelectorAll('section[id]');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionName = entry.target.id || 'unnamed-section';
                console.log(`Section viewed: ${sectionName}`);
                // Replace with your analytics service
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// ==========================================
// EASTER EGGS & DELIGHT
// ==========================================
function initEasterEggs() {
    // Raccoon clicks
    const raccoons = document.querySelectorAll('.raccoon-mascot, .raccoon-large, .raccoon-writing');
    raccoons.forEach(raccoon => {
        raccoon.addEventListener('click', function() {
            this.style.animation = 'none';
            this.offsetHeight; // Trigger reflow
            this.style.animation = 'bounce 0.6s ease';
            
            // Add a fun message
            const messages = ['🦝 Howdy!', '✨ Thanks for clicking!', '💝 You found me!', '🌟 Surprise!'];
            const message = messages[Math.floor(Math.random() * messages.length)];
            
            showToast(message);
        });
    });
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--primary-button);
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        font-weight: 600;
        z-index: 10000;
        animation: toastIn 0.3s ease;
        pointer-events: none;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes toastIn {
            from {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'toastIn 0.3s ease reverse';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
                document.head.removeChild(style);
            }
        }, 300);
    }, 2000);
}

// Initialize easter eggs after a delay
setTimeout(initEasterEggs, 1000);

// ==========================================
// MOBILE-SPECIFIC ENHANCEMENTS
// ==========================================
function initMobileEnhancements() {
    // Prevent zoom on double tap for buttons
    document.querySelectorAll('button, .btn-primary, .btn-secondary, .btn-outline').forEach(element => {
        element.addEventListener('touchend', function(e) {
            e.preventDefault();
        });
    });

    // Add touch feedback
    document.querySelectorAll('.feature-card, .pricing-card').forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Initialize mobile enhancements on touch devices
if ('ontouchstart' in window) {
    initMobileEnhancements();
}

// ==========================================
// ACCESSIBILITY ENHANCEMENTS
// ==========================================
function initAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#features';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-button);
        color: white;
        padding: 8px 16px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Keyboard navigation for gallery
    const screenshotItems = document.querySelectorAll('.screenshot-item img');
    screenshotItems.forEach((item, index) => {
        item.setAttribute('tabindex', '0');
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

initAccessibility();

// ==========================================
// PERFORMANCE MONITORING
// ==========================================
function initPerformanceMonitoring() {
    // Monitor Core Web Vitals
    if ('web-vitals' in window) {
        // This would integrate with web-vitals library if included
        // For now, just log basic performance metrics
    }
    
    // Log page load time
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    });
}

initPerformanceMonitoring();