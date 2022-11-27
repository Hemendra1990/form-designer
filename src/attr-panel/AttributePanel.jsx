import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { ProductService } from '../components/grid/ProductService';
import { CONTROL } from "../constants/Elements";
import { useMetaContext, useUpdateMetaContext } from '../context/MetaContext';
import AttrButtonComp from "./attr-button/AttrButtonComp";
import { UserService } from '../components/grid/UserService'
import AttrGrid from './attr-grid/AttrGridComp';




const AttributePanel = (props) => {
    const productService = new ProductService();
    const userService = new UserService();
    const meta = useMetaContext();
    const { updateMeta } = useUpdateMetaContext();

    const [classNameValue, setClassNameValue] = useState(meta.currentElement?.attributes?.className|| "");
    
    const handleAttributeChange = (e) => {
        if(!meta.currentElement.attributes) {
            meta.currentElement.attributes = {};
        }
        meta.currentElement.attributes[(e.target || e.originalEvent.target).name] = (e.target || e.originalEvent.target).value;
        updateMeta(meta);
    };

    const updateClass = (e) => {
        setClassNameValue(e.target.value);
        handleAttributeChange(e);
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
                        <AttrButtonComp meta={meta} handleAttributeChange={handleAttributeChange} eventOptions={availableEvents} />
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
                        <InputText name="placeholder"  value={meta.currentElement.id} disabled />
                    </div>
                    <div className="field col-12">
                      <label htmlFor="maxLen">Max Length</label>
                        <InputNumber
                        name="maxLength"
                        inputId="maxLen"
                        onChange={handleAttributeChange}
                        value={currAttribute?.maxLength}
                        />
                    </div>
                    <div className="field col-12">
                      <label htmlFor="maxLen">Placeholder {currAttribute?.placeholder} </label>
                      <InputText name="placeholder" placeholder="Enter Placeholder" onChange={handleAttributeChange} value={currAttribute?.placeholder || ""}/>
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
                        <InputText name="placeholder"  value={meta.currentElement.id} disabled />
                    </div>
                    <div className="field col-12">
                      <label htmlFor="rows">Rows Length</label>
                        <InputNumber
                        name="rows"
                        onChange={handleAttributeChange}
                        value={currAttribute?.rows}
                        />
                    </div>
                    <div className="field col-12">
                      <label htmlFor="cols">Cols Length</label>
                        <InputNumber
                        name="cols"
                        onChange={handleAttributeChange}
                        value={currAttribute?.cols}
                        />
                    </div>
                    <div className="field col-12">
                      <label htmlFor="maxLen">Max Length</label>
                        <InputNumber
                        name="maxLength"
                        onChange={handleAttributeChange}
                        value={currAttribute?.maxLength}
                        />
                    </div>
                    <div className="field col-12">
                      <label htmlFor="placeholder">Placeholder</label>
                      <InputText name="placeholder" placeholder="Enter Placeholder" onChange={handleAttributeChange} value={currAttribute?.placeholder || ""}/>
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
            /* Render Panel Attributes */
            if(meta.currentElement.type === CONTROL.PANEL) {
                return (
                    <>
                        <label>Panel Attributes</label>
                    {classDiv}
                    </>
                )
            }
            /* Render Fieldset Attributes */
            if(meta.currentElement.type === CONTROL.FIELDSET) {
                return (
                    <>
                        <label>Fieldset Attributes</label>
                        {classDiv}
                    </>
                )
            }
            /* Render Grid Attributes */
            if(meta.currentElement.type === CONTROL.GRID) {
                return (
                    <>
                        <AttrGrid meta={meta} handleAttributeChange={handleAttributeChange} updateClass={updateClass}></AttrGrid>
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

/* value={meta.currentElement?.attributes?.className} */

const testEvents = [
    {label: 'Execute Script', value: 'script-Sc23ab3W'},
];

export default AttributePanel;