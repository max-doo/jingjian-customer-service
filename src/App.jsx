import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import CustomerApp from './pages/CustomerApp'
import BackendLayout from './pages/BackendLayout'
import Home from './pages/Home'

function App() {
  // 根据 Vite base 路径自动匹配 BrowserRouter 的 basename
  const baseUrl = import.meta.env.BASE_URL || '/'
  const basename = baseUrl === '/' ? '/' : baseUrl.replace(/\/$/, '')
  
  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer" element={<CustomerApp />} />
        <Route path="/admin" element={<BackendLayout />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App

