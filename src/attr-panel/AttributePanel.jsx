import { InputText } from "primereact/inputtext";
import { InputNumber } from 'primereact/inputnumber';
import { CONTROL } from "../constants/Elements";


const AttributePanel = (props) => {

    const updateMeta = (e) => {
        props.setMeta((prevVal) => {
            if(!prevVal.currentElement.attributes) {
                prevVal.currentElement.attributes = {};
            }
            prevVal.currentElement.attributes[(e.target || e.originalEvent.target).name] = (e.target || e.originalEvent.target).value;
            return {
                ...prevVal
            }
        });
    };

    /**
     * RULES FOR RENDERING ATTRIBUTES
     *  -Each Attribute should have a name (As line:35) e.g: <InputText name="label" />
     * 
     * @returns 
     */
    const renderAttributes = () => {
        if(props.meta && props.meta.currentElement) {
            const currAttribute = props.meta.currentElement?.attributes;
            
            /* Render Button Attributes */
            if(props.meta.currentElement.type === CONTROL.BUTTON) {
                return (
                    <>
                        <div className="field col-12">
                            <label htmlFor="controlId">Control ID</label>
                            <InputText name="placeholder"  value={props.meta.currentElement.id} disabled />
                        </div>
                        <div className="field col-12">
                            <label htmlFor="controlId">Label</label>
                            <InputText name="label" placeholder="Enter Button Label" onChange={updateMeta} value={props.meta.currentElement?.attributes?.label}/>
                        </div>
                    </>
                )
            }

            /* Render Input Attributes */
            if(props.meta.currentElement.type === CONTROL.INPUT) {
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
                      <label htmlFor="maxLen">Placeholder</label>
                      <InputText name="placeholder" placeholder="Enter Placeholder" onChange={updateMeta} value={currAttribute?.placeholder}/>
                    </div>
                  </>
                );
            }

            /* Render Textarea Attributes */
            if(props.meta.currentElement.type === CONTROL.TEXTAREA) {
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
                        inputId="rows"
                        onChange={updateMeta}
                        value={currAttribute?.rows}
                        />
                    </div>
                    <div className="field col-12">
                      <label htmlFor="cols">Cols Length</label>
                        <InputNumber
                        name="cols"
                        inputId="cols"
                        onChange={updateMeta}
                        value={currAttribute?.cols}
                        />
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
                      <label htmlFor="placeholder">Placeholder</label>
                      <InputText inputId="cols" name="placeholder" placeholder="Enter Placeholder" onChange={updateMeta} value={currAttribute?.placeholder}/>
                    </div>
                  </>
                );
            }

        }
        return <></>
    }

    return (
        <>
            <div className="p-fluid grid formgrid">
                {

                    renderAttributes()
                }
            </div>
        </>
    )
}

export default AttributePanel;