import { Button } from "primereact/button";
import React, { memo, useEffect, useImperativeHandle, useState } from "react";
import { useMetaContext, useUpdateMetaContext } from "../context/MetaContext";
import { useModalContext } from "../context/ModalContext";
import { ControlStyleModel } from "../control-styles/ControlStyleModel";
import { addElementStyle } from "../control-styles/ControlStyles";
import EventExecutor from "../service/EventExecutor";

const HDButton = React.forwardRef((props, ref) => {
  const element = props.element;
  const { actions, modals } = useModalContext();
  const { updateMeta } = useUpdateMetaContext();
  const meta = useMetaContext();
  const [controlStyle, setControlStyle] = useState("");
  const [isRefInitialize, setRefInitialize] = useState(false);

  const [showHideFalg, setShowHideFlag] = useState(true); //will change later as the event modeler itself is going to change for showHide

  const showHide = (value) => {//expecing the value to be boolean
    setShowHideFlag(value);
  }

  const operations = {
    getStyleAttributes: () => {
      return ControlStyleModel.getButtonStyle();
    },
    addStyle(style = "") {
      setControlStyle(style);
    },
    showHide
  }

  useImperativeHandle(ref, () => {
    setRefInitialize(true)
    return operations;
  });

  useEffect(() => {
    updateMeta(meta);
    //Apply style if the element already has
    if (element.ref && element.ref.current && element.ref.current.getStyleAttributes) {
      if (element.style) {
        const elementStyle = addElementStyle(
          element.style,
          element,
          meta,
          setControlStyle
        );
        setControlStyle(elementStyle);
      }
    }
  }, [isRefInitialize]);

  if (!(element.attributes && element.attributes.label)) {
    if (!element.attributes) element.attributes = {};
    element.attributes.label = "Click here";
  }

  const executeEvent = (event) => {
    //check if the button is configured with the event or not
    if (element.attributes && element.attributes.eventId) {
      props.meta.sqlVariables = {
        ...props.meta.sqlVariables,
        [element.attributes.name]: event.value,
      };
      EventExecutor.executeEvent(
        props.meta,
        element.attributes.eventId,
        actions,
        modals
      );
    } else {
      console.info("Event not binded with Button.");
    }
    handelLableValue();
  };

  const handelLableValue = () => {
    if (element?.attributes?.hideLabelContent) {
      //meta.currAttribute.label = "Click Here";
    }
  }

  return (
    <>
      <style>{controlStyle}</style>
      {showHideFalg && <div id={element.id}>
        <Button
          ref={ref}
          className={props.element?.attributes?.type}
          label={element?.attributes?.hideLabelContent ? "" : element?.attributes?.label}
          onClick={(e) => {
            executeEvent(e);
          }}
          icon={element?.attributes?.icon}
        />
      </div>}
    </>
  );
});
export default memo(HDButton);
