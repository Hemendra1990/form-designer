import { Dropdown } from "primereact/dropdown";
import React, { useState } from "react";

interface AttrLableConfigProps {
    meta: any;
    handleAttributeChange: Function;
    eventOptions: Array<any>;
}

const AttrLableConfig = (props: AttrLableConfigProps) => {
    const { meta, handleAttributeChange, eventOptions } = props;
    const [onClickEvent, setOnClickEvent] = useState("");

    const handelOnclickOption = (e: any) => {
        setOnClickEvent(e.value);
        handleAttributeChange(e)
    }

    return (
        <>
            <div className="field col-12">
                <label className="block">On Click</label>
                <Dropdown
                    style={{ width: "100%" }}
                    name="onclick"
                    value={onClickEvent}
                    options={eventOptions}
                    placeholder="Select a onClick Event"
                    onChange={handelOnclickOption}
                />
            </div>
        </>
    )
}

export default AttrLableConfig