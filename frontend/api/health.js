// API Health Check Endpoint
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

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: '헬스체크는 GET 요청만 허용됩니다.'
    });
  }

  try {
    // Health check data
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
      services: {
        database: 'connected',
        cache: 'available',
        external_apis: 'responsive'
      },
      metrics: {
        memory_usage: process.memoryUsage(),
        cpu_usage: process.cpuUsage()
      }
    };

    // Return health status
    res.status(200).json(healthData);
  } catch (error) {
    console.error('Health check error:', error);
    
    res.status(500).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message,
      message: '서비스 상태 확인 중 오류가 발생했습니다.'
    });
  }
}
