import { useState, useEffect } from 'react'
import { recommendationService } from '../services/recommendation'

export const useRecommendation = () => {
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // AI 추천 받기
  const getRecommendations = async (userData, imageData) => {
    setLoading(true)
    setError(null)
    
    try {
      const data = await recommendationService.getRecommendations(userData, imageData)
      setRecommendations(data)
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // 추천 코디 저장
  const saveRecommendation = async (recommendationId) => {
    try {
      await recommendationService.saveRecommendation(recommendationId)
      // 저장된 추천 목록 업데이트
      setRecommendations(prev => 
        prev.map(rec => 
          rec.id === recommendationId 
            ? { ...rec, saved: true }
            : rec
        )
      )
      return true
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // 저장된 코디 목록 가져오기
  const getSavedRecommendations = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const data = await recommendationService.getSavedRecommendations()
      setRecommendations(data)
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // 저장된 코디 삭제
  const deleteSavedRecommendation = async (recommendationId) => {
    try {
      await recommendationService.deleteSavedRecommendation(recommendationId)
      // 삭제된 추천 제거
      setRecommendations(prev => 
        prev.filter(rec => rec.id !== recommendationId)
      )
      return true
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // 에러 초기화
  const clearError = () => {
    setError(null)
  }

  return {
    recommendations,
    loading,
    error,
    getRecommendations,
    saveRecommendation,
    getSavedRecommendations,
    deleteSavedRecommendation,
    clearError
  }
} 