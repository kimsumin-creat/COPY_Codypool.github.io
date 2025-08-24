import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './OnboardingStep.css'

const Step5Success = () => {
  const navigate = useNavigate()

  const handleGoToDashboard = () => {
    navigate('/')
  }

  const handleGetMoreRecommendations = () => {
    navigate('/recommendation')
  }

  return (
    <div className="onboarding-step">
      <div className="step-container">
        <div className="step-header">
          <div className="step-indicator">
            <span className="step-number">5</span>
            <span className="step-text">완료</span>
          </div>
          <h1>코디가 성공적으로 저장되었습니다! 🎉</h1>
          <p>이제 당신만의 스타일을 시작해보세요</p>
        </div>

        <div className="step-content">
          <div className="success-section">
            <div className="success-icon">✅</div>
            <div className="success-message">
              <h3>첫 번째 코디 저장 완료</h3>
              <p>마이페이지에서 저장된 코디를 확인할 수 있습니다</p>
            </div>
          </div>

          <div className="next-actions">
            <div className="action-card">
              <div className="action-icon">🏠</div>
              <h4>대시보드로 이동</h4>
              <p>홈 화면에서 다양한 기능을 확인해보세요</p>
              <button 
                className="btn btn-primary"
                onClick={handleGoToDashboard}
              >
                대시보드 가기
              </button>
            </div>

            <div className="action-card">
              <div className="action-icon">🎯</div>
              <h4>더 많은 추천 받기</h4>
              <p>다른 스타일의 코디도 추천받아보세요</p>
              <button 
                className="btn btn-secondary"
                onClick={handleGetMoreRecommendations}
              >
                더 많은 추천
              </button>
            </div>
          </div>
        </div>

        <div className="step-footer">
          <Link to="/mypage" className="btn btn-secondary">
            마이페이지 가기
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Step5Success 