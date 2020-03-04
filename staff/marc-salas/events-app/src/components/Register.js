import React from 'react'


export default function Register({onSubmit, setView}) {

    function handleOnSubmit(event){
        event.preventDefault()
        
        const {name, surname, email, password} = event.target

        onSubmit(name.value, surname.value, email.value, password.value)

    }

    return (
        <form className="register" onSubmit={handleOnSubmit}>
            <h2>REGISTER USER</h2>
            <input type="text" name="name" placeholder="name"/>
            <input type="text" name="surname" placeholder="surname"/>
            <input type="text" name="email" placeholder="email"/>
            <input type="password" name="password" placeholder="password"/>
            <button>Submit</button>
            <a href="" onClick={event =>{
                event.preventDefault()

               setView('login') 
            }}>login</a>
        </form>
    )

}