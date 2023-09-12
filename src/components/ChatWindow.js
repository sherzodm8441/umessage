import React from 'react'
import Camera from '../img/camera.png'
import More from '../img/more.png'
import Messages from './Messages'
import Input from './Input'
import { useContext } from 'react'
import { ChatContext } from '../contexts/ChatContext'


const ChatWindow = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className='chatWindow'>
      <div className='chatInfo'>
        <div className='userInfo'>
          {data.user.photoUrl ? <img src={data.user.photoUrl} alt=""/> :
          <div className="userInitial">{data.user.displayName?.[0].toUpperCase()}</div>}
          <span>{data.user.displayName}</span>
        </div>
        <div className='chatIcons'>
          <img src={Camera} />
          <img src={More} />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default ChatWindow