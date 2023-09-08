import React, { useState } from 'react'
import Add from '../img/add.png'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [error, SetError] = useState(false)

  const navigate = useNavigate();

  async function handleSubmit(event){
    event.preventDefault();
    const displayName = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const file = event.target[3].files[0];

    console.log(displayName,email, password)

  
    try {
      SetError(false);
      const res = await createUserWithEmailAndPassword(auth, email, password);

      console.log(res);

      const storageRef = ref(storage, displayName);
    
        await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then( async (downloadURL) => {
            // console.log('File available at', downloadURL);

            //self, user's profile data for when logged in
            await updateProfile(res.user,{
              displayName: displayName,
              photoURL: downloadURL
            });

            //collection container for all users, will search this collection to add user to chat with
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName: displayName,
              email: email,
              photoURL: downloadURL
            });

            //collection container for user's (self) chats (sidebar user chats)
            await setDoc(doc(db, 'userChats', res.user.uid), {});

            navigate("/");
          });
        }
      );
      

    } catch (error) {
      console.log(error);
      SetError(true);
    }
      
  }

  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>uMessage</span>
            <span className='title'>Register</span>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Display Name'/>
                <input type="email" placeholder='Email'/>
                <input type="password" placeholder='Password'/>
                <input style={{display:"none"}}type="file" id="file"/>
                <label htmlFor='file'>
                  <img src={Add} />
                  <span>Add Profile Picture</span>
                </label>
                <button>Sign Up</button>
                {error && <span>Error. Try again!</span>}
            </form>
            <p>Already registered? Login</p>
        </div>
    </div>
  )
}

export default Register