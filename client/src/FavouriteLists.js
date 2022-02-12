import React, { useEffect, useState, useRef } from 'react'
import FavouriteList from './FavouriteList'
import FavouriteListForm from './FavouriteListForm'
import FavouriteListDetails from './FavouriteListDetails'
import './css/FavouriteLists.css'

function FavouriteLists () {
  const [favouriteLists, setFavouriteLists] = useState([])
  const [selected, setSelected] = useState(0)
  const refDescription = useRef(null)
  const refDate = useRef(null)
  const refTextArea = useRef('')

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

  const filterFavouriteList = async (description, date) => {
    const response = await fetch(`/api/favouriteLists?descriere=${description}&data=${date}`)
    setFavouriteLists(await response.json())
  }

  const sortFavouriteList = async (desc) => {
    let response
    if (desc) {
      response = await fetch('/api/favouriteLists?sortBy=descriere&DESC=true')
    } else {
      response = await fetch('/api/favouriteLists?sortBy=descriere')
    }
    setFavouriteLists(await response.json())
  }

  const handleImport = async () => {
    const body = refTextArea.current.value
    if (body) {
      await fetch('/api/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      })
      getFavouriteLists()
    }
  }

  const handleExport = async () => {
    const response = await fetch('/api/export', {
      method: 'GET'
    })
    const data = await response.json()
    refTextArea.current.value = JSON.stringify(data)
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
            <div className='filtrare'>
              <div className='filtrare-description'>
                <label>Filter by description </label>
                <input type='text' placeholder='description' ref={refDescription} />
              </div>
              <div className='filtrare-date'>
                <label>Filter by date </label>
                <input type='date' ref={refDate} />
              </div>
              <div>
                <button
                  className='button-secondary'
                  onClick={() => {
                    const filterDescription = refDescription.current.value
                    const filterDate = refDate.current.value
                    filterFavouriteList(filterDescription, filterDate)
                  }}
                >
                  Filter
                </button>
              </div>
            </div>
            <div className='table'>
              <div className='header'>
                <div className='header-description'>
                  {'Description '}
                  <button className='button-sort' onClick={() => sortFavouriteList()}>
                    ▲
                  </button>
                  <button className='button-sort' onClick={() => sortFavouriteList(true)}>
                    ▼
                  </button>
                </div>
                <div className='header-date'>Date</div>
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
            <div className='import-export'>
              <textarea ref={refTextArea} />
              <br />
              <button className='button-primary' onClick={() => handleImport()}>
                Import
              </button>
              <button className='button-primary' onClick={() => handleExport()}>
                Export
              </button>
              <button className='button-primary' onClick={() => (refTextArea.current.value = '')}>
                Clear
              </button>
            </div>
          </>
          )}
    </>
  )
}

export default FavouriteLists
