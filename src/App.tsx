import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useUserData } from './hooks/useUserData'
import BottomNav from './components/layout/BottomNav'
import Home from './pages/Home'
import Recipes from './pages/Recipes'
import Plan from './pages/Plan'
import Progress from './pages/Progress'
import More from './pages/More'
import Onboarding from './pages/Onboarding'
import RecipeDetail from './components/recipes/RecipeDetail'
import { ConfettiAnimation } from './components/gamification/ConfettiAnimation'

function App() {
  const { userData } = useUserData()
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    const handler = () => {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    }
    window.addEventListener('achievement-unlocked', handler)
    return () => window.removeEventListener('achievement-unlocked', handler)
  }, [])

  if (!userData.onboardingComplete) {
    return <Onboarding />
  }

  return (
    <div className="min-h-dvh bg-cream-50 pb-20">
      {showConfetti && <ConfettiAnimation />}
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/more" element={<More />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
      <BottomNav />
    </div>
  )
}

export default App
