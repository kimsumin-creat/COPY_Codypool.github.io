// 추천 관련 API 서비스

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api'

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}

export const recommendationService = {
  // AI 추천 받기
  async getRecommendations(userData, imageData) {
    try {
      const response = await fetch(`${API_BASE_URL}/recommendations`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          userData,
          imageData
        }),
      })

      if (!response.ok) {
        throw new Error('추천을 받는데 실패했습니다')
      }

      const data = await response.json()
      return data.recommendations
    } catch (error) {
      console.error('Get recommendations error:', error)
      throw error
    }
  },

  // 추천 코디 저장
  async saveRecommendation(recommendationId) {
    try {
      const response = await fetch(`${API_BASE_URL}/recommendations/${recommendationId}/save`, {
        method: 'POST',
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error('코디 저장에 실패했습니다')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Save recommendation error:', error)
      throw error
    }
  },

  // 저장된 코디 목록 가져오기
  async getSavedRecommendations() {
    try {
      const response = await fetch(`${API_BASE_URL}/recommendations/saved`, {
        method: 'GET',
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error('저장된 코디를 가져오는데 실패했습니다')
      }

      const data = await response.json()
      return data.recommendations
    } catch (error) {
      console.error('Get saved recommendations error:', error)
      throw error
    }
  },

  // 저장된 코디 삭제
  async deleteSavedRecommendation(recommendationId) {
    try {
      const response = await fetch(`${API_BASE_URL}/recommendations/saved/${recommendationId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error('코디 삭제에 실패했습니다')
      }

      return true
    } catch (error) {
      console.error('Delete saved recommendation error:', error)
      throw error
    }
  },

  // 사용자 정보 업데이트
  async updateUserProfile(profileData) {
    try {
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(profileData),
      })

      if (!response.ok) {
        throw new Error('프로필 업데이트에 실패했습니다')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Update profile error:', error)
      throw error
    }
  }
} 