'use client'

import SocialSignupForm from '@/components/signup/SocialSignupForm'
import Welcome from '@/components/signup/Welcome'
import { useSocialSignupMutation } from '@/hooks/mutations/useAuthMutation'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export interface IDataType {
  username: string
  name: string
  email: string
}

const SocialLogin = () => {
  const searchParams = useSearchParams()

  const initialSocialData = {
    username: searchParams.get('username') || '',
    name: searchParams.get('name') || '',
    email: searchParams.get('email') || '',
  }

  const [socialData, setSocialData] = useState<IDataType>(initialSocialData)
  const [socialUserType, setSocialUserType] = useState('')
  const [selectedImgFile, setSelectedImgFile] = useState<File | null>(null)
  const [isSignupComplete, setIsSignupComplete] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()

  const isSocialLogin = true

  const socialSignup = useSocialSignupMutation({
    onSuccessFallback: () => {
      // console.log('회원가입 성공')
      setIsSignupComplete(true)
    },
  })

  useEffect(() => {
    const username = searchParams.get('username')
    const name = searchParams.get('name')
    const email = searchParams.get('email')

    if (username && name && email) {
      setSocialData({
        username,
        name,
        email,
      })
    }
  }, [searchParams])

  const onSubmitSignup = () => {
    const formData = new FormData()
    const dataString = JSON.stringify({
      email: socialData.email,
      name: socialData.name,
      username: socialData.username,
      schoolName: watch('schoolName'),
      userType: socialUserType,
    })

    if (selectedImgFile) {
      formData.append('file', selectedImgFile)
    }
    const blob = new Blob([dataString], { type: 'application/json' })

    if (dataString) {
      formData.append('socialJoinReqDTO', blob)
    }

    socialSignup.mutate({ formData })
    // console.log('최종 제출', dataString)
  }

  return isSignupComplete ? (
    <Welcome name={socialData.name} isSocialLogin={isSocialLogin} />
  ) : (
    <SocialSignupForm
      setSocialUserType={setSocialUserType}
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      onSubmit={onSubmitSignup}
      setSelectedImgFile={setSelectedImgFile}
      socialData={socialData}
      watch={watch}
    />
  )
}
export default SocialLogin
