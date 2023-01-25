import React, { useState, useEffect, useImperativeHandle } from 'react';
import { Fieldset } from 'primereact/fieldset';
import { useMetaContext, useUpdateMetaContext } from "../context/MetaContext";
import { ControlStyleModel } from "../control-styles/ControlStyleModel";
import { addElementStyle } from "../control-styles/ControlStyles";
import { useReportMetaContext, useReportUpdateMetaContext } from "../context/ReportMetaContext";

const HDFieldset = React.forwardRef((props, ref) => {
  const element = props.element;
  /* const meta = useMetaContext();
  const { updateMeta } = useUpdateMetaContext(); */

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { updateMeta } = element.isInReportContainer ? useReportUpdateMetaContext() : useUpdateMetaContext();//figured out contexts can be used conditionally
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const meta = element.isInReportContainer ? useReportMetaContext() : useMetaContext();

  const [value, setValue] = useState(element.value || "");
  const [controlStyle, setControlStyle] = useState();
  const [isRefInitialize, setRefInitialize] = useState(false);
  const [showHideFlag, setShowHideFlag] = useState(true); //will change later as the event modeler itself is going to change for showHide

  const showHide = (value) => {//expecing the value to be boolean
    setShowHideFlag(value);
  }

  const operations = {
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
    showHide
  }
  useImperativeHandle(ref, () => {
    setRefInitialize(true);
    return operations;
  });

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
  }, [isRefInitialize]);

  return (
    <>
      <style>{controlStyle}</style>
      <div id={element.id}>
        <Fieldset legend="Header"
          style={showHideFlag ? { display: 'block' } : { display: 'none' }}>
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