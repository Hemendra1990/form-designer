import React from "react";
import "./App.css";
import "primeflex/primeflex.css"
import ConfirmationContextProvider from "./context/ConfirmationDialogContext";
import { MetaContextProvider } from "./context/MetaContext";
import ModalContextProvider from "./context/ModalContext";
import ErrorBoundary from "./error-handler/ErrorBoundary";
import Homepage from "./Homepage";

/* Problem with Drag n Drop : https://stackoverflow.com/questions/54982182/react-beautiful-dnd-drag-out-of-position-problem */

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
          <ConfirmationContextProvider>
          <ErrorBoundary>
            <Homepage />
          </ErrorBoundary>
          </ConfirmationContextProvider>
        </ModalContextProvider>
      </MetaContextProvider>
    </>
  );
};

export default App;
export { defaultScriptTextForTesting }; //For testing, It must be removed
