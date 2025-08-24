// 이미지 업로드 관련 API 서비스

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api'

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    'Authorization': `Bearer ${token}`
  }
}

export const imageUploadService = {
  // 이미지 업로드
  async uploadImage(file) {
    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch(`${API_BASE_URL}/upload/image`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: formData,
      })

      if (!response.ok) {
        throw new Error('이미지 업로드에 실패했습니다')
      }

      const data = await response.json()
      return data.imageUrl
    } catch (error) {
      console.error('Upload image error:', error)
      throw error
    }
  },

  // 이미지 분석
  async analyzeImage(imageUrl) {
    try {
      const response = await fetch(`${API_BASE_URL}/analyze/image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify({ imageUrl }),
      })

      if (!response.ok) {
        throw new Error('이미지 분석에 실패했습니다')
      }

      const data = await response.json()
      return data.analysis
    } catch (error) {
      console.error('Analyze image error:', error)
      throw error
    }
  },

  // 이미지 유효성 검사
  validateImage(file) {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (!validTypes.includes(file.type)) {
      throw new Error('지원하지 않는 이미지 형식입니다. JPEG, PNG, WebP 파일만 업로드 가능합니다.')
    }

    if (file.size > maxSize) {
      throw new Error('이미지 크기가 너무 큽니다. 5MB 이하의 파일만 업로드 가능합니다.')
    }

    return true
  },

  // 이미지 압축
  async compressImage(file, maxWidth = 800, quality = 0.8) {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      img.onload = () => {
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height)
        const newWidth = img.width * ratio
        const newHeight = img.height * ratio

        canvas.width = newWidth
        canvas.height = newHeight

        ctx.drawImage(img, 0, 0, newWidth, newHeight)

        canvas.toBlob((blob) => {
          resolve(new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now()
          }))
        }, file.type, quality)
      }

      img.src = URL.createObjectURL(file)
    })
  }
} 