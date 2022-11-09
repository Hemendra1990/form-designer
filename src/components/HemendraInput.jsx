import React from 'react';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';

const HemendraInput = (props) => {
    console.log('HemendraInput', props);

    const [value, setValue] = useState('');

    const handleBlur = (e) => {
        console.log(e);
    }

    return (
        <>
            <InputText value={value}
                name={props.name}
                id={props.name}
                onChange={(e) => setValue(e.target.value)} 
                onClick={handleBlur} onBlur={handleBlur}/>
        </>
    )
}

export default HemendraInput;