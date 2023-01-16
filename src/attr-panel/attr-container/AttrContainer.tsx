import { InputText } from "primereact/inputtext";
import React, { useState } from "react";

interface AttrContainerProps {
    meta: any;
    handleAttributeChange: Function;
    eventOptions: Array<any>;
}
const AttrContainer = (props: AttrContainerProps) => {

    const { meta, handleAttributeChange, eventOptions } = props;
    const currAttribute = meta.currentElement?.attributes;
    const [controlName, setControlName] = useState(meta.currentElement.id || "");

    const handleAttributesChange = (e: any) => {
        handleAttributeChange(e)
    }

    return (
        <>
            <div className="field col-12">
                <label htmlFor="controlId">Control ID</label>
                <InputText
                    name="placeholder"
                    value={meta.currentElement.id}
                    disabled
                />
            </div>
            <div className="field col-12">
                <label htmlFor="controlName" className="block">
                    Name
                </label>
                <InputText
                    name="name"
                    style={{ width: "100%" }}
                    value={controlName}
                    onChange={(e) => {
                        setControlName(e.target.value);
                        handleAttributeChange(e);
                    }}
                />
            </div>
        </>
    )
}

export default AttrContainer;