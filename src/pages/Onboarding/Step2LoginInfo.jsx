import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './OnboardingStep.css'

const Step2LoginInfo = () => {
  const [formData, setFormData] = useState({
    nickname: '',
    age: '',
    gender: '',
    style: ''
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
    // TODO: API 호출로 사용자 정보 저장
    console.log('User info submitted:', formData)
    navigate('/onboarding/step3')
  }

  return (
    <div className="onboarding-step">
      <div className="step-container">
        <div className="step-header">
          <div className="step-indicator">
            <span className="step-number">2</span>
            <span className="step-text">기본정보</span>
          </div>
          <h1>기본 정보를 입력해주세요</h1>
          <p>더 정확한 코디 추천을 위해 몇 가지 정보가 필요해요</p>
        </div>

        <div className="step-content">
          <form className="info-form" onSubmit={handleSubmit}>
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

            <div className="form-group">
              <label htmlFor="age">나이</label>
              <select
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                required
              >
                <option value="">나이를 선택하세요</option>
                <option value="10s">10대</option>
                <option value="20s">20대</option>
                <option value="30s">30대</option>
                <option value="40s">40대</option>
                <option value="50s">50대</option>
                <option value="60s">60대 이상</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="gender">성별</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleInputChange}
                    required
                  />
                  <span>남성</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleInputChange}
                    required
                  />
                  <span>여성</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="style">선호하는 스타일</label>
              <select
                id="style"
                name="style"
                value={formData.style}
                onChange={handleInputChange}
                required
              >
                <option value="">스타일을 선택하세요</option>
                <option value="casual">캐주얼</option>
                <option value="formal">포멀</option>
                <option value="street">스트릿</option>
                <option value="vintage">빈티지</option>
                <option value="minimal">미니멀</option>
                <option value="elegant">엘레간트</option>
              </select>
            </div>
          </form>
        </div>

        <div className="step-footer">
          <Link to="/onboarding/step1" className="btn btn-secondary">
            이전 단계
          </Link>
          <button 
            type="submit" 
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={!formData.nickname || !formData.age || !formData.gender || !formData.style}
          >
            다음 단계로
          </button>
        </div>
      </div>
    </div>
  )
}

export default Step2LoginInfo 