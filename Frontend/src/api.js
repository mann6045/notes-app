const base = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || 'http://localhost:8080'

export async function listNotes() {
  const res = await fetch(`${base}/api/notes`)
  if (!res.ok) throw new Error('Failed to fetch notes')
  return res.json()
}

export async function getNote(id) {
  const res = await fetch(`${base}/api/notes/${id}`)
  if (!res.ok) throw new Error('Not found')
  return res.json()
}

export async function createNote(payload) {
  const res = await fetch(`${base}/api/notes`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
  })
  if (!res.ok) throw new Error('Create failed')
  return res.json()
}

export async function updateNote(id, payload) {
  const res = await fetch(`${base}/api/notes/${id}`, {
    method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
  })
  if (!res.ok) throw new Error('Update failed')
  return res.json()
}

export async function deleteNote(id) {
  const res = await fetch(`${base}/api/notes/${id}`, {
    method: 'DELETE'
  })
  if (!res.ok) throw new Error('Delete failed')
  return res.json()
}