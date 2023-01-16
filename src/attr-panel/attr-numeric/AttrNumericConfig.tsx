import { Dropdown } from "primereact/dropdown";
import React, { useState } from "react";


interface AttrNumericConfigProps {
    meta: any;
    handleAttributeChange: Function;
    eventOptions: Array<any>;
}

const AttrNumericConfig = (props: AttrNumericConfigProps) => {
    const { meta, handleAttributeChange, eventOptions } = props;
    const currAttribute = meta?.currentElement?.attributes;
    
    const [onBlur, setOnBlur] = useState("");
    const [onFocus, setOnFocus] = useState("");
    const [onKeyDown, setOnKeyDown] = useState("");
    const [onChange, setOnChange] = useState("");
    const [onValueChange, setOnValueChange] = useState("");


    const handleBlurChange = (e: any) => {
        setOnBlur(e.value);
        currAttribute.onBlur = e.value;
        handleAttributeChange(e);
    }

    const handleFocusChange = (e: any) => {
        setOnFocus(e.value);
        currAttribute.onFocus = e.value;
        handleAttributeChange(e);
    }

    const handleKeydownChange = (e: any) => {
        setOnKeyDown(e.value);
        currAttribute.onKeyDown = e.value;
        handleAttributeChange(e);
    }

    const handelOnChange = (e: any) => {
        setOnChange(e.value);
        currAttribute.setOnChange = e.value;
        handleAttributeChange(e);
    }


    const handleValueChange = (e: any) => {
        setOnValueChange(e.value);
        currAttribute.onValueChange = e.value;
        handleAttributeChange(e);
    }

    return (
        <>
            <div className="field col-12">
                <label htmlFor="onBlur" className="block">On Blur</label>
                <Dropdown
                    style={{ width: '100%' }}
                    name="onBlur"
                    value={meta.currentElement?.attributes?.onBlur}
                    options={eventOptions || []}
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
                    value={meta.currentElement?.attributes?.onFocus}
                    options={eventOptions || []}
                    placeholder="Select a Focus Event"
                    onChange={e => { handleFocusChange(e) }}
                    showClear={true}
                />
            </div>
            <div className="field col-12">
                <label htmlFor="onKeyDown" className="block">On KeyDown</label>
                <Dropdown
                    style={{ width: '100%' }}
                    name="onKeyDown"
                    value={meta.currentElement?.attributes?.onKeyDown}
                    options={eventOptions || []}
                    placeholder="Select a onKeyDown Event"
                    onChange={e => { handleKeydownChange(e) }}
                    showClear={true}
                />
            </div>
            <div className="field col-12">
                <label htmlFor="onChangeEvent" className="block">
                    On Change
                </label>
                <Dropdown
                    style={{ width: "100%" }}
                    name="onChangeEvent"
                    value={meta.currentElement?.attributes?.onChangeEvent}
                    options={eventOptions || []}
                    placeholder="Select a onChange Event"
                    onChange={e => { handelOnChange(e) }}
                    showClear={true}
                />
            </div>
            <div className="field col-12">
                <label htmlFor="onValueChange" className="block">On Value Change</label>
                <Dropdown
                    style={{ width: '100%' }}
                    name="onValueChange"
                    value={meta.currentElement?.attributes?.onValueChange}
                    options={eventOptions || []}
                    placeholder="Select a onValueChange Event"
                    onChange={e => { handleValueChange(e) }}
                    showClear={true}
                />
            </div>
        </>
    )

}

export default AttrNumericConfig