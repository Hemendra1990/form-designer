import { Dropdown } from "primereact/dropdown";
import React from "react";

interface SelectItem {
    label: string;
    value: string;
}

interface AttrPasswordConfigProps {
    meta: any;
    handleAttributeChange: Function;
    eventOptions: Array<any>;
    availableEvents: SelectItem[];
}

const AttrPasswordConfig = (props: AttrPasswordConfigProps) => {

    const { meta, handleAttributeChange, eventOptions, availableEvents } = props;
    const currAttribute = meta?.currentElement?.attributes;

    const styleObj = {
        width: "100%"
    };

    return (
        <>
            <div className="field col-12">
                <label className="block">On Blur</label>
                <Dropdown
                    name="onBlurEvent"
                    value={currAttribute.onBlurEvent}
                    options={availableEvents}
                    onChange={(e) => {
                        handleAttributeChange(e);
                    }}
                    placeholder="Select an Event"
                    style={styleObj}
                    showClear={true}
                />
            </div>
        </>
    )
}

export default AttrPasswordConfig;