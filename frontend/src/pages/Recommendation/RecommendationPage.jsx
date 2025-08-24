import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './RecommendationPage.css'

const RecommendationPage = () => {
  const [recommendations, setRecommendations] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // AI 추천 시뮬레이션
    setTimeout(() => {
      setRecommendations([
        {
          id: 1,
          title: '봄날 데이트 룩',
          description: '따뜻한 봄날에 어울리는 로맨틱한 코디',
          image: 'https://via.placeholder.com/300x400/667eea/ffffff?text=봄날+데이트',
          tags: ['데이트', '봄', '로맨틱'],
          saved: false
        },
        {
          id: 2,
          title: '오피스 캐주얼',
          description: '편안하면서도 깔끔한 오피스 룩',
          image: 'https://via.placeholder.com/300x400/764ba2/ffffff?text=오피스+캐주얼',
          tags: ['오피스', '캐주얼', '깔끔'],
          saved: false
        },
        {
          id: 3,
          title: '주말 스트릿',
          description: '트렌디한 주말 스트릿 패션',
          image: 'https://via.placeholder.com/300x400/28a745/ffffff?text=주말+스트릿',
          tags: ['스트릿', '트렌디', '주말'],
          saved: false
        }
      ])
      setIsLoading(false)
    }, 2000)
  }, [])

  const handleSave = (recommendationId) => {
    setRecommendations(prev => 
      prev.map(rec => 
        rec.id === recommendationId 
          ? { ...rec, saved: !rec.saved }
          : rec
      )
    )
  }

  if (isLoading) {
    return (
      <div className="recommendation-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h2>AI가 새로운 코디를 추천하고 있습니다...</h2>
          <p>잠시만 기다려주세요</p>
        </div>
      </div>
    )
  }

  return (
    <div className="recommendation-page">
      <div className="recommendation-header">
        <div className="container">
          <h1>AI 추천 코디</h1>
          <p>당신을 위한 맞춤형 스타일을 확인해보세요</p>
        </div>
      </div>

      <div className="recommendation-content">
        <div className="container">
          <div className="recommendations-grid">
            {recommendations.map((recommendation) => (
              <div key={recommendation.id} className="recommendation-card">
                <div className="card-image">
                  <img 
                    src={recommendation.image} 
                    alt={recommendation.title}
                  />
                  <button 
                    className={`save-button ${recommendation.saved ? 'saved' : ''}`}
                    onClick={() => handleSave(recommendation.id)}
                  >
                    {recommendation.saved ? '❤️' : '🤍'}
                  </button>
                </div>
                <div className="card-content">
                  <h3>{recommendation.title}</h3>
                  <p>{recommendation.description}</p>
                  <div className="tags">
                    {recommendation.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="action-buttons">
            <Link to="/onboarding/step3" className="btn btn-secondary">
              새로운 추천 받기
            </Link>
            <Link to="/mypage/saved" className="btn btn-primary">
              저장된 코디 보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecommendationPage 