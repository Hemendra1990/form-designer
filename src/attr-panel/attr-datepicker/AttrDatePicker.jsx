import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import { Checkbox } from "primereact/checkbox";


const AttrDatePicker = (props) => {
    const { meta, handleAttributeChange, eventOptions } = props;
    const currAttribute = meta?.currentElement?.attributes;
    const [placeholder, setPlaceholder] = useState("");
    const [showWeek, setShowWeek] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [hideOnDateTimeSelect, setHideOnDateTimeSelect] = useState(false);
    const [dataFormat, setDataFormat] = useState("");
    const [showIcon, setShowIcon] = useState(false);
    const [calenderIcon, setCalenderIcon] = useState("");
    const [showButtonBar, setShowButtonBar] = useState(false);


    const DATE_FORMAT = [
        "yy-mm-dd",
        "mm-dd-yy",
        "dd-mm-yy"
    ];

    const DATE_SELECTION_MODE = [
        "single",
        "multiple",
        "range"
    ]

    useEffect(() => {

        setShowWeek(currAttribute?.showWeek || false);
        setShowTime(currAttribute?.showTime || false)
    }, [showWeek])

    return (
        <>
            <div className="field col-12">
                <label htmlFor="controlId" className="block">
                    Control ID
                </label>
                <InputText
                    name="placeholder"
                    style={{ width: "100%" }}
                    value={meta.currentElement.id}
                    disabled
                />
            </div>


            <div className="field col-12">
                <label htmlFor="maxLen" className="block">
                    Placeholder
                </label>
                <InputText
                    style={{ width: "100%" }}
                    name="placeholder"
                    value={currAttribute.placeholder || ""}
                    onChange={(e) => {
                        setPlaceholder(e.target.value);
                        handleAttributeChange(e);
                    }}
                    mode="decimal"
                />
            </div>
            <div className="grid">
                <div className="field col-6">
                    <label htmlFor="maxLen" className="block">
                        Show Button Bar
                    </label>
                    <Checkbox
                        name="showButtonBar"
                        checked={currAttribute?.showButtonBar}
                        onChange={(e) => {
                            setShowButtonBar(e.checked);
                            handleAttributeChange(e);
                        }}
                    />
                </div>
                <div className="field col-6">
                    <label htmlFor="maxLen" className="block">
                        Show Week
                    </label>
                    <Checkbox
                        name="showWeek"
                        checked={currAttribute?.showWeek}
                        onChange={(e) => {
                            setShowWeek(e.checked);
                            handleAttributeChange(e);
                        }}
                    />
                </div>
                <div className="field col-5">
                    <label htmlFor="maxLen" className="block">
                        Show Time
                    </label>
                    <Checkbox
                        name="showTime"
                        checked={currAttribute?.showTime}
                        onChange={(e) => {
                            setShowTime(e.checked);
                            handleAttributeChange(e);
                        }}
                    />
                </div>
                {showTime && <div className="field col-7">
                    <label style={{ fontSize: "15px" }} htmlFor="maxLen" className="block">
                        Hide Date Time Select
                    </label>
                    <Checkbox
                        name="hideOnDateTimeSelect"
                        checked={currAttribute?.hideOnDateTimeSelect}
                        onChange={(e) => {
                            setHideOnDateTimeSelect(e.checked);
                            handleAttributeChange(e);
                        }}
                    />
                </div>}
            </div>
            <div className="field col-12">
                <label htmlFor="label" className="block">Type</label>
                <Dropdown
                    name="dataFormat"
                    value={meta.currentElement?.attributes?.dataFormat || ""}
                    options={DATE_FORMAT}
                    onChange={(e) => {
                        setDataFormat(e.value);
                        handleAttributeChange(e)
                    }}
                    placeholder="Select type"
                    style={{ width: '100%' }}
                />
            </div>
            <div className="grid">
                <div className="field col-4">
                    <label htmlFor="maxLen" className="block">
                        Show Icon
                    </label>
                    <Checkbox
                        name="showIcon"
                        checked={currAttribute?.showIcon}
                        onChange={(e) => {
                            setShowIcon(e.checked);
                            handleAttributeChange(e);
                        }}
                    />
                </div>
                {currAttribute?.showIcon && <div className="field col-8">
                    <label htmlFor="maxLen" className="block">
                        Icon
                    </label>
                    <InputText
                        style={{ width: "100%" }}
                        name="calenderIcon"
                        placeholder="eg: pi pi-calender"
                        value={currAttribute.calenderIcon || "pi pi-calender"}
                        onChange={(e) => {
                            setCalenderIcon(e.target.value);
                            handleAttributeChange(e);
                        }}
                        mode="decimal"
                    />
                </div>}
            </div>
            <div className="field col-12">
                <label htmlFor="label" className="block">Selection Mode</label>
                <Dropdown
                    name="selectionMode"
                    value={meta.currentElement?.attributes?.selectionMode || ""}
                    options={DATE_SELECTION_MODE}
                    onChange={(e) => {
                        setDataFormat(e.value);
                        handleAttributeChange(e)
                    }}
                    placeholder="Selection mode"
                    style={{ width: '100%' }}
                />
            </div>

        </>
    );
}
export default AttrDatePicker;