import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from "primereact/inputtext";
import { Checkbox } from 'primereact/checkbox';
import { element } from 'prop-types';


const AttrListBox = (props) => {
    const { meta, eventOptions, updateClass, handleAttributeChange } = props;
    const currAttribute = meta?.currentElement?.attributes;

    const [checked, setChecked] = useState(false);
    const [multiple, setMultiple] = useState(false);
    const [filter, setFilter] = useState(false);
    const [value, setValue] = useState({});
    const [onChangeEvent, setOnChangeEvent] = useState("");
    const [onFilterChange, setOnFilterChange] = useState("");

    const handleOnChangeEvent = (e) => {
        setOnChangeEvent(e.value);
        currAttribute.onchangeevent = e.value;
    };
    const handleFilterValueChangeEvent = (e) => {
        setOnFilterChange(e.value);
        currAttribute.onfiltervaluechange = e.value;
    };

    return (
        <>
            <div className="field col-12">
                <label htmlFor="controlId" className="block">Control ID</label>
                <InputText name="placeholder" style={{ width: '100%' }} value={meta.currentElement.id} disabled />
            </div>
            <div className="field-checkbox">
                <Checkbox
                    inputId="binary"
                    checked={checked}
                    onChange={(e) => {
                        setChecked(e.checked);
                        meta.currentElement.attributes.disabled = e.checked;
                    }}
                />
                <label htmlFor="disabled" className="p-checkbox-label">Disabled</label>
            </div>
            <div className="field-checkbox">
                <Checkbox
                    inputId="binary"
                    checked={multiple}
                    onChange={(e) => {
                        setMultiple(e.checked);
                        meta.currentElement.attributes.multiple = e.checked;
                    }}
                />
                <label htmlFor="multiple" className="p-checkbox-label">Multiple</label>
            </div>
            <div className="field-checkbox">
                <Checkbox
                    inputId="binary"
                    checked={filter}
                    onChange={(e) => {
                        setFilter(e.checked);
                        meta.currentElement.attributes.filter = e.checked;
                    }}
                />
                <label htmlFor="filter" className="p-checkbox-label">Filter</label>
            </div>
            <div className="field col-12">
                <label htmlFor="filterby">FilterBy</label>
                <InputText
                    id="in"
                    value={meta.currentElement.attributes.filterBy}
                    style={{ width: '100%' }}
                    name="filterby"
                    onChange={handleAttributeChange}
                />
            </div>
            <div className="field col-12">
                <label htmlFor="tooltip">Tooltip</label>
                <InputText
                    style={{ width: '100%' }}
                    tooltipOptions={{ position: 'right', mouseTrack: true }}
                    onChange={(e) => {
                        setValue(e.target.value);
                        meta.currentElement.attributes.tooltip = e.target.value
                    }}
                />
            </div>
            <div className="field col-12">
                <label htmlFor="onChangeEvent" className="block">onChange</label>
                <Dropdown
                    style={{ width: '100%' }}
                    name="onchangeevent"
                    value={onChangeEvent}
                    options={eventOptions}
                    placeholder="Select a onChange Event"
                    onChange={e => { handleOnChangeEvent(e) }}
                />
            </div>
            <div className="field col-12">
                <label htmlFor="onFilterValueChange" className="block">onFilterValueChange</label>
                <Dropdown
                    style={{ width: '100%' }}
                    name="onfiltervaluechange"
                    value={onFilterChange}
                    options={eventOptions}
                    placeholder="Select a onFilterChange Event"
                    onChange={e => { handleFilterValueChangeEvent(e) }}
                />
            </div>
            <div className="field col-12">
                <label className="block">Class</label>
                <InputText
                    style={{ width: '100%' }}
                    name="className"
                    placeholder="col-12 md:col-6 lg:col-3"
                    value={currAttribute?.className || ""}
                    onChange={updateClass}
                />
            </div>
        </>
    )
};

export default AttrListBox;