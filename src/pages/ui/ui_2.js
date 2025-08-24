class TutorialManager {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 3;
    this.isAnimating = false;
    this.initializeElements();
    this.bindEvents();
    this.updateUI();
  }

  initializeElements() {
    this.cardsContainer = document.querySelector('.cards-container');
    this.cards = document.querySelectorAll('.tutorial-card');
    this.indicators = document.querySelectorAll('.indicator');
    this.prevButton = document.getElementById('prev-button');
    this.nextButton = document.getElementById('next-button');
    this.ctaButton = document.getElementById('cta-button');
  }

  bindEvents() {
    // Navigation buttons
    this.prevButton.addEventListener('click', () => this.previousStep());
    this.nextButton.addEventListener('click', () => this.nextStep());
    
    // CTA button
    this.ctaButton.addEventListener('click', () => this.startTutorial());
    
    // Step indicators
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goToStep(index + 1));
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    
    // Touch/swipe support for mobile
    this.initializeTouchSupport();
  }

  handleKeyboard(e) {
    switch(e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        this.previousStep();
        break;
      case 'ArrowRight':
        e.preventDefault();
        this.nextStep();
        break;
      case 'Enter':
        if (this.currentStep === this.totalSteps) {
          this.startTutorial();
        } else {
          this.nextStep();
        }
        break;
    }
  }

  initializeTouchSupport() {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    this.cardsContainer.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });

    this.cardsContainer.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      endY = e.changedTouches[0].clientY;
      this.handleSwipe(startX, startY, endX, endY);
    });
  }

  handleSwipe(startX, startY, endX, endY) {
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const minSwipeDistance = 50;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        this.previousStep();
      } else {
        this.nextStep();
      }
    }
  }

  nextStep() {
    if (this.currentStep < this.totalSteps && !this.isAnimating) {
      this.goToStep(this.currentStep + 1);
    }
  }

  previousStep() {
    if (this.currentStep > 1 && !this.isAnimating) {
      this.goToStep(this.currentStep - 1);
    }
  }

  goToStep(step) {
    if (this.isAnimating || step < 1 || step > this.totalSteps) return;
    
    this.isAnimating = true;
    this.currentStep = step;
    
    this.updateCards();
    this.updateIndicators();
    this.updateNavigation();
    this.updateCTAButton();
    
    setTimeout(() => {
      this.isAnimating = false;
    }, 300);
  }

  updateCards() {
    this.cards.forEach((card, index) => {
      const step = index + 1;
      if (step === this.currentStep) {
        card.classList.add('active');
        card.style.transform = 'translateX(0) scale(1)';
      } else {
        card.classList.remove('active');
        const offset = (step - this.currentStep) * 100;
        card.style.transform = `translateX(${offset}%) scale(0.9)`;
      }
    });
  }

  updateIndicators() {
    this.indicators.forEach((indicator, index) => {
      const step = index + 1;
      if (step === this.currentStep) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }

  updateNavigation() {
    this.prevButton.disabled = this.currentStep === 1;
    this.nextButton.disabled = this.currentStep === this.totalSteps;
  }

  updateCTAButton() {
    if (this.currentStep === this.totalSteps) {
      this.ctaButton.style.display = 'flex';
      this.ctaButton.querySelector('.button-text').textContent = 'AI에게 내 스타일 물어보기';
    } else {
      this.ctaButton.style.display = 'none';
    }
  }

  startTutorial() {
    // Show loading state
    this.ctaButton.disabled = true;
    this.ctaButton.querySelector('.button-text').textContent = '준비 중...';
    this.ctaButton.querySelector('.button-icon').textContent = '⏳';
    
    // Simulate loading
    setTimeout(() => {
      // Navigate to next page (onboarding-auth-profile)
      this.navigateToNextPage();
    }, 1500);
  }

  navigateToNextPage() {
    // Navigate to the next onboarding step
    window.location.href = 'ui_3.html';
  }

  showSuccessMessage() {
    this.ctaButton.disabled = false;
    this.ctaButton.querySelector('.button-text').textContent = '시작!';
    this.ctaButton.querySelector('.button-icon').textContent = '✅';
    this.ctaButton.style.background = 'var(--color-success-500)';
    
    // Reset after 2 seconds
    setTimeout(() => {
      this.ctaButton.querySelector('.button-text').textContent = 'AI에게 내 스타일 물어보기';
      this.ctaButton.querySelector('.button-icon').textContent = '→';
      this.ctaButton.style.background = 'var(--color-primary-600)';
    }, 2000);
  }

  updateUI() {
    this.updateCards();
    this.updateIndicators();
    this.updateNavigation();
    this.updateCTAButton();
  }
}

// Utility function for debouncing
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const tutorial = new TutorialManager();
  
  // Add analytics tracking
  const trackEvent = debounce((eventName, properties = {}) => {
    console.log('Analytics Event:', eventName, properties);
    // In a real application, this would send data to analytics service
  }, 100);

  // Track page view
  trackEvent('tutorial_page_view', {
    step: tutorial.currentStep,
    totalSteps: tutorial.totalSteps
  });

  // Track step changes
  const originalGoToStep = tutorial.goToStep.bind(tutorial);
  tutorial.goToStep = function(step) {
    originalGoToStep(step);
    trackEvent('tutorial_step_change', {
      fromStep: tutorial.currentStep,
      toStep: step
    });
  };

  // Track CTA clicks
  tutorial.ctaButton.addEventListener('click', () => {
    trackEvent('tutorial_cta_click', {
      step: tutorial.currentStep,
      buttonText: tutorial.ctaButton.querySelector('.button-text').textContent
    });
  });
});

// Add smooth scrolling for better UX
document.addEventListener('DOMContentLoaded', () => {
  const smoothScroll = (target) => {
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  };

  // Auto-scroll to active card on mobile
  const cardsContainer = document.querySelector('.cards-container');
  if (cardsContainer) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('active')) {
          smoothScroll(entry.target);
        }
      });
    });

    document.querySelectorAll('.tutorial-card').forEach(card => {
      observer.observe(card);
    });
  }
}); 