import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './ErrorFallback.css'

const EmptyOrErrorPage = () => {
  const location = useLocation()
  const isError = location.pathname === '/error'

  return (
    <div className="error-fallback">
      <div className="error-container">
        <div className="error-icon">
          {isError ? '⚠️' : '📭'}
        </div>
        
        <h1>
          {isError ? '오류가 발생했습니다' : '페이지를 찾을 수 없습니다'}
        </h1>
        
        <p>
          {isError 
            ? '죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
            : '요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.'
          }
        </p>

        <div className="error-actions">
          <Link to="/" className="btn btn-primary">
            홈으로 돌아가기
          </Link>
          <Link to="/recommendation" className="btn btn-secondary">
            추천 받기
          </Link>
        </div>

        <div className="error-help">
          <h3>도움이 필요하신가요?</h3>
          <div className="help-links">
            <Link to="/onboarding/step1">온보딩 다시 시작</Link>
            <Link to="/mypage">마이페이지</Link>
            <Link to="/auth">로그인</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmptyOrErrorPage 