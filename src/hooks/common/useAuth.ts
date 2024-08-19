import { useState, useEffect } from 'react'

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const token = localStorage.getItem('accessToken')
    return !!token
  })  
  
  const logout = () => {
    localStorage.removeItem('accessToken')
    setIsAuthenticated(false)
  }

  useEffect(() => {
    const token = localStorage.getItem('accessToken')

    if (token) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [])
  
  return {
    isAuthenticated,
    logout,
  }
}

export default useAuth
