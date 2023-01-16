import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";

interface AttrTextAreaProps {
    meta: any;
    handleAttributeChange: Function;
    eventOptions: Array<any>;
}

const AttrTextArea = (props: AttrTextAreaProps) => {

    const { meta, handleAttributeChange, eventOptions } = props;
    const currAttribute = meta.currentElement?.attributes;

    const [controlName, setControlName] = useState(meta.currentElement.id || "");

    const handleAttributesChange = (e: any) => {
        handleAttributeChange(e)
    }

    return (<>
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
        <div className="field col-12">
            <label htmlFor="rows">Rows Length</label>
            <InputNumber
                name="rows"
                onChange={handleAttributesChange}
                value={currAttribute?.rows}
            />
        </div>
        <div className="field col-12">
            <label htmlFor="cols">Cols Length</label>
            <InputNumber
                name="cols"
                onChange={handleAttributesChange}
                value={currAttribute?.cols}
            />
        </div>
        <div className="field col-12">
            <label htmlFor="maxLen">Max Length</label>
            <InputNumber
                name="maxLength"
                onChange={handleAttributesChange}
                value={currAttribute?.maxLength}
            />
        </div>
        <div className="field col-12">
            <label htmlFor="placeholder">Placeholder</label>
            <InputText
                name="placeholder"
                placeholder="Enter Placeholder"
                onChange={handleAttributesChange}
                value={currAttribute?.placeholder || ""}
            />
        </div>
    </>)
}

export default AttrTextArea