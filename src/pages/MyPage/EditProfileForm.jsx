import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './EditProfileForm.css'

const EditProfileForm = () => {
  const [formData, setFormData] = useState({
    nickname: '스타일러',
    email: 'user@example.com',
    age: '20s',
    gender: 'female',
    style: 'casual'
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
    // TODO: API 호출로 프로필 정보 업데이트
    console.log('Profile updated:', formData)
    navigate('/mypage')
  }

  return (
    <div className="edit-profile">
      <div className="edit-header">
        <div className="container">
          <h1>프로필 수정</h1>
          <p>내 정보를 수정하고 저장하세요</p>
        </div>
      </div>

      <div className="edit-content">
        <div className="container">
          <form className="profile-form" onSubmit={handleSubmit}>
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
              <label htmlFor="age">나이</label>
              <select
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                required
              >
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
                <option value="casual">캐주얼</option>
                <option value="formal">포멀</option>
                <option value="street">스트릿</option>
                <option value="vintage">빈티지</option>
                <option value="minimal">미니멀</option>
                <option value="elegant">엘레간트</option>
              </select>
            </div>

            <div className="form-actions">
              <Link to="/mypage" className="btn btn-secondary">
                취소
              </Link>
              <button type="submit" className="btn btn-primary">
                저장하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditProfileForm 