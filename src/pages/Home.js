import React from 'react'
import ChatWindow from '../components/ChatWindow'
import Sidebar from '../components/Sidebar'

const Home = () => {
  return (
    <div className='home'>
        <div className='container'>
            <Sidebar />
            <ChatWindow />
        </div>
    </div>
  )
}

export default Home