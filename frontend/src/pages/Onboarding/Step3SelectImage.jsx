import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './OnboardingStep.css'

const Step3SelectImage = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [uploadedImage, setUploadedImage] = useState(null)
  const navigate = useNavigate()

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target.result)
        setSelectedImage('upload')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageSelect = (imageType) => {
    setSelectedImage(imageType)
    setUploadedImage(null)
  }

  const handleNext = () => {
    if (selectedImage) {
      // TODO: 이미지 정보를 저장하고 AI 분석 요청
      console.log('Selected image type:', selectedImage)
      navigate('/onboarding/step4')
    }
  }

  return (
    <div className="onboarding-step">
      <div className="step-container">
        <div className="step-header">
          <div className="step-indicator">
            <span className="step-number">3</span>
            <span className="step-text">이미지 선택</span>
          </div>
          <h1>참고할 이미지를 선택해주세요</h1>
          <p>AI가 분석하여 비슷한 스타일의 코디를 추천해드릴게요</p>
        </div>

        <div className="step-content">
          <div className="image-selection">
            <div className="upload-section">
              <h3>이미지 업로드</h3>
              <div className="upload-area">
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <label htmlFor="image-upload" className="upload-button">
                  {uploadedImage ? (
                    <img src={uploadedImage} alt="Uploaded" className="uploaded-image" />
                  ) : (
                    <div className="upload-placeholder">
                      <div className="upload-icon">📸</div>
                      <p>이미지를 업로드하세요</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div className="sample-section">
              <h3>샘플 이미지 선택</h3>
              <div className="sample-images">
                <div 
                  className={`sample-image ${selectedImage === 'casual' ? 'selected' : ''}`}
                  onClick={() => handleImageSelect('casual')}
                >
                  <div className="sample-placeholder">캐주얼</div>
                </div>
                <div 
                  className={`sample-image ${selectedImage === 'formal' ? 'selected' : ''}`}
                  onClick={() => handleImageSelect('formal')}
                >
                  <div className="sample-placeholder">포멀</div>
                </div>
                <div 
                  className={`sample-image ${selectedImage === 'street' ? 'selected' : ''}`}
                  onClick={() => handleImageSelect('street')}
                >
                  <div className="sample-placeholder">스트릿</div>
                </div>
                <div 
                  className={`sample-image ${selectedImage === 'vintage' ? 'selected' : ''}`}
                  onClick={() => handleImageSelect('vintage')}
                >
                  <div className="sample-placeholder">빈티지</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="step-footer">
          <Link to="/onboarding/step2" className="btn btn-secondary">
            이전 단계
          </Link>
          <button 
            className="btn btn-primary"
            onClick={handleNext}
            disabled={!selectedImage}
          >
            다음 단계로
          </button>
        </div>
      </div>
    </div>
  )
}

export default Step3SelectImage 