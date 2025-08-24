import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './AuthPage.css'

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: ''
  })
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: API 호출 로직 구현
    console.log('Form submitted:', formData)
    if (isLogin) {
      // 로그인 성공 시 온보딩으로 이동
      navigate('/onboarding/step1')
    } else {
      // 회원가입 성공 시 로그인 모드로 전환
      setIsLogin(true)
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        nickname: ''
      })
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>Codypool</h1>
          <p>{isLogin ? '로그인' : '회원가입'}</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="nickname">닉네임</label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                value={formData.nickname}
                onChange={handleInputChange}
                placeholder="닉네임을 입력하세요"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="이메일을 입력하세요"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">비밀번호 확인</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="비밀번호를 다시 입력하세요"
                required
              />
            </div>
          )}

          <button type="submit" className="btn btn-primary auth-submit">
            {isLogin ? '로그인' : '회원가입'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? '계정이 없으신가요?' : '이미 계정이 있으신가요?'}
            <button
              type="button"
              className="auth-toggle"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? '회원가입' : '로그인'}
            </button>
          </p>
        </div>

        <div className="auth-back">
          <Link to="/" className="back-link">
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AuthPage 