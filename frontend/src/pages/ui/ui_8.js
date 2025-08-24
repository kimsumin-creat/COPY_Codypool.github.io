// Saved Codies Page JavaScript (ui_8.js)
document.addEventListener('DOMContentLoaded', function() {
    // Basic functionality for the saved codies page
    console.log('Saved Codies Page loaded');
    
    // Initialize any interactive elements if needed
    initializeFilterTabs();
    initializeSearchBox();
    initializeCodyCards();
});

function initializeFilterTabs() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Filter codies based on selected tab
            const filter = this.dataset.filter;
            filterCodies(filter);
        });
    });
}

function initializeSearchBox() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            searchCodies(searchTerm);
        });
    }
}

function initializeCodyCards() {
    const codyCards = document.querySelectorAll('.cody-card');
    codyCards.forEach(card => {
        const favoriteBtn = card.querySelector('.favorite-btn');
        const recommendBtn = card.querySelector('.recommend-btn');
        const deleteBtn = card.querySelector('.delete-btn');
        
        if (favoriteBtn) {
            favoriteBtn.addEventListener('click', function() {
                toggleFavorite(this);
            });
        }
        
        if (recommendBtn) {
            recommendBtn.addEventListener('click', function() {
                findSimilarStyles(card);
            });
        }
        
        if (deleteBtn) {
            deleteBtn.addEventListener('click', function() {
                showDeleteModal(card);
            });
        }
    });
}

function filterCodies(filter) {
    const codyCards = document.querySelectorAll('.cody-card');
    
    codyCards.forEach(card => {
        const cardCategory = card.dataset.category;
        const isFavorite = card.querySelector('.favorite-btn').dataset.favorite === 'true';
        
        let shouldShow = false;
        
        switch(filter) {
            case 'all':
                shouldShow = true;
                break;
            case 'recent':
                shouldShow = cardCategory === 'recent';
                break;
            case 'favorite':
                shouldShow = isFavorite;
                break;
        }
        
        if (shouldShow) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function searchCodies(searchTerm) {
    const codyCards = document.querySelectorAll('.cody-card');
    
    codyCards.forEach(card => {
        const codyName = card.querySelector('.cody-name').textContent.toLowerCase();
        const codyTags = card.querySelector('.cody-tags').textContent.toLowerCase();
        
        if (codyName.includes(searchTerm) || codyTags.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function toggleFavorite(button) {
    const isFavorite = button.dataset.favorite === 'true';
    const newState = !isFavorite;
    
    button.dataset.favorite = newState.toString();
    
    if (newState) {
        button.querySelector('svg').setAttribute('fill', 'currentColor');
    } else {
        button.querySelector('svg').setAttribute('fill', 'none');
    }
    
    // Update UI feedback
    const message = newState ? '즐겨찾기에 추가되었습니다' : '즐겨찾기에서 제거되었습니다';
    showToast(message);
}

function findSimilarStyles(card) {
    const codyName = card.querySelector('.cody-name').textContent;
    showToast(`${codyName}와 비슷한 스타일을 찾고 있습니다...`);
    
    // Simulate finding similar styles
    setTimeout(() => {
        window.location.href = 'ui_5.html?similar=true';
    }, 1500);
}

function showDeleteModal(card) {
    const modal = document.getElementById('delete-modal');
    if (modal) {
        modal.style.display = 'flex';
        modal.dataset.targetCard = card.dataset.id || Math.random().toString(36).substr(2, 9);
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10B981;
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Add CSS animation for toast
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