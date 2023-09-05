import React from 'react'
import ChatWindow from '../components/ChatWindow'
import SidebarSlider from '../components/SidebarSlider'

const Home = () => {
  return (
    <div className='home'>
        <SidebarSlider />
        <ChatWindow />
    </div>
  )
}

export default Home