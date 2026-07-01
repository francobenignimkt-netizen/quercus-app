import { useState, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/AuthContext'
import styles from './Novedades.module.css'

const TIPOS = ['Consulta', 'Plaga', 'Riego', 'Poda', 'Presupuesto', 'Otro']

export default function Novedades() {
  const { user } = useAuth()
  const fileInputRef = useRef()

  const [fotos, setFotos] = useState([])
  const [previews, setPreviews] = useState([])
  const [comentario, setComentario] = useState('')
  const [tipo, setTipo] = useState('Consulta')
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState('')

  const handleFotos = (e) => {
    const archivos = Array.from(e.target.files).slice(0, 3)
    setFotos(archivos)
    setPreviews(archivos.map(f => URL.createObjectURL(f)))
  }

  const eliminarFoto = (i) => {
    setFotos(prev => prev.filter((_, idx) => idx !== i))
    setPreviews(prev => prev.filter((_, idx) => idx !== i))
  }

  const handleEnviar = async () => {
    if (!comentario.trim() && fotos.length === 0) {
      setError('Agregá una foto o un comentario')
      return
    }
    setError('')
    setEnviando(true)

    try {
      // Subir fotos al storage
      const urlsFotos = []
      for (const foto of fotos) {
        const ext = foto.name.split('.').pop()
        const nombre = `${user.id}/${Date.now()}.${ext}`
        const { error: uploadError } = await supabase.storage
          .from('fotos')
          .upload(nombre, foto)
        if (uploadError) throw uploadError

        const { data } = supabase.storage.from('fotos').getPublicUrl(nombre)
        urlsFotos.push(data.publicUrl)
      }

      // Guardar novedad en la base de datos
      const { error: dbError } = await supabase.from('novedades').insert({
        user_id: user.id,
        comentario: comentario.trim(),
        tipo: tipo.toLowerCase(),
        fotos: urlsFotos,
      })
      if (dbError) throw dbError

      // Limpiar formulario
      setFotos([])
      setPreviews([])
      setComentario('')
      setTipo('Consulta')
      setEnviado(true)
      setTimeout(() => setEnviado(false), 3000)
    } catch (err) {
      setError('Hubo un error al enviar. Intentá de nuevo.')
      console.error(err)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Enviar novedad</h2>
      <p className={styles.sub}>Compartí fotos o consultas con el equipo de Quercus</p>

      {enviado && (
        <div className={styles.successBanner}>
          ✓ Novedad enviada correctamente
        </div>
      )}

      {/* Fotos */}
      <div className={styles.card}>
        <div className={styles.cardLabel}>Fotos (hasta 3)</div>
        <div className={styles.fotoGrid}>
          {previews.map((src, i) => (
            <div key={i} className={styles.fotoSlot} onClick={() => eliminarFoto(i)}>
              <img src={src} alt={`foto ${i+1}`} className={styles.fotoImg} />
              <div className={styles.fotoRemove}>✕</div>
            </div>
          ))}
          {previews.length < 3 && (
            <div className={styles.fotoAdd} onClick={() => fileInputRef.current.click()}>
              <span className={styles.fotoAddIcon}>+</span>
              <span className={styles.fotoAddLabel}>Agregar</span>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          onChange={handleFotos}
        />
      </div>

      {/* Tipo */}
      <div className={styles.card}>
        <div className={styles.cardLabel}>Tipo de novedad</div>
        <div className={styles.tipoGrid}>
          {TIPOS.map(t => (
            <button
              key={t}
              className={tipo === t ? `${styles.tipoPill} ${styles.tipoActive}` : styles.tipoPill}
              onClick={() => setTipo(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Comentario */}
      <div className={styles.card}>
        <div className={styles.cardLabel}>Comentario</div>
        <textarea
          className={styles.textarea}
          placeholder="Ej: El rosal tiene manchas amarillas en las hojas..."
          value={comentario}
          onChange={e => setComentario(e.target.value)}
          rows={4}
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button
        className={styles.btnEnviar}
        onClick={handleEnviar}
        disabled={enviando}
      >
        {enviando ? 'Enviando...' : 'Enviar a Quercus'}
      </button>
    </div>
  )
}

