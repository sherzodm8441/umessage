import io from 'socket.io-client';
import Peer from 'simple-peer';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from './AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { ChatContext } from './ChatContext';


export const SocketVideoContext = createContext();

export const socket = io('http://localhost:3001');

export const SocketVideoContextProvider = ({ children }) => {
    const { currentUser, isLoading } = useContext(AuthContext);
    const { data: dat } = useContext(ChatContext);

    const [stream, setStream] = useState(null);
    const [myId, setMyId] = useState('');
    const [call, setCall] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false); 
    const [name, setName] = useState('');

    const myVideoRef = useRef();
    const peerVideoRef = useRef();
    const connectionRef = useRef();

    // const [use, setUse] = useState({})

    useEffect(()=> {
        const getMedia = () => {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true}).then((currentStream) => {
                setStream(currentStream);
    
                if(myVideoRef.current){
                    
                    myVideoRef.current.srcObject = currentStream;
                  }
                
            }).catch((error) => {
                console.log(error);
            })
        }
        
        // getMedia();
        console.log('mount')

        socket.on('id', (id) => setMyId(id));
        

        

        socket.on('callUser', ({ from, name: callerName, signal }) => {
            console.log("call from", from)
            setCall({ recievingCall: true, name: callerName, from, signal});
        });

        return ()=>{
            console.log( 'unmount')
        }
    }, []);


    useEffect(()=>{
        
            console.log(currentUser)
            socket.emit('userCustomId', currentUser.uid);

            socket.on('callUser', ({ from, name: callerName, signal }) => {
                console.log("call from", from)
                setCall({ recievingCall: true, name: callerName, from, signal});
            });
    
    }, [currentUser.uid, isLoading]);

    console.log(currentUser)

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
            socket.emit('callUser', { userToCall: dat.user.uid, signalData: data, from: currentUser.uid, name });
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
            setStream,
        }}>
            {children}
        </SocketVideoContext.Provider>
    )
}
