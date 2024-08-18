import { Api, mutipartApi } from '@/apis/axios'

const postSingin = async ({
  userName,
  password,
}: {
  userName: string
  password: string
}) => {
  try {
    const { data, headers } = await Api.post(`/login`, {
      userName,
      password,
    })

    const accessToken = headers['authorization']
    localStorage.setItem('accessToken', accessToken)

    return data
  } catch (error) {
    throw error
  }
}
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

const postVerifyEmail = async ({ email }: { email: string }) => {
  const { data } = await Api.post(`/verify-email`, {
    email,
  })

  return data
}

const postVerifyNum = async ({
  email,
  verificationCode,
}: {
  email: string
  verificationCode: number
}) => {
  const { data } = await Api.post(`/verification-code`, {
    email,
    code: verificationCode,
  })

  return data
}

const silentRefresh = async () => {
  try {
    const { data } = await Api.post('/reIssue')

    localStorage.setItem('accessToken', data.accessToken)

    return data
  } catch (error) {
    throw error
  }
}
const authApi = {
  postSingin,
  postSignup,
  postVerifyEmail,
  postVerifyNum,
  silentRefresh,
}

export default authApi
