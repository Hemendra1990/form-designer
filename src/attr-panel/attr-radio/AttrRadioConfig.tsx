import { Dropdown } from "primereact/dropdown";
import React, { useState } from "react";

interface AttrRadioConfigProps {
    meta: any;
    handleAttributeChange: Function;
    eventOptions: Array<any>;
}

const AttrRadioConfig = (props: AttrRadioConfigProps) => {
    const { meta, handleAttributeChange, eventOptions } = props;
    const currAttribute = meta?.currentElement?.attributes;

    const [onChange, setOnChange] = useState("");
    const [showClearOnChange, setShowClearOnChange] = useState(false);


    const handleOnChange = (e: any) => {
        setOnChange(e.value);
        currAttribute.onChange = e.value;
        handleAttributeChange(e);
        setShowClearOnChange(true);
    };

    return (
        <>
            <div className="field col-12">
                <label htmlFor="onChange" className="block">On Change</label>
                <Dropdown
                    style={{ width: '100%' }}
                    name="onChange"
                    value={currAttribute.onChange || onChange}
                    options={eventOptions}
                    placeholder="Select a Blur Event"
                    onChange={e => { handleOnChange(e) }}
                    showClear={showClearOnChange}
                />
            </div>
        </>
    )

}

export default AttrRadioConfig;