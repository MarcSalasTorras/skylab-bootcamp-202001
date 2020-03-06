import React from 'react'

export default function Item({ data }) {
    return (
        <div>
            <h2>{data.title}</h2>
            <h4>{data.description}</h4>
            <p>{data.date}</p>
        </div>
    )
}