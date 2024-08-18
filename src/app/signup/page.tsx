'use client'

import SignupForm from '@/components/signup/SignupForm'
import SignupHeader from '@/components/signup/SignupHeader'
import UserTypeSelect from '@/components/signup/UserTypeSelect'
import VerifyForm from '@/components/signup/VerifyForm'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useSignupMutation } from '@/hooks/mutations/useAuthMutation'

interface IDataType {
  id: string
  password: string
  name: string
  userType: string
  schoolName: string
}

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [userType, setUserType] = useState('')
  const [selectedImgFile, setSelectedImgFile] = useState<File | null>(null)
  const [status, setStatus] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const signup = useSignupMutation()

  const goToNextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  const onSubmit = (data: IDataType) => {
    const formData = new FormData()

    formData.append(
      'joinDto',
      JSON.stringify({
        id: data.id,
        password: data.password,
        name: data.name,
        userType: userType,
        schoolName: data.schoolName,
      }),
    )
    if (selectedImgFile) {
      formData.append('file', selectedImgFile)
    }
    if (status === true) {
      signup.mutate({ formData })
    }
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
          onSubmit={onSubmit}
          setSelectedImgFile={setSelectedImgFile}
        />
      )}
      {currentStep === 3 && (
        <VerifyForm
          onNext={goToNextStep}
          status={status}
          setStatus={setStatus}
        />
      )}
    </>
  )
}

export default Signup
