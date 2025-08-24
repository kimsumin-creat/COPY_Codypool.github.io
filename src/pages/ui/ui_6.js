// DOM Elements
const successOverlay = document.getElementById('success-overlay');
const nextRecommendBtn = document.getElementById('next-recommend-btn');
const similarBtn = document.getElementById('similar-btn');
const newBtn = document.getElementById('new-btn');
const dashboardBtn = document.getElementById('dashboard-btn');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    updateProgressBar();
    showSuccessAnimation();
});

// Event Listeners
function initializeEventListeners() {
    // CTA button
    nextRecommendBtn.addEventListener('click', handleNextRecommend);
    
    // Option buttons
    similarBtn.addEventListener('click', handleSimilarStyle);
    newBtn.addEventListener('click', handleNewImage);
    
    // Navigation
    dashboardBtn.addEventListener('click', handleDashboard);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);
}

// Progress Bar Update
function updateProgressBar() {
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        progressFill.style.width = '100%'; // 5/5 = 100%
    }
}

// Success Animation
function showSuccessAnimation() {
    // Show overlay
    successOverlay.classList.add('show');
    
    // Hide overlay after animation
    setTimeout(() => {
        successOverlay.classList.remove('show');
    }, 3000);
}

// Navigation Handlers
function handleNextRecommend() {
    // Show loading state
    nextRecommendBtn.disabled = true;
    nextRecommendBtn.textContent = '추천 준비 중...';
    nextRecommendBtn.classList.add('loading');
    
    // Simulate processing
    setTimeout(() => {
        // Navigate to result page with similar style filter
        window.location.href = 'onboarding-result.html?filter=similar';
    }, 1500);
}

function handleSimilarStyle() {
    // Show loading state
    similarBtn.disabled = true;
    similarBtn.textContent = '비슷한 스타일 찾는 중...';
    similarBtn.classList.add('loading');
    
    // Simulate processing
    setTimeout(() => {
        // Navigate to result page with similar style filter
        window.location.href = 'onboarding-result.html?filter=similar';
    }, 1500);
}

function handleNewImage() {
    // Show loading state
    newBtn.disabled = true;
    newBtn.textContent = '이미지 선택으로 이동...';
    newBtn.classList.add('loading');
    
    // Simulate processing
    setTimeout(() => {
        // Navigate back to image selection
        window.location.href = 'ui_4.html';
    }, 1000);
}

function handleDashboard() {
    // Show loading state
    dashboardBtn.disabled = true;
    dashboardBtn.textContent = '대시보드로 이동...';
    dashboardBtn.classList.add('loading');
    
    // Simulate processing
    setTimeout(() => {
        // Navigate to dashboard
        window.location.href = 'ui_7.html';
    }, 1000);
}

// Keyboard Navigation
function handleKeyboard(event) {
    switch(event.key) {
        case 'Enter':
            if (event.target === nextRecommendBtn) {
                handleNextRecommend();
            } else if (event.target === similarBtn) {
                handleSimilarStyle();
            } else if (event.target === newBtn) {
                handleNewImage();
            } else if (event.target === dashboardBtn) {
                handleDashboard();
            }
            break;
        case 'Escape':
            // Close any open modals or overlays
            if (successOverlay.classList.contains('show')) {
                successOverlay.classList.remove('show');
            }
            break;
    }
}

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
    nextRecommendBtn.setAttribute('aria-label', '다음 코디 추천받기');
    similarBtn.setAttribute('aria-label', '비슷한 스타일 더 보기');
    newBtn.setAttribute('aria-label', '새로운 이미지로 다시 추천받기');
    dashboardBtn.setAttribute('aria-label', '대시보드로 이동');
    
    // Add focus management
    const focusableElements = document.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
    
    // Trap focus in modal when overlay is shown
    successOverlay.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
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
    page_name: 'onboarding_complete',
    step: 5
});

// Track user interactions
function trackUserAction(action, details = {}) {
    trackEvent('user_action', {
        action: action,
        page: 'onboarding_complete',
        ...details
    });
}

// Add tracking to button clicks
nextRecommendBtn.addEventListener('click', () => {
    trackUserAction('next_recommend_click');
});

similarBtn.addEventListener('click', () => {
    trackUserAction('similar_style_click');
});

newBtn.addEventListener('click', () => {
    trackUserAction('new_image_click');
});

dashboardBtn.addEventListener('click', () => {
    trackUserAction('dashboard_click');
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