import React from 'react'

const Navbar = () => {
  return (
    <div className='navbar'>
        <span className='logo'>uMessage</span>
        <div className='user'>
            <img src="https://imgv3.fotor.com/images/cover-photo-image/a-beautiful-girl-with-gray-hair-and-lucxy-neckless-generated-by-Fotor-AI.jpg" />
            <span>displayName</span>
            <button>Logout</button>
        </div>
    </div>
  )
}

export default Navbar