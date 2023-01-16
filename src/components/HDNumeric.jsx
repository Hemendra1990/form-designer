import React, { memo, useEffect, useImperativeHandle, useState, useRef } from "react";
import { InputNumber } from 'primereact/inputnumber';
import EventExecutor from '../service/EventExecutor';
import { addElementStyle } from "../control-styles/ControlStyles";
import { ControlStyleModel } from "../control-styles/ControlStyleModel";
import { useUpdateMetaContext } from "../context/MetaContext";

const HDNumeric = React.forwardRef((props, parentRef) => {
    const { element } = props;
   
    const meta = useUpdateMetaContext();
    const { updateMeta } = useUpdateMetaContext();
    
    const [value, setValue] = useState(null);
    const [selectedValue, setSelectedValue] = useState(null);
    const [controlStyle, setControlStyle] = useState();

    const getPrimeNumericRef = useRef(parentRef);
    
    useEffect(() => {
      setValue(element.currAttribute?.value || "");
      setSelectedValue(element.currAttribute?.selectedValue || "");

        updateMeta(meta); 
        if (element.style) {
            const elementStyle = addElementStyle(
                element.style,
                element,
                meta,
                setControlStyle
            );
            setControlStyle(elementStyle);
        }
    }, []);

    const operations = {

        getStyleAttributes: () => {
            return ControlStyleModel.getInputnumberStyle();
        },

        addStyle(style = "") {
            setControlStyle(style);
        },

        updateValue(value) {
          setValue(value);
        },
        
        getSelectedValue() {
            return selectedValue;
        },

        getActualRef: () => {
          return { ...parentRef };
      },

        getPrimeNumericRef
    }

    useImperativeHandle(parentRef, () => {
        return operations;
    }); 

    const executeOnChangeEvent = (event) => {
        if (element.attributes && element.attributes.onChangeEvent) {
          EventExecutor.executeEvent(props.meta, element.attributes.onChangeEvent, { data: event.value }, null);
        }
      }

    const executeOnValueChangeEvent = (event) => {
        if (element.attributes && element.attributes.onValueChange) {
          EventExecutor.executeEvent(props.meta, element.attributes.onValueChange, { data: event.value }, null);
        }
      }

    const executeOnFocusEvent = (event) => {
        if (element.attributes && element.attributes.onFocus) {
          EventExecutor.executeEvent(props.meta, element.attributes.onFocus, { data: event.value }, null);
        }
      }

      const executeOnBlurEvent = (event) => {
        if (element.attributes && element.attributes.onBlur) {
          EventExecutor.executeEvent(props.meta, element.attributes.onBlur, { data: event.value }, null);
        }
      }

      const executeOnKeyDownEvent = (event) => {
        if (element.attributes && element.attributes.onKeyDown) {
          EventExecutor.executeEvent(props.meta, element.attributes.onKeyDown, { data: event.value}, null);
        }
      }

    return (
        <>
            <style>{controlStyle}</style>
            <div id={element.id}>

                <InputNumber 
                ref={getPrimeNumericRef} 
                value={value || element?.attributes?.numericValue }
                placeholder={element.attributes?.placeholder || "Please enter number"}
                onBlur={(e) =>{ executeOnBlurEvent(e)}}
                onFocus={(e) =>{ executeOnFocusEvent(e)}}
                onKeyDown={(e) =>{ executeOnKeyDownEvent(e)}}
                onValueChange={(e) =>{ executeOnValueChangeEvent(e)}}
                onChange={(e) => { setSelectedValue(e.value); executeOnChangeEvent(e); }}
                mode={element?.attributes?.selectedmode|| "decimal"}
                currency={ element?.attributes?.currencyValue || "INR" }
                locale={ element?.attributes?.currencyCode || "en-IN" }
                minFractionDigits={element?.attributes?.minFractionDigits }
                maxFractionDigits={element?.attributes?.maxFractionDigits || element?.attributes?.minFractionDigits}
                useGrouping={false}
        
                showButtons buttonLayout="horizontal"
                    decrementButtonClassName="p-button-danger" 
                    incrementButtonClassName="p-button-success" 
                    incrementButtonIcon="pi pi-plus" 
                    decrementButtonIcon="pi pi-minus"
             />
            </div>
        </>
    )
});
export default memo(HDNumeric);