import authApi from '@/apis/auth'
import { Profile } from '@/types/user.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

// TODO : 인증번호 유효 입력 기간 설정
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
    onSuccess,
    onError,
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
    onSuccess: () => {
      toast.success('인증번호가 발송되었습니다.')
    },
    onError: (error: any) => {
      toast.error(error.response.data.message)
    },
  })
}

// 비밀번호찾기
export const useFindPassword = <TData>({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: TData) => void
  onError?: (error: Error) => void
}) => {
  return useMutation({
    mutationFn: ({ username, email }: { username: string; email: string }) =>
      authApi.postFindPwd({ username, email }),
    onSuccess,
    onError,
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
    onError: (error: any) => {
      toast.error(error.response.data.message)
    },
  })
}

export const useIdCheckMutation = () => {
  return useMutation({
    mutationFn: ({ username }: { username: string }) =>
      authApi.postCheckId({ username }),
  })
}

export const useLogoutMutation = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => authApi.postLogout(),
    onSuccess: () => {
      router.push('/login')
      queryClient.clear()
    },
  })
}

// 탈퇴 요청을 비동기적으로 처리
export const useDeleteMutation = <TData>({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: TData) => void
  onError?: (error: Error) => void
}) => {
  return useMutation({
    // 탈퇴 요청 함수
    mutationFn: ({
      username,
      password,
    }: {
      username: string
      password: string
    }) => authApi.postDelete({ username, password }),
    onSuccess,
    onError: (error) => {
      onError?.(error)
    },
  })
}

export const useReconfirmPassword = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any) => void
  onError?: (error: Error) => void
}) => {
  const router = useRouter()

  return useMutation({
    mutationFn: ({ password }: { password: string }) =>
      authApi.postReconfirmPassword({ password }),
    onSuccess: (data) => {
      onSuccess?.(data)
      router.push('/home/setting/myPage/userInfo')
    },
    onError: (error) => {
      onError?.(error)
      alert('비밀번호가 틀렸습니다.')
    },
  })
}

export const useModifyProfileMutation = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: ({
      newData,
      emailVerified,
    }: {
      newData: Profile
      emailVerified: boolean
    }) => authApi.postModifyProfile(newData, emailVerified),
    onSuccess: () => {
      toast.success('회원 정보가 수정되었습니다.')
      router.push('/home/setting/myPage')
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || '회원 정보 수정에 실패했습니다.',
      )
    },
  })
}
