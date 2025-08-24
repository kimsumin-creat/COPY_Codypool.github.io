// DOM Elements
const optionCards = document.querySelectorAll('.option-card');
const uploadBtns = document.querySelectorAll('.upload-btn');
const exampleBtns = document.querySelectorAll('.example-btn');
const recommendBtn = document.getElementById('recommend-btn');
const fileInput = document.getElementById('file-input');
const modal = document.getElementById('example-modal');
const modalClose = document.getElementById('modal-close');
const exampleGrid = document.getElementById('example-grid');

// State
let selectedOption = null;
let selectedImage = null;
let currentOptionType = null;

// Example images data
const exampleImages = {
    swimsuit: [
        { id: 'swim1', src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjBGOUZGIi8+CjxwYXRoIGQ9Ik0yNSAxMDAgQzI1IDc3LjkwOTQgNDIuOTA5NCA2MCA2NSA2MCBINzUgQzg3LjA5MSA2MCAxMDUgNzcuOTA5NCAxMDUgMTAwIEMxMDUgMTIyLjA5MSA4Ny4wOTEgMTQwIDc1IDE0MCBINjUgQzQyLjkwOTQgMTQwIDI1IDEyMi4wOTEgMjUgMTAwWiIgZmlsbD0iIzY2NzlFQSIvPgo8cGF0aCBkPSJNMzAgMTEwIEMzMCAxMDUuNTkyIDMzLjU5MTkgMTAyIDM4IDEwMiBINjYgQzcwLjQwOCAxMDIgNzQgMTA1LjU5MiA3NCAxMTAgTDc0IDEyMCBDNzQgMTI0LjQwOCA3MC40MDggMTI4IDY2IDEyOEgzOCBDMzMuNTkxOSAxMjggMzAgMTI0LjQwOCAzMCAxMjBMMzAgMTEwWiIgZmlsbD0iIzY2NzlFQSIvPgo8L3N2Zz4=', name: '베이지 원피스' },
        { id: 'swim2', src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjBGOUZGIi8+CjxwYXRoIGQ9Ik0yNSAxMDAgQzI1IDc3LjkwOTQgNDIuOTA5NCA2MCA2NSA2MCBINzUgQzg3LjA5MSA2MCAxMDUgNzcuOTA5NCAxMDUgMTAwIEMxMDUgMTIyLjA5MSA4Ny4wOTEgMTQwIDc1IDE0MCBINjUgQzQyLjkwOTQgMTQwIDI1IDEyMi4wOTEgMjUgMTAwWiIgZmlsbD0iI0YwOUZGRiIvPgo8cGF0aCBkPSJNMzAgMTEwIEMzMCAxMDUuNTkyIDMzLjU5MTkgMTAyIDM4IDEwMiBINjYgQzcwLjQwOCAxMDIgNzQgMTA1LjU5MiA3NCAxMTAgTDc0IDEyMCBDNzQgMTI0LjQwOCA3MC40MDggMTI4IDY2IDEyOEgzOCBDMzMuNTkxOSAxMjggMzAgMTI0LjQwOCAzMCAxMjBMMzAgMTEwWiIgZmlsbD0iI0YwOUZGRiIvPgo8L3N2Zz4=', name: '블루 원피스' },
        { id: 'swim3', src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjBGOUZGIi8+CjxwYXRoIGQ9Ik0yNSAxMDAgQzI1IDc3LjkwOTQgNDIuOTA5NCA2MCA2NSA2MCBINzUgQzg3LjA5MSA2MCAxMDUgNzcuOTA5NCAxMDUgMTAwIEMxMDUgMTIyLjA5MSA4Ny4wOTEgMTQwIDc1IDE0MCBINjUgQzQyLjkwOTQgMTQwIDI1IDEyMi4wOTEgMjUgMTAwWiIgZmlsbD0iI0ZGRjAwMCIvPgo8cGF0aCBkPSJNMzAgMTEwIEMzMCAxMDUuNTkyIDMzLjU5MTkgMTAyIDM4IDEwMiBINjYgQzcwLjQwOCAxMDIgNzQgMTA1LjU5MiA3NCAxMTAgTDc0IDEyMCBDNzQgMTI0LjQwOCA3MC40MDggMTI4IDY2IDEyOEgzOCBDMzMuNTkxOSAxMjggMzAgMTI0LjQwOCAzMCAxMjBMMzAgMTEwWiIgZmlsbD0iI0ZGRjAwMCIvPgo8L3N2Zz4=', name: '레드 원피스' }
    ],
    swimcap: [
        { id: 'cap1', src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjBGOUZGIi8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjE1IiBmaWxsPSIjNjY3OUVBIi8+CjxwYXRoIGQ9Ik01MCAyNSBDNTAgMjUgNzAgMjUgNzAgNDAgQzcwIDU1IDUwIDU1IDUwIDU1IEM1MCA1NSAzMCA1NSAzMCA0MCBDMzAgMjUgNTAgMjUgNTAgMjVaIiBmaWxsPSIjNjY3OUVBIi8+Cjwvc3ZnPg==', name: '네이비 수모' },
        { id: 'cap2', src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjBGOUZGIi8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjE1IiBmaWxsPSIjRjA5RkZGIi8+CjxwYXRoIGQ9Ik01MCAyNSBDNTAgMjUgNzAgMjUgNzAgNDAgQzcwIDU1IDUwIDU1IDUwIDU1IEM1MCA1NSAzMCA1NSAzMCA0MCBDMzAgMjUgNTAgMjUgNTAgMjVaIiBmaWxsPSIjRjA5RkZGIi8+Cjwvc3ZnPg==', name: '블루 수모' },
        { id: 'cap3', src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjBGOUZGIi8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjE1IiBmaWxsPSIjRkZGMDAwIi8+CjxwYXRoIGQ9Ik01MCAyNSBDNTAgMjUgNzAgMjUgNzAgNDAgQzcwIDU1IDUwIDU1IDUwIDU1IEM1MCA1NSAzMCA1NSAzMCA0MCBDMzAgMjUgNTAgMjUgNTAgMjVaIiBmaWxsPSIjRkZGMDAwIi8+Cjwvc3ZnPg==', name: '레드 수모' }
    ]
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    updateProgressBar();
});

// Event Listeners
function initializeEventListeners() {
    // Option card selection
    optionCards.forEach(card => {
        card.addEventListener('click', () => selectOption(card));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectOption(card);
            }
        });
    });

    // Upload buttons
    uploadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            handleUpload(btn);
        });
    });

    // Example buttons
    exampleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            handleExample(btn);
        });
    });

    // File input
    fileInput.addEventListener('change', handleFileSelect);

    // Modal
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // CTA button
    recommendBtn.addEventListener('click', handleRecommend);

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);
}

