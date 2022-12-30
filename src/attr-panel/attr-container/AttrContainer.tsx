import { InputText } from "primereact/inputtext";
import React from "react";

interface AttrContainerProps {
    meta: any;
    handleAttributeChange: Function;
    eventOptions: Array<any>;
}
const AttrContainer = (props: AttrContainerProps) => {

    const { meta, handleAttributeChange, eventOptions } = props;
    const currAttribute = meta.currentElement?.attributes;

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
        </>
    )
}

export default AttrContainer;