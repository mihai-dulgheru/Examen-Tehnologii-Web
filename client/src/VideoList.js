import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Video from './Video'
import './css/VideoList.css'

function VideoList () {
  const navigate = useNavigate()
  const { favouriteListId } = useParams()
  const [videos, setVideos] = useState([])
  const refDescriere = useRef(null)
  const refTitlu = useRef(null)
  const refUrl = useRef(null)

  const getVideos = async () => {
    const response = await fetch(`api/favouriteLists/${favouriteListId}/videos`)
    const data = await response.json()
    setVideos(data)
  }

  const addVideo = async (video) => {
    await fetch(`/api/favouriteLists/${favouriteListId}/videos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(video)
    })
    getVideos()
  }

  const updateVideo = async (videoId, newVideo) => {
    await fetch(`/api/favouriteLists/${favouriteListId}/videos/${videoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newVideo)
    })
    getVideos()
  }

  const deleteVideo = async (videoId) => {
    await fetch(`/api/favouriteLists/${favouriteListId}/videos/${videoId}`, {
      method: 'DELETE'
    })
    getVideos()
  }

  useEffect(() => {
    getVideos()
  }, [])

  return (
    <>
      <div className='video-list'>
        <h1>Videos:</h1>
        <div className='header-videos'>
          <div>Descriere</div>
          <div>Titlu</div>
          <div>Url</div>
        </div>
        {videos.map((element) => (
          <Video key={element.id} item={element} onUpdate={updateVideo} onDelete={deleteVideo} />
        ))}
      </div>
      <div className='video-form'>
        <div className='video-form-input-descriere'>
          <input type='text' placeholder='descriere' ref={refDescriere} />
        </div>
        <div className='input-titlu'>
          <input type='text' placeholder='titlu' ref={refTitlu} />
        </div>
        <div className='input-url'>
          <input type='url' placeholder='url' ref={refUrl} />
        </div>
        <div className='add-button'>
          <button
            className='button-primary'
            onClick={() => {
              const descriere = refDescriere.current.value
              const titlu = refTitlu.current.value
              const url = refUrl.current.value
              if (descriere && titlu && url) {
                addVideo({
                  descriere,
                  titlu,
                  url
                })
                refDescriere.current.value = ''
                refTitlu.current.value = ''
                refUrl.current.value = ''
              }
            }}
          >
            Add
          </button>
        </div>
      </div>
      <div className='back'>
        <button
          className='button-info'
          onClick={() => {
            navigate('/')
          }}
        >
          Back
        </button>
      </div>
    </>
  )
}

export default VideoList
