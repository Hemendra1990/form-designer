import { InputText } from 'primereact/inputtext';
import React from 'react';

const HemendraInput = (props) => {
    console.log('HemendraInput', props);
    const element = props.element;

    //const [value, setValue] = useState('');

    const handleBlur = (e) => {
        console.log(e);
    }

    return (
        <>
            <InputText value={element.value}
                maxLength={props.element?.attributes?.maxLength}
                placeholder={props.element?.attributes?.placeholder}
                name={props.name}
                id={props.name}
                onChange={(e) => element.value = e.target.value} 
                onClick={handleBlur} onBlur={handleBlur}/>
        </>
    )
}

export default HemendraInput;