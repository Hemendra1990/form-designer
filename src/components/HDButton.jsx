
import { Button } from 'primereact/button';
import React, { memo } from 'react';
import EventExecutor from '../service/EventExecutor';

const HDButton = React.forwardRef( (props, ref) => {
    const element = props.element;
    console.log(props);
    
    if(!(element.attributes && element.attributes.label)) {
        if(!element.attributes) element.attributes = {};
        element.attributes.label = 'Click Here'
    }

    const executeEvent = () => {
        //check if the button is configured with the event or not
        if(element.attributes && element.attributes.eventId) {
            EventExecutor.executeEvent(props.meta, element.attributes.eventId);
        }
    }

    return (
        <>
            <Button ref={ref} label={props.element?.attributes?.label} onClick={executeEvent}/>
        </>
    );
});
export default memo(HDButton);