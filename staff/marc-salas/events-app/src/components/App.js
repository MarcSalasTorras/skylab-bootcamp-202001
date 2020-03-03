import React, { useState, useEffect } from 'react'
import Register from './Register'
import './App.sass'

function App({ name }) {
  // const [count, setCount] = useState(0)
  // const [view, setView] = useState('home')
  // const [hello, setHello] = useState()

  // function countUp(event) {
  //   event.preventDefault()

  //   setCount(count + 1)
  //   count > 4 && setView('message')
  // }


  return <div className="App">
    <Register/>
  </div>
}

export default App
