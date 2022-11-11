import React, { useState } from "react";
import AttributePanel from "./attr-panel/AttributePanel";
import ControlPanel from "./control-panel/ControlPanel";
import Playground from "./playground/Playground";
import { Fieldset } from "primereact/fieldset";
import { InputTextarea } from "primereact/inputtextarea";
import EventModeler from "./events/builder/EventModeler";
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import './App.css';
import { Button } from "primereact/button";

const h1Style = {
  color: "red",
  textAlign: "center",
};

const defaultScriptTextForTesting = `
debugger;

meta.elements[0].ref.current.value=123;  
`

const App = () => {
  
  //Test Codes
  const [count, setCount] = useState(0);
  const [currData, setDate] = useState(new Date());
  const [script, setScript] = useState(defaultScriptTextForTesting);
  const handleScriptChange = (e) => {
    setScript(()=> {
      return e.target.value;
    });

    setMeta((prevVal) => {
      return {
        ...prevVal,
        scriptText: e.target.value
      }
    })
  }
  //Test Code Ends



  const sharedMeta = {
    elements: [],
    sqlVariables: {},
  };
  const [meta, setMeta] = useState(sharedMeta); //This line is very important, As we are sharing the data among components

  const items = [
    {
        label: 'Home',
        items: [{label: 'New', icon: 'pi pi-fw pi-plus',command:()=>{ window.location.hash="/fileupload"; }},
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
            
      <div className="p-fluid grid" style={{margin: '10px'}}>
        <div className="col-2">
          <ControlPanel meta={meta} setMeta={setMeta} />
        </div>
        <div className="col-8 playground">
          <Playground meta={meta} setMeta={setMeta} />
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
export {defaultScriptTextForTesting};//For testing, It must be removed
