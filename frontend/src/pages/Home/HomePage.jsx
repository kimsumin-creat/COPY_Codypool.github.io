import React from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css'

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="home-header">
        <div className="container">
          <h1 className="home-title">Codypool</h1>
          <p className="home-subtitle">AI가 추천하는 나만의 코디</p>
        </div>
      </header>
      
      <main className="home-main">
        <div className="container">
          <section className="hero-section">
            <div className="hero-content">
              <h2>스타일링이 어려우신가요?</h2>
              <p>AI가 당신의 취향과 상황에 맞는 완벽한 코디를 추천해드립니다</p>
              <div className="hero-buttons">
                <Link to="/onboarding/step1" className="btn btn-primary">
                  코디 시작하기
                </Link>
                <Link to="/auth" className="btn btn-secondary">
                  로그인
                </Link>
              </div>
            </div>
          </section>
          
          <section className="features-section">
            <h3>서비스 특징</h3>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🎨</div>
                <h4>개인화 추천</h4>
                <p>당신의 취향과 스타일을 분석하여 맞춤형 코디를 제공합니다</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h4>빠른 결과</h4>
                <p>AI가 즉시 분석하여 최적의 코디 조합을 제안합니다</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">💾</div>
                <h4>저장 및 관리</h4>
                <p>마음에 드는 코디를 저장하고 언제든지 확인할 수 있습니다</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default HomePage 