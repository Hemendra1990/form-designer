import { Dialog } from 'primereact/dialog';
import { Menubar } from 'primereact/menubar';
import React, { useState } from "react";
import AttributePanel from "./attr-panel/AttributePanel";
import ControlPanel from "./control-panel/ControlPanel";
import EventModeler from "./events/builder/EventModeler";
import Playground from "./playground/Playground";
import './App.css';

const h1Style = {
  color: "red",
  textAlign: "center",
};

const defaultScriptTextForTesting = `
debugger;

meta.elements[0].ref.current.value=123;  
`

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
  };
  const [meta, setMeta] = useState(sharedMeta); //This line is very important, As we are sharing the data among components

  const items = [
    {
        label: 'Home',
        items: [{label: 'New', icon: 'pi pi-fw pi-plus',command:()=>{ clearAll() }},
                {label: 'Preview', icon: 'pi pi-eye',command:()=>{ clearAll() }},
                {label: 'Delete', icon: 'pi pi-fw pi-trash', url: 'http://primetek.com.tr'}]
    },
    {
        label: 'Configure',
        items: [{label: 'Events', icon: 'pi pi-fw pi-cog',command:()=>{ setDisplayBasic(true); }},
                {label: 'SQL', icon: 'pi pi-database'} ]
    }
];

const end = <label style={{fontWeight: 600}}>Hemendra's Designer</label>
const [displayBasic, setDisplayBasic] = useState(false);
const onHide = () => {
  setDisplayBasic(false);
}

const renderFooter = (name) => {
  return (
      <div>
          {/* <Button label="No" icon="pi pi-times" onClick={() => onHide()} className="p-button-text" />
          <Button label="Yes" icon="pi pi-check" onClick={() => onHide()} autoFocus /> */}
      </div>
  );
}


  return (
    <>
    <div className="p-fluid grid menubar" style={{background: '#ffffff'}}>
        <div className="col">
          <Menubar className="z-5" model={items} end={end} />
        </div>
    </div>
            
      <div className="p-fluid grid" style={{height: '90vh', width: '100vw', marginTop: '10px'}}>
        <div className="col-2 control-panel">
          <ControlPanel meta={meta} setMeta={setMeta} />
        </div>
        <div className="col-8 playground">
          <div className="grid">
            <Playground meta={meta} setMeta={setMeta} />
          </div>
        </div>
        <div className="col-2 attribute-panel">
          <AttributePanel meta={meta} setMeta={setMeta} />
        </div>
      </div>
      <Dialog header="Event Modeler" visible={displayBasic} style={{ width: '80vw' }} footer={renderFooter('displayBasic')} onHide={() => onHide('displayBasic')}>
        <EventModeler meta={meta} setMeta={setMeta} />
      </Dialog>
    </>
  );
};

export default App;
export { defaultScriptTextForTesting }; //For testing, It must be removed

