import React, { useState } from "react";
import { RadioButton } from 'primereact/radiobutton';
import { useImperativeHandle } from "react";
import { useMetaContext, useUpdateMetaContext } from "../context/MetaContext";
import EventExecutor from '../service/EventExecutor';
import { InputNumber } from 'primereact/inputnumber';

const HDRadioButton = React.forwardRef((props, ref) => {
    const meta = useMetaContext();
    const { updateMeta } = useUpdateMetaContext()
    const { element } = props;

    const [value, setValue] = useState(element.value || "");

    useImperativeHandle(ref, () => ({
        sayHello() {
            alert('Hello Imperative handle')
        },
        updateValue(value) {
            setValue(value);
        }
    }));

    const executeFocusEvent = () => {
        if (element.attributes && element.attributes.onfocus) {
            EventExecutor.executeEvent(props.meta, element.attributes.onfocus, null, null);
        }
    }
    const executeBlurEvent = () => {
        if (element.attributes && element.attributes.onblur) {
            EventExecutor.executeEvent(props.meta, element.attributes.onblur, null, null);
        }
    }

    const executeKeyupEvent = () => {
        if (element.attributes && element.attributes.onkeyup) {
            EventExecutor.executeEvent(props.meta, element.attributes.onkeyup, null, null);
        }
    }

    const executeKeyDownEvent = () => {
        if (element.attributes && element.attributes.onkeydown) {
            EventExecutor.executeEvent(props.meta, element.attributes.onkeydown, null, null);
        }
    }

    const handleBlur = (e) => {
        element.value = value;
    };

    /**Below are the sample code for radio button coped from primeng */
    const categories = [{ name: 'Accounting', key: 'A' }, { name: 'Marketing', key: 'M' }, { name: 'Production', key: 'P' }, { name: 'Research', key: 'R' }];
    const [city, setCity] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(categories[1]);

    return (
        <div>
            <div className="card">
                <h5>Basic</h5>
                <div className="field-radiobutton">
                    <RadioButton inputId="city1" name="city" value="Chicago" onChange={(e) => setCity(e.value)} checked={city === 'Chicago'} />
                    <label htmlFor="city1">Chicago</label>
                </div>
                <div className="field-radiobutton">
                    <RadioButton inputId="city2" name="city" value="Los Angeles" onChange={(e) => setCity(e.value)} checked={city === 'Los Angeles'} />
                    <label htmlFor="city2">Los Angeles</label>
                </div>
                <div className="field-radiobutton">
                    <RadioButton inputId="city3" name="city" value="New York" onChange={(e) => setCity(e.value)} checked={city === 'New York'} />
                    <label htmlFor="city3">New York</label>
                </div>
                <div className="field-radiobutton">
                    <RadioButton inputId="city4" name="city" value="San Francisco" onChange={(e) => setCity(e.value)} checked={city === 'San Francisco'} />
                    <label htmlFor="city4">San Francisco</label>
                </div>

                {/* <h5>Dynamic Values, Preselection, Value Binding and Disabled Option</h5>
                {
                    categories.map((category) => {
                        return (
                            <div key={category.key} className="field-radiobutton">
                                <RadioButton inputId={category.key} name="category" value={category} onChange={(e) => setSelectedCategory(e.value)}  checked={selectedCategory.key === category.key} disabled={category.key === 'R'} />
                                <label htmlFor={category.key}>{category.name}</label>
                            </div>
                        )
                    })
                } */}
            </div>
            <>
                <InputNumber 
                value={value} 
                onValueChange={(e) => setValue(e.value)} mode="decimal"
                ref={ref}
                maxLength={element?.attributes?.maxLength}
                placeholder={element?.attributes?.placeholder}
                name={props.name}
                id={props.name}
                onChange={(e) => setValue(e.target.value)}
                onBlur={(e) => executeBlurEvent()}
                onFocus={(e) => executeFocusEvent()}
                onKeyUp={(e) => executeKeyupEvent()}
                onKeyDown={(e) => executeKeyDownEvent()}
      />
            </>
        </div>


    )
});

export default HDRadioButton;
