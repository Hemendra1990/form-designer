import { Dropdown } from "primereact/dropdown";
import React, { useState } from "react";


interface AttrInputConfigProps {
    meta: any;
    handleAttributeChange: Function;
    eventOptions: Array<any>;
}

const AttrInputConfig = (props: AttrInputConfigProps) => {
    const { meta, eventOptions, handleAttributeChange } = props

    const currAttribute = meta?.currentElement?.attributes;
    const [onBlur, setonBlur] = useState("");
    const [onFocus, setonFocus] = useState("");
    const [onKeyup, setonKeyup] = useState("");
    const [onKeyDown, setonKeyDown] = useState("");
    const [showClearOnBlurChange, setShowClearOnBlurChange] = useState(false);
    const [showClearOnFocusChange, setShowClearOnFocusChange] = useState(false);
    const [showClearKeyupChange, setShowClearKeyupChange] = useState(false);
    const [showClearKeydownChange, setShowClearKeydownChange] = useState(false);

    const handleBlurChange = (e: any) => {
        setonBlur(e.value);
        currAttribute.onBlur = e.value;
        handleAttributeChange(e);
        setShowClearOnBlurChange(true);
    }

    const handleFocusChange = (e: any) => {
        setonFocus(e.value);
        currAttribute.onFocus = e.value;
        handleAttributeChange(e);
        setShowClearOnFocusChange(true);
    }

    const handleKeyupChange = (e: any) => {
        setonKeyup(e.value);
        currAttribute.onKeyup = e.value;
        handleAttributeChange(e);
        setShowClearKeyupChange(true);
    }

    const handleKeydownChange = (e: any) => {
        setonKeyDown(e.value);
        currAttribute.onKeyDown = e.value;
        handleAttributeChange(e);
        setShowClearKeydownChange(true);
    }


    return (
        <>
            <div className="field col-12">
                <label htmlFor="onBlur" className="block">On Blur</label>
                <Dropdown
                    style={{ width: '100%' }}
                    name="onBlur"
                    value={currAttribute.onBlur || onBlur}
                    options={eventOptions}
                    placeholder="Select a Blur Event"
                    onChange={e => { handleBlurChange(e) }}
                    showClear={showClearOnBlurChange}
                />
            </div>
            <div className="field col-12">
                <label htmlFor="onFocus" className="block">On Focus</label>
                <Dropdown
                    style={{ width: '100%' }}
                    name="onFocus"
                    value={currAttribute.onFocus || onFocus}
                    options={eventOptions}
                    placeholder="Select a Focus Event"
                    onChange={e => { handleFocusChange(e) }}
                    showClear={showClearOnFocusChange}
                />
            </div>
            <div className="field col-12">
                <label htmlFor="onKeyup" className="block">On Keyup</label>
                <Dropdown
                    style={{ width: '100%' }}
                    name="onKeyup"
                    value={currAttribute.onKeyup || onKeyup}
                    options={eventOptions}
                    placeholder="Select a onKeyup Event"
                    onChange={e => { handleKeyupChange(e) }}
                    showClear={showClearKeyupChange}
                />
            </div>
            <div className="field col-12">
                <label htmlFor="onKeyDown" className="block">On KeyDown</label>
                <Dropdown
                    style={{ width: '100%' }}
                    name="onKeyDown"
                    value={currAttribute.onKeyDown || onKeyDown}
                    options={eventOptions}
                    placeholder="Select a onKeyDown Event"
                    onChange={e => { handleKeydownChange(e) }}
                    showClear={showClearKeydownChange}
                />
            </div>
        </>
    )

}

export default AttrInputConfig