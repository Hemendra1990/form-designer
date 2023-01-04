import React, {useImperativeHandle, useState, useRef, useEffect } from "react";
import { Dropdown } from 'primereact/dropdown';
import EventExecutor from '../service/EventExecutor';
import { useMetaContext, useUpdateMetaContext } from "../context/MetaContext";

const HDDropDown = React.forwardRef((props, parentRef) => {
    const { element } = props;
    const meta = useMetaContext();
    const { updateMeta } = useUpdateMetaContext()

    const [listOptions, setListOptions] = useState([]);
    const [labelValueOptions, setLabelValueOptions] = useState([]);

    const primeListRef = useRef(parentRef);

    useEffect(() => {
        updateMeta(meta); 
      }, []);   

    const operations = {
        setResult: (result) => {
          const rows = result.rows || [];
          if (result.columns && result.columns.length > 0) {
            setLabelValueOptions(result.columns);
          }
          setListOptions(rows);
        },
    
        getLabelAndValueOptions() {
          return labelValueOptions;
        },

        startLoader: (value) => {
          //do some stuff
        },
    
        sayHello(value) {
          alert(value);
        },
    
        primeListRef,
    }    

    useImperativeHandle(parentRef, () => {
        return operations;
      });

      const executeOnChangeEvent = () => {
        if (element.attributes && element.attributes.onChangeEvent) {
          EventExecutor.executeEvent(props.meta, element.attributes.onChangeEvent, null, null);
        }
      }
      const executeOnMouseDownEvent = () => {
        if (element.attributes && element.attributes.onMouseDownEvent) {
          EventExecutor.executeEvent(props.meta, element.attributes.onMouseDownEvent, null, null);
        }
      }
      const executeOnContextMenuEvent = () => {
        if (element.attributes && element.attributes.onContextMenuEvent) {
          EventExecutor.executeEvent(props.meta, element.attributes.onContextMenuEvent, null, null);
        }
      }
      const executeOnFilterEvent = () => {
        if (element.attributes && element.attributes.onFilterEvent) {
          EventExecutor.executeEvent(props.meta, element.attributes.onFilterEvent, null, null);
        }
      }
      const executeFocusEvent = () => {
        if (element.attributes && element.attributes.onFocus) {
          EventExecutor.executeEvent(props.meta, element.attributes.onFocus, null, null);
        }
      }
      const executeBlurEvent = () => {
        if (element.attributes && element.attributes.onBlur) {
          EventExecutor.executeEvent(props.meta, element.attributes.onBlur, null, null);
        }
      }

    return (
        <>
        <Dropdown 
        ref={primeListRef}
        options={
          listOptions.length > 0
          ? listOptions
          : element.attributes?.config?.staticOptionList || []
        }
        placeholder="Select Data" 
        onBlur={(e) => executeBlurEvent()}      
        onFocus={(e) => executeFocusEvent()}
        onChange={(e) => executeOnChangeEvent()}
        onMouseDown={(e) => executeOnMouseDownEvent()}
        onContextMenu={(e) => executeOnContextMenuEvent()}
        onFilter={(e) => executeOnFilterEvent()}
        disabled={element.attributes?.disabled || false}
        filter={element.attributes?.filter || false}
        filterBy={element.attributes?.filterby}
        optionValue={element.attributes.optionValue || "value"}
        optionLabel={element.attributes.optionLabel || "label"}
        tooltip={element.attributes?.tooltip}
        />
        </>
    )
});
export default (HDDropDown);
