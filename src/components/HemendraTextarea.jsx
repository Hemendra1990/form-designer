import React from 'react'
import { InputTextarea } from 'primereact/inputtextarea';
import { useState } from 'react';

const HemendraTextarea = (props) => {

    const [value, setValue] = useState('')
    const handleClick = () => {
       props.setMeta((preValue)=> {
        return {
            ...preValue,
            currentElement: {
                name: props.name,
                instance: this
            }
        }
       })
    }

    return(
        <>
            <InputTextarea 
                name={props.name} 
                id={props.name}
                value={value} 
                onChange={(e) => setValue(e.target.value)}
                onClick={handleClick} />
        </>
    )
}

export default HemendraTextarea;