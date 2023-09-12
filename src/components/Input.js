import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { ChatContext } from '../contexts/ChatContext';
import { db, storage } from '../firebase';
import AddImage from '../img/addImage.png';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Input = () => {
  const [message, SetMessage] = useState("");
  const [img, SetImg] = useState(null);

  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  async function handleSend(){
    if(img){
      const storageRef = ref(storage, uuid());

      await uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then( async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              message: message,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              img: downloadURL
            })
          })
        });
      }
    );

    }else{
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          message: message,
          senderId: currentUser.uid,
          date: Timestamp.now()
        })
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid),{
      [data.chatId + ".lastMessage"]: {
        message
      },
      [data.chatId + ".date"]: serverTimestamp()
    });

    await updateDoc(doc(db, "userChats", data.user.uid),{
      [data.chatId + ".lastMessage"]: {
        message
      },
      [data.chatId + ".date"]: serverTimestamp()
    });

    SetMessage("");
    SetImg(null);
  }

  return (
    <div className='input'>
        <input type='text' placeholder='Type a message' onChange={(e)=>SetMessage(e.target.value)} value={message}/>
        <div className='send'>
            <input style={{display: 'none'}} type="file" id='file' onChange={(e)=>SetImg(e.target.files[0])}/>
            <label htmlFor='file'>
                <img src={AddImage} />
            </label>
            <button onClick={handleSend}>Send</button>
        </div>
    </div>
  )
}

export default Input