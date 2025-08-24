// 태그 리스트 포맷팅 유틸리티

/**
 * 태그 배열을 문자열로 변환
 * @param {Array} tags - 태그 배열
 * @param {string} separator - 구분자 (기본값: ', ')
 * @returns {string} 포맷된 태그 문자열
 */
export const formatTagList = (tags, separator = ', ') => {
  if (!Array.isArray(tags)) {
    return ''
  }
  
  return tags.join(separator)
}

/**
 * 태그 문자열을 배열로 변환
 * @param {string} tagString - 태그 문자열
 * @param {string} separator - 구분자 (기본값: ',')
 * @returns {Array} 태그 배열
 */
export const parseTagString = (tagString, separator = ',') => {
  if (!tagString || typeof tagString !== 'string') {
    return []
  }
  
  return tagString
    .split(separator)
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)
}

/**
 * 태그 배열에서 중복 제거
 * @param {Array} tags - 태그 배열
 * @returns {Array} 중복이 제거된 태그 배열
 */
export const removeDuplicateTags = (tags) => {
  if (!Array.isArray(tags)) {
    return []
  }
  
  return [...new Set(tags)]
}

/**
 * 태그 배열을 카테고리별로 그룹화
 * @param {Array} tags - 태그 배열
 * @returns {Object} 카테고리별로 그룹화된 태그 객체
 */
export const groupTagsByCategory = (tags) => {
  if (!Array.isArray(tags)) {
    return {}
  }
  
  const categories = {
    style: ['캐주얼', '포멀', '스트릿', '빈티지', '미니멀', '엘레간트'],
    season: ['봄', '여름', '가을', '겨울'],
    occasion: ['데이트', '오피스', '파티', '운동', '여행'],
    color: ['검정', '흰색', '빨강', '파랑', '노랑', '초록', '보라', '핑크']
  }
  
  const grouped = {}
  
  tags.forEach(tag => {
    for (const [category, categoryTags] of Object.entries(categories)) {
      if (categoryTags.includes(tag)) {
        if (!grouped[category]) {
          grouped[category] = []
        }
        grouped[category].push(tag)
        break
      }
    }
  })
  
  return grouped
} 