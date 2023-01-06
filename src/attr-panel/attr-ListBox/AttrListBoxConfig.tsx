import { Dropdown } from "primereact/dropdown";
import React, { useState } from "react";

interface AttrListboxConfigProps {
    meta: any;
    handleAttributeChange: Function;
    eventOptions: Array<any>;
}
const AttrListboxConfig = (props: AttrListboxConfigProps) => {

    const { meta, handleAttributeChange, eventOptions } = props;

    const currentAttribute = meta?.currentElement?.attributes
    const [onChangeEvent, setOnChangeEvent] = useState("");
    const [onFilterChange, setOnFilterChange] = useState("");

    const handelOnchangeEvent = (e: any) => {
        setOnChangeEvent(e.target.value);
        currentAttribute.onChangeEvent = e.target.value;
        handleAttributeChange(e);
    }

    const handelOnFilterChange = (e: any) => {
        setOnFilterChange(e.target.value);
        currentAttribute.onFilterChange = e.value;
        handleAttributeChange(e);

    }

    return (
        <>
            <div className="field col-12">
                <label htmlFor="onChangeEvent" className="block">
                    onChange
                </label>
                <Dropdown
                    style={{ width: "100%" }}
                    name="onchangeevent"
                    value={currentAttribute.onChangeEvent || onChangeEvent}
                    options={eventOptions}
                    placeholder="Select a onChange Event"
                    onChange={handelOnchangeEvent}
                />
            </div>
            <div className="field col-12">
                <label htmlFor="onFilterValueChange" className="block">
                    onFilterValueChange
                </label>
                <Dropdown
                    style={{ width: "100%" }}
                    name="onfiltervaluechange"
                    value={currentAttribute.onFilterChange || onFilterChange}
                    options={eventOptions}
                    placeholder="Select a onFilterChange Event"
                    onChange={handelOnFilterChange}
                />
            </div>
        </>)
}

export default AttrListboxConfig