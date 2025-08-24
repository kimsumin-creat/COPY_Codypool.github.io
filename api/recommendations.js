// AI 코디 추천 API 엔드포인트
export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests for recommendations
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: '추천 API는 POST 요청만 허용됩니다.'
    });
  }

  try {
    const { userProfile, preferences, style } = req.body;

    // Validate required fields
    if (!userProfile || !preferences) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: '사용자 프로필과 선호도 정보가 필요합니다.'
      });
    }

    // Mock AI recommendation logic
    const recommendations = generateRecommendations(userProfile, preferences, style);

    // Return recommendations
    res.status(200).json({
      success: true,
      recommendations,
      timestamp: new Date().toISOString(),
      message: 'AI 코디 추천이 완료되었습니다.'
    });

  } catch (error) {
    console.error('Recommendation API error:', error);
    
    res.status(500).json({
      success: false,
      error: error.message,
      message: '코디 추천 중 오류가 발생했습니다.'
    });
  }
}

// Mock AI recommendation generation
function generateRecommendations(userProfile, preferences, style = 'casual') {
  const baseOutfits = {
    casual: [
      {
        id: 'casual-001',
        name: '캐주얼 데일리 룩',
        description: '편안하면서도 스타일리시한 일상 코디',
        items: [
          { type: 'top', name: '베이직 티셔츠', color: 'white', brand: 'Uniqlo' },
          { type: 'bottom', name: '데님 팬츠', color: 'blue', brand: 'Levi\'s' },
          { type: 'shoes', name: '스니커즈', color: 'white', brand: 'Converse' }
        ],
        tags: ['캐주얼', '데일리', '편안함'],
        confidence: 0.95
      },
      {
        id: 'casual-002',
        name: '스포티 캐주얼',
        description: '활동적인 일상에 어울리는 스포티 룩',
        items: [
          { type: 'top', name: '후드 티셔츠', color: 'gray', brand: 'Nike' },
          { type: 'bottom', name: '조거 팬츠', color: 'black', brand: 'Adidas' },
          { type: 'shoes', name: '런닝화', color: 'white', brand: 'Nike' }
        ],
        tags: ['스포티', '활동적', '편안함'],
        confidence: 0.88
      }
    ],
    formal: [
      {
        id: 'formal-001',
        name: '비즈니스 캐주얼',
        description: '업무와 일상을 연결하는 세련된 룩',
        items: [
          { type: 'top', name: '옥스포드 셔츠', color: 'white', brand: 'Brooks Brothers' },
          { type: 'bottom', name: '치노 팬츠', color: 'khaki', brand: 'J.Crew' },
          { type: 'shoes', name: '로퍼', color: 'brown', brand: 'Clarks' }
        ],
        tags: ['비즈니스', '세련됨', '전문적'],
        confidence: 0.92
      }
    ],
    trendy: [
      {
        id: 'trendy-001',
        name: '스트리트 패션',
        description: '최신 트렌드를 반영한 스트리트 룩',
        items: [
          { type: 'top', name: '오버사이즈 티셔츠', color: 'black', brand: 'Off-White' },
          { type: 'bottom', name: '와이드 팬츠', color: 'beige', brand: 'Zara' },
          { type: 'shoes', name: '플랫폼 스니커즈', color: 'white', brand: 'Balenciaga' }
        ],
        tags: ['스트리트', '트렌디', '오버사이즈'],
        confidence: 0.87
      }
    ]
  };

  // Get recommendations based on style preference
  const styleRecommendations = baseOutfits[style] || baseOutfits.casual;
  
  // Add personalized recommendations based on user profile
  const personalizedRecommendations = styleRecommendations.map(outfit => ({
    ...outfit,
    personalized: true,
    reasoning: `사용자의 ${preferences.season || '계절'} 선호도와 ${preferences.color || '컬러'} 취향을 반영한 추천입니다.`
  }));

  return {
    outfits: personalizedRecommendations,
    total: personalizedRecommendations.length,
    style: style,
    season: preferences.season || 'all',
    colorPalette: preferences.colors || ['neutral', 'earth'],
    confidence: 0.89
  };
}
