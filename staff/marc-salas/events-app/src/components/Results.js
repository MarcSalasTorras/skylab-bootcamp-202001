import React from 'react'
import {Item} from './'

export default function Results ({items}){
    return (
        <div>
            {items.map(item =>
                 <Item key={item.id} data={item}/>
            )}
        </div>
    )
}