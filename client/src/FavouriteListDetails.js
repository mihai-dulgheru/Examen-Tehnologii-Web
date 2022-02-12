import React, { useRef } from 'react'
import './css/FavouriteListDetails.css'

function FavouriteListDetails (props) {
  const { item, onSave, onCancel } = props
  const refDescriere = useRef(null)
  const refData = useRef(null)

  const saveMeeting = () => {
    const descriere = refDescriere.current.value ? refDescriere.current.value : item.descriere
    const data = refData.current.value ? refData.current.value : item.data
    onSave(item.id, { descriere, data })
  }

  return (
    <div className='update-form'>
      <div>
        <label htmlFor='descriere'>Descriere: </label>
        <input id='descriere' type='text' placeholder={`${item.descriere}`} ref={refDescriere} />
      </div>
      <div>
        <label htmlFor='data'>Data: </label>
        <input id='data' type='date' ref={refData} />
      </div>
      <div>
        <div>
          <button className='button-succes' onClick={saveMeeting}>
            Save
          </button>
          <button className='button-info' onClick={() => onCancel()}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default FavouriteListDetails
