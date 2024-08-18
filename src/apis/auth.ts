import { Api, mutipartApi } from '@/apis/axios'

/**
 * @description 로그인 요청
 * @param param { username, password }
 * @returns 
 */
const postSingin = async ({
  username,
  password,
}: {
  username: string
  password: string
}) => {
  try {
    const { data, headers } = await Api.post(`/login`, {
      username,
      password,
    })

    const accessToken = headers['authorization']
    console.log(headers, 'headers')

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken)
    }
    return data
  } catch (error) {
    throw error
  }
}
/**
 * @description 회원가입 요청
 * @description multipart/form-data 형식으로 요청
 * @param param { formData : joinDto: json형태의 입력값, file: 이미지 파일 }
 * @returns user name을 반환
 */
const postSignup = async ({ formData }: { formData: FormData }) => {
  const { data, headers } = await mutipartApi.post('/join', formData)

  const accessToken = headers['authorization']
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken)
  }
  return data
}
/**
 * @description 이메일 인증 요청
 * @param param { email:string }
 * @returns 
 */
const postVerifyEmail = async ({ email }: { email: string }) => {
  const { data } = await Api.post(`/verify-email`, {
    email,
  })

  return data
}
/**
 * @description 인증번호 확인 요청
 * @param param { email, verificationCode: 6자리 숫자 }
 * @returns 
 */
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
/**
 * @description 리프레시 토큰으로 새로운 엑세스 토큰 발급 요청
 * @param param 
 * @returns 
 */
const silentRefresh = async () => {
  try {
    const { data } = await Api.post('/reIssue')

    localStorage.setItem('accessToken', data.accessToken)

    return data
  } catch (error) {
    throw error
  }
}
/**
 * @description 중복 아이디 체크 요청
 * @param param { username: string }
 * @returns 
 */
const postCheckId = async ({ username }: { username: string }) => {
  const { data } = await Api.post(`/idCheck`, {
    username,
  })

  return data
}
const authApi = {
  postSingin,
  postSignup,
  postVerifyEmail,
  postVerifyNum,
  silentRefresh,
  postCheckId,
}

export default authApi
