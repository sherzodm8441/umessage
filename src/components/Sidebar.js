import React from 'react'

const Sidebar = (props) => {
    let sidebarClass = props.isOpen ? "sidebar open" : "sidebar";  
  return (
    <div className={sidebarClass}>
        <div>This is the sidebar</div>

        {/* sidebar toggle */}
        <button onClick={props.handleIsOpen} className="sidebar-toggle">
          {props.isOpen ? '<' : '>'}
        </button>
      </div>
  )
}

export default Sidebar