# Vercel 배포 가이드 - CodyPool

## 🚀 배포 준비

### 1. Vercel 계정 설정
1. [vercel.com](https://vercel.com)에서 계정 생성
2. GitHub 계정과 연동

### 2. 프로젝트 연결
1. Vercel 대시보드에서 "New Project" 클릭
2. GitHub 저장소 선택: `your-username/codypool`
3. Root Directory: `frontend` 설정
4. Framework Preset: `Vite` 선택

### 3. 환경 변수 설정
Vercel 프로젝트 설정에서 다음 환경 변수 추가:

```
NODE_ENV=production
VITE_API_URL=https://your-domain.vercel.app
VITE_APP_VERSION=1.0.0
```

## 📋 배포 구성

### vercel.json 설정
- **Framework**: Vite
- **Build Command**: `chmod +x vercel-build.sh && ./vercel-build.sh`
- **Output Directory**: `dist`
- **Regions**: `icn1` (한국), `hnd1` (일본)
- **Function Runtime**: Node.js 20.x

### 라우팅 규칙
1. `/api/*` → API 함수로 라우팅
2. `/assets/*` → 정적 자산 (1년 캐시)
3. `/manifest.webmanifest` → PWA 매니페스트
4. `/service-worker.js` → 서비스 워커 (no-cache)
5. `/*` → SPA 라우팅 (index.html)

### 캐시 전략
- **정적 자산**: 1년 immutable 캐시
- **HTML 파일**: no-cache
- **서비스 워커**: no-cache
- **PWA 매니페스트**: 1시간 캐시

## 🔧 배포 명령어

### CLI 배포
```bash
# Vercel CLI 설치
npm i -g vercel

# 로그인
vercel login

# 프로젝트 초기화
vercel

# 프로덕션 배포
vercel --prod
```

### GitHub Actions 자동 배포
```yaml
# .github/workflows/deploy.yml
- name: Deploy to Vercel
  uses: amondnet/vercel-action@v25
  with:
    vercel-token: ${{ secrets.VERCEL_TOKEN }}
    vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
    vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
    working-directory: ./frontend
    vercel-args: '--prod'
```

## 🌍 지역 설정

### 한국/일본 최적화
- **Primary Region**: `icn1` (한국)
- **Failover Region**: `hnd1` (일본)
- **Function Failover**: 자동 장애 조치

### 성능 최적화
- **Edge Functions**: 글로벌 CDN
- **Image Optimization**: 자동 WebP 변환
- **Compression**: Gzip/Brotli 압축

## 🔒 보안 설정

### 보안 헤더
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

### CORS 설정
- API 엔드포인트에 CORS 헤더 자동 적용
- Preflight 요청 처리
- 허용된 도메인만 접근 가능

## 📊 모니터링

### 성능 지표
- **Lighthouse Score**: 95+ 목표
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

### 배포 상태 확인
```bash
# 배포 상태 확인
vercel ls

# 로그 확인
vercel logs

# 성능 분석
vercel analytics
```

## 🚨 문제 해결

### 일반적인 문제
1. **빌드 실패**: `npm ci` 대신 `npm install` 사용
2. **API 오류**: 환경 변수 확인
3. **캐시 문제**: 강제 재배포 또는 캐시 무효화

### 디버깅
```bash
# 로컬 개발 서버
vercel dev

# 빌드 테스트
vercel build

# 배포 미리보기
vercel --prod
```

## 📈 최적화 팁

### 성능 최적화
1. **이미지 최적화**: WebP 포맷 사용
2. **코드 분할**: 동적 import 활용
3. **캐싱**: 적절한 캐시 헤더 설정
4. **압축**: Gzip/Brotli 활성화

### SEO 최적화
1. **메타 태그**: 완전한 메타 정보
2. **사이트맵**: 자동 생성
3. **robots.txt**: 검색 엔진 최적화
4. **구조화 데이터**: JSON-LD 스키마

## 🎯 배포 체크리스트

- [ ] Vercel 프로젝트 생성
- [ ] 환경 변수 설정
- [ ] 도메인 연결 (선택사항)
- [ ] SSL 인증서 확인
- [ ] 성능 테스트 실행
- [ ] PWA 설치 테스트
- [ ] API 엔드포인트 확인
- [ ] 모바일 반응형 테스트
- [ ] 오프라인 기능 테스트
- [ ] 보안 헤더 확인

## 📞 지원

- **Vercel 문서**: [vercel.com/docs](https://vercel.com/docs)
- **GitHub Issues**: 프로젝트 이슈 트래커
- **Vercel 지원**: [vercel.com/support](https://vercel.com/support)
