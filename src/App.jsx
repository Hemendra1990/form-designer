import React, { useState } from "react";
import AttributePanel from "./attr-panel/AttributePanel";
import ControlPanel from "./control-panel/ControlPanel";
import Playground from "./playground/Playground";
import { Fieldset } from "primereact/fieldset";
import { InputTextarea } from "primereact/inputtextarea";

const h1Style = {
  color: "red",
  textAlign: "center",
};

const defaultScriptTextForTesting = `
debugger;

let nameInput = document.querySelector('#input-lr0rxcFt');
console.log(nameInput.value);
`

const App = () => {
  const [count, setCount] = useState(0);
  const [currData, setDate] = useState(new Date());

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
      <h1 style={h1Style}>Hemendra's Form Designer {currData.toLocaleTimeString()}</h1>
      {/* Control Panel */}
      <ControlPanel meta={meta} setMeta={setMeta} />
      <hr />
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
        <div className="col">
        <Fieldset legend="Script Area">
          <InputTextarea rows={10} cols={100} defaultValue={defaultScriptTextForTesting} autoResize />
        </Fieldset>
        </div>
      </div>
    </>
  );
};

export default App;
