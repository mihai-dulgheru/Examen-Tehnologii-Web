import React, { useRef, useState } from 'react'
import './css/Video.css'

function Video (props) {
  const { item, onUpdate, onDelete } = props
  const [isEditing, setIsEditing] = useState(false)
  const refDescriere = useRef(null)
  const refTitlu = useRef(null)
  const refUrl = useRef(null)

  return (
    <div className='video'>
      {isEditing
        ? (
          <div>
            <input type='text' placeholder={`${item.descriere}`} ref={refDescriere} />
            <input type='text' placeholder={`${item.titlu}`} ref={refTitlu} />
            <input type='url' placeholder={`${item.url}`} ref={refUrl} />
            <button
              className='button-succes'
              onClick={() => {
                const descriere = refDescriere.current.value
                const titlu = refTitlu.current.value
                const url = refUrl.current.value
                onUpdate(item.id, {
                  descriere,
                  titlu,
                  url
                })
                setIsEditing(false)
              }}
            >
              Save
            </button>
            <button className='button-info' onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
          )
        : (
          <div className='row'>
            <div className='descriere-video'>{item.descriere}</div>
            <div className='titlu-video'>{item.titlu}</div>
            <div className='url-video'>{item.url}</div>
            <button className='button-secondary' onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className='button-danger' onClick={() => onDelete(item.id)}>
              Delete
            </button>
          </div>
          )}
    </div>
  )
}

export default Video
