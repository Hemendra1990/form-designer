import React from 'react'
import { InputTextarea } from 'primereact/inputtextarea';
import { useState } from 'react';

const HemendraTextarea = React.forwardRef((props, ref) => {
    const element = props.element;
    const [value, setValue] = useState('')

    return(
        <>
            <InputTextarea
                ref={ref}
                maxLength={element?.attributes?.maxLength}
                rows={element?.attributes?.rows}
                cols={element?.attributes?.cols}
                placeholder={element?.attributes?.placeholder}
                name={props.name} 
                id={props.name}
                defaultValue={value} 
                onChange={(e) => setValue(e.target.value)}/>
        </>
    )
})

export default HemendraTextarea;