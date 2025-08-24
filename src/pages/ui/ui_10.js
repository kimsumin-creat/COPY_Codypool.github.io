// AI Recommendation Error Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const retryBtn = document.getElementById('retry-btn');
    const similarStylesBtn = document.getElementById('similar-styles-btn');
    const loadingOverlay = document.getElementById('loading-overlay');

    // Initialize page
    initializePage();

    // Event listeners
    retryBtn.addEventListener('click', handleRetry);
    similarStylesBtn.addEventListener('click', handleSimilarStyles);

    // Functions
    function initializePage() {
        // Log error for analytics
        logError('ai_recommendation_failed');
        
        // Add entrance animation
        animateEntrance();
        
        // Check if user has previous session data
        checkPreviousSession();
    }

    function animateEntrance() {
        const elements = [
            '.error-illustration',
            '.error-message',
            '.error-actions',
            '.help-section'
        ];
        
        elements.forEach((selector, index) => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }

    function handleRetry() {
        // Show loading state
        showLoading(retryBtn, '다시 시도 중...');
        
        // Show loading overlay
        loadingOverlay.style.display = 'flex';
        
        // Simulate retry process
        simulateRetry()
            .then(result => {
                hideLoading();
                
                if (result.success) {
                    // Redirect to results page
                    window.location.href = 'ui_5.html';
                } else {
                    // Show error message
                    showErrorMessage('다시 시도했지만 여전히 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
                }
            })
            .catch(error => {
                hideLoading();
                showErrorMessage('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.');
            });
    }

    function handleSimilarStyles() {
        // Show loading state
        showLoading(similarStylesBtn, '검색 중...');
        
        // Simulate loading similar styles
        setTimeout(() => {
            hideLoading();
            
            // Check if there are saved styles
            const savedStyles = getSavedStyles();
            
            if (savedStyles.length > 0) {
                // Navigate to saved styles
                window.location.href = 'ui_8.html';
            } else {
                // Navigate to browse styles
                showSimilarStylesModal();
            }
        }, 1500);
    }

    function simulateRetry() {
        return new Promise((resolve) => {
            // Simulate API call delay
            setTimeout(() => {
                // Random success/failure for demo
                const success = Math.random() > 0.3; // 70% success rate
                resolve({ success });
            }, 2000);
        });
    }

    function showLoading(button, text) {
        button.classList.add('loading');
        button.disabled = true;
        button.dataset.originalText = button.textContent;
        button.textContent = text;
    }

    function hideLoading() {
        loadingOverlay.style.display = 'none';
        
        const loadingButtons = document.querySelectorAll('.action-btn.loading');
        loadingButtons.forEach(button => {
            button.classList.remove('loading');
            button.disabled = false;
            if (button.dataset.originalText) {
                button.textContent = button.dataset.originalText;
            }
        });
    }

    function showErrorMessage(message) {
        // Create error notification
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                <span>${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (notification.parentElement) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }

    function showSimilarStylesModal() {
        const modal = document.createElement('div');
        modal.className = 'similar-styles-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>추천 스타일</h3>
                    <button class="modal-close" onclick="this.closest('.similar-styles-modal').remove()">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>
                <div class="modal-body">
                    <p>저장된 스타일이 없어서 인기 스타일을 보여드릴게요.</p>
                    <div class="style-grid">
                        <div class="style-item" onclick="selectStyle('lovely')">
                            <div class="style-preview lovely"></div>
                            <span>러블리</span>
                        </div>
                        <div class="style-item" onclick="selectStyle('chic')">
                            <div class="style-preview chic"></div>
                            <span>시크</span>
                        </div>
                        <div class="style-item" onclick="selectStyle('vivid')">
                            <div class="style-preview vivid"></div>
                            <span>비비드</span>
                        </div>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="modal-btn" onclick="window.location.href='ui_2.html'">새로 시작하기</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Show modal
        setTimeout(() => {
            modal.classList.add('show');
        }, 100);
    }

    function selectStyle(style) {
        // Store selected style preference
        localStorage.setItem('preferredStyle', style);
        
        // Navigate to onboarding with style preference
        window.location.href = `ui_4.html?style=${style}`;
    }

    function getSavedStyles() {
        // Get saved styles from localStorage
        const saved = localStorage.getItem('savedStyles');
        return saved ? JSON.parse(saved) : [];
    }

    function checkPreviousSession() {
        // Check if user has a previous session
        const sessionData = localStorage.getItem('currentSession');
        if (sessionData) {
            try {
                const session = JSON.parse(sessionData);
                if (session.uploadedImage) {
                    // Show option to retry with same image
                    addRetryWithSameImageOption();
                }
            } catch (error) {
                console.error('Failed to parse session data:', error);
            }
        }
    }

    function addRetryWithSameImageOption() {
        const actionsContainer = document.querySelector('.error-actions');
        const retryWithSameBtn = document.createElement('button');
        retryWithSameBtn.className = 'action-btn secondary-btn';
        retryWithSameBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21,15 16,10 5,21"/>
            </svg>
            같은 이미지로 다시 시도
        `;
        
        retryWithSameBtn.addEventListener('click', () => {
            showLoading(retryWithSameBtn, '재분석 중...');
            
            setTimeout(() => {
                hideLoading();
                // Navigate back to analysis
                window.location.href = 'ui_5.html';
            }, 2000);
        });
        
        actionsContainer.insertBefore(retryWithSameBtn, actionsContainer.children[1]);
    }

    function logError(errorType) {
        // Log error for analytics (would be sent to server in real app)
        const errorData = {
            type: errorType,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href,
            sessionId: getSessionId()
        };
        
        // Store locally for now (in real app, send to analytics service)
        const errors = JSON.parse(localStorage.getItem('errorLogs') || '[]');
        errors.push(errorData);
        localStorage.setItem('errorLogs', JSON.stringify(errors.slice(-10))); // Keep last 10 errors
    }

    function getSessionId() {
        let sessionId = localStorage.getItem('sessionId');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('sessionId', sessionId);
        }
        return sessionId;
    }

    // Accessibility enhancements
    function enhanceAccessibility() {
        // Add keyboard navigation
        const buttons = document.querySelectorAll('.action-btn');
        buttons.forEach(button => {
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
            });
        });
        
        // Add screen reader announcements
        const errorTitle = document.querySelector('.error-title');
        if (errorTitle) {
            errorTitle.setAttribute('role', 'alert');
            errorTitle.setAttribute('aria-live', 'polite');
        }
    }

    // Initialize accessibility features
    enhanceAccessibility();
});

// Additional styles for dynamic elements
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    .error-notification {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(-100px);
        background: #FEE2E2;
        color: #DC2626;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        transition: transform 0.3s ease;
        opacity: 0;
        max-width: 400px;
        margin: 0 16px;
    }
    
    .error-notification.show {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .notification-close {
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
        margin-left: auto;
        border-radius: 4px;
        transition: background-color 0.2s ease;
    }
    
    .notification-close:hover {
        background: rgba(220, 38, 38, 0.1);
    }
    
    .similar-styles-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .similar-styles-modal.show {
        opacity: 1;
    }
    
    .modal-content {
        background: white;
        border-radius: 16px;
        padding: 24px;
        max-width: 400px;
        margin: 16px;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    }
    
    .similar-styles-modal.show .modal-content {
        transform: scale(1);
    }
    
    .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
    }
    
    .modal-header h3 {
        font-size: 18px;
        font-weight: 600;
        color: #111827;
    }
    
    .modal-close {
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        transition: background-color 0.2s ease;
    }
    
    .modal-close:hover {
        background: #F3F4F6;
    }
    
    .style-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
        margin: 20px 0;
    }
    
    .style-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 16px;
        border-radius: 12px;
        cursor: pointer;
        transition: background-color 0.2s ease;
    }
    
    .style-item:hover {
        background: #F3F4F6;
    }
    
    .style-preview {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 2px solid #E5E7EB;
    }
    
    .style-preview.lovely {
        background: linear-gradient(135deg, #6679EA, #F09FFF);
    }
    
    .style-preview.chic {
        background: linear-gradient(135deg, #111827, #374151);
    }
    
    .style-preview.vivid {
        background: linear-gradient(135deg, #F59E0B, #EF4444);
    }
    
    .style-item span {
        font-size: 14px;
        font-weight: 500;
        color: #6B7280;
    }
    
    .modal-actions {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
    
    .modal-btn {
        background: #6679EA;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s ease;
    }
    
    .modal-btn:hover {
        background: #5A6BD8;
    }
`;
document.head.appendChild(dynamicStyles);