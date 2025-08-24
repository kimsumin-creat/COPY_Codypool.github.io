// 인증 관련 API 서비스

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api'

export const authService = {
  // 로그인
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error('로그인에 실패했습니다')
      }

      const data = await response.json()
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      
      return data
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  },

  // 회원가입
  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        throw new Error('회원가입에 실패했습니다')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Register error:', error)
      throw error
    }
  },

  // 로그아웃
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  // 현재 사용자 정보 가져오기
  getCurrentUser() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  // 토큰 가져오기
  getToken() {
    return localStorage.getItem('token')
  },

  // 인증 상태 확인
  isAuthenticated() {
    return !!this.getToken()
  }
} 