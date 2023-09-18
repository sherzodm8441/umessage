import React, { useContext, useEffect } from 'react'
import ChatWindow from '../components/ChatWindow'
import Sidebar from '../components/Sidebar'
import { AuthContext } from '../contexts/AuthContext'
import { SocketVideoContextProvider } from '../contexts/SocketVideoContext';

const Home = () => {
  const {currentUser, isLoading} = useContext(AuthContext);
  return (
    <div className='home'>
        <div className='container'>
            <Sidebar />
            {
            //putting provider here and shortcircuiting bc currentUser needs to load first
            <SocketVideoContextProvider>
              <ChatWindow />
            </SocketVideoContextProvider>
            
            }
        </div>
    </div>
  )
}

export default Home