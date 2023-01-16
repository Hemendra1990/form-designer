import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';

const CURRENCY_TYPES = [
    { currencyName: "USD", code: "en-US" },
    { currencyName: "EUR", code: "de-DE" },
    { currencyName: "INR", code: "en-IN" },
    { currencyName: "JPY", code: "jp-JP" },
];

const AttrNumeric = (props) => {
    
    const mode = [{ name: 'Decimal ', key: 'decimal' },  { name: ' Currency', key: 'currency' }];

    const { meta, handleAttributeChange } = props;
    const currAttribute = meta?.currentElement?.attributes;

    const [numericValue, setNumericValue] = useState("");
    const [placeholder, setPlaceholder] = useState("");
    const [decimalValue, setDecimalValue] = useState("");
    const [minFractionDigits, setMinFractionDigits] = useState("");
    const [maxFractionDigits, setMaxFractionDigits] = useState("");
    const [currencyValue, setCurrencyValue] = useState("");
    const [selectedmode, setSelectedmode] = useState({});
    const [currencyCode, setCurrencyCode] = useState("");

    const handelNumericValue = (e) => {
        setNumericValue(e.value);
        handleAttributeChange(e);
    }

    useEffect(() => {
        setPlaceholder(currAttribute?.placeholder || "");
        setNumericValue(currAttribute?.numericValue || "");
        setDecimalValue(currAttribute?.decimalValue || "");
        setMinFractionDigits(currAttribute?.minFractionDigits || "");
        setMaxFractionDigits(currAttribute?.maxFractionDigits || "");
        setCurrencyValue(currAttribute?.currencyValue || "");
        setSelectedmode(currAttribute?.selectedmode || "");
        setCurrencyCode(currAttribute?.currencyCode || "");
    }, [meta.currentElement]);

    return (
        <>
            <div className="field col-12">
                <label htmlFor="controlId">Control ID</label>
                <InputText
                    style={{ width: "100%" }}
                    name="placeholder"
                    value={meta.currentElement.id}
                    disabled
                />
            </div>
            <div className="field col-12">
                <label htmlFor="value" className="block">
                    Value
                </label>
                <InputText
                    style={{ width: '100%' }}
                    name="numericValue"
                    placeholder="Enter value"
                    value={currAttribute?.numericValue }
                    onChange={handelNumericValue}
                />
            </div>
            <div className="field-checkbox grid">
                {
                    mode.map((mode) => {
                        return (
                            <div key={mode.key} className="field-radiobutton col">
                                <RadioButton
                                    name="selectedmode"
                                    value={mode}
                                    onChange={(e) => {
                                        setSelectedmode(e.value);
                                        handleAttributeChange(e)
                                        currAttribute.selectedmode = e.value.key
                                    }}
                                    checked={selectedmode.key === mode.key}
                                />
                                <label htmlFor={mode.key}>{mode.name}</label>
                            </div>
                        )
                    })
                }
            </div>
            {selectedmode.key == 'decimal' && (
                <div className="field col-12">
                    <label htmlFor="minFractionDigits">Min Fraction</label>
                    <InputText
                        value={minFractionDigits}
                        style={{ width: "100%" }}
                        name="minFractionDigits"
                        placeholder="Enter Min Fraction Digit"
                        mode="decimal"
                        onChange={(e) => {
                            setMinFractionDigits(e.target.value);
                            handleAttributeChange(e);
                            currAttribute.minFractionDigits = e.target.value
                        }}
                    />
                </div>
            )}
            {selectedmode.key == 'decimal' && (
                <div className="field col-12">
                    <label htmlFor="maxFractionDigits">Max Fraction</label>
                    <InputText
                        value={maxFractionDigits}
                        style={{ width: "100%" }}
                        name="maxFractionDigits"
                        placeholder="Enter Max Fraction Digit"
                        mode="decimal"
                        onChange={(e) => {
                            setMaxFractionDigits(e.target.value);
                            handleAttributeChange(e);
                            currAttribute.maxFractionDigits = e.target.value
                        }}
                    />
                </div>
            )}
            {selectedmode.key == 'currency' && (
                <div className="field col-12">
                    <label htmlFor="currency">Currency</label>
                    <Dropdown
                        value={currencyValue}
                        style={{ width: "100%" }}
                        name="currencyValue"
                        placeholder="Choose currency"
                        options={CURRENCY_TYPES}
                        optionLabel="currencyName"
                        onChange={(e) => {
                            setCurrencyValue(e.target.value);
                            setCurrencyCode(e.target.value)
                            handleAttributeChange(e);
                            currAttribute.currencyValue = e.value.currencyName
                            currAttribute.currencyCode = e.value.code
                        }}
                    />
                </div>
            )}
            <div className="field col-12">
                <label htmlFor="placeholder">Placeholder</label>
                <InputText
                    name="placeholder"
                    style={{ width: "100%" }}
                    value={placeholder}
                    onChange={(e) => {
                        setPlaceholder(e.target.value);
                        handleAttributeChange(e);
                    }}
                />
            </div>
        </>
    );
};

export default AttrNumeric;