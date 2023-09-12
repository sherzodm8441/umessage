import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../contexts/ChatContext';
import { db } from '../firebase';
import Message from './Message'

const Messages = () => {
  const chatContext = useContext(ChatContext);

  const [messages, setMessages] = useState([]);

  useEffect(()=>{
    const unsubscribe = onSnapshot(doc(db, "chats", chatContext.data.chatId), (doc) => {
      if(doc.exists()){
        setMessages(doc.data().messages);
        console.log(messages);
      }

      
    });

    return ()=>{
      unsubscribe();
    }
  },[chatContext.data.chatId]);

  

  return (
    <div className='messages'>
      {messages.map((message)=>(
        <Message message={message}/>
      ))}
    </div>
  )
}

export default Messages