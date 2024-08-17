import authApi from '@/apis/auth'
import { useMutation } from '@tanstack/react-query'

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: ({ formData }: { formData: FormData }) =>
      authApi.postSignup({ formData }),
  })
}
