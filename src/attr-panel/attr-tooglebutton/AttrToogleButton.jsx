import React, { memo, useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";




const AttrToogleButton = (props) => {
    const { meta, handleAttributeChange, currentElement, availableEvents } = props;
    const currAttribute = currentElement?.attributes;

    const [onLabel, setOnLabel] = useState("");
    const [offLabel, setOffLabel] = useState("");

    const handelOnlableValue = (e) => {
        setOnLabel(e.placeholder);
        handleAttributeChange(e);
    }

    const handelOfflableValue = (e) => {
        setOffLabel(e.placeholder);
        handleAttributeChange(e);
    }

    return (
        <>
            <div className="field col-12">
                <label htmlFor="controlId" className="block">Control ID</label>
                <InputText name="placeholder" style={{ width: '100%' }} value={meta.currentElement.id} disabled />
            </div>
            <div className="field col-12">
                <label htmlFor="maxLen" className="block">
                    Label for the on state
                </label>
                <InputText
                    style={{ width: '100%' }}
                    name="onLabel"
                    placeholder="Enter onLable"
                    onChange={handelOnlableValue}
                    value={currAttribute?.onLabel}
                />
            </div>
            <div className="field col-12">
                <label htmlFor="maxLen" className="block">
                    Label for the off state
                </label>
                <InputText
                    style={{ width: '100%' }}
                    name="offLabel"
                    placeholder="Enter offLable"
                    onChange={handelOfflableValue}
                    value={currAttribute?.offLabel}
                />
            </div>
        </>
    )

}

export default AttrToogleButton;