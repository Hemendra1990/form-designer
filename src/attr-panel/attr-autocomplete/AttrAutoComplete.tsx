import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";

interface SelectItem {
    label: string;
    value: string;
}

interface AttrPasswordProps {
    meta: any;
    handleAttributeChange: Function;
    currentElement: any;
    availableEvents: SelectItem[];
}

const AttrAutoComplete = (props: AttrPasswordProps) => {
    const { handleAttributeChange, currentElement, meta } = props;

    const currAttribute = meta?.currentElement?.attributes;

    const [autoHighlightEnable, setAutoHighlightEnable] = useState(false);
    const [placeholder, setPlaceholder] = useState("")
    const [dropdownEnable, setDropdownEnable] = useState(false);
    const [showEmptyMessage, setShowEmptyMessage] = useState(false);
    const [emptyMessageValue, setEmptyMessageValue] = useState("No results found.");
    const [options, setOptions] = useState([]);
    const [optionFilterValue, setOptionFilterValue] = useState("");
    const [optionLabel, setOptionLabel] = useState("");

    const getOptionListForFilter = () => {
        setOptions(
            meta?.currentElement?.ref.current?.getColumnList() || []
        );
    };

    useEffect(() => {
        getOptionListForFilter();
        setAutoHighlightEnable(currAttribute.autoHighlightEnable || false);
        setPlaceholder(currAttribute.placeholder || "")
        setDropdownEnable(currAttribute.dropdownEnable || false);
        setShowEmptyMessage(currAttribute.showEmptyMessage || false);
        setEmptyMessageValue(currAttribute.emptyMessageValue || "No results found.");
        setOptionFilterValue(currAttribute.optionFilterValue || undefined);
        setOptionLabel(currAttribute.optionLabel || undefined);
    }, [meta.currentElement])

    return (
        <>
            <div className="field col-12">
                <label htmlFor="controlId" className="block">
                    Control ID
                </label>
                <InputText
                    style={{ width: "100%" }}
                    name="controlId"
                    value={currentElement.id}
                    disabled
                />
            </div>
            <div className="field col-12">
                <label htmlFor="" className="block">
                    Placeholder
                </label>
                <InputText
                    style={{ width: "100%" }}
                    name="placeholder"
                    value={placeholder}
                    onChange={(e) => {
                        setPlaceholder(e.target.value)
                        handleAttributeChange(e);
                    }}
                />
            </div>
            <div className="field col-12">
                <label htmlFor="filterby">Filter By</label>
                <Dropdown
                    showClear={true}
                    value={optionFilterValue}
                    options={options}
                    style={{ width: "100%" }}
                    name="optionFilterValue"
                    onFocus={getOptionListForFilter}
                    onChange={(e) => {
                        setOptionFilterValue(e.value);
                        handleAttributeChange(e);
                    }}
                    optionLabel="header"
                    optionValue="field"
                />
            </div>
            <div className="field col-12">
                <label htmlFor="filterby">Option Label</label>
                <Dropdown
                    showClear={true}
                    value={optionLabel}
                    options={options}
                    style={{ width: "100%" }}
                    name="optionLabel"
                    onFocus={getOptionListForFilter}
                    onChange={(e) => {
                        setOptionLabel(e.value);
                        handleAttributeChange(e);
                    }}
                    optionLabel="header"
                    optionValue="field"
                />
            </div>
            <div className="field col-12">
                <div className="field-checkbox">
                    <Checkbox
                        name="autoHighlightEnable"
                        inputId="binary"
                        checked={autoHighlightEnable}
                        onChange={(e) => {
                            setAutoHighlightEnable(e.checked);
                            handleAttributeChange(e);
                        }}
                    />
                    <label htmlFor="filter" className="p-checkbox-label">
                        Auto Highlight
                        <span>
                            <h5>(When enabled, highlights the first item in the list by default)</h5>
                        </span>
                    </label>
                </div>
            </div>
            <div className="field col-12">
                <div className="field-checkbox">
                    <Checkbox
                        name="dropdownEnable"
                        inputId="binary"
                        checked={dropdownEnable}
                        onChange={(e) => {
                            setDropdownEnable(e.checked);
                            handleAttributeChange(e);
                        }}
                    />
                    <label htmlFor="filter" className="p-checkbox-label">
                        Add Dropdown Enable
                    </label>
                </div>
            </div>
            <div className="field col-12">
                <div className="field-checkbox">
                    <Checkbox
                        name="showEmptyMessage"
                        inputId="binary"
                        checked={showEmptyMessage}
                        onChange={(e) => {
                            setShowEmptyMessage(e.checked);
                            handleAttributeChange(e);
                        }}
                    />
                    <label htmlFor="filter" className="p-checkbox-label">
                        Show empty message
                    </label>
                </div>
            </div>
            {showEmptyMessage && (
                <div className="field col-12">
                    <label htmlFor="filterby">Empty Message Value</label>
                    <InputText
                        value={emptyMessageValue}
                        style={{ width: "100%" }}
                        name="emptyMessageValue"
                        onChange={(e) => {
                            setEmptyMessageValue(e.target.value);
                            handleAttributeChange(e);
                        }}
                    />
                </div>
            )}

        </>
    );
}

export default AttrAutoComplete