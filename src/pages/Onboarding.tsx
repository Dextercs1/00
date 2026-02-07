import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useUserData } from '../hooks/useUserData'
import WelcomeScreen from '../components/onboarding/WelcomeScreen'
import GoalSelect from '../components/onboarding/GoalSelect'
import TimeSelect from '../components/onboarding/TimeSelect'
import RestrictionSelect from '../components/onboarding/RestrictionSelect'

export default function Onboarding() {
  const { updateUserData } = useUserData()

  const [step, setStep] = useState(0)
  const [goal, setGoal] = useState('')
  const [prepTime, setPrepTime] = useState('')
  const [restrictions, setRestrictions] = useState<string[]>([])

  const nextStep = useCallback(() => {
    setStep((s) => s + 1)
  }, [])

  const handleToggleRestriction = useCallback((id: string) => {
    setRestrictions((prev) => {
      if (id === 'nenhuma') {
        // selecting "Nenhuma" clears everything else
        return prev.includes('nenhuma') ? [] : ['nenhuma']
      }
      // selecting any specific restriction removes "Nenhuma"
      const without = prev.filter((r) => r !== 'nenhuma')
      if (without.includes(id)) {
        return without.filter((r) => r !== id)
      }
      return [...without, id]
    })
  }, [])

  const handleFinish = useCallback(() => {
    updateUserData({
      goal,
      prepTime,
      restrictions,
      onboardingComplete: true,
      startDate: new Date().toISOString().split('T')[0],
    })
  }, [goal, prepTime, restrictions, updateUserData])

  return (
    <div className="min-h-dvh">
      <AnimatePresence mode="wait">
        {step === 0 && <WelcomeScreen key="welcome" onNext={nextStep} />}

        {step === 1 && (
          <GoalSelect
            key="goal"
            selected={goal}
            onSelect={setGoal}
            onNext={nextStep}
          />
        )}

        {step === 2 && (
          <TimeSelect
            key="time"
            selected={prepTime}
            onSelect={setPrepTime}
            onNext={nextStep}
          />
        )}

        {step === 3 && (
          <RestrictionSelect
            key="restriction"
            selected={restrictions}
            onToggle={handleToggleRestriction}
            onFinish={handleFinish}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
