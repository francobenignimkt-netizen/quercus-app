import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import styles from './Login.module.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await signIn(email, password)

    if (error) {
      setError('Email o contraseña incorrectos')
      setLoading(false)
      return
    }

    navigate('/home')
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.emblem}>
        <h1 className={styles.wordmark}>QUERCUS</h1>
        <p className={styles.tagline}>Gestión de espacios exteriores</p>
      </div>

      <form className={styles.card} onSubmit={handleSubmit}>
        <h2 className={styles.cardTitle}>Iniciar sesión</h2>

        <div className={styles.field}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
          />
        </div>

        <div className={styles.field}>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button
          type="submit"
          className={styles.btnMain}
          disabled={loading}
        >
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>

        <p className={styles.forgot}>
          ¿Olvidaste tu contraseña? <span>Recuperar</span>
        </p>
      </form>
    </div>
  )
}
