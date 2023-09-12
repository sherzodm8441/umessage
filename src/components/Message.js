import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { ChatContext } from '../contexts/ChatContext';

const Message = ({message}) => {
  const {currentUser} = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(()=>{
    ref.current?.scrollIntoView({
      behavior: "smooth", 
      block: "nearest",
      inline: "start"
  });
  },[message])

  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && 'self'}`}>
      <div className='messageInfo'>
        {((message.senderId === currentUser.uid) ? currentUser.photoUrl : data.user.photoUrl) ? <img src={message.senderId === currentUser.uid ? currentUser.photoUrl : data.user.photoUrl}/> :
        <div className="userInitial">{message.senderId === currentUser.uid ? currentUser.displayName?.[0].toUpperCase() : data.user.displayName?.[0].toUpperCase()}</div>}
        <span>12:09</span>
      </div>
      <div className='messageContent'>
        {message.message && <p>{message.message}</p>}
        {message.img && <img src={message.img} />}
      </div>
    </div>
  )
}

export default Message