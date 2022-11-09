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
  const [meta, setMeta] = useState(sharedMeta);

  const handleClick = () => {
    setCount(count + 1);
    setDate(new Date());
  };

  return (
    <>
      <h1 style={h1Style}>{currData.toLocaleTimeString()}</h1>
      <ControlPanel meta={meta} setMeta={setMeta} />
      <hr />
      <div className="grid">
        <div className="col-3">
          <Fieldset legend="Attribute">
            <AttributePanel meta={meta} setMeta={setMeta} />
          </Fieldset>
        </div>
        <div className="col-9">
          <Fieldset legend="Playground">
            <div className="grid">
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
