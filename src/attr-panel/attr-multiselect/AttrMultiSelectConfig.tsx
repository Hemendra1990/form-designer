import { Dropdown } from "primereact/dropdown";
import React, { useState } from "react";

interface AttrMultiSelectConfigProps {
    meta: any;
    handleAttributeChange: Function;
    eventOptions: Array<any>;
}
const AttrMultiSelectConfig = (props: AttrMultiSelectConfigProps) => {

    const { meta, handleAttributeChange, eventOptions } = props;
    const currentAttribute = meta?.currentElement?.attributes
    // const [onBlur, setonBlur] = useState("");
    // const [onFocus, setonFocus] = useState("");
    const [onChangeEvent, setOnChangeEvent] = useState("");
    const [onFilterEvent, setOnFilterEvent] = useState("");

    // const handleBlurChange = (e: any) => {
    //     setonBlur(e.value);
    //     currentAttribute.onBlur = e.value;
    //     handleAttributeChange(e);
    // }

    // const handleFocusChange = (e: any) => {
    //     setonFocus(e.value);
    //     currentAttribute.onFocus = e.value;
    //     handleAttributeChange(e);
    // }

    const handelOnchangeEvent = (e: any) => {
        setOnChangeEvent(e.value);
        currentAttribute.onChangeEvent = e.value;
        handleAttributeChange(e);
    }

    const handelOnFilterEvent = (e: any) => {
        setOnFilterEvent(e.value);
        currentAttribute.onFilterEvent = e.value;
        handleAttributeChange(e);
    }

    return (
        <>
            {/* <div className="field col-12">
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
            </div> */}
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
                    onChange={e => { handelOnchangeEvent(e) }}
                    showClear={true}
                />
            </div>
            <div className="field col-12">
                <label htmlFor="onFilterEvent" className="block">
                    On Filter
                </label>
                <Dropdown
                    style={{ width: "100%" }}
                    name="onFilterEvent"
                    value={meta.currentElement?.attributes?.onFilterEvent}
                    options={eventOptions || []}
                    placeholder="Select a onFilterEvent Event"
                    onChange={e => { handelOnFilterEvent(e) }}
                    showClear={true}
                />
            </div>
        </>)
}

export default AttrMultiSelectConfig