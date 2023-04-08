import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Header from './components/Header'
import styled from 'styled-components'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase'
import Login from './components/Login' 
import Spinner from 'react-spinkit';

function App() {
  
  const [user, loading] = useAuthState(auth) //this allows us to use the login functionality is doing everything for us

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <img src='https://www.nicepng.com/png/full/223-2232558_logo-slack-png-transparent-logo-slack-slack-logo.png'
            alt=''
          />
          <Spinner
            name='ball-spin-fade-loader'
            color='purple'
            fadeIn='none'   
          />
        </AppLoadingContents>
      </AppLoading>
    )
  }

  return (
    <div className="app">
      <Router>
        {
          !user ? (
            <Login />
          ) : (
            <>
              <Header />
              <AppBody>
                <Sidebar />
                <Routes>
                  <Route path='/' exact element={<Chat />} />
                </Routes>
              </AppBody>
            </> 
          )
            
        }
      </Router>
    </div>
  );
}

export default App;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`
const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img{
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`

const AppBody = styled.div`
  display: flex;
  height: 100vh

`