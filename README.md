# CodyPool - AI 코디 추천 서비스

AI 기반 개인 맞춤형 코디 추천 서비스입니다. 사용자의 스타일 선호도와 상황에 맞는 최적의 코디를 추천해드립니다.

## 🚀 배포 상태

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/codypool)
[![GitHub Actions](https://github.com/your-username/codypool/workflows/Deploy%20to%20Vercel/badge.svg)](https://github.com/your-username/codypool/actions)

**🌐 Live Demo:** https://codypool.vercel.app  
**📊 Health Check:** https://codypool.vercel.app/api/health

## ✨ 주요 기능

- 🤖 **AI 기반 코디 추천**: 개인 맞춤형 스타일 추천
- 📱 **PWA 지원**: 모바일 앱처럼 사용 가능
- 🎨 **반응형 디자인**: 모든 디바이스에서 최적화
- ⚡ **빠른 로딩**: 최적화된 성능과 캐싱
- 🔒 **오프라인 지원**: 인터넷 없이도 기본 기능 사용

## 🛠 기술 스택

### Frontend
- **React 18** - 사용자 인터페이스
- **Vite** - 빌드 도구 및 개발 서버
- **React Router** - 클라이언트 사이드 라우팅
- **CSS Variables** - 디자인 시스템
- **Service Worker** - PWA 및 오프라인 지원

### Backend
- **Vercel Functions** - 서버리스 API
- **Node.js** - 런타임 환경

### 배포 & CI/CD
- **Vercel** - 호스팅 및 배포
- **GitHub Actions** - 자동화된 배포 파이프라인
- **Lighthouse CI** - 성능 모니터링

## 📦 설치 및 실행

### 사전 요구사항
- Node.js 18.0.0 이상
- npm 8.0.0 이상

### 로컬 개발

```bash
# 저장소 클론
git clone https://github.com/your-username/codypool.git
cd codypool

# 프론트엔드 디렉토리로 이동
cd frontend

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속하세요.

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 🚀 배포 가이드

### 1. Vercel 배포 (권장)

1. **Vercel 계정 생성**: [vercel.com](https://vercel.com)에서 계정 생성
2. **GitHub 연동**: GitHub 저장소와 Vercel 프로젝트 연결
3. **환경 변수 설정**:
   ```
   NODE_ENV=production
   VITE_API_URL=https://your-api-domain.com
   ```

### 2. GitHub Actions 자동 배포

1. **GitHub Secrets 설정**:
   - `VERCEL_TOKEN`: Vercel API 토큰
   - `VERCEL_ORG_ID`: Vercel 조직 ID
   - `VERCEL_PROJECT_ID`: Vercel 프로젝트 ID

2. **자동 배포 트리거**:
   - `main` 브랜치에 푸시 시 자동 배포
   - Pull Request 시 미리보기 배포

### 3. 수동 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 로그인
vercel login

# 배포
vercel --prod
```

## 📁 프로젝트 구조

```
codypool/
├── frontend/                 # 프론트엔드 애플리케이션
│   ├── public/              # 정적 파일
│   │   ├── assets/          # 이미지, 아이콘, 폰트
│   │   ├── manifest.webmanifest  # PWA 매니페스트
│   │   └── service-worker.js     # 서비스 워커
│   ├── src/                 # 소스 코드
│   │   ├── components/      # 재사용 가능한 컴포넌트
│   │   ├── pages/          # 페이지 컴포넌트
│   │   ├── styles/         # 스타일 파일
│   │   ├── services/       # API 서비스
│   │   └── utils/          # 유틸리티 함수
│   ├── api/                # Vercel Functions
│   ├── vite.config.js      # Vite 설정
│   └── vercel.json         # Vercel 배포 설정
├── .github/workflows/      # GitHub Actions
└── README.md              # 프로젝트 문서
```

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: `#6366f1` (인디고)
- **Success**: `#10b981` (에메랄드)
- **Warning**: `#f59e0b` (앰버)
- **Error**: `#ef4444` (레드)

### 타이포그래피
- **Font Family**: Pretendard, system-ui
- **Font Sizes**: xs(0.75rem) ~ 4xl(2.25rem)

### 반응형 브레이크포인트
- **Mobile**: < 640px
- **Tablet**: 640px ~ 1024px
- **Desktop**: > 1024px

## 🔧 개발 가이드

### 코드 스타일

```bash
# 린팅
npm run lint

# 린팅 자동 수정
npm run lint:fix

# 코드 포맷팅
npm run format

# 타입 체크
npm run type-check
```

### 테스트

```bash
# 단위 테스트 실행
npm run test

# 테스트 커버리지
npm run test:coverage

# UI 테스트 러너
npm run test:ui
```

### 성능 최적화

```bash
# 번들 분석
npm run analyze

# 빌드 최적화
npm run build
```

## 📊 성능 지표

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🔒 보안

- **Content Security Policy** 적용
- **HTTPS** 강제 적용
- **XSS Protection** 헤더 설정
- **CORS** 정책 구성

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 지원

- **이슈 리포트**: [GitHub Issues](https://github.com/your-username/codypool/issues)
- **문의**: support@codypool.com
- **문서**: [docs.codypool.com](https://docs.codypool.com)

## 🙏 감사의 말

- [Vercel](https://vercel.com) - 호스팅 및 배포 플랫폼
- [React](https://reactjs.org) - 사용자 인터페이스 라이브러리
- [Vite](https://vitejs.dev) - 빌드 도구

---

**CodyPool Team** © 2024. All rights reserved.
