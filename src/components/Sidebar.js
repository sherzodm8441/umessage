import React, { useState } from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    function handleIsOpen(){
        setIsOpen(!isOpen);
    }

    let sidebarClass = isOpen ? "sidebar open" : "sidebar";  
  return (
    <div className={sidebarClass}>
        {/* sidebar toggle */}
        <button onClick={handleIsOpen} className="sidebar-toggle">
          {isOpen ? '<' : '>'}
        </button>

        <Navbar />
        <Search />
        <Chats />
      </div>
  )
}

export default Sidebar