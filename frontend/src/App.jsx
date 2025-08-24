import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import AuthPage from './pages/Auth/AuthPage'
import OnboardingStep1 from './pages/Onboarding/Step1Intro'
import OnboardingStep2 from './pages/Onboarding/Step2LoginInfo'
import OnboardingStep3 from './pages/Onboarding/Step3SelectImage'
import OnboardingStep4 from './pages/Onboarding/Step4Result'
import OnboardingStep5 from './pages/Onboarding/Step5Success'
import RecommendationPage from './pages/Recommendation/RecommendationPage'
import MyPageMain from './pages/MyPage/MyPageMain'
import SavedCodiList from './pages/MyPage/SavedCodiList'
import EditProfileForm from './pages/MyPage/EditProfileForm'
import EmptyOrErrorPage from './pages/ErrorFallback/EmptyOrErrorPage'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Level 1: 홈 */}
          <Route path="/" element={<HomePage />} />
          
          {/* Level 2: 회원가입/로그인 */}
          <Route path="/auth" element={<AuthPage />} />
          
          {/* Level 2: 코디 시작 (온보딩) */}
          <Route path="/onboarding/step1" element={<OnboardingStep1 />} />
          <Route path="/onboarding/step2" element={<OnboardingStep2 />} />
          <Route path="/onboarding/step3" element={<OnboardingStep3 />} />
          <Route path="/onboarding/step4" element={<OnboardingStep4 />} />
          <Route path="/onboarding/step5" element={<OnboardingStep5 />} />
          
          {/* Level 3: AI 추천 결과 */}
          <Route path="/recommendation" element={<RecommendationPage />} />
          
          {/* Level 2: 마이페이지 */}
          <Route path="/mypage" element={<MyPageMain />} />
          <Route path="/mypage/saved" element={<SavedCodiList />} />
          <Route path="/mypage/edit" element={<EditProfileForm />} />
          
          {/* 예외 및 빈 상태 처리 */}
          <Route path="/error" element={<EmptyOrErrorPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App 