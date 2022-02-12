import React, { useRef } from 'react'
import './css/FavouriteListForm.css'

function FavouriteListForm (props) {
  const { onAdd } = props
  const refDescriere = useRef(null)
  const refData = useRef(null)

  const addFavouriteList = (e) => {
    const descriere = refDescriere.current.value
    const data = refData.current.value
    onAdd({ descriere, data })
    refDescriere.current.value = ''
    refData.current.value = ''
  }

  return (
    <div className='form'>
      <div className='input-descriere'>
        <input type='text' placeholder='descriere' ref={refDescriere} />
      </div>
      <div className='input-data'>
        <input type='date' placeholder='data' ref={refData} />
      </div>
      <div className='add-button'>
        <button className='button-primary' onClick={addFavouriteList}>
          Add
        </button>
      </div>
    </div>
  )
}

export default FavouriteListForm
