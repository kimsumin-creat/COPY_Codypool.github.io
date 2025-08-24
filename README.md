# Codypool Frontend

AI 코디 추천 서비스의 프론트엔드 애플리케이션입니다.

## 🚀 프로젝트 개요

Codypool은 사용자의 취향과 상황에 맞는 완벽한 코디를 AI가 추천해주는 서비스입니다.

### 주요 기능

- **AI 코디 추천**: 사용자 정보와 이미지를 분석하여 맞춤형 코디 추천
- **온보딩 시스템**: 단계별 사용자 정보 수집 및 서비스 안내
- **코디 저장 및 관리**: 마음에 드는 코디를 저장하고 관리
- **반응형 디자인**: 모바일과 데스크톱에서 최적화된 사용자 경험

## 📁 프로젝트 구조

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── assets/           # 이미지, 아이콘, 폰트
│   ├── components/       # React 컴포넌트
│   │   ├── common/      # 공통 UI 컴포넌트
│   │   ├── layout/      # 레이아웃 컴포넌트
│   │   └── specific/    # 특정 기능 컴포넌트
│   ├── pages/           # 페이지 컴포넌트
│   │   ├── Home/        # 홈페이지
│   │   ├── Auth/        # 인증 페이지
│   │   ├── Onboarding/  # 온보딩 페이지
│   │   ├── Recommendation/ # 추천 페이지
│   │   ├── MyPage/      # 마이페이지
│   │   └── ErrorFallback/ # 에러 페이지
│   ├── services/        # API 서비스
│   ├── hooks/           # 커스텀 훅
│   ├── utils/           # 유틸리티 함수
│   ├── styles/          # CSS 스타일
│   ├── App.jsx          # 메인 앱 컴포넌트
│   └── main.jsx         # 앱 진입점
├── SITEMAP/             # 사이트맵
└── package.json
```

## 🛠️ 기술 스택

- **React 18**: 사용자 인터페이스 구축
- **React Router**: 클라이언트 사이드 라우팅
- **Vite**: 빠른 개발 서버 및 빌드 도구
- **CSS3**: 모던 스타일링 및 반응형 디자인
- **JavaScript ES6+**: 최신 JavaScript 기능 활용

## 🚀 시작하기

### 필수 요구사항

- Node.js 16.0.0 이상
- npm 또는 yarn

### 설치 및 실행

1. **의존성 설치**
   ```bash
   npm install
   ```

2. **개발 서버 실행**
   ```bash
   npm run dev
   ```

3. **브라우저에서 확인**
   ```
   http://localhost:3000
   ```

### 빌드

```bash
npm run build
```

### 린트 검사

```bash
npm run lint
```

## 📱 페이지 구성

### Level 1: 홈
- **홈페이지** (`/`): 서비스 소개 및 시작점

### Level 2: 인증 및 온보딩
- **로그인/회원가입** (`/auth`): 사용자 인증
- **온보딩 1단계** (`/onboarding/step1`): 튜토리얼
- **온보딩 2단계** (`/onboarding/step2`): 기본정보 입력
- **온보딩 3단계** (`/onboarding/step3`): 이미지 선택
- **온보딩 4단계** (`/onboarding/step4`): AI 추천 결과
- **온보딩 5단계** (`/onboarding/step5`): 저장 성공

### Level 3: 추천 및 관리
- **AI 추천** (`/recommendation`): 추천 결과 확인
- **마이페이지** (`/mypage`): 사용자 정보 관리
- **저장된 코디** (`/mypage/saved`): 저장된 코디 목록
- **프로필 수정** (`/mypage/edit`): 프로필 정보 수정

### 에러 처리
- **에러 페이지** (`/error`): 에러 및 빈 상태 처리

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: #007bff (파란색)
- **Secondary**: #6c757d (회색)
- **Success**: #28a745 (초록색)
- **Danger**: #dc3545 (빨간색)
- **Warning**: #ffc107 (노란색)

### 타이포그래피
- **제목**: 2.5rem (데스크톱), 2rem (모바일)
- **부제목**: 1.2rem
- **본문**: 1rem
- **작은 텍스트**: 0.9rem

### 반응형 브레이크포인트
- **모바일**: 768px 이하
- **태블릿**: 768px - 1024px
- **데스크톱**: 1024px 이상

## 🔧 개발 가이드

### 컴포넌트 생성 규칙

1. **공통 컴포넌트** (`components/common/`): 여러 페이지에서 재사용
2. **레이아웃 컴포넌트** (`components/layout/`): Header, Footer 등
3. **특정 컴포넌트** (`components/specific/`): 특정 기능에만 사용

### 스타일링 규칙

1. **CSS 변수 사용**: `var(--primary-color)` 형태로 일관성 유지
2. **모바일 퍼스트**: 모바일부터 시작하여 데스크톱으로 확장
3. **BEM 방법론**: 클래스 명명 규칙 준수

### API 통신

1. **서비스 레이어**: `services/` 폴더에 API 로직 분리
2. **에러 처리**: try-catch로 일관된 에러 처리
3. **로딩 상태**: 사용자 경험을 위한 로딩 상태 관리

## 📊 성능 최적화

- **코드 스플리팅**: React.lazy()를 사용한 지연 로딩
- **이미지 최적화**: WebP 포맷 및 적절한 크기 조정
- **번들 최적화**: Vite의 자동 최적화 활용

## 🧪 테스트

```bash
# 테스트 실행 (추후 추가 예정)
npm test
```

## 📦 배포

### 환경 변수 설정

```bash
# .env 파일 생성
REACT_APP_API_URL=http://localhost:3001/api
```

### 빌드 및 배포

```bash
npm run build
```

빌드된 파일은 `dist/` 폴더에 생성됩니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해주세요.

---

**Codypool** - AI가 추천하는 나만의 코디 🎨 