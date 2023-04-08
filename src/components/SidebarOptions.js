import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { enterRoom } from '../features/appSlice'
import { db } from '../firebase'

const SidebarOptions = ({ Icon, title, addChannelOption, id }) => {
    const dispatch = useDispatch()
    // console.log("id", id);

    useEffect(() => {
        if (id !== undefined) {
          dispatch(enterRoom({
            roomId: id
          }));
        }
      }, [dispatch, id]);

    const addChannel = () => {
        const channelName = prompt('Please enter the channel name')
        
        if (channelName) {
            db.collection('rooms')
                .add({
                    name: channelName
                })
        }
    }

    const selectChannel = () => {

        if (id !== undefined) {
            dispatch(enterRoom({ //this dispatches the roomId we click in the channels to our redux store to be able to use elsewhere
                roomId: id //the function we are dispatching uses a payload which is the parameter we are passing 
            }))
          }
        else {
            console.log('error theres no id')
        }
    }

  return (
      <SidebarOptionsContainer
        onClick={addChannelOption ? addChannel : selectChannel}
      >
        {Icon && <Icon fontSize='small' style={{ padding: 10 }} />}
        {
            Icon ? (
                  <h3>{title}</h3>
              ) : (
                <SidebarOptionChannel>
                    <span>#</span> {title}
                </SidebarOptionChannel>      
            )
        }
    </SidebarOptionsContainer>
  )
}

export default SidebarOptions

const SidebarOptionsContainer = styled.div`
    display: flex;
    font-size: 12px;
    align-items: center;
    padding-left: 2px;
    cursor: pointer;

    :hover{
        opacity: 0.8;
        background-color: #340e36;
    }

    >h3{
        font-weight: 500;
    }

    >h3 > span{
        padding: 15px;
    }
`

const SidebarOptionChannel = styled.h3`
    padding: 10px 0;
    font-weight: 300;
`