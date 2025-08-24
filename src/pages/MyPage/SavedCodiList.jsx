import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './SavedCodiList.css'

const SavedCodiList = () => {
  const [savedCodis] = useState([
    {
      id: 1,
      title: '봄날 데이트 룩',
      description: '따뜻한 봄날에 어울리는 로맨틱한 코디',
      image: 'https://via.placeholder.com/300x400/667eea/ffffff?text=봄날+데이트',
      tags: ['데이트', '봄', '로맨틱'],
      savedDate: '2024-03-15'
    },
    {
      id: 2,
      title: '오피스 캐주얼',
      description: '편안하면서도 깔끔한 오피스 룩',
      image: 'https://via.placeholder.com/300x400/764ba2/ffffff?text=오피스+캐주얼',
      tags: ['오피스', '캐주얼', '깔끔'],
      savedDate: '2024-03-10'
    },
    {
      id: 3,
      title: '주말 스트릿',
      description: '트렌디한 주말 스트릿 패션',
      image: 'https://via.placeholder.com/300x400/28a745/ffffff?text=주말+스트릿',
      tags: ['스트릿', '트렌디', '주말'],
      savedDate: '2024-03-05'
    }
  ])

  const handleDelete = (codiId) => {
    // TODO: 삭제 API 호출
    console.log('Deleting codi:', codiId)
  }

  return (
    <div className="saved-codis">
      <div className="saved-header">
        <div className="container">
          <h1>저장된 코디</h1>
          <p>마음에 드는 코디들을 확인하고 관리하세요</p>
        </div>
      </div>

      <div className="saved-content">
        <div className="container">
          {savedCodis.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">💾</div>
              <h3>저장된 코디가 없습니다</h3>
              <p>AI 추천을 받아서 마음에 드는 코디를 저장해보세요</p>
              <Link to="/recommendation" className="btn btn-primary">
                추천 받기
              </Link>
            </div>
          ) : (
            <>
              <div className="codis-grid">
                {savedCodis.map((codi) => (
                  <div key={codi.id} className="codi-card">
                    <div className="card-image">
                      <img src={codi.image} alt={codi.title} />
                      <button 
                        className="delete-button"
                        onClick={() => handleDelete(codi.id)}
                      >
                        🗑️
                      </button>
                    </div>
                    <div className="card-content">
                      <h3>{codi.title}</h3>
                      <p>{codi.description}</p>
                      <div className="tags">
                        {codi.tags.map((tag, index) => (
                          <span key={index} className="tag">{tag}</span>
                        ))}
                      </div>
                      <div className="saved-date">
                        저장일: {codi.savedDate}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="action-buttons">
                <Link to="/recommendation" className="btn btn-primary">
                  더 많은 추천 받기
                </Link>
                <Link to="/mypage" className="btn btn-secondary">
                  마이페이지로 돌아가기
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default SavedCodiList 