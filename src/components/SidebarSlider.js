import React, { useState } from 'react'
import Sidebar from './Sidebar'

const SidebarSlider = () => {
    const [isOpen, setIsOpen] = useState(false);

    function handleIsOpen(){
        setIsOpen(!isOpen);
    }

  return (
    <div>
        <Sidebar 
            isOpen={isOpen}
            handleIsOpen={handleIsOpen}
        />
    </div>
  )
}

export default SidebarSlider