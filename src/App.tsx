import React from "react";
import "./App.css";
import "primeflex/primeflex.css";
import ConfirmationContextProvider from "./context/ConfirmationDialogContext";
import { MetaContextProvider } from "./context/MetaContext";
import ModalContextProvider from "./context/ModalContext";
import ErrorBoundary from "./error-handler/ErrorBoundary";
import Homepage from "./Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroPage from "./intro/IntroPage";
import SQLQueryBuilder from "./sql-modeler/query-builder/SQLQueryBuilder";
import DataSourceBuilder from "./sql-modeler/DataSourceBuilder";
import EventModeler from "./events/builder/EventModeler";
import OpenResources from "./menu-panel/OpenResources";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { ReportMetaContext, ReportMetaContextProvider } from "./context/ReportMetaContext";
import HDModalHolder from "./components/HDModalHolder";

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
        <ReportMetaContextProvider>
          <ModalContextProvider>
            <ConfirmationContextProvider>
              <ErrorBoundary>
                <DndProvider backend={HTML5Backend}>
                  <BrowserRouter>
                    <Routes>
                      <Route path="/" element={<IntroPage />} />
                      <Route path="/form-designer" element={<Homepage />}>
                        <Route path="sql-builder" element={<SQLQueryBuilder />} />
                        <Route
                          path="datasource-builder"
                          element={<DataSourceBuilder />}
                        />
                        <Route path="event-builder" element={<EventModeler />} />
                        <Route path="resources" element={<OpenResources />} />
                      </Route>
                    </Routes>
                  </BrowserRouter>
                  <HDModalHolder />
                </DndProvider>
              </ErrorBoundary>
            </ConfirmationContextProvider>
          </ModalContextProvider>
        </ReportMetaContextProvider>
      </MetaContextProvider>
    </>
  );
};

export default App;
export { defaultScriptTextForTesting }; //For testing, It must be removed
