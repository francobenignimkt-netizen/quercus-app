import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import styles from './Layout.module.css'

export default function Layout() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  const initials = user?.email?.slice(0, 2).toUpperCase() || 'Q'

  return (
    <div className={styles.shell}>
      {/* Header */}
      <header className={styles.header}>
        <span className={styles.wordmark}>QUERCUS</span>
        <div className={styles.avatar} onClick={handleSignOut} title="Cerrar sesión">
          {initials}
        </div>
      </header>

      {/* Contenido */}
      <main className={styles.main}>
        <Outlet />
      </main>

      {/* Bottom nav */}
      <nav className={styles.bottomNav}>
        <NavLink to="/home" className={({ isActive }) => isActive ? styles.navActive : styles.navItem}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            <polyline points="9,22 9,12 15,12 15,22"/>
          </svg>
          <span>Inicio</span>
        </NavLink>
        <NavLink to="/novedades" className={({ isActive }) => isActive ? styles.navActive : styles.navItem}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
          <span>Novedades</span>
        </NavLink>
        <NavLink to="/cuenta" className={({ isActive }) => isActive ? styles.navActive : styles.navItem}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
          <span>Mi cuenta</span>
        </NavLink>
        <NavLink to="/galeria" className={({ isActive }) => isActive ? styles.navActive : styles.navItem}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21,15 16,10 5,21"/>
          </svg>
          <span>Galería</span>
        </NavLink>
      </nav>
    </div>
  )
}
