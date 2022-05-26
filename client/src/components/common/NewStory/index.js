import React, { useState } from 'react'

const NewStory = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [ac, setAc] = useState('')
  return (
    <div className='modal-overlay'>
      <div className='modal-container'>
        <div className='modal-header'>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0 }}>
              <input type='text' placeholder='Story title' value={title} onChange={e => setTitle(e.target.value)} />
            </h3>
            <h3 style={{ margin: 0 }}>{2}</h3>
          </div>
        </div>
        <div className='modal-body'>
          <div className='grid-cols-2'>
            <span>
              <b>Story Description:</b>
            </span>
            <input type='text' value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <div className='grid-cols-2'>
            <span>
              <b>Acceptance Criteria:</b>
            </span>
            <input type='text' value={ac} onChange={e => setAc(e.target.value)} />
          </div>
        </div>
        <div className='modal-footer grid-cols-2'>
          <button
            className='btn-primary'
            onClick={() => {
              onCancel(false)
            }}
          >
            Discard
          </button>
          <button className='btn-primary' onClick={() => onSubmit({ title: title, description: description, ac: ac })}>
            Create story
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewStory
