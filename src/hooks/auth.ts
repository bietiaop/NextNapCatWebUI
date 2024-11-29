import key from '@/const/key'
import { useLocalStorage } from '@uidotdev/usehooks'

const useAuth = () => {
  const [token, setToken] = useLocalStorage<string>(key.token, '')

  return {
    token,
    isAuth: !!token,
    revokeAuth: () => setToken('')
  }
}

export default useAuth
