import { mutipartApi } from '@/apis/axios'

const postSignup = async ({ formData }: { formData: FormData }) => {
  try {
    const { data } = await mutipartApi.post('/auth/signup', {
      formData,
    })

    return data
  } catch (error) {
    throw error
  }
}

const authApi = {
  postSignup,
}

export default authApi
