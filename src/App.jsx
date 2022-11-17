import React from "react";
import "./App.css";
import { MetaContextProvider } from "./context/MetaContext";
import Homepage from "./Homepage";

const defaultScriptTextForTesting = `
debugger;

meta.elements[0].ref.current.value=123;  
`;

const App = () => {
  return (
    <>
      <MetaContextProvider>
        <Homepage/>
      </MetaContextProvider>
    </>
  );
};

export default App;
export { defaultScriptTextForTesting }; //For testing, It must be removed

