import React from 'react'
import Camera from '../img/camera.png'
import More from '../img/more.png'

const ChatWindow = () => {
  return (
    <div className='chatWindow'>
      <div className='chatInfo'>
        <div className='userInfo'>
          <img src="https://imgv3.fotor.com/images/cover-photo-image/a-beautiful-girl-with-gray-hair-and-lucxy-neckless-generated-by-Fotor-AI.jpg"/>
          <span>Display name</span>
        </div>
        <div className='chatIcons'>
          <img src={Camera} />
          <img src={More} />
        </div>
      </div>
    </div>
  )
}

export default ChatWindow