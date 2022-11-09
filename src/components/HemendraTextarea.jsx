import React from 'react'
import { InputTextarea } from 'primereact/inputtextarea';
import { useState } from 'react';

const HemendraTextarea = (props) => {
    const element = props.element;

    const [value, setValue] = useState('')

    return(
        <>
            <InputTextarea
                maxLength={element?.attributes?.maxLength}
                rows={element?.attributes?.rows}
                cols={element?.attributes?.cols}
                placeholder={element?.attributes?.placeholder}
                name={props.name} 
                id={props.name}
                value={value} 
                onChange={(e) => setValue(e.target.value)}/>
        </>
    )
}

export default HemendraTextarea;