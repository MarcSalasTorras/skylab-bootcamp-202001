import React, { useState, useEffect } from 'react'
import { Register, Login, Home } from './'
import { registerUser, login, lastEvents } from '../logic'

function App() {
  const [view, setView] = useState('login')

  const handleRegister = (name, username, email, password) => {
    registerUser(name, username, email, password)
      .then(() => {
        setView('login')
      })
  }
  const handleLogin = (email, password) => {
    login(email, password)
      .then((token) => {
        setView('home')

      })
  }
  const handleLastEvents = () => {
    lastEvents()
      .then(events => {
        console.log(events)

      })
  }

  return <div className="App">
    {view === 'register' && <Register onSubmit={handleRegister} setView={setView} />}
    {view === 'login' && <Login onSubmit={handleLogin} setView={setView} />}
    {view === 'home' && <Home lastEvents={handleLastEvents} />}
  </div>
}

export default App
