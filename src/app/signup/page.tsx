'use client'

import SignupForm from '@/components/signup/SignupForm'
import SignupHeader from '@/components/signup/SignupHeader'
import UserTypeSelect from '@/components/signup/UserTypeSelect'
import VerifyForm from '@/components/signup/VerifyForm'
import { useState } from 'react'

//TODO: tailwind 동적 스타일링 고민
const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1)

  const goToNextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  return (
    <>
      <SignupHeader currentStep={currentStep} />
      {currentStep === 1 && <UserTypeSelect onNext={goToNextStep} />}
      {currentStep === 2 && <SignupForm onNext={goToNextStep} />}
      {currentStep === 3 && <VerifyForm onNext={goToNextStep} />}
    </>
  )
}

export default Signup
