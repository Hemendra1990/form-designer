import { Dropdown } from "primereact/dropdown";
import React, { useState } from "react";

interface AttrDatePickerConfigProps {
    meta: any;
    handleAttributeChange: Function;
    eventOptions: Array<any>;
}

const AttrDatePickerConfig = (props: AttrDatePickerConfigProps) => {
    const { meta, handleAttributeChange, eventOptions } = props;
    const currAttribute = meta?.currentElement?.attributes;
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
        handleAttributeChange(e)
    };

    const handleFocusChange = (e: any) => {
        setOnFocus(e.value);
        currAttribute.onFocus = e.value;
        handleAttributeChange(e)
    };

    const handleOnInput = (e: any) => {
        setOnInput(e.value);
        currAttribute.onInput = e.value;
        handleAttributeChange(e)
    };

    const handleOnSelect = (e: any) => {
        setOnSelect(e.value);
        currAttribute.onSelect = e.value;
        handleAttributeChange(e)
    };
    const handleOnChange = (e: any) => {
        setOnChange(e.value);
        currAttribute.onChange = e.value;
        handleAttributeChange(e)
    };
    const handleOnTodayButtonClick = (e: any) => {
        setOnTodayButtonClick(e.value);
        handleAttributeChange(e)
    };
    const handleOnClearButtonClick = (e: any) => {
        setOnClearButtonClick(e.value);
        handleAttributeChange(e)
    };
    const handleOnViewDateChange = (e: any) => {
        setOnViewDateChange(e.value);
        handleAttributeChange(e)
    };
    const handleOnShow = (e: any) => {
        setOnShow(e.value);
        handleAttributeChange(e)
    };
    const handleOnHide = (e: any) => {
        setOnHide(e.value);
        handleAttributeChange(e)
    };
    const handleOnVisibleChange = (e: any) => {
        setOnVisibleChange(e.value);
        currAttribute.onSelect = e.value;
    };
    return (
        <>
            <div className="field col-12">
                <label htmlFor="onBlur" className="block">
                    On Blur
                </label>
                <Dropdown
                    style={{ width: "100%" }}
                    name="onBlur"
                    value={currAttribute?.onBlur}
                    options={eventOptions || []}
                    placeholder="Select a Blur Event"
                    onChange={(e) => {
                        handleBlurChange(e);
                    }}
                    showClear
                />
            </div>
            <div className="field col-12">
                <label htmlFor="onFocus" className="block">
                    On Focus
                </label>
                <Dropdown
                    style={{ width: "100%" }}
                    name="onFocus"
                    value={currAttribute?.onFocus}
                    options={eventOptions}
                    placeholder="Select a Focus Event"
                    onChange={(e) => {
                        handleFocusChange(e);
                    }}
                    showClear
                />
            </div>
            <div className="field col-12">
                <label htmlFor="onInput" className="block">
                    On Input
                </label>
                <Dropdown
                    style={{ width: "100%" }}
                    name="onInput"
                    value={currAttribute?.onInput}
                    options={eventOptions}
                    placeholder="Select a Input Event"
                    onChange={(e) => {
                        handleOnInput(e);
                    }}
                    showClear
                />
            </div>
            <div className="field col-12">
                <label htmlFor="onSelect" className="block">
                    On Select
                </label>
                <Dropdown
                    style={{ width: "100%" }}
                    name="onSelect"
                    value={currAttribute?.onSelect}
                    options={eventOptions}
                    placeholder="Select a Select Event"
                    onChange={(e) => {
                        handleOnSelect(e);
                    }}
                    showClear
                />
            </div>
            <div className="field col-12">
                <label htmlFor="onChange" className="block">
                    On Change
                </label>
                <Dropdown
                    style={{ width: "100%" }}
                    name="onChange"
                    value={currAttribute?.onChange}
                    options={eventOptions}
                    placeholder="Select a Change Event"
                    onChange={(e) => {
                        handleOnChange(e);
                    }}
                    showClear
                />
            </div>
        </>
    );
}
export default AttrDatePickerConfig;
