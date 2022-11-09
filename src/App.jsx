import React, { useState } from "react";
import AttributePanel from "./attr-panel/AttributePanel";
import ControlPanel from "./control-panel/ControlPanel";
import Playground from "./playground/Playground";
import { Fieldset } from "primereact/fieldset";

const h1Style = {
  color: "red",
  textAlign: "center",
};

const App = () => {
  const [count, setCount] = useState(0);
  const [currData, setDate] = useState(new Date());

  const sharedMeta = {
    elements: [],
    sqlVariables: {},
  };
  const [meta, setMeta] = useState(sharedMeta); //This line is very important, As we are sharing the data among components

  const handleClick = () => {
    setCount(count + 1);
    setDate(new Date());
  };

  return (
    <>
      <h1 style={h1Style}>{currData.toLocaleTimeString()}</h1>
      {/* Control Panel */}
      <ControlPanel meta={meta} setMeta={setMeta} />
      <hr />
      <div className="grid">
        <div className="col-3">
          <Fieldset legend="Attribute">
            {/* Attribute Panel */}
            <AttributePanel meta={meta} setMeta={setMeta} />
          </Fieldset>
        </div>
        <div className="col-9">
          <Fieldset legend="Playground">
            <div className="grid">
              {/* Playground Panel */}
              <Playground meta={meta} setMeta={setMeta} />
            </div>
          </Fieldset>
        </div>
      </div>

      <div></div>
    </>
  );
};

export default App;