// Option Selection
function selectOption(card) {
    // Remove previous selection
    optionCards.forEach(c => c.classList.remove('selected'));
    
    // Select current card
    card.classList.add('selected');
    selectedOption = card.dataset.option;
    
    // Update CTA button
    updateCTAButton();
}

// Upload Handling
function handleUpload(btn) {
    const card = btn.closest('.option-card');
    selectedOption = card.dataset.option;
    currentOptionType = 'upload';
    
    // Trigger file input
    fileInput.click();
}

// File Selection
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
        showError('이미지 파일만 선택할 수 있습니다.');
        return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        showError('파일 크기는 5MB 이하여야 합니다.');
        return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = function(e) {
        selectedImage = {
            type: 'upload',
            src: e.target.result,
            name: file.name
        };
        
        updateImagePreview();
        updateCTAButton();
        showSuccess('이미지가 선택되었습니다.');
    };
    reader.readAsDataURL(file);
}

// Example Handling
function handleExample(btn) {
    const card = btn.closest('.option-card');
    selectedOption = card.dataset.option;
    currentOptionType = 'example';
    
    // Show modal with example images
    showExampleModal();
}

// Modal Functions
function showExampleModal() {
    // Clear previous content
    exampleGrid.innerHTML = '';
    
    // Add example images
    const images = exampleImages[selectedOption] || [];
    images.forEach(img => {
        const item = document.createElement('div');
        item.className = 'example-item';
        item.dataset.id = img.id;
        
        item.innerHTML = `
            <img src="${img.src}" alt="${img.name}" title="${img.name}">
        `;
        
        item.addEventListener('click', () => selectExampleImage(img));
        exampleGrid.appendChild(item);
    });
    
    // Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function selectExampleImage(image) {
    selectedImage = {
        type: 'example',
        src: image.src,
        name: image.name,
        id: image.id
    };
    
    updateImagePreview();
    updateCTAButton();
    closeModal();
    showSuccess('예시 이미지가 선택되었습니다.');
}

// Image Preview Update
function updateImagePreview() {
    if (!selectedImage) return;
    
    const card = document.querySelector(`[data-option="${selectedOption}"]`);
    const preview = card.querySelector('.option-preview');
    
    if (preview) {
        preview.src = selectedImage.src;
        preview.alt = selectedImage.name;
    }
}

// CTA Button Update
function updateCTAButton() {
    const hasSelection = selectedOption && selectedImage;
    recommendBtn.disabled = !hasSelection;
    
    if (hasSelection) {
        recommendBtn.textContent = '추천 받기';
    } else {
        recommendBtn.textContent = '이미지를 선택해주세요';
    }
}

// Progress Bar Update
function updateProgressBar() {
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        progressFill.style.width = '60%'; // 3/5 = 60%
    }
}

// Recommendation Handling
async function handleRecommend() {
    if (!selectedOption || !selectedImage) {
        showError('이미지를 선택해주세요.');
        return;
    }

    // Show loading state
    recommendBtn.disabled = true;
    recommendBtn.textContent = 'AI 분석 중...';
    recommendBtn.classList.add('loading');

    try {
        // Prepare data for the API
        const requestData = {
            option: selectedOption,
            image: selectedImage.src // base64 data URL
        };

        // Make the API call to a placeholder endpoint
        const response = await fetch('/api/recommend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            // Handle HTTP errors
            const errorData = await response.json().catch(() => ({ message: '서버에서 오류가 발생했습니다.' }));
            throw new Error(errorData.message || '알 수 없는 오류가 발생했습니다.');
        }

        const resultData = await response.json();

        // Store result in localStorage and navigate to the next page
        localStorage.setItem('recommendationResult', JSON.stringify(resultData));
        window.location.href = 'ui_5.html';

    } catch (error) {
        // Handle network errors or errors from the try block
        showError(error.message);

        // Reset button state
        recommendBtn.disabled = false;
        recommendBtn.textContent = '추천 받기';
        recommendBtn.classList.remove('loading');
    }
}

// Keyboard Navigation
function handleKeyboard(event) {
    switch(event.key) {
        case 'Escape':
            if (modal.classList.contains('show')) {
                closeModal();
            }
            break;
        case 'Enter':
            if (event.target.classList.contains('option-card')) {
                selectOption(event.target);
            }
            break;
    }
}

// Utility Functions
function showSuccess(message) {
    // Simple success feedback
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
    // Simple error feedback
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
    optionCards.forEach(card => {
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `${card.querySelector('.option-name').textContent} 선택`);
    });
    
    // Add focus management
    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            const focusableElements = modal.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
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