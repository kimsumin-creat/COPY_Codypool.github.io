// Empty Saved Codies Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const startCodyBtn = document.getElementById('start-cody-btn');
    const previewCards = document.querySelectorAll('.preview-card');

    // Initialize page
    initializePage();

    // Event listeners
    startCodyBtn.addEventListener('click', handleStartCody);
    
    previewCards.forEach(card => {
        card.addEventListener('click', handlePreviewClick);
    });

    // Functions
    function initializePage() {
        // Check if user is truly new or just hasn't saved anything
        checkUserStatus();
        
        // Add entrance animations
        animateEntrance();
        
        // Track page view
        trackPageView('empty_saved_page');
    }

    function animateEntrance() {
        const elements = [
            '.empty-illustration',
            '.empty-message',
            '.empty-actions',
            '.preview-section',
            '.how-it-works'
        ];
        
        elements.forEach((selector, index) => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }

    function handleStartCody() {
        // Show loading state
        showLoading(startCodyBtn, '시작하는 중...');
        
        // Track user action
        trackAction('start_cody_clicked');
        
        // Simulate loading and redirect
        setTimeout(() => {
            // Check if user has completed onboarding
            const hasCompletedOnboarding = localStorage.getItem('onboardingCompleted');
            
            if (hasCompletedOnboarding) {
                // Go directly to image selection
                window.location.href = 'ui_4.html';
            } else {
                // Start from tutorial
                window.location.href = 'ui_2.html';
            }
        }, 1000);
    }

    function handlePreviewClick(event) {
        const card = event.currentTarget;
        const style = getStyleFromCard(card);
        
        // Add click animation
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
        
        // Show style detail modal
        showStyleDetailModal(style);
        
        // Track style interest
        trackAction('style_preview_clicked', { style });
    }

    function getStyleFromCard(card) {
        const title = card.querySelector('h4').textContent;
        const description = card.querySelector('p').textContent;
        
        const styleMap = {
            '러블리 스타일': {
                name: '러블리',
                description: description,
                colors: ['#FFB6C1', '#FFC0CB', '#FFCCCB'],
                tags: ['cute', 'lovely', 'sweet'],
                characteristics: ['귀여운 디자인', '밝은 색상', '로맨틱한 느낌']
            },
            '시크 스타일': {
                name: '시크',
                description: description,
                colors: ['#2F2F2F', '#696969', '#A9A9A9'],
                tags: ['chic', 'sophisticated', 'elegant'],
                characteristics: ['모던한 디자인', '차분한 색상', '세련된 느낌']
            },
            '비비드 스타일': {
                name: '비비드',
                description: description,
                colors: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
                tags: ['vivid', 'bright', 'energetic'],
                characteristics: ['화사한 색상', '활기찬 디자인', '에너지틱한 느낌']
            }
        };
        
        return styleMap[title] || styleMap['러블리 스타일'];
    }

    function showStyleDetailModal(style) {
        const modal = document.createElement('div');
        modal.className = 'style-detail-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${style.name} 스타일</h3>
                    <button class="modal-close" onclick="this.closest('.style-detail-modal').remove()">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>
                <div class="modal-body">
                    <p class="style-description">${style.description}</p>
                    
                    <div class="style-colors">
                        <h4>대표 컬러</h4>
                        <div class="color-palette">
                            ${style.colors.map(color => `
                                <div class="color-item" style="background-color: ${color}"></div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="style-characteristics">
                        <h4>스타일 특징</h4>
                        <ul>
                            ${style.characteristics.map(char => `<li>${char}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="modal-btn secondary" onclick="this.closest('.style-detail-modal').remove()">닫기</button>
                    <button class="modal-btn primary" onclick="selectPreferredStyle('${style.name.toLowerCase()}')">이 스타일로 시작하기</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Show modal with animation
        setTimeout(() => {
            modal.classList.add('show');
        }, 100);
    }

    function selectPreferredStyle(styleName) {
        // Store preferred style
        localStorage.setItem('preferredStyle', styleName);
        
        // Close modal
        const modal = document.querySelector('.style-detail-modal');
        if (modal) {
            modal.remove();
        }
        
        // Track style selection
        trackAction('preferred_style_selected', { style: styleName });
        
        // Show loading and redirect
        showLoading(startCodyBtn, '맞춤 추천 준비 중...');
        
        setTimeout(() => {
            // Check onboarding status
            const hasCompletedOnboarding = localStorage.getItem('onboardingCompleted');
            
            if (hasCompletedOnboarding) {
                window.location.href = `ui_4.html?preferred=${styleName}`;
            } else {
                window.location.href = `ui_2.html?preferred=${styleName}`;
            }
        }, 1500);
    }

    function checkUserStatus() {
        const userProfile = localStorage.getItem('userProfile');
        const savedStyles = localStorage.getItem('savedStyles');
        const sessionHistory = localStorage.getItem('sessionHistory');
        
        let isNewUser = !userProfile;
        let hasUsedService = sessionHistory && JSON.parse(sessionHistory).length > 0;
        
        // Update page content based on user status
        if (hasUsedService && !savedStyles) {
            updateForReturningUser();
        } else if (isNewUser) {
            updateForNewUser();
        }
    }

    function updateForReturningUser() {
        const title = document.querySelector('.empty-title');
        const description = document.querySelector('.empty-description');
        
        title.textContent = '저장한 코디가 아직 없어요';
        description.innerHTML = `
            <p>이전에 받은 추천 중 마음에 드는 스타일이 있었나요?</p>
            <p>코디를 저장하면 언제든 다시 볼 수 있어요.</p>
        `;
        
        // Add "Recent Recommendations" button
        const actionsContainer = document.querySelector('.empty-actions');
        const recentBtn = document.createElement('button');
        recentBtn.className = 'action-btn secondary-btn';
        recentBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="1,4 1,10 7,10"/>
                <polyline points="23,20 23,14 17,14"/>
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
            </svg>
            최근 추천 보기
        `;
        
        recentBtn.addEventListener('click', () => {
            // Navigate to recent recommendations (would be implemented)
            window.location.href = 'ui_5.html?recent=true';
        });
        
        actionsContainer.appendChild(recentBtn);
    }

    function updateForNewUser() {
        // Add welcome message animation
        const title = document.querySelector('.empty-title');
        const description = document.querySelector('.empty-description');
        
        // Add pulsing animation to CTA button
        startCodyBtn.classList.add('pulse-animation');
    }

    function showLoading(button, text) {
        button.classList.add('loading');
        button.disabled = true;
        button.dataset.originalText = button.textContent;
        button.innerHTML = `
            <span class="loading-spinner"></span>
            ${text}
        `;
    }

    function trackPageView(pageName) {
        const pageData = {
            page: pageName,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            sessionId: getSessionId()
        };
        
        // Store page view (in real app, send to analytics)
        const pageViews = JSON.parse(localStorage.getItem('pageViews') || '[]');
        pageViews.push(pageData);
        localStorage.setItem('pageViews', JSON.stringify(pageViews.slice(-20)));
    }

    function trackAction(actionName, data = {}) {
        const actionData = {
            action: actionName,
            data: data,
            timestamp: new Date().toISOString(),
            page: 'empty_saved_page',
            sessionId: getSessionId()
        };
        
        // Store action (in real app, send to analytics)
        const actions = JSON.parse(localStorage.getItem('userActions') || '[]');
        actions.push(actionData);
        localStorage.setItem('userActions', JSON.stringify(actions.slice(-50)));
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
        // Add keyboard navigation for preview cards
        previewCards.forEach(card => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `${card.querySelector('h4').textContent} 미리보기`);
            
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });
        
        // Add ARIA labels for steps
        const stepItems = document.querySelectorAll('.step-item');
        stepItems.forEach((step, index) => {
            step.setAttribute('aria-label', `단계 ${index + 1}: ${step.querySelector('h4').textContent}`);
        });
    }

    // Initialize accessibility features
    enhanceAccessibility();

    // Make selectPreferredStyle globally available
    window.selectPreferredStyle = selectPreferredStyle;
});

// Additional styles for dynamic elements
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    .style-detail-modal {
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
        padding: 16px;
    }
    
    .style-detail-modal.show {
        opacity: 1;
    }
    
    .style-detail-modal .modal-content {
        background: white;
        border-radius: 16px;
        padding: 24px;
        max-width: 400px;
        width: 100%;
        max-height: 80vh;
        overflow-y: auto;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    }
    
    .style-detail-modal.show .modal-content {
        transform: scale(1);
    }
    
    .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        padding-bottom: 12px;
        border-bottom: 1px solid #E5E7EB;
    }
    
    .modal-header h3 {
        font-size: 20px;
        font-weight: 700;
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
    
    .style-description {
        font-size: 16px;
        color: #6B7280;
        margin-bottom: 20px;
        line-height: 1.6;
    }
    
    .style-colors,
    .style-characteristics {
        margin-bottom: 20px;
    }
    
    .style-colors h4,
    .style-characteristics h4 {
        font-size: 16px;
        font-weight: 600;
        color: #111827;
        margin-bottom: 12px;
    }
    
    .color-palette {
        display: flex;
        gap: 8px;
    }
    
    .color-item {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 2px solid #E5E7EB;
    }
    
    .style-characteristics ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    
    .style-characteristics li {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 0;
        font-size: 14px;
        color: #6B7280;
    }
    
    .style-characteristics li::before {
        content: '•';
        color: #6679EA;
        font-weight: bold;
        font-size: 16px;
    }
    
    .modal-actions {
        display: flex;
        gap: 12px;
        margin-top: 24px;
        padding-top: 20px;
        border-top: 1px solid #E5E7EB;
    }
    
    .modal-btn {
        flex: 1;
        padding: 12px 16px;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        border: none;
        font-size: 14px;
    }
    
    .modal-btn.secondary {
        background: #F3F4F6;
        color: #6B7280;
    }
    
    .modal-btn.secondary:hover {
        background: #E5E7EB;
    }
    
    .modal-btn.primary {
        background: #6679EA;
        color: white;
    }
    
    .modal-btn.primary:hover {
        background: #5A6BD8;
    }
    
    .secondary-btn {
        background: white;
        color: #6B7280;
        border: 2px solid #E5E7EB;
        margin-top: 12px;
    }
    
    .secondary-btn:hover {
        background: #F9FAFB;
        border-color: #6679EA;
        color: #6679EA;
    }
    
    .pulse-animation {
        animation: pulse 2s ease-in-out infinite;
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .loading-spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-right: 8px;
    }
`;
document.head.appendChild(dynamicStyles);