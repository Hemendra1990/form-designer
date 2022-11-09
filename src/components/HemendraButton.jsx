
import { Button } from 'primereact/button';
import { useState } from 'react';
import EventExecutor from '../service/EventExecutor';

const HemendraButton = (props) => {
    const element = props.element;
    console.log(props);
    const [buttonAttribute, setButtonAttribute] = useState({})
    buttonAttribute.label = 'Button'

    const executeEvent = () => {
        //check if the button is configured with the event or not
        if(element.attributes && element.attributes.eventId) {
            EventExecutor.executeEvent(props.meta, element.attributes.eventId);
        }
    }
    

    return (
        <>
            <Button label={props.element?.attributes?.label} onClick={executeEvent}/>
        </>
    );
}
export default HemendraButton;