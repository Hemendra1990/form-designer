import { InputText } from "primereact/inputtext";
import { CONTROL } from "../constants/Elements";


const AttributePanel = (props) => {

    const updateMeta = (e) => {
        props.setMeta((prevVal) => {
            if(!prevVal.currentElement.attributes) {
                prevVal.currentElement.attributes = {};
            }
            prevVal.currentElement.attributes[e.target.name] = e.target.value;
            return {
                ...prevVal
            }
        });
    };

    const renderAttributes = () => {
        if(props.meta && props.meta.currentElement) {
            if(props.meta.currentElement.type === CONTROL.BUTTON) {
                return (
                    <>
                        {props.meta?.currentElement?.name}
                        <InputText name="label" placeholder="Enter Button Label" onChange={updateMeta} value={props.meta.currentElement?.attributes?.label}/>
                    </>
                )
            }
        }
        return <></>
    }

    return (
        <>
            <h1>This is Attribute Panel</h1>
            
            {
                renderAttributes()
            }
        </>
    )
}

export default AttributePanel;