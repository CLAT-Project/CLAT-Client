import { useUserQuery } from '@/hooks/queries/useUserQuery'

const useUser = () => {
  const { data: userData } = useUserQuery()

  const role = userData?.userType

  return {
    role,
    isProfessor: userData?.userType === 'ROLE_PROFESSOR',
    isStudent: userData?.userType === 'ROLE_STUDENT',
  }
}

export default useUser
