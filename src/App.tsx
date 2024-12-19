import { useLocalStorage } from '@uidotdev/usehooks'
import { Suspense, lazy, useEffect } from 'react'
import { Provider } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'

import key from '@/const/key'

import PageBackground from '@/components/page_background'
import PageLoading from '@/components/page_loading'
import Toaster from '@/components/toaster'

import DialogProvider from '@/contexts/dialog'
import AudioProvider from '@/contexts/songs'

import useAuth from '@/hooks/auth'

import store from '@/store'

const WebLoginPage = lazy(() => import('@/pages/web_login'))
const IndexPage = lazy(() => import('@/pages/index'))
const QQLoginPage = lazy(() => import('@/pages/qq_login'))

function App() {
  return (
    <DialogProvider>
      <Provider store={store}>
        <PageBackground />
        <Toaster />
        <AudioProvider>
          <Suspense fallback={<PageLoading />}>
            <AuthChecker>
              <AppRoutes />
            </AuthChecker>
          </Suspense>
        </AudioProvider>
      </Provider>
    </DialogProvider>
  )
}

function AuthChecker({ children }: { children: React.ReactNode }) {
  const { isAuth } = useAuth()
  const [storeURL] = useLocalStorage(key.storeURL)
  const navigate = useNavigate()

  const isStoreURLInvalid =
    !!storeURL && storeURL !== 'http://' && storeURL !== 'https://'

  useEffect(() => {
    if (!isAuth || !isStoreURLInvalid) {
      const search = new URLSearchParams(window.location.search)
      const token = search.get('token')
      const back = search.get('back') || ''
      let url = '/web_login'

      if (token && isStoreURLInvalid) {
        url += `?token=${token}`
      }
      if (back) {
        url += `&back=${back}`
      }
      navigate(url, { replace: true })
    }
  }, [isAuth, storeURL, navigate])

  return <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/*" />
      <Route element={<QQLoginPage />} path="/qq_login" />
      <Route element={<WebLoginPage />} path="/web_login" />
    </Routes>
  )
}

export default App
