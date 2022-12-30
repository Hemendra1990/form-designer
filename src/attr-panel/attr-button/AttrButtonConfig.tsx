import { Dropdown } from "primereact/dropdown";
import React from "react";

interface AttrButtonConfigProps {
    meta: any;
    handleAttributeChange: Function;
    eventOptions: Array<any>;
}
const AttrButtonConfig = (props: AttrButtonConfigProps) => {
    const { meta, handleAttributeChange, eventOptions } = props
    return (
        <>
            <div className="field col-12">
                <label htmlFor="eventId" className="block">Event ID</label>
                <Dropdown
                    name="eventId"
                    value={meta.currentElement?.attributes?.eventId}
                    options={eventOptions || []}
                    onChange={(e) => {
                        handleAttributeChange(e)
                    }}
                    placeholder="Select a Event"
                    style={{ width: '100%' }}
                />
            </div>
        </>
    )
}

export default AttrButtonConfig