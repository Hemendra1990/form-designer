import { Dropdown } from "primereact/dropdown";
import React from "react";

interface SelectItem {
    label: string;
    value: string;
}

interface AttrAutoCompleteConfigProps {
    meta: any;
    handleAttributeChange: Function;
    currentElement: any;
    availableEvents: SelectItem[];
}

const AttrAutoCompleteConfig = (props: AttrAutoCompleteConfigProps) => {
    const { meta, handleAttributeChange, availableEvents } = props;
    const currAttribute = meta?.currentElement?.attributes;
    const styleObj = {
        width: "100%"
    };

    return (
        <>
            <div className="field col-12">
                <label className="block">On Change</label>
                <Dropdown
                    name="onChangeEvent"
                    value={currAttribute.onChangeEvent}
                    options={availableEvents}
                    onChange={(e) => {
                        handleAttributeChange(e);
                    }}
                    placeholder="Select an Event"
                    style={styleObj}
                    showClear={true}
                />
            </div>
            {/* <div className="field col-12">
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
            <div className="field col-12">
                <label className="block">On Focus</label>
                <Dropdown
                    name="onFocusEvent"
                    value={currAttribute.onFocusEvent}
                    options={availableEvents}
                    onChange={(e) => {
                        handleAttributeChange(e);
                    }}
                    placeholder="Select an Event"
                    style={styleObj}
                    showClear={true}
                />
            </div> */}
            <div className="field col-12">
                <label className="block">On Select</label>
                <Dropdown
                    name="onSelectEvent"
                    value={currAttribute.onSelectEvent}
                    options={availableEvents}
                    onChange={(e) => {
                        handleAttributeChange(e);
                    }}
                    placeholder="Select an Event"
                    style={styleObj}
                    showClear={true}
                />
            </div>
            <div className="field col-12">
                <label className="block">On UnSelect</label>
                <Dropdown
                    name="onUnSelectEvent"
                    value={currAttribute.onUnSelectEvent}
                    options={availableEvents}
                    onChange={(e) => {
                        handleAttributeChange(e);
                    }}
                    placeholder="Select an Event"
                    style={styleObj}
                    showClear={true}
                />
            </div>
            <div className="field col-12">
                <label className="block">On Dropdown Click</label>
                <Dropdown
                    name="onDropdownClick"
                    value={currAttribute.onDropdownClick}
                    options={availableEvents}
                    onChange={(e) => {
                        handleAttributeChange(e);
                    }}
                    placeholder="Select an Event"
                    style={styleObj}
                    showClear={true}
                />
            </div>
            <div className="field col-12">
                <label className="block">On Click</label>
                <Dropdown
                    name="onClick"
                    value={currAttribute.onClick}
                    options={availableEvents}
                    onChange={(e) => {
                        handleAttributeChange(e);
                    }}
                    placeholder="Select an Event"
                    style={styleObj}
                    showClear={true}
                />
            </div>
            <div className="field col-12">
                <label className="block">On Double Click</label>
                <Dropdown
                    name="onDoubleClick"
                    value={currAttribute.onDoubleClick}
                    options={availableEvents}
                    onChange={(e) => {
                        handleAttributeChange(e);
                    }}
                    placeholder="Select an Event"
                    style={styleObj}
                    showClear={true}
                />
            </div>
            <div className="field col-12">
                <label className="block">On Mouse Down</label>
                <Dropdown
                    name="onMouseDown"
                    value={currAttribute.onMouseDown}
                    options={availableEvents}
                    onChange={(e) => {
                        handleAttributeChange(e);
                    }}
                    placeholder="Select an Event"
                    style={styleObj}
                    showClear={true}
                />
            </div>
            <div className="field col-12">
                <label className="block">On Key Up</label>
                <Dropdown
                    name="onKeyUp"
                    value={currAttribute.onKeyUp}
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
    );
}

export default AttrAutoCompleteConfig;