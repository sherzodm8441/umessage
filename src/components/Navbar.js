import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../contexts/AuthContext'

const Navbar = () => {
  const {currentUser} = useContext(AuthContext);
  return (
    <div className='navbar'>
        <span className='logo'>uMessage</span>
        <div className='user'>
            {currentUser.photoUrl ? <img src={currentUser.photoUrl} /> :
            <div className="userInitial">{currentUser.displayName?.[0].toUpperCase()}</div>}
            <span>{currentUser.displayName}</span>
            <button onClick={()=>signOut(auth)}>Logout</button>
        </div>
    </div>
  )
}

export default Navbar