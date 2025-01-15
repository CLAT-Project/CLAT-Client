import { useMutation } from '@tanstack/react-query'
import { Api } from '@/apis/axios'
import { useRouter } from 'next/navigation'

interface ReportParams {
  description: string
  filepath: File | null
}

const useReportMutation = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: ({ description, filepath }: ReportParams) => {
      const formData = new FormData()
      formData.append('description', description)
      if (filepath) formData.append('file', filepath)

      const accessToken = localStorage.getItem('accessToken')

      return Api.post('/help/report', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    },
    onSuccess: (data) => {
      console.log('문의가 성공적으로 전송되었습니다.', data)
      router.push('/home/csCenter/contactUs/success')
    },
    onError: (error) => {
      console.error('문의 전송 중 오류 발생', error)
    },
  })
}

export default useReportMutation
