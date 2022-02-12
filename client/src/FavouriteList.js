import React from 'react'
import { useNavigate } from 'react-router-dom'
import './css/FavouriteList.css'

function FavouriteList (props) {
  const navigate = useNavigate()
  const { item, onSelect, onDelete } = props

  const deleteFavouriteList = () => {
    onDelete(item.id)
  }

  return (
    <div className='favouriteList'>
      <div className='descriere'>{item.descriere}</div>
      <div className='data'>{new Date(item.data).toLocaleDateString()}</div>
      <div className='buttons'>
        <button className='button-secondary' onClick={() => onSelect()}>
          Edit
        </button>
        <button className='button-danger' onClick={deleteFavouriteList}>
          Delete
        </button>
        <button className='button-info' onClick={() => navigate(`/favouriteLists/${item.id}`)}>
          Videos
        </button>
      </div>
    </div>
  )
}

export default FavouriteList
