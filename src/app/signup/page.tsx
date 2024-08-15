'use client'

import SignupForm from '@/components/signup/SignupForm'
import SignupHeader from '@/components/signup/SignupHeader'
import UserTypeSelect from '@/components/signup/UserTypeSelect'
import VerifyForm from '@/components/signup/VerifyForm'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

//TODO: tailwind 동적 스타일링 고민
const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [userType, setUserType] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const goToNextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  return (
    <>
      <SignupHeader currentStep={currentStep} />
      {currentStep === 1 && (
        <UserTypeSelect onNext={goToNextStep} setUserType={setUserType} />
      )}
      {currentStep === 2 && (
        <SignupForm
          onNext={goToNextStep}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
        />
      )}
      {currentStep === 3 && <VerifyForm onNext={goToNextStep} />}
    </>
  )
}

export default Signup
