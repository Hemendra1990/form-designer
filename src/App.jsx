import React, { useState } from "react";
import AttributePanel from "./attr-panel/AttributePanel";
import ControlPanel from "./control-panel/ControlPanel";
import Playground from "./playground/Playground";
import { Fieldset } from "primereact/fieldset";
import { InputTextarea } from "primereact/inputtextarea";
import EventModeler from "./events/builder/EventModeler";

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

  /* const handleClick = () => {
    setCount(count + 1);
    setDate(new Date());
  }; */

  return (
    <>
      {/* Control Panel */}
      <ControlPanel meta={meta} setMeta={setMeta} />
      <div className="grid">
        <div className="col-10">
          <Fieldset legend="Playground">
            <div className="grid">
              {/* Playground Panel */}
              <Playground meta={meta} setMeta={setMeta} />
            </div>
          </Fieldset>
        </div>
        <div className="col-2">
          <Fieldset legend="Attribute">
            {/* Attribute Panel */}
            <AttributePanel meta={meta} setMeta={setMeta} />
          </Fieldset>
        </div>
      </div>

      <div className="grid">
        <div className="col-9">
        <Fieldset legend="Event Builder">
          <EventModeler meta={meta} setMeta={setMeta} />
        </Fieldset>
        </div>
        <div className="col-3">
        <Fieldset legend="Script Area">
          <InputTextarea rows={10} cols={30} value={script} onChange={handleScriptChange} autoResize />
        </Fieldset>
        </div>
      </div>
    </>
  );
};

export default App;
export {defaultScriptTextForTesting};//For testing, It must be removed
