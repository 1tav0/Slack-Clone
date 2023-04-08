import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button';
import { auth, db } from '../firebase'
import firebase from 'firebase/compat/app';
import { useAuthState } from 'react-firebase-hooks/auth';

const ChatInput = React.forwardRef(({channelName, channelId}, chatRef) => {

    // const inputRef = useRef(null)
    const [input, setInput] = useState('');
    const [user] = useAuthState(auth)
    
    const sendMessage = (e) => {
        e.preventDefault();//prevents the refresh when we click the send
        console.log(channelId)

        if (!channelId) {
            return false
        }

        //look through the room collections in the db and find the doc with the passed id then for that
        //id doc look through its collection of messages and a new one to it 
        db.collection('rooms').doc(channelId).collection('messages').add({
            message: input,//get the input refernce of the current value we are pointing to 
            // message: inputRef.current.value,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: user.displayName,
            userImage: user.photoURL,

        })

        //this is to make the chat messages view scroll up when u type a new one used along with the empty bottom div
        chatRef.current.scrollIntoView({
            behavior: 'smooth'
        })
        // inputRef.current.value =""
        setInput('')
    }
    //onChange={(e) => setInput(e.target.value)} value ={ input }
  return (
    <ChatInputContainer>
        <form>
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Message #${channelName}`} />
            <Button hidden type='submit' onClick={sendMessage}>
                SEND
            </Button>
        </form>
    </ChatInputContainer>
  )
})

export default ChatInput

const ChatInputContainer = styled.div`
    border-radius: 20px;

    >form{
        position: relative;
        display: flex;
        justify-content: center;
    }

    >form > input{
        position: fixed;
        bottom: 30px;
        width: 60%;
        border: 1px solid gray;
        border-radius: 3px;
        padding: 20px;
        outline: none;
    }

    >form > button{
        display: none;
    }
`
//min 8:11:43