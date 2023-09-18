import React, { useEffect, useRef, useState } from 'react'
import Camera from '../img/camera.png'
import More from '../img/more.png'
import Messages from './Messages'
import Input from './Input'
import { useContext } from 'react'
import { ChatContext } from '../contexts/ChatContext'

import { SocketVideoContext, socket } from '../contexts/SocketVideoContext'
import { AuthContext } from '../contexts/AuthContext'
// import io from 'socket.io-client';
// import Peer from 'simple-peer';


const ChatWindow = () => {
  const { data } = useContext(ChatContext);


  const { 
    myId, 
    myVideoRef, 
    peerVideoRef, 
    stream, 
    callAccepted, 
    callEnded, 
    answerCall, 
    call, 
    callUser,
    leaveCall,
    setStream,
  } = useContext(SocketVideoContext)


  const [idToCall, setIdToCall] = useState('');

  const [modalOpen, setModalOpen] = useState(false);

  console.log("new id",myId)
  // console.log(currentUser)

  function handleModal(){
    setModalOpen(!modalOpen);
  }

  useEffect(()=>{
    if(!modalOpen){
      stream?.getVideoTracks()[0].stop();
      stream?.getAudioTracks()[0].stop();
    }else{
      navigator.mediaDevices.getUserMedia({ video: true, audio: true}).then((currentStream) => {
        setStream(currentStream);

        if(myVideoRef.current){
            myVideoRef.current.srcObject = currentStream;
          }
        
    }).catch((error) => {
        console.log(error); 
    })
    }
  },[modalOpen])

  return (
    <div className='chatWindow'>
      <div className='chatInfo'>
        <div className='userInfo'>
          {data.user.photoUrl ? <img src={data.user.photoUrl} alt=""/> :
          <div className="userInitial">{data.user.displayName?.[0].toUpperCase()}</div>}
          <span>{data.user.displayName}</span>
        </div>
        <div className='chatIcons'>
          {data.user.uid && <img  onClick={handleModal} src={Camera} />}
          <img src={More} />
        </div>
      </div>
      <Messages />
      <Input />

      {(modalOpen || call.recievingCall || callAccepted) && !callEnded && <div className='modal'> 
        <div className='modalWrapper'>
          <button className="closeButton" onClick={handleModal}>X</button>
          <div className='videos'>
            {callAccepted && !callEnded && <video playsInline className='peerVideo' ref={peerVideoRef} autoPlay/>}
            {<video playsInline className='myVideo' ref={myVideoRef} autoPlay={true} muted/>}
          </div>
          <div className='controls'>
            {/* <input type='text' placeholder='enter id' value={idToCall} onChange={(e)=>setIdToCall(e.target.value)}/> */}
            {/* {<span>{myId}</span>} */}
            <button onClick={()=> callUser(idToCall)}>Call</button>
            {call.recievingCall && !callAccepted && <button onClick={answerCall}>Answer</button>}
            <button onClick={leaveCall}>End</button>
          </div>
        </div>
      </div> }
    </div>
  )
}

export default ChatWindow