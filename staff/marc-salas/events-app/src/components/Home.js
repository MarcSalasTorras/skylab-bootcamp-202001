import React from 'react'

export default function Home ({lastEvents}){


    return(
        <button onClick={event =>{
            event.preventDefault()

            lastEvents()
        }}>GET LAST EVENTS
        </button>
    )
}

