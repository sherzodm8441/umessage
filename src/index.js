import * as process from 'process';


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './contexts/AuthContext';
import { ChatContextProvider } from './contexts/ChatContext';
// import { SocketVideoContextProvider } from './contexts/SocketVideoContext';

//need this for peerVideRef.current.destroy() to work
window.global = window;
window.process = process;
window.Buffer = [];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <AuthContextProvider>
      {/* <SocketVideoContextProvider> */}
    <ChatContextProvider>
      
        {/* <React.StrictMode> */}
        
          <App />
        
          
        {/* </React.StrictMode> */}
      
    </ChatContextProvider>
    {/* </SocketVideoContextProvider> */}
  </AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
