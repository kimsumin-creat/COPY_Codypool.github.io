// DOM Elements
const loginBtn = document.getElementById('login-btn');
const startBtn = document.getElementById('start-btn');
const heroCta = document.getElementById('hero-cta');
const demoBtn = document.getElementById('demo-btn');
const finalCta = document.getElementById('final-cta');
const loginModal = document.getElementById('login-modal');
const loginModalClose = document.getElementById('login-modal-close');
const navLinks = document.querySelectorAll('.nav-link');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    initializeScrollEffects();
    initializeAnimations();
});

// Event Listeners
function initializeEventListeners() {
    // Login button
    loginBtn.addEventListener('click', showLoginModal);
    
    // Start button
    startBtn.addEventListener('click', handleStart);
    
    // CTA buttons
    heroCta.addEventListener('click', handleHeroCta);
    demoBtn.addEventListener('click', handleDemo);
    finalCta.addEventListener('click', handleFinalCta);
    
    // Modal
    loginModalClose.addEventListener('click', hideLoginModal);
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            hideLoginModal();
        }
    });
    
    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);
}

// Modal Functions
function showLoginModal() {
    loginModal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Focus management
    const firstButton = loginModal.querySelector('button');
    if (firstButton) {
        firstButton.focus();
    }
}

function hideLoginModal() {
    loginModal.classList.remove('show');
    document.body.style.overflow = '';
    
    // Return focus to login button
    loginBtn.focus();
}

// Navigation Handlers
function handleStart() {
    // Navigate to onboarding tutorial
    window.location.href = '../Onboarding/onboarding-tutorial.html';
}

function handleHeroCta() {
    // Navigate to onboarding tutorial
    window.location.href = '../Onboarding/onboarding-tutorial.html';
}

function handleDemo() {
    // Show demo or navigate to demo page
    showDemo();
}

function handleFinalCta() {
    // Navigate to onboarding tutorial
    window.location.href = '../Onboarding/onboarding-tutorial.html';
}

