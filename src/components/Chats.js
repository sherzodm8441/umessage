import React, { useContext, useEffect, useState } from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from '../contexts/AuthContext';
import { ChatContext } from '../contexts/ChatContext';

const Chats = () => {
    const [chats, SetChats] = useState({});

    const {currentUser} = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(()=>{
        const getChats = () => {const unsubscribe = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
            SetChats(doc.data());
        });

        return () => {
            unsubscribe();
        }}

        currentUser.uid && getChats();
    },[currentUser.uid])

    function handleSelect(info){
        dispatch({type: "CHANGE_USER", payload: info})
    }

  return (
    <div className='chats'>
        {Object.entries(chats)?.sort((a,b) => b[1].date - a[1].date).map((chat)=>(
            <div className='userChat' key={chat[0]} onClick={()=>(handleSelect(chat[1].userInfo))}>
                {chat[1].userInfo.photoUrl ? <img src={chat[1].userInfo.photoUrl} /> :
                <div className="userInitial">{chat[1].userInfo.displayName[0].toUpperCase()}</div>}
                <div className='userChatInfo'>
                    <span >{chat[1].userInfo.displayName}</span>
                    <p>{chat[1].lastMessage?.message}</p>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Chats