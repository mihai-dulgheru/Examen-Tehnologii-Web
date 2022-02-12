import React, { useEffect, useState } from 'react'
import FavouriteList from './FavouriteList'
import FavouriteListForm from './FavouriteListForm'
import FavouriteListDetails from './FavouriteListDetails'
import './css/FavouriteLists.css'

function FavouriteLists () {
  const [favouriteLists, setFavouriteLists] = useState([])
  const [selected, setSelected] = useState(0)

  const getFavouriteLists = async () => {
    const response = await fetch('/api/favouriteLists')
    const data = await response.json()
    setFavouriteLists(data)
  }

  const addFavouriteList = async (favouriteList) => {
    await fetch('/api/favouriteLists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(favouriteList)
    })
    getFavouriteLists()
  }

  const updateFavouriteList = async (favouriteListId, newFavouriteList) => {
    await fetch(`/api/favouriteLists/${favouriteListId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFavouriteList)
    })
    setSelected(0)
    getFavouriteLists()
  }

  const deleteFavouriteList = async (favouriteListId) => {
    await fetch(`/api/favouriteLists/${favouriteListId}`, {
      method: 'DELETE'
    })
    getFavouriteLists()
  }

  useEffect(() => {
    getFavouriteLists()
  }, [])

  return (
    <>
      {selected !== 0
        ? (
          <>
            <FavouriteListDetails
              item={favouriteLists.find((element) => element.id === selected)}
              onSave={updateFavouriteList}
              onCancel={() => setSelected(0)}
            />
          </>
          )
        : (
          <>
            <div className='table'>
              <div className='header'>
                <div className='header-descriere'>Descriere</div>
                <div className='header-data'>Data</div>
              </div>
              <div className='favouriteLists'>
                {favouriteLists.map((element) => (
                  <FavouriteList
                    key={element.id}
                    item={element}
                    onSelect={() => setSelected(element.id)}
                    onDelete={deleteFavouriteList}
                  />
                ))}
              </div>
            </div>
            <FavouriteListForm onAdd={addFavouriteList} />
          </>
          )}
    </>
  )
}

export default FavouriteLists
