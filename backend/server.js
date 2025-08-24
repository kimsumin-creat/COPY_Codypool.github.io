
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Middlewares
app.use(cors()); // Enable CORS for all routes
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies, increase limit for base64 images

// API endpoint for recommendation
app.post('/api/recommend', (req, res) => {
    console.log('Received a request at /api/recommend');

    const { option, image } = req.body;

    // --- Basic Validation ---
    if (!option || !image) {
        console.log('Validation failed: Missing option or image.');
        return res.status(400).json({ message: '선택된 옵션이나 이미지가 없습니다.' });
    }

    console.log(`Selected option: ${option}`);
    console.log(`Image data received (first 50 chars): ${image.substring(0, 50)}...`);

    // --- Mock AI Processing ---
    // This is where you would typically have your AI model processing.
    // Here, we'll just return a mock result based on the selected option.
    let recommendation;
    if (option === 'swimsuit') {
        recommendation = {
            name: '시원한 아쿠아 수모',
            imageUrl: 'https://via.placeholder.com/300x300.png?text=Recommended+Swim+Cap',
            description: '선택하신 수영복의 색상과 디자인에 잘 어울리는 시원한 느낌의 수모입니다.'
        };
    } else if (option === 'swimcap') {
        recommendation = {
            name: '클래식 네이비 원피스 수영복',
            imageUrl: 'https://via.placeholder.com/300x300.png?text=Recommended+Swimsuit',
            description: '선택하신 수모와 완벽하게 어울리는 클래식하고 세련된 디자인의 수영복입니다.'
        };
    } else {
        recommendation = {
            name: 'AI 추천 아이템',
            imageUrl: 'https://via.placeholder.com/300x300.png?text=AI+Recommendation',
            description: 'AI가 당신의 선택을 기반으로 특별한 아이템을 추천합니다.'
        };
    }

    // --- Send Response ---
    console.log('Sending mock recommendation.');
    res.status(200).json({ recommendation });
});

// Start the server
app.listen(port, () => {
    console.log(`Mock server listening at http://localhost:${port}`);
});
