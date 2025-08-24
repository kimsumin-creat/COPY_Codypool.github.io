import React from 'react'
import { Link } from 'react-router-dom'
import './MyPage.css'

const MyPageMain = () => {
  const userInfo = {
    nickname: '스타일러',
    email: 'user@example.com',
    savedCount: 5,
    totalRecommendations: 12
  }

  return (
    <div className="mypage">
      <div className="mypage-header">
        <div className="container">
          <h1>마이페이지</h1>
          <p>내 정보와 저장된 코디를 관리하세요</p>
        </div>
      </div>

      <div className="mypage-content">
        <div className="container">
          <div className="user-profile">
            <div className="profile-avatar">
              <div className="avatar-placeholder">👤</div>
            </div>
            <div className="profile-info">
              <h2>{userInfo.nickname}</h2>
              <p>{userInfo.email}</p>
            </div>
            <Link to="/mypage/edit" className="edit-profile-btn">
              프로필 수정
            </Link>
          </div>

          <div className="stats-section">
            <div className="stat-card">
              <div className="stat-icon">💾</div>
              <div className="stat-content">
                <h3>저장된 코디</h3>
                <p className="stat-number">{userInfo.savedCount}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-content">
                <h3>받은 추천</h3>
                <p className="stat-number">{userInfo.totalRecommendations}</p>
              </div>
            </div>
          </div>

          <div className="menu-section">
            <h3>메뉴</h3>
            <div className="menu-grid">
              <Link to="/mypage/saved" className="menu-item">
                <div className="menu-icon">💾</div>
                <div className="menu-content">
                  <h4>저장된 코디</h4>
                  <p>저장한 코디들을 확인하고 관리하세요</p>
                </div>
              </Link>
              
              <Link to="/recommendation" className="menu-item">
                <div className="menu-icon">🎯</div>
                <div className="menu-content">
                  <h4>새로운 추천</h4>
                  <p>AI가 추천하는 새로운 코디를 확인하세요</p>
                </div>
              </Link>
              
              <Link to="/onboarding/step3" className="menu-item">
                <div className="menu-icon">📸</div>
                <div className="menu-content">
                  <h4>이미지 업로드</h4>
                  <p>새로운 이미지를 업로드하여 추천받으세요</p>
                </div>
              </Link>
              
              <Link to="/mypage/edit" className="menu-item">
                <div className="menu-icon">⚙️</div>
                <div className="menu-content">
                  <h4>설정</h4>
                  <p>프로필 정보와 설정을 변경하세요</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="logout-section">
            <button className="btn btn-secondary logout-btn">
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyPageMain 