import { Dialog } from "primereact/dialog";
import { Menubar } from "primereact/menubar";
import { Toast } from "primereact/toast"
import React, { useEffect, useRef, useState } from "react";
import AttributePanel from "./attr-panel/AttributePanel";
import ControlPanel from "./control-panel/ControlPanel";
import EventModeler from "./events/builder/EventModeler";
import Playground from "./playground/Playground";
import "./App.css";

const defaultScriptTextForTesting = `
debugger;

meta.elements[0].ref.current.value=123;  
`;

const App = () => {
  /**
   * Clear the Playground
   */
  const clearAll = () => {
    setMeta((prevValue) => {
      prevValue.elements.length = 0;
      return {
        ...prevValue,
        currentElement: null,
      };
    });
  };

  const sharedMeta = {
    elements: [],
    sqlVariables: {},
    editMode: true
  };
  const [meta, setMeta] = useState(sharedMeta); //This line is very important, As we are sharing the data among components

  const togglePlaygroundMode = () => {
    console.log("Enable preview");
    setMeta((prevValue) => {
      return {
        ...prevValue,
        editMode: !prevValue.editMode,
      };
    });
  };

  const menuItems = [
    {
      label: "Home",
      items: [
        {
          label: "New",
          icon: "pi pi-fw pi-plus",
          command: () => {
            clearAll();
          },
        },
        {
          label: "Preview/Edit",
          icon: "pi pi-eye",
          command: () => {
            togglePlaygroundMode();
          },
        },
        {
          label: "Delete",
          icon: "pi pi-fw pi-trash",
          url: "http://primetek.com.tr",
        },
      ],
    },
    {
      label: "Configure",
      items: [
        {
          label: "Events",
          icon: "pi pi-fw pi-cog",
          command: () => {
            setDisplayBasic(true);
          },
        },
        { label: "SQL", icon: "pi pi-database" },
      ],
    },
  ];

  const end = <label style={{ fontWeight: 800 }}>Hemendra's Low Code Designer</label>;
  const [displayBasic, setDisplayBasic] = useState(false);
  const onHide = () => {
    setDisplayBasic(false);
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
      <div className="p-fluid grid menubar" style={{ background: "#ffffff" }}>
        <div className="col">
          <Menubar className="z-5" model={menuItems} end={end} />
        </div>
      </div>

      <div
        className="p-fluid grid"
        style={{ height: "90vh", width: "100vw", marginTop: "10px" }}
      >
        {meta.editMode ? (
          <div className="col-2 control-panel">
            <ControlPanel meta={meta} setMeta={setMeta} />
          </div>
        ) : (
          <></>
        )}
        <div
          className={`${
            meta.editMode ? "col-8 playground" : "col-12 playground-preview"
          }`}
        >
          <div className="grid">
            <Playground meta={meta} setMeta={setMeta} />
          </div>
        </div>
        {meta.editMode ? (
          <div className="col-2 attribute-panel">
            <AttributePanel meta={meta} setMeta={setMeta} />
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
        <EventModeler meta={meta} setMeta={setMeta} hide={onHide} />
      </Dialog>
    </>
  );
};

export default App;
export { defaultScriptTextForTesting }; //For testing, It must be removed
