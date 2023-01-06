import React, { useState, useEffect, useImperativeHandle } from 'react';
import { Fieldset } from 'primereact/fieldset';
import { useMetaContext, useUpdateMetaContext } from "../context/MetaContext";
import { ControlStyleModel } from "../control-styles/ControlStyleModel";
import { addElementStyle } from "../control-styles/ControlStyles";

const HDFieldset = React.forwardRef((props, ref) => {
    const element = props.element;
    const meta = useMetaContext();
    const { updateMeta } = useUpdateMetaContext()
    const [value, setValue] = useState(element.value || "");
    const [controlStyle, setControlStyle] = useState();

    useImperativeHandle(ref, () => ({

        updateValue: (value) => {   
          setValue(value);   
        },  
        getActualRef: () => {   
          return { ...ref };  
        },   
        getStyleAttributes: () => {   
          return ControlStyleModel.getFieldsetStyle();    
        },   
        addStyle(style = "") {  
          setControlStyle(style);   
        },    
      }));

    useEffect(() => {
        updateMeta(meta);
        //Apply style if the element already has
        if (element.style) {
          setTimeout(() => {
            const elementStyle = addElementStyle(
              element.style,
              element,
              meta,
              setControlStyle
            );
            setControlStyle(elementStyle);
          }, 100);
        }
      }, []);
    
    return (
        <>
         <style>{controlStyle}</style>
         <div id={element.id}>
            <Fieldset legend="Header">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </Fieldset>
            </div>
        </>
    )
});

export default HDFieldset;