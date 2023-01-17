import React, { useEffect, useImperativeHandle, useState } from "react";
import { useMetaContext, useUpdateMetaContext } from "../context/MetaContext";
import { Panel } from "primereact/panel";
import { ControlStyleModel } from "../control-styles/ControlStyleModel";
import { addElementStyle } from "../control-styles/ControlStyles";

const HDPanel = React.forwardRef((props, ref) => {
  const meta = useMetaContext();
  const { updateMeta } = useUpdateMetaContext();
  const { element } = props;
  const [controlStyle, setControlStyle] = useState();
  const [isRefInitialize, setRefInitialize] = useState(false);

  const operations = {
    getStyleAttributes: () => {
      return ControlStyleModel.getPanelStyle();
    },

    addStyle(style = "") {
      setControlStyle(style);
    }
  }

  useImperativeHandle(ref, () => {
    setRefInitialize(true);
    return operations
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

  return (
    <>
      <style>{controlStyle}</style>
      <div id={element.id}>
        <Panel header="Header">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
            occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
        </Panel>
      </div>
    </>
  );
});

export default HDPanel;
