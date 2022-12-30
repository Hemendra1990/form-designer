import { Dropdown } from "primereact/dropdown";
import React, { useState } from "react";


interface AttrInputConfigProps {
    meta: any;
    handleAttributeChange: Function;
    eventOptions: Array<any>;
}

const AttrInputConfig = (props: AttrInputConfigProps) => {
    const { meta, handleAttributeChange, eventOptions } = props

    const currAttribute = meta?.currentElement?.attributes;
    const [onBlur, setonBlur] = useState("");
    const [onFocus, setonFocus] = useState("");
    const [onKeyup, setonKeyup] = useState("");
    const [onKeyDown, setonKeyDown] = useState("");

    const handleBlurChange = (e: any) => {
        setonBlur(e.value);
        currAttribute.onBlur = e.value;
        handleAttributeChange(e);
    }

    const handleFocusChange = (e: any) => {
        setonFocus(e.value);
        currAttribute.onFocus = e.value;
        handleAttributeChange(e);
    }

    const handleKeyupChange = (e: any) => {
        setonKeyup(e.value);
        currAttribute.onKeyup = e.value;
        handleAttributeChange(e);
    }

    const handleKeydownChange = (e: any) => {
        setonKeyDown(e.value);
        currAttribute.onKeyDown = e.value;
        handleAttributeChange(e);
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
                    showClear={true}
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
                    showClear={true}
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
                    showClear={true}
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
                    showClear={true}
                />
            </div>
        </>
    )

}

export default AttrInputConfig