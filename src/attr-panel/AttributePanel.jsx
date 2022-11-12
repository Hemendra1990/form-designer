import { InputText } from "primereact/inputtext";
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { CONTROL } from "../constants/Elements";
import { useState } from "react";




const AttributePanel = (props) => {

    const {meta, setMeta} = props;

    const [classNameValue, setClassNameValue] = useState(meta.currentElement?.attributes?.className|| "");
    
    const updateMeta = (e) => {
        setMeta((prevVal) => {
            if(!prevVal.currentElement.attributes) {
                prevVal.currentElement.attributes = {};
            }
            prevVal.currentElement.attributes[(e.target || e.originalEvent.target).name] = (e.target || e.originalEvent.target).value;
            return {
                ...prevVal
            }
        });
    };

    const updateClass = (e) => {
        setClassNameValue(e.target.value);
        updateMeta(e);
    }

    const availableEvents = meta?.events?.map(ev=> {
        return {label: ev.name, value: ev.id}
    });

    /**
     * RULES FOR RENDERING ATTRIBUTES
     *  -Each Attribute should have a name (As line:35) e.g: <InputText name="label" />
     * 
     * @returns 
     */
    const renderAttributes = () => {
        if(meta && meta.currentElement) {
            const currAttribute = meta.currentElement?.attributes;

            const classDiv = (
              <div className="field col-12">
                <label htmlFor="class">Class</label>
                <InputText
                    name="className"
                    placeholder="col-12 md:col-6 lg:col-3"
                    value={currAttribute?.className || ""}
                    onChange={updateClass}
                />
              </div>
            );
            
            /* Render Button Attributes */
            if(meta.currentElement.type === CONTROL.BUTTON) {
                return (
                    <>
                        <div className="field col-12">
                            <label htmlFor="controlId">Control ID</label>
                            <InputText name="placeholder"  value={props.meta.currentElement.id} disabled />
                        </div>
                        <div className="field col-12">
                            <label htmlFor="eventId">Event ID</label>
                            <Dropdown name="eventId" value={props.meta.currentElement?.attributes?.eventId} options={availableEvents} onChange={updateMeta} placeholder="Select a Event"/>
                        </div>
                        <div className="field col-12">
                            <label htmlFor="label">Label</label>
                            <InputText name="label" placeholder="Enter Button Label" onChange={updateMeta} value={props.meta.currentElement?.attributes?.label}/>
                        </div>
                        {classDiv}
                    </>
                )
            }

            /* Render Input Attributes */
            if(meta.currentElement.type === CONTROL.INPUT) {
                return (
                  <>
                    <div className="field col-12">
                        <label htmlFor="controlId">Control ID</label>
                        <InputText name="placeholder"  value={props.meta.currentElement.id} disabled />
                    </div>
                    <div className="field col-12">
                      <label htmlFor="maxLen">Max Length</label>
                        <InputNumber
                        name="maxLength"
                        inputId="maxLen"
                        onChange={updateMeta}
                        value={currAttribute?.maxLength}
                        />
                    </div>
                    <div className="field col-12">
                      <label htmlFor="maxLen">Placeholder {currAttribute?.placeholder} </label>
                      <InputText name="placeholder" placeholder="Enter Placeholder" onChange={updateMeta} value={currAttribute?.placeholder || ""}/>
                    </div>
                    {classDiv}
                  </>
                );
            }

            /* Render Textarea Attributes */
            if(meta.currentElement.type === CONTROL.TEXTAREA) {
                return (
                  <>
                    <div className="field col-12">
                        <label htmlFor="controlId">Control ID</label>
                        <InputText name="placeholder"  value={props.meta.currentElement.id} disabled />
                    </div>
                    <div className="field col-12">
                      <label htmlFor="rows">Rows Length</label>
                        <InputNumber
                        name="rows"
                        onChange={updateMeta}
                        value={currAttribute?.rows}
                        />
                    </div>
                    <div className="field col-12">
                      <label htmlFor="cols">Cols Length</label>
                        <InputNumber
                        name="cols"
                        onChange={updateMeta}
                        value={currAttribute?.cols}
                        />
                    </div>
                    <div className="field col-12">
                      <label htmlFor="maxLen">Max Length</label>
                        <InputNumber
                        name="maxLength"
                        onChange={updateMeta}
                        value={currAttribute?.maxLength}
                        />
                    </div>
                    <div className="field col-12">
                      <label htmlFor="placeholder">Placeholder</label>
                      <InputText name="placeholder" placeholder="Enter Placeholder" onChange={updateMeta} value={currAttribute?.placeholder || ""}/>
                    </div>
                    {classDiv}
                    
                  </>
                );
            }

            /* Render Container Attributes */
            if(meta.currentElement.type === CONTROL.CONTAINER) {
                return(
                    <>
                        {classDiv}
                    </>
                )
            }

        }
        return <></>
    }

    return (
        <>
            <div className="p-fluid grid">
                {
                    renderAttributes()
                }
            </div>
        </>
    )
}

/* value={props.meta.currentElement?.attributes?.className} */

const testEvents = [
    {label: 'Execute Script', value: 'script-Sc23ab3W'},
];

export default AttributePanel;