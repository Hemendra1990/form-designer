import { Dialog } from "primereact/dialog";
import { memo, useState } from "react";
import AttributePanel from "./attr-panel/AttributePanel";
import { useMetaContext } from "./context/MetaContext";
import ControlPanel from "./control-panel/ControlPanel";
import EventModeler from "./events/builder/EventModeler";
import HDMenubar from "./menu-panel/HDMenubar";
import Playground from "./playground/Playground";

const Homepage = (props) => {
  const meta = useMetaContext();
  
  const [displayBasic, setDisplayBasic] = useState(false);
  const onHide = () => {
    setDisplayBasic(!displayBasic);
  };

  const renderFooter = (name) => {
    return (
      <div>
        {/* <Button label="No" icon="pi pi-times" onClick={() => onHide()} className="p-button-text" />
          <Button label="Yes" icon="pi pi-check" onClick={() => onHide()} autoFocus /> */}
      </div>
    );
  };

  return (
    <>
      <HDMenubar toggleEventModal={onHide} />
      <div
        className="p-fluid grid"
        style={{ height: "90vh", width: "100vw", marginTop: "10px" }}
      >
        {meta.editMode ? (
          <div className="col-2 control-panel">
            <ControlPanel />
          </div>
        ) : (
          <></>
        )}
        <div
          className={`${
            meta.editMode ? "col-8 playground" : "col-12 playground-preview"
          }`}
        >
          <div>
            <Playground />
          </div>
        </div>
        {meta.editMode ? (
          <div className="col-2 attribute-panel">
            <AttributePanel />
          </div>
        ) : (
          <></>
        )}
      </div>
      <Dialog
        header="Event Modeler"
        visible={displayBasic}
        style={{ width: "80vw" }}
        footer={renderFooter("displayBasic")}
        onHide={() => onHide("displayBasic")}
      >
        <EventModeler hide={onHide} />
      </Dialog>
    </>
  );
};

export default memo(Homepage);
