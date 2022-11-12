import { InputText } from 'primereact/inputtext';
import React, { memo, useState } from 'react';

const HemendraInput = React.forwardRef((props, ref) => {
//const HemendraInput = (props) => {
    console.log('HemendraInput', props);
    const element = props.element;

    const [value, setValue] = useState('');

    const handleBlur = (e) => {
        console.log(e);
    }

    return (
        <InputText 
                ref={ref}
                maxLength={element?.attributes?.maxLength}
                placeholder={element?.attributes?.placeholder}
                name={props.name}
                id={props.name}
                defaultValue={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={handleBlur}/>
    )
})

export default memo(HemendraInput);