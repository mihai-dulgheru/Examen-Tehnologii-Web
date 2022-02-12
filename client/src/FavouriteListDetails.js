import React, { useRef } from 'react'
import './css/FavouriteListDetails.css'

function FavouriteListDetails (props) {
  const { item, onSave, onCancel } = props
  const refDescription = useRef(null)
  const refDate = useRef(null)

  const saveMeeting = () => {
    const descriere = refDescription.current.value ? refDescription.current.value : item.descriere
    const data = refDate.current.value ? refDate.current.value : item.data
    onSave(item.id, { descriere, data })
  }

  return (
    <div className='update-form'>
      <div>
        <label htmlFor='description'>Description: </label>
        <input id='description' type='text' placeholder={`${item.descriere}`} ref={refDescription} />
      </div>
      <div>
        <label htmlFor='date'>Date: </label>
        <input id='date' type='date' ref={refDate} />
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
