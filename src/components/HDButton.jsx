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
  const { meta } = useMetaContext();
  const [controlStyle, setControlStyle] = useState();

  useImperativeHandle(ref, () => ({
    getStyleAttributes: () => {
      return ControlStyleModel.getButtonStyle();
    },

    addStyle(style = "") {
      setControlStyle(style);
    },
  }));

  useEffect(() => {
    //Apply style if the element already has
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

  if (!(element.attributes && element.attributes.label)) {
    if (!element.attributes) element.attributes = {};
    element.attributes.label = "Click here";
  }

  const executeEvent = () => {
    //check if the button is configured with the event or not
    if (element.attributes && element.attributes.eventId) {
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
      <div id={element.id}>
        <Button
          ref={ref}
          className={props.element?.attributes?.type}
          label={element?.attributes?.hideLabelContent ? "Click Here" : element?.attributes?.label}
          onClick={executeEvent}
        />
      </div>
    </>
  );
});
export default memo(HDButton);
