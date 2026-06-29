import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './lib/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import Login from './pages/Login'
import Home from './pages/Home'
import './styles/global.css'

// Páginas placeholder para las otras secciones
const Placeholder = ({ title }) => (
  <div style={{ padding: '24px', textAlign: 'center', color: 'var(--q-muted)', paddingTop: '60px' }}>
    <div style={{ fontSize: '40px', marginBottom: '12px' }}>🌿</div>
    <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--q-text)', marginBottom: '6px' }}>{title}</div>
    <div style={{ fontSize: '13px' }}>Próximamente disponible</div>
  </div>
)

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta pública */}
          <Route path="/login" element={<Login />} />

          {/* Rutas protegidas */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="home" element={<Home />} />
            <Route path="novedades" element={<Placeholder title="Novedades" />} />
            <Route path="cuenta" element={<Placeholder title="Mi cuenta" />} />
            <Route path="galeria" element={<Placeholder title="Galería" />} />
          </Route>

          {/* Cualquier otra ruta → login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

