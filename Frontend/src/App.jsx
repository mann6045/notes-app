import { useEffect, useState } from 'react'
import { listNotes, createNote, updateNote, deleteNote } from './api'
import NoteForm from './components/NoteForm'
import { Link } from 'react-router-dom'

export default function App() {
  const [notes, setNotes] = useState([])
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')

  async function refresh() {
    setLoading(true)
    setErr('')
    try {
      setNotes(await listNotes())
    } catch (e) {
      setErr(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { refresh() }, [])

  async function handleCreate(data) {
    setErr('')
    try {
      await createNote(data)
      await refresh()
    } catch (e) {
      setErr(e.message)
    }
  }

  async function handleUpdate(id, data) {
    setErr('')
    try {
      await updateNote(id, data)
      await refresh()
      setEditing(null)
    } catch (e) {
      setErr(e.message)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this note?')) return
    setErr('')
    try {
      await deleteNote(id)
      await refresh()
    } catch (e) {
      setErr(e.message)
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Notes</h2>
        <p className="small">Shareable link: <code>/n/&lt;id&gt;</code> (click the 🔗 icon)</p>
        {err && <p style={{color:'crimson'}}>{err}</p>}
        <NoteForm onSubmit={handleCreate} submitLabel="Add" />
        <hr />
        {loading ? <p>Loading…</p> : (
          <ul>
            {notes.map(n => (
              <li key={n.id}>
                <div className="row" style={{justifyContent:'space-between'}}>
                  <div style={{flex:1}}>
                    <strong>{n.title}</strong>{' '}
                    <span className="badge">#{n.id}</span>
                    <div className="small">{(n.content||'').slice(0,120)}</div>
                  </div>
                  <div className="row">
                    <Link to={`/n/${n.id}`} title="Open share link" aria-label="Open share link">🔗</Link>
                    <button onClick={() => setEditing(n)}>Edit</button>
                    <button onClick={() => handleDelete(n.id)}>Delete</button>
                  </div>
                </div>
                {editing?.id === n.id && (
                  <div style={{marginTop:'.6rem'}}>
                    <NoteForm initial={editing} onSubmit={(data)=>handleUpdate(n.id, data)} submitLabel="Save" />
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}