import React from 'react'
import registerUser from '../logic/Register-user'

export default function Register() {

    function handleRegister(event){
        event.preventDefault()
        
        const {name, surname, mail, password} = event.target

        registerUser(name.value,surname.value,mail.value,password.value)

    }

    return (
        <form onSubmit={handleRegister}>
            <h2>REGISTER USER</h2>
            <input type="text" name="name" placeholder="name"/>
            <input type="text" name="surname" placeholder="surname"/>
            <input type="text" name="mail" placeholder="email"/>
            <input type="password" name="password" placeholder="password"/>
            <button>Submit</button>
        </form>
    )

}