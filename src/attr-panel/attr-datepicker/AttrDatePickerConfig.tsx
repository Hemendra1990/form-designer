import { Dropdown } from "primereact/dropdown";
import React, { useState } from "react";

interface AttrDatePickerConfigProps {
    meta: any;
    handleAttributeChange: Function;
    eventOptions: Array<any>;
}

const AttrDatePickerConfig = (props: AttrDatePickerConfigProps) => {
    const { meta, handleAttributeChange, eventOptions } = props;
    const currAttribute = meta?.currentElement?.attribute;
    const [onBlur, setOnBlur] = useState("");
    const [onFocus, setOnFocus] = useState("");
    const [onInput, setOnInput] = useState("");
    const [onSelect, setOnSelect] = useState("");
    const [onChange, setOnChange] = useState("");
    const [onTodayButtonClick, setOnTodayButtonClick] = useState("");
    const [onClearButtonClick, setOnClearButtonClick] = useState("");
    const [onViewDateChange, setOnViewDateChange] = useState("");
    const [onShow, setOnShow] = useState("");
    const [onHide, setOnHide] = useState("");
    const [onVisibleChange, setOnVisibleChange] = useState("");



    const handleBlurChange = (e: any) => {
        setOnBlur(e.value);
        currAttribute.onblur = e.value;
    };

    const handleFocusChange = (e: any) => {
        setOnFocus(e.value);
        currAttribute.onfocus = e.value;
    };

    const handleOnInput = (e: any) => {
        setOnInput(e.value);
        currAttribute.oninput = e.value;
    };

    const handleOnSelect = (e: any) => {
        setOnSelect(e.value);
        currAttribute.onselect = e.value;
    };
    const handleOnChange = (e: any) => {
        setOnChange(e.value);
        currAttribute.onselect = e.value;
    };
    const handleOnTodayButtonClick = (e: any) => {
        setOnTodayButtonClick(e.value);
        currAttribute.onselect = e.value;
    };
    const handleOnClearButtonClick = (e: any) => {
        setOnClearButtonClick(e.value);
        currAttribute.onselect = e.value;
    };
    const handleOnViewDateChange = (e: any) => {
        setOnViewDateChange(e.value);
        currAttribute.onselect = e.value;
    };
    const handleOnShow = (e: any) => {
        setOnShow(e.value);
        currAttribute.onselect = e.value;
    };
    const handleOnHide = (e: any) => {
        setOnHide(e.value);
        currAttribute.onselect = e.value;
    };
    const handleOnVisibleChange = (e: any) => {
        setOnVisibleChange(e.value);
        currAttribute.onselect = e.value;
    };
    return (
        <>
            <div className="field col-12">
                <label htmlFor="onBlur" className="block">
                    On Blur
                </label>
                <Dropdown
                    style={{ width: "100%" }}
                    name="onblur"
                    value={onBlur}
                    options={eventOptions}
                    placeholder="Select a Blur Event"
                    onChange={(e) => {
                        handleBlurChange(e);
                    }}
                />
            </div>
            <div className="field col-12">
                <label htmlFor="onFocus" className="block">
                    On Focus
                </label>
                <Dropdown
                    style={{ width: "100%" }}
                    name="onfocus"
                    value={onFocus}
                    options={eventOptions}
                    placeholder="Select a Focus Event"
                    onChange={(e) => {
                        handleFocusChange(e);
                    }}
                />
            </div>
            <div className="field col-12">
                <label htmlFor="onInput" className="block">
                    On Input
                </label>
                <Dropdown
                    style={{ width: "100%" }}
                    name="onInput"
                    value={onInput}
                    options={eventOptions}
                    placeholder="Select a Input Event"
                    onChange={(e) => {
                        handleOnInput(e);
                    }}
                />
            </div>
            <div className="field col-12">
                <label htmlFor="onSelect" className="block">
                    On Select
                </label>
                <Dropdown
                    style={{ width: "100%" }}
                    name="onSelect"
                    value={onSelect}
                    options={eventOptions}
                    placeholder="Select a Select Event"
                    onChange={(e) => {
                        handleOnSelect(e);
                    }}
                />
            </div>
            <div className="field col-12">
                <label htmlFor="onChange" className="block">
                    On Change
                </label>
                <Dropdown
                    style={{ width: "100%" }}
                    name="onChange"
                    value={onChange}
                    options={eventOptions}
                    placeholder="Select a Change Event"
                    onChange={(e) => {
                        handleOnChange(e);
                    }}
                />
            </div>
        </>
    );
}
export default AttrDatePickerConfig;
