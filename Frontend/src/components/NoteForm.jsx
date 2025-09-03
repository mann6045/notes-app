import { useState, useEffect } from 'react'

export default function NoteForm({ initial, onSubmit, submitLabel = 'Save' }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || '')
      setContent(initial.content || '')
    } else {
      setTitle('')
      setContent('')
    }
  }, [initial])

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return alert('Title is required')
    onSubmit({ title: title.trim(), content })
    if (!initial) { setTitle(''); setContent('') }
  }

  return (
    <form onSubmit={handleSubmit} className="row" style={{alignItems:'flex-start'}}>
      <div style={{flex:1}}>
        <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <div style={{marginTop:'.5rem'}}>
          <textarea placeholder="Content (optional)" rows={3} value={content} onChange={e=>setContent(e.target.value)} />
        </div>
      </div>
      <div>
        <button className="primary" type="submit">{submitLabel}</button>
      </div>
    </form>
  )
}