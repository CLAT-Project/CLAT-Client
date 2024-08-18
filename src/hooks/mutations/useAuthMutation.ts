import authApi from '@/apis/auth'
import { useMutation } from '@tanstack/react-query'

export const useSigninMutation = <TData>({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: TData) => void
  onError?: (error: Error) => void
}) => {
  return useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string
      password: string
    }) => authApi.postSingin({ username, password }),
    onSuccess: onSuccess,
    onError: onError,
  })
}
export const useSignupMutation = ({
  onSuccessFallback,
}: {
  onSuccessFallback: () => void
}) => {
  return useMutation({
    mutationFn: ({ formData }: { formData: FormData }) =>
      authApi.postSignup({ formData }),
    onSuccess: () => {
      onSuccessFallback()
    },
  })
}

export const useVerifyEmailMutation = () => {
  return useMutation({
    mutationFn: ({ email }: { email: string }) =>
      authApi.postVerifyEmail({ email }),
  })
}

export const useVerifyCodeMutation = ({
  onSuccessFallback,
}: {
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

export const useIdCheckMutation = () => {
  return useMutation({
    mutationFn: ({ username }: { username: string }) =>
      authApi.postCheckId({ username }),
  })
}
