import React from "react";
import "./App.css";
import { MetaContextProvider } from "./context/MetaContext";
import ModalContextProvider from "./context/ModalContext";
import ErrorBoundary from "./error-handler/ErrorBoundary";
import Homepage from "./Homepage";

const defaultScriptTextForTesting = `
debugger;
//Use this lines to get the reference of the element and update the value
const ref = Reference.of('input-hiJRrQgk');
ref.updateValue("Hello World"); 
`;

const App = () => {
  return (
    <>
      <MetaContextProvider>
        <ModalContextProvider>
          <ErrorBoundary>
            <Homepage />
          </ErrorBoundary>
        </ModalContextProvider>
      </MetaContextProvider>
    </>
  );
};

export default App;
export { defaultScriptTextForTesting }; //For testing, It must be removed
