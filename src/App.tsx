import { Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import DialogProvider from '@/contexts/dialog'
import Toaster from '@/components/toaster'
import PageBackground from '@/components/page_background'
import WebLoginPage from '@/pages/web_login'
import IndexPage from '@/pages/index'
import QQLoginPage from '@/pages/qq_login'
import store from '@/store'
import WebConfig from '@/components/web_config'

function App() {
  return (
    <DialogProvider>
      <Provider store={store}>
        <WebConfig />
        <PageBackground />
        <Toaster />
        <Routes>
          <Route element={<IndexPage />} path="/*" />
          <Route element={<QQLoginPage />} path="/qq_login" />
          <Route element={<WebLoginPage />} path="/web_login" />
        </Routes>
      </Provider>
    </DialogProvider>
  )
}

export default App
