import React, { useContext, useState } from 'react'
import { db } from '../firebase';
import { collection, query, where, getDocs, doc, getDoc, setDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { AuthContext } from '../contexts/AuthContext';

const Search = () => {

  const [username, SetUsername] = useState("");
  const [foundUser, SetFoundUser] = useState(null);
  const [error, SetError] = useState(false);

  const {currentUser} = useContext(AuthContext);

  async function handleSearch(){
    const q = query(collection(db, "users"), where("displayName", "==", username));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        SetFoundUser(doc.data());
      });
    } catch (error) {
      SetError(true)
    }
  }

  function handleKey(event){
    if(event.code === "Enter"){
      handleSearch();
    }
  }

  async function handleSelect(){
    //check for chat between these two users in firestore
    const combinedId = 
    (currentUser.uid > foundUser.uid) 
    ? currentUser.uid + foundUser.uid 
    : foundUser.uid + currentUser.uid;

    try {
      const result = await getDoc(doc(db, "chats", combinedId));

      if(!result.exists()){
        //if chat does not exist we create one
        await setDoc(doc(db, "chats", combinedId), { messages: []});

        //add to user'sChats
        await updateDoc(doc(db, "userChats", currentUser.uid),{
          [combinedId + ".userInfo"]: {
            uid: foundUser.uid,
            displayName: foundUser.displayName,
            photoUrl: foundUser.photoUrl || "",
          },
          [combinedId + ".date"]: serverTimestamp()
        });

        await updateDoc(doc(db, "userChats", foundUser.uid),{
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoUrl: currentUser.photoUrl || "",
          },
          [combinedId + ".date"]: serverTimestamp()
        });
      }
    } catch (error) {
      console.log(error);
    }

    SetFoundUser(null);
    SetUsername("");
  }

  return (
    <div className='search'>
        <div className='searchForm'>
            <input type="text" placeholder='Find user'
              onChange={(e) => SetUsername(e.target.value)}
              onKeyDown={handleKey}
              value={username}
            />
        </div>

        {error && <span>No User Found</span>}
        {foundUser && <div className='userChat' onClick={handleSelect}>
            <img src={foundUser.photoUrl} />
            <div className='userChatInfo'>
                <span>{foundUser.displayName}</span>
            </div>
        </div>}
    </div>
  )
}

export default Search