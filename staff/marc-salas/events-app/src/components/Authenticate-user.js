import React from 'react'

export default function Login({ onSubmit, setPage }) {
    function handleOnSubmit(event) {
        event.preventDefault()

        const { email, password } = event.target

        onSubmit(email.value, password.value)
    }

    return (
        <form className="login" onSubmit={handleOnSubmit}>
            <h2>Login</h2>
            <input type="text" name="email" placeholder="email" />
            <input type="password" name="password" placeholder="password" />
            <button>Login</button>
            <a href="" onClick={event =>{
                event.preventDefault()

               setPage('register') 
            }}>register</a>
        </form>
    )
}