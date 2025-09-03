import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getNote } from '../api'

export default function NoteView() {
  const { id } = useParams()
  const [note, setNote] = useState(null)
  const [err, setErr] = useState('')

  useEffect(() => {
    (async () => {
      try {
        setNote(await getNote(id))
      } catch (e) {
        setErr(e.message)
      }
    })()
  }, [id])

  if (err) return <div className="container"><div className="card"><p style={{color:'crimson'}}>{err}</p><Link to="/">Back</Link></div></div>
  if (!note) return <div className="container"><div className="card">Loading…</div></div>

  return (
    <div className="container">
      <div className="card">
        <div className="row" style={{justifyContent:'space-between'}}>
          <h2 style={{margin:0}}>{note.title}</h2>
          <Link to="/">Home</Link>
        </div>
        <p>{note.content}</p>
        <div className="small">Note ID: {note.id}</div>
      </div>
    </div>
  )
}