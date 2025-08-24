import React from 'react'
import { Link } from 'react-router-dom'
import './OnboardingStep.css'

const Step1Intro = () => {
  return (
    <div className="onboarding-step">
      <div className="step-container">
        <div className="step-header">
          <div className="step-indicator">
            <span className="step-number">1</span>
            <span className="step-text">튜토리얼</span>
          </div>
          <h1>코디풀에 오신 것을 환영합니다!</h1>
          <p>AI가 당신만의 완벽한 코디를 추천해드릴게요</p>
        </div>

        <div className="step-content">
          <div className="tutorial-section">
            <div className="tutorial-item">
              <div className="tutorial-icon">👤</div>
              <h3>1. 프로필 설정</h3>
              <p>나이, 성별, 스타일 선호도를 알려주세요</p>
            </div>

            <div className="tutorial-item">
              <div className="tutorial-icon">📸</div>
              <h3>2. 이미지 업로드</h3>
              <p>참고하고 싶은 이미지를 업로드해주세요</p>
            </div>

            <div className="tutorial-item">
              <div className="tutorial-icon">🎯</div>
              <h3>3. AI 추천</h3>
              <p>AI가 분석하여 맞춤형 코디를 제안합니다</p>
            </div>

            <div className="tutorial-item">
              <div className="tutorial-icon">💾</div>
              <h3>4. 저장 및 관리</h3>
              <p>마음에 드는 코디를 저장하고 관리하세요</p>
            </div>
          </div>
        </div>

        <div className="step-footer">
          <Link to="/onboarding/step2" className="btn btn-primary">
            다음 단계로
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Step1Intro 