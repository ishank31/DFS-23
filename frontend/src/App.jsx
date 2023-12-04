import React, { useState, Suspense, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./styles/App.css";
import axios from 'redaxios';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";

const Home = React.lazy(() => import("./pages/Home"));
const CanvasPage = React.lazy(() => import("./pages/Canvas"));
import Login from './components/Login/Login';

function App() {
  let tokenId = null

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  if (JSON.parse(localStorage.getItem('dfs-user')) != null) {
    tokenId = JSON.parse(localStorage.getItem('dfs-user')).token
  }

  useEffect(() => {
    checkAuth()
  }, [isLoggedIn])

  function logoutUser() {
    localStorage.clear()
    setIsLoggedIn(false)
    navigate('/login')
  }

  async function checkUser(email, password) {
    const LOGIN_URL = 'https://datafoundation.iiit.ac.in/api/login'
    // const LOGIN_URL_DEV = 'http://10.4.25.20:3001/api/login'
    try {
      const response = await axios.post(LOGIN_URL, { email, password })
      console.log(response)
      let dfs_user = {
        user: response.data.data.user,
        token: response.data.data.token,
      }

      var jsonString = JSON.stringify(dfs_user)

      localStorage.setItem('dfs-user', jsonString)
      tokenId = JSON.parse(localStorage.getItem('dfs-user')).token

      await checkAuth(email)
    } catch (error) {
      console.log('Incorrect Username or password!!!')
      return false
    }
  }

  async function checkAuth(email) {
    const GET_URL = 'https://datafoundation.iiit.ac.in/api/detokn?token=' + tokenId
    // const GET_URL_DEV = 'http://10.4.25.20:3001/api/detokn?token=' + tokenId

    try {
      const response = await axios.get(GET_URL)
      setIsLoggedIn(true)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="App">

        <Routes>
          <Route exact path='/' element={isLoggedIn ? <CanvasPage /> : <Navigate replace to="/login" />} />
          <Route exact path='/login' element={isLoggedIn ? <Navigate replace to="/" /> : <Login checkUser={checkUser} />} />
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Home />
              </Suspense>
            }
          />

        </Routes>
    </div>
  );
}

export default App;