function showDemo() {
    // Create demo overlay
    const demoOverlay = document.createElement('div');
    demoOverlay.className = 'demo-overlay';
    demoOverlay.innerHTML = `
        <div class="demo-content">
            <h3>데모 미리보기</h3>
            <p>AI 코디 추천 서비스를 체험해보세요</p>
            <div class="demo-buttons">
                <button class="demo-btn primary" onclick="window.location.href='../Onboarding/onboarding-tutorial.html'">
                    튜토리얼 시작
                </button>
                <button class="demo-btn secondary" onclick="closeDemo()">
                    닫기
                </button>
            </div>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .demo-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 3000;
            backdrop-filter: blur(4px);
        }
        .demo-content {
            background: white;
            border-radius: 1rem;
            padding: 2rem;
            text-align: center;
            max-width: 400px;
            width: 90%;
        }
        .demo-content h3 {
            margin-bottom: 1rem;
            color: #333;
        }
        .demo-content p {
            margin-bottom: 1.5rem;
            color: #666;
        }
        .demo-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
        }
        .demo-btn {
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 600;
            cursor: pointer;
            border: none;
            transition: all 0.3s ease;
        }
        .demo-btn.primary {
            background: linear-gradient(135deg, #0ea5e9 0%, #d946ef 100%);
            color: white;
        }
        .demo-btn.secondary {
            background: white;
            color: #64748b;
            border: 1px solid #cbd5e1;
        }
        .demo-btn:hover {
            transform: translateY(-1px);
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(demoOverlay);
}

function closeDemo() {
    const demoOverlay = document.querySelector('.demo-overlay');
    if (demoOverlay) {
        demoOverlay.remove();
    }
}

// Smooth Scroll
function handleSmoothScroll(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
        const headerHeight = document.querySelector('.main-header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Scroll Effects
function initializeScrollEffects() {
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
}

// Animations
function initializeAnimations() {
    // Intersection Observer for fade-in animations
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
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .step-card, .example-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Keyboard Navigation
function handleKeyboard(event) {
    switch(event.key) {
        case 'Escape':
            if (loginModal.classList.contains('show')) {
                hideLoginModal();
            }
            const demoOverlay = document.querySelector('.demo-overlay');
            if (demoOverlay) {
                closeDemo();
            }
            break;
        case 'Enter':
            if (event.target.classList.contains('login-option')) {
                handleLoginOption(event.target);
            }
            break;
    }
}

// Login Option Handler
function handleLoginOption(button) {
    const provider = button.classList.contains('kakao') ? 'kakao' : 'google';
    
    // Show loading state
    button.disabled = true;
    const originalText = button.textContent;
    button.textContent = '로그인 중...';
    
    // Simulate login process
    setTimeout(() => {
        // In a real app, this would handle actual login
        console.log(`Logging in with ${provider}`);
        
        // Navigate to onboarding after successful login
        window.location.href = '../Onboarding/onboarding-auth-profile.html';
    }, 1500);
}

// Add event listeners to login options
document.addEventListener('DOMContentLoaded', function() {
    const loginOptions = document.querySelectorAll('.login-option');
    loginOptions.forEach(option => {
        option.addEventListener('click', () => handleLoginOption(option));
    });
});

// Utility Functions
function showSuccess(message) {
    const feedback = document.createElement('div');
    feedback.className = 'feedback success';
    feedback.textContent = message;
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success-500);
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
    }, 3000);
}

function showError(message) {
    const feedback = document.createElement('div');
    feedback.className = 'feedback error';
    feedback.textContent = message;
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--error-500);
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
    }, 3000);
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Accessibility improvements
function improveAccessibility() {
    // Add ARIA labels
    loginBtn.setAttribute('aria-label', '로그인');
    startBtn.setAttribute('aria-label', '서비스 시작하기');
    heroCta.setAttribute('aria-label', 'AI에게 내 스타일 물어보기');
    demoBtn.setAttribute('aria-label', '데모 보기');
    finalCta.setAttribute('aria-label', '무료로 시작하기');
    
    // Add focus management for modal
    loginModal.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            const focusableElements = loginModal.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
}

// Initialize accessibility
improveAccessibility();

// Analytics tracking (if needed)
function trackEvent(eventName, properties = {}) {
    // Simulate analytics tracking
    console.log('Analytics Event:', eventName, properties);
    
    // In a real implementation, this would send data to analytics service
    // Example: gtag('event', eventName, properties);
}

// Track page view
trackEvent('page_view', {
    page_name: 'main_landing',
    user_type: 'visitor'
});

// Track user interactions
function trackUserAction(action, details = {}) {
    trackEvent('user_action', {
        action: action,
        page: 'main_landing',
        ...details
    });
}

// Add tracking to button clicks
loginBtn.addEventListener('click', () => {
    trackUserAction('login_button_click');
});

startBtn.addEventListener('click', () => {
    trackUserAction('start_button_click');
});

heroCta.addEventListener('click', () => {
    trackUserAction('hero_cta_click');
});

demoBtn.addEventListener('click', () => {
    trackUserAction('demo_button_click');
});

finalCta.addEventListener('click', () => {
    trackUserAction('final_cta_click');
});

// Performance monitoring
function measurePageLoadTime() {
    const loadTime = performance.now();
    console.log('Page load time:', loadTime.toFixed(2), 'ms');
    
    // Track performance metrics
    trackEvent('performance', {
        metric: 'page_load_time',
        value: loadTime
    });
}

// Measure page load time
window.addEventListener('load', measurePageLoadTime);

// Error handling
window.addEventListener('error', (event) => {
    console.error('JavaScript Error:', event.error);
    
    // Track errors
    trackEvent('error', {
        message: event.error?.message || 'Unknown error',
        filename: event.filename,
        lineno: event.lineno
    });
});

// Unhandled promise rejection
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled Promise Rejection:', event.reason);
    
    // Track promise rejections
    trackEvent('error', {
        type: 'unhandled_promise_rejection',
        reason: event.reason?.toString() || 'Unknown reason'
    });
}); 