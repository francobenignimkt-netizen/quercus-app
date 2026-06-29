import { useAuth } from '../lib/AuthContext'
import styles from './Home.module.css'

export default function Home() {
  const { user } = useAuth()
  const nombre = user?.email?.split('@')[0] || 'cliente'

  return (
    <div className={styles.page}>
      <div className={styles.greeting}>
        <h2>Hola, {nombre} 👋</h2>
        <p>Tu jardín está en buenas manos</p>
      </div>

      {/* Próxima visita */}
      <div className={styles.nextCard}>
        <div className={styles.ncLabel}>Próxima visita</div>
        <div className={styles.ncDate}>Jueves 3 de julio, 9:00 hs</div>
        <div className={styles.ncDesc}>Poda general + revisión riego automático</div>
        <div className={styles.ncPin}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          Av. San Martín 1240
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.cardIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
          </div>
          <div className={styles.cardTitle}>Subir foto</div>
          <div className={styles.cardSub}>Compartir novedad</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
            </svg>
          </div>
          <div className={styles.cardTitle}>Mi cuenta</div>
          <div className={styles.cardSub}>Facturas y pagos</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <div className={styles.cardTitle}>Presupuesto</div>
          <div className={styles.cardSub}>Solicitar trabajo</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21,15 16,10 5,21"/>
            </svg>
          </div>
          <div className={styles.cardTitle}>Galería</div>
          <div className={styles.cardSub}>Evolución del jardín</div>
        </div>
      </div>

      {/* Novedades */}
      <div className={styles.secTitle}>Últimas novedades</div>
      <div className={styles.actItem}>
        <div className={styles.dot}></div>
        <div>
          <div className={styles.actText}>Visita realizada — poda de setos y fertilizante</div>
          <div className={styles.actDate}>Lun 23 jun · Juan P.</div>
        </div>
      </div>
      <div className={styles.actItem}>
        <div className={`${styles.dot} ${styles.warn}`}></div>
        <div>
          <div className={styles.actText}>Factura #0047 pendiente — $18.500</div>
          <div className={styles.actDate}>15 jun 2026</div>
        </div>
      </div>
    </div>
  )
}
