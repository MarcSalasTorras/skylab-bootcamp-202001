import React, { useState, useEffect } from 'react'
import { Register, Login, Home } from './'
import { registerUser, authenticateUser, lastEvents } from '../logic'

function App() {
  const [view, setView] = useState('login')

  const handleRegister = async (name, surname, email, password) => {
    
      try {
        await registerUser(name, surname, email, password)
          setView('login')
  
      } catch ({message}) {

        console.log(message)
      }
  }

  const handleLogin = async(email, password) =>{
    try {
      const token = await authenticateUser (email, password)
        
      console.log(token)

        sessionStorage.token = token

        setView('home')
    } catch ({message}) {
      console.log(message)
    }
  }

  const handleLastEvents = async () =>{
    try {
      const response = await lastEvents()
      
      console.log(response)

    } catch ({message}) {
      console.log(message)
    
    }
  }
  
  return <div className="App">
    {view === 'register' && <Register onSubmit={handleRegister} setView={setView}/>}
    {view === 'login' && <Login onSubmit={handleLogin} setView={setView}/>}
    {view === 'home' && <Home lastEvents={handleLastEvents}/>}
  </div>
}

export default App
