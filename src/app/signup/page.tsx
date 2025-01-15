'use client'

import SignupForm from '@/components/signup/SignupForm'
import SignupHeader from '@/components/signup/SignupHeader'
import UserTypeSelect from '@/components/signup/UserTypeSelect'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useSignupMutation } from '@/hooks/mutations/useAuthMutation'
import Welcome from '@/components/signup/Welcome'
import VerifyForm from '@/components/signup/VerifyForm'

export interface IDataType {
  username: string
  password: string
  name: string
  userType: string
  schoolName: string
}

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [email, setEmail] = useState('')
  const [userType, setUserType] = useState('')
  const [selectedImgFile, setSelectedImgFile] = useState<File | null>(null)
  const [status, setStatus] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()

  const signup = useSignupMutation({
    onSuccessFallback: () => {
      setCurrentStep(currentStep + 1)
    },
  })

  const goToNextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  const onSubmitSignup = () => {
    const formData = new FormData()
    const dataString = JSON.stringify({
      name: watch('name'),
      username: watch('username'),
      password: watch('password'),
      schoolName: watch('schoolName'),
      email,
      userType,
    })

    if (selectedImgFile) {
      formData.append('file', selectedImgFile)
    }
    const blob = new Blob([dataString], { type: 'application/json' })

    if (dataString) {
      formData.append('joinReqDTO', blob)
    }

    if (status === true) {
      signup.mutate({ formData })
    }
    console.log('최종 제출', dataString)
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
          onSubmit={onSubmitSignup}
          setSelectedImgFile={setSelectedImgFile}
          watch={watch}
        />
      )}
      {currentStep === 3 && (
        <VerifyForm
          status={status}
          setStatus={setStatus}
          onSubmitSignup={onSubmitSignup}
          setEmail={setEmail}
        />
      )}
      {currentStep === 4 && <Welcome name={signup?.data?.name} />}
    </>
  )
}

export default Signup
