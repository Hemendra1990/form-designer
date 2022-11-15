import { Dialog } from "primereact/dialog";
import { Menubar } from "primereact/menubar";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import AttributePanel from "./attr-panel/AttributePanel";
import getComponent from "./constants/HemendraConstants";
import ControlPanel from "./control-panel/ControlPanel";
import EventModeler from "./events/builder/EventModeler";
import Playground from "./playground/Playground";
import { existingReport } from "./tests/report";

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
        events:[]
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
          label: "Open Report",
          icon: "pi pi-fw pi-folder-open",
          command: () => {
            openReport();
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
          label: "Save Report",
          icon: "pi pi-fw pi-save",
          command: () => {
            saveReport();
          }
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

  const jsonStringifyIgnoredList = ["meta", "component", "stateNode", "Provider", "ref", "toastRef", "currentElement"];
  const saveReport = () => {
    const metaJson = JSON.stringify(meta, (key, value)=> {
      return (jsonStringifyIgnoredList.includes(key)) ? undefined: value;
    });
    console.info('Report Saved', metaJson);
  }

  /**
   * Load existing report
   */
  const openReport = () => {
    const report = JSON.parse(existingReport);
    setMeta((prevValue)=> {
      report.elements = report.elements.map(el => {
        el.component = getComponent(el.type);
        return el;
      });

      return {
        ...report,
        toastRef: prevValue.toastRef
      }
    })
  }

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
          <div>
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

