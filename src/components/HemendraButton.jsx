
import {Button} from 'primereact/button'
import { useState } from 'react';

const HemendraButton = (props) => {
    console.log(props);
    const [buttonAttribute, setButtonAttribute] = useState({})
    buttonAttribute.label = 'Button'

    const btnClickd = () => {
        console.log('Button Clicked');
    }
    

    return (
        <>
            <Button label={props.element?.attributes?.label} onClick={btnClickd}/>
        </>
    );
}
export default HemendraButton;