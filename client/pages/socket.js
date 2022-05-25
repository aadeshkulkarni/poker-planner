import { useEffect, useState } from 'react'
import io from 'socket.io-client'
const socket = io.connect('http://localhost:4000')

const SocketComponent = () => {
  const [room, setRoom] = useState()
  const [story, setStory] = useState()
  const [storyList, setStoryList] = useState([])

  useEffect(() => {
    socket.on('STORIES', data => {
      setStoryList([...storyList, data])
    })
  }, [socket])

  function JoinRoom() {
    if (room != '') {
      socket.emit('JOIN__ROOM', room)
    }
  }
  function CreateStory() {
    const data={ room: room, story: story }
    setStoryList([...storyList,data])
    socket.emit('CREATE_STORY',data )
  }

  return (
    <div className='main'>
      <div className='box-container'>
        <input type='text' placeholder='Enter room number' value={room} onChange={e => setRoom(e.target.value)} />
        <button onClick={JoinRoom}>Enter room</button>
      </div>
      <div className='box-container'>
        <input type='text' placeholder='Enter story title' value={story} onChange={e => setStory(e.target.value)} />
        <button onClick={CreateStory}>Add Story</button>
      </div>
      {storyList && storyList.map(record => <div>{record.story}</div>)}
    </div>
  )
}

export default SocketComponent
