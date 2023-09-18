import io from 'socket.io-client';
import Peer from 'simple-peer';
import { createContext, useEffect, useRef, useState } from 'react';


export const SocketVideoContext = createContext();

const socket = io('http://localhost:3001');

export const SocketVideoContextProvider = ({ children }) => {
    const [stream, setStream] = useState(null);
    const [myId, setMyId] = useState('');
    const [call, setCall] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false); 
    const [name, setName] = useState('');

    const myVideoRef = useRef();
    const peerVideoRef = useRef();
    const connectionRef = useRef();

    useEffect(()=> {
        const getMedia = () => {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true}).then((currentStream) => {
                setStream(currentStream);
    
                if(myVideoRef.current){
                    
                    myVideoRef.current.srcObject = currentStream;
                    // let playpromise = myVideoRef.current.play();
                    // if(playpromise !== undefined){
                    //     playpromise.then(()=>{

                    //     }).catch(err=>{
                    //         console.log(err)
                    //     })
                    // }
                  }
                
            }).catch((error) => {
                console.log(error);
            })
        }
        
        // getMedia();

        socket.on('id', (id) => setMyId(id));

        socket.on('callUser', ({ from, name: callerName, signal }) => {
            setCall({ recievingCall: true, name: callerName, from, signal});
        });

    }, []);

    function answerCall(){
        setCallAccepted(true);

        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: call.from });
        });

        peer.on('stream', (currentStream) => {
            peerVideoRef.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    }

    function callUser(id){
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('callUser', { userToCall: id, signalData: data, from: myId, name });
        });

        peer.on('stream', (currentStream) => {
            peerVideoRef.current.srcObject = currentStream;
        });

        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);

            peer.signal(signal);
        });

        connectionRef.current = peer;
    }

    function leaveCall(){
        setCallEnded(true);

        connectionRef.current.destroy();
    }


    return(
        <SocketVideoContext.Provider value={{
            call,
            callAccepted,
            callEnded,
            callUser,
            answerCall,
            leaveCall,
            peerVideoRef,
            myVideoRef,
            stream,
            name,
            setName,
            myId,
            setStream
        }}>
            {children}
        </SocketVideoContext.Provider>
    )
}
