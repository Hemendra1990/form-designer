import { ToggleButton } from 'primereact/togglebutton';
import React, { useState, useEffect } from "react";


const HDToogleButton = React.forwardRef((props, ref) => {
    const [toogleButton, settoogleButton] = useState(false);
    const { element } = props;
    const handlePasswordChangeVal = (event) => {
        settoogleButton(event.target.value);
    };

    return (
        <>
            <ToggleButton
                checked={toogleButton}
                onLabel={element?.attributes?.onLabel}
                offLabel={element?.attributes?.offLabel}
                onChange={handlePasswordChangeVal}
                onIcon="pi pi-check"
                offIcon="pi pi-times"
                aria-label="Confirmation"
            />
        </>
    )

})

export default HDToogleButton;