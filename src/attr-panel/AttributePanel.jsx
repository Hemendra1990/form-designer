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
                        {props.meta?.currentElement?.name}
                        <br />
                        <InputText name="label" placeholder="Enter Button Label" onChange={updateMeta} value={props.meta.currentElement?.attributes?.label}/>
                    </>
                )
            }

            /* Render Input Attributes */
            if(props.meta.currentElement.type === CONTROL.INPUT) {
                return (
                  <>
                    <div className="field col-12">
                      <label htmlFor="maxLen">Max Length</label>
                        <InputNumber
                        name="maxLength"
                        inputId="maxLen"
                        onChange={updateMeta}
                        value={currAttribute?.maxLength}
                        />
                    </div>
                  </>
                );
            }

        }
        return <></>
    }

    return (
        <>
            <h1>This is Attribute Panel</h1>
            <div className="p-fluid grid formgrid">
                {

                    renderAttributes()
                }
            </div>
        </>
    )
}

export default AttributePanel;