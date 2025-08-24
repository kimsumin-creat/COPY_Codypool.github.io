import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './OnboardingStep.css'

const Step4Result = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [recommendations, setRecommendations] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    // AI 분석 시뮬레이션
    setTimeout(() => {
      setRecommendations([
        {
          id: 1,
          title: '캐주얼 데일리 룩',
          description: '편안하면서도 스타일리시한 일상 코디',
          image: 'https://via.placeholder.com/200x300/667eea/ffffff?text=캐주얼',
          tags: ['캐주얼', '데일리', '편안함']
        },
        {
          id: 2,
          title: '미니멀 베이직',
          description: '깔끔하고 심플한 베이직 스타일',
          image: 'https://via.placeholder.com/200x300/764ba2/ffffff?text=미니멀',
          tags: ['미니멀', '베이직', '심플']
        },
        {
          id: 3,
          title: '스트릿 패션',
          description: '트렌디한 스트릿 패션 스타일',
          image: 'https://via.placeholder.com/200x300/28a745/ffffff?text=스트릿',
          tags: ['스트릿', '트렌디', '패션']
        }
      ])
      setIsLoading(false)
    }, 3000)
  }, [])

  const handleSave = (recommendationId) => {
    // TODO: 추천 코디 저장 API 호출
    console.log('Saving recommendation:', recommendationId)
    navigate('/onboarding/step5')
  }

  if (isLoading) {
    return (
      <div className="onboarding-step">
        <div className="step-container">
          <div className="step-header">
            <div className="step-indicator">
              <span className="step-number">4</span>
              <span className="step-text">AI 분석</span>
            </div>
            <h1>AI가 분석 중입니다...</h1>
            <p>잠시만 기다려주세요</p>
          </div>

          <div className="step-content">
            <div className="loading-section">
              <div className="loading-spinner"></div>
              <p>당신의 스타일을 분석하고 있습니다</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="onboarding-step">
      <div className="step-container">
        <div className="step-header">
          <div className="step-indicator">
            <span className="step-number">4</span>
            <span className="step-text">추천 결과</span>
          </div>
          <h1>AI가 추천하는 코디입니다</h1>
          <p>마음에 드는 코디를 선택해주세요</p>
        </div>

        <div className="step-content">
          <div className="recommendations-grid">
            {recommendations.map((recommendation) => (
              <div key={recommendation.id} className="recommendation-card">
                <img 
                  src={recommendation.image} 
                  alt={recommendation.title}
                  className="recommendation-image"
                />
                <div className="recommendation-content">
                  <h3>{recommendation.title}</h3>
                  <p>{recommendation.description}</p>
                  <div className="recommendation-tags">
                    {recommendation.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleSave(recommendation.id)}
                  >
                    이 코디 저장하기
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="step-footer">
          <Link to="/onboarding/step3" className="btn btn-secondary">
            다시 선택하기
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Step4Result 