// Profile Edit Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('profileEditForm');
    const bodyTypeCards = document.querySelectorAll('.body-type-grid .option-card');
    const skinToneCards = document.querySelectorAll('.skin-tone-grid .option-card');
    const nicknameInput = document.getElementById('nickname');
    const successToast = document.getElementById('success-toast');

    // Form data state
    let formData = {
        nickname: '스타일러',
        bodyType: 'medium',
        skinTone: 'medium'
    };

    // Initialize form
    initializeForm();

    // Event listeners
    form.addEventListener('submit', handleFormSubmit);
    nicknameInput.addEventListener('input', handleNicknameChange);
    
    bodyTypeCards.forEach(card => {
        card.addEventListener('click', () => handleBodyTypeSelect(card));
    });
    
    skinToneCards.forEach(card => {
        card.addEventListener('click', () => handleSkinToneSelect(card));
    });

    // Functions
    function initializeForm() {
        // Set initial nickname
        nicknameInput.value = formData.nickname;
        
        // Set initial body type
        bodyTypeCards.forEach(card => {
            if (card.dataset.value === formData.bodyType) {
                card.classList.add('active');
            }
        });
        
        // Set initial skin tone
        skinToneCards.forEach(card => {
            if (card.dataset.value === formData.skinTone) {
                card.classList.add('active');
            }
        });
    }

    function handleNicknameChange(e) {
        const value = e.target.value;
        
        // Validate nickname length
        if (value.length > 10) {
            e.target.value = value.substring(0, 10);
        }
        
        formData.nickname = e.target.value;
        validateForm();
    }

    function handleBodyTypeSelect(selectedCard) {
        // Remove active class from all cards
        bodyTypeCards.forEach(card => {
            card.classList.remove('active');
        });
        
        // Add active class to selected card
        selectedCard.classList.add('active');
        
        // Update form data
        formData.bodyType = selectedCard.dataset.value;
        
        // Add animation
        selectedCard.style.transform = 'scale(0.95)';
        setTimeout(() => {
            selectedCard.style.transform = '';
        }, 150);
        
        validateForm();
    }

    function handleSkinToneSelect(selectedCard) {
        // Remove active class from all cards
        skinToneCards.forEach(card => {
            card.classList.remove('active');
        });
        
        // Add active class to selected card
        selectedCard.classList.add('active');
        
        // Update form data
        formData.skinTone = selectedCard.dataset.value;
        
        // Add animation
        selectedCard.style.transform = 'scale(0.95)';
        setTimeout(() => {
            selectedCard.style.transform = '';
        }, 150);
        
        validateForm();
    }

    function validateForm() {
        const saveBtn = document.querySelector('.save-btn');
        const isValid = formData.nickname.trim().length > 0;
        
        if (isValid) {
            saveBtn.disabled = false;
            saveBtn.style.opacity = '1';
        } else {
            saveBtn.disabled = true;
            saveBtn.style.opacity = '0.5';
        }
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Validate form
        if (!formData.nickname.trim()) {
            showError('닉네임을 입력해주세요.');
            return;
        }
        
        // Simulate API call
        const saveBtn = document.querySelector('.save-btn');
        const originalText = saveBtn.textContent;
        
        saveBtn.disabled = true;
        saveBtn.textContent = '저장 중...';
        
        // Simulate API delay
        setTimeout(() => {
            // Reset button
            saveBtn.disabled = false;
            saveBtn.textContent = originalText;
            
            // Show success message
            showSuccessToast();
            
            // Update local storage (simulate data persistence)
            localStorage.setItem('userProfile', JSON.stringify(formData));
            
            // Navigate back after delay
            setTimeout(() => {
                window.history.back();
            }, 2000);
            
        }, 1500);
    }

    function showSuccessToast() {
        successToast.classList.add('show');
        
        setTimeout(() => {
            successToast.classList.remove('show');
        }, 3000);
    }

    function showError(message) {
        // Create error toast
        const errorToast = document.createElement('div');
        errorToast.className = 'toast error';
        errorToast.innerHTML = `
            <div class="toast-content">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(errorToast);
        
        // Show toast
        setTimeout(() => {
            errorToast.classList.add('show');
        }, 100);
        
        // Hide and remove toast
        setTimeout(() => {
            errorToast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(errorToast);
            }, 300);
        }, 3000);
    }

    // Accessibility enhancements
    function enhanceAccessibility() {
        // Add keyboard navigation for cards
        const allCards = [...bodyTypeCards, ...skinToneCards];
        
        allCards.forEach(card => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });
        
        // Add ARIA labels
        bodyTypeCards.forEach((card, index) => {
            const bodyTypes = ['슬림형', '중간형', '탄탄형', '근육형'];
            card.setAttribute('aria-label', `체형 선택: ${bodyTypes[index]}`);
        });
        
        skinToneCards.forEach((card, index) => {
            const skinTones = ['밝은톤', '중간톤', '어두운톤'];
            card.setAttribute('aria-label', `피부톤 선택: ${skinTones[index]}`);
        });
    }

    // Form data management
    function loadSavedData() {
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
            try {
                const profile = JSON.parse(savedProfile);
                formData = { ...formData, ...profile };
                initializeForm();
            } catch (error) {
                console.error('Failed to load saved profile:', error);
            }
        }
    }

    // Initialize accessibility and load saved data
    enhanceAccessibility();
    loadSavedData();
    validateForm();

    // Add form change tracking
    let hasChanges = false;
    const originalData = { ...formData };
    
    function trackChanges() {
        hasChanges = JSON.stringify(formData) !== JSON.stringify(originalData);
        
        // Update save button text if there are changes
        const saveBtn = document.querySelector('.save-btn');
        if (hasChanges) {
            saveBtn.textContent = '변경사항 저장하기';
        } else {
            saveBtn.textContent = '정보 수정하기';
        }
    }
    
    // Track changes on form inputs
    form.addEventListener('input', trackChanges);
    form.addEventListener('change', trackChanges);
    
    // Warning before leaving if there are unsaved changes
    window.addEventListener('beforeunload', (e) => {
        if (hasChanges) {
            e.preventDefault();
            e.returnValue = '변경사항이 저장되지 않았습니다. 정말 나가시겠습니까?';
        }
    });
});

// Additional styles for error toast
const errorToastStyle = document.createElement('style');
errorToastStyle.textContent = `
    .toast.error {
        background: #EF4444;
    }
`;
document.head.appendChild(errorToastStyle);