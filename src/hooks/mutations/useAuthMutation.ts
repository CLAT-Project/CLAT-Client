import authApi from '@/apis/auth'
import { useMutation } from '@tanstack/react-query'

export const useSigninMutation = () => {
  return useMutation({
    mutationFn: ({
      userName,
      password,
    }: {
      userName: string
      password: string
    }) => authApi.postSingin({ userName, password }),
  })
}
export const useSignupMutation = () => {
  return useMutation({
    mutationFn: ({ formData }: { formData: FormData }) =>
      authApi.postSignup({ formData }),
  })
}

export const useVerifyEmailMutation = () => {
  return useMutation({
    mutationFn: ({ email }: { email: string }) =>
      authApi.postVerifyEmail({ email }),
  })
}

export const useVerifyCodeMutation = ({onSuccessFallback}: {
  onSuccessFallback: () => void
}) => {
  return useMutation({
    mutationFn: ({
      email,
      verificationCode,
    }: {
      email: string
      verificationCode: number
    }) => authApi.postVerifyNum({ email, verificationCode }),
    onSuccess: () => {
      onSuccessFallback()
    },
    
  })
}
