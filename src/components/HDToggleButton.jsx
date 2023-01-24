import { ToggleButton } from 'primereact/togglebutton';
import React, { useState, useEffect, useImperativeHandle } from "react";
import { ControlStyleModel } from "../control-styles/ControlStyleModel";
import { addElementStyle } from "../control-styles/ControlStyles";


const HDToogleButton = React.forwardRef((props, ref) => {
    const [toogleButton, settoogleButton] = useState(false);
    const { element } = props;
    const [showHideFlag, setShowHideFlag] = useState(true);
    const [isRefInitialize, setRefInitialize] = useState(false);

    const showHide = (value) => {//expecing the value to be boolean
        setShowHideFlag(value);
    }
    const handlePasswordChangeVal = (event) => {
        settoogleButton(event.target.value);
    };
    const operations = {
        getStyleAttributes: () => {
            return ControlStyleModel.getTextareaStyle();
        },
        addStyle(style = "") {
            setControlStyle(style);
        },
        showHide
    }

    useImperativeHandle(ref, () => {
        setRefInitialize(true);
        return operations;
    });

    useEffect(() => {
        updateMeta(meta);
        //Apply style if the element already has
        if (element.ref && element.ref.current && element.ref.current.getStyleAttributes) {
            if (element.style) {
                const elementStyle = addElementStyle(
                    element.style,
                    element,
                    meta,
                    setControlStyle
                );
                setControlStyle(elementStyle);
            }
        }

    }, [isRefInitialize]);
    return (
        <>
            <ToggleButton
                style={showHideFlag ? { display: 'block' } : { display: 'none' }}
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