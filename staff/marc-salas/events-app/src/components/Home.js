import React from 'react'

export default function Home ({lastEvents, name}){


    return(
    <div>
    <h2>{name}</h2>
        <button onClick={event =>{
            event.preventDefault()

            lastEvents()
        }}>GET LAST EVENTS
        </button>
    </div>
    )
}

