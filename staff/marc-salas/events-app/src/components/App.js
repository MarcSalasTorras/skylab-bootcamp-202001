import React, { useState } from 'react'
import { Register, Login, Home, Page, Results } from './'
import { registerUser, authenticateUser, lastEvents, retrieveUser } from '../logic'

function App() {
  const [page, setPage] = useState('login')
  const [error, setError] = useState()
  const [name, setName] = useState()
  const [response, setResponse] = useState()
  //const [view, setView] = useState('login')

  const handleRegister = async (name, surname, email, password) => {

    try {
      await registerUser(name, surname, email, password)
      setPage('login')

    } catch ({ message }) {

      setError(message)
    }
  }

  const handleLogin = async (email, password) => {
    try {
      const token = await authenticateUser(email, password)

      const { name } = await retrieveUser(token)

      sessionStorage.token = token

      setName(name)
      setPage('home')
    } catch ({ message }) {
      setError(message)
    }
  }

  const handleLastEvents = async () => {
    try {
      const response = await lastEvents()

      setResponse(response)

    } catch ({ message }) {
      setError(message)

    }
  }

  return <div className="App">
    <Page name={page}>
      {page === 'register' && <Register onSubmit={handleRegister} setPage={setPage} />}
      {page === 'login' && <Login onSubmit={handleLogin} setPage={setPage} />}
      {page === 'home' && <Home lastEvents={handleLastEvents} name={name} />}
      {page === 'home' && response && <Results items={response}/>}
    </Page>
  </div>

}

export default App
