import React, { Fragment, useCallback, useContext, useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { createContext } from "react";
import { Dialog } from "primereact/dialog";
import { TEST_REPORTS_FOR_TESTING } from "../tests/report";
import getComponent from "../constants/HemendraConstants";
import { HttpFormResourceService } from "../http-service/HttpFormResourceService";
import { generateElementMap } from "../utils/Utils";
import { useReportMetaContext, useReportUpdateMetaContext } from "./ReportMetaContext";
import DraggableContainerElement from "../playground/DraggableContainerElement";

const httpResourceService = new HttpFormResourceService();
export const ModalContext = createContext();

export const useModalContext = () => {
  return useContext(ModalContext);
};

const uniqueModalId = (() => {
  let i = 0;
  return () => i++;
})();

export const ModalContextProvider = ({ children }) => {
  const [modals, setModals] = useState([]);

  const updateReportMeta = useReportUpdateMetaContext();
  const meta = useReportMetaContext();

  const [resourceMeta, setResourceMeta] = useState(null);
  const [popupChildren, setPopupChildren] = useState([]);

  function initializeComponent(reportElements) {
    if (!reportElements) {
      return;
    }
    reportElements.forEach((el) => {
      el.component = getComponent(el.type);
      if (
        el.attributes &&
        el.attributes.children &&
        el.attributes.children.length > 0
      ) {
        initializeComponent(el.attributes.children);
      }
    });
  }

  function addFlagReportContainer(elements) {
    for (let ele of elements) {
      ele.isInReportContainer = true;
      if (ele.attributes && ele.attributes.children) {
        addFlagReportContainer(ele.attributes.children);
      }
    }

  }

  useEffect(() => {
    if (resourceMeta) {
      setPopupChildren(resourceMeta.elements || []);
    }
  }, [resourceMeta]);

  const loadReport = (resourceId, data = {}) => {
    resourceId = "6ea08539-a629-45ba-a1d6-48030da2f029";
    //TODO: we need to make the server call taking the resourceId
    return httpResourceService.getFormJson(resourceId).then(res => {
      const report = res.data
      const { json } = report
      initializeComponent(json.elements);
      const reportMeta = {};
      reportMeta.elementMap = {};
      reportMeta.resourceId = report.resourceId;
      reportMeta.sessionId = report.sessionId;
      reportMeta.description = report.description;
      reportMeta.name = report.resourceName;
      reportMeta.elements = json.elements; //Just check what elements came into it....
      const elements = [...reportMeta.elements];
      addFlagReportContainer(elements);

      reportMeta.configuration = json.configuration;
      reportMeta.sqlList = json.sqlList;
      reportMeta.apiList = json.apiList;
      reportMeta.events = json.events;
      reportMeta.elementMap = generateElementMap(reportMeta);
      //reportMeta.events.forEach((e) => initialiseScripts(e));
      reportMeta.editMode = false;
      reportMeta.sqlVariables = json.sqlVariables;
      meta.sqlVariables = json.sqlVariables; //Adding the sqlVariables to actual meta

      updateReportMeta.updateMeta(reportMeta); //Let's seee what magic is going on Here..........
      //setResourceMeta(reportMeta);
      /* setTimeout(() => {
      }, 10); */
      return reportMeta;
    }).catch(err => {
      console.error("Failed to fetch the form data from server.", err);
    });
  }

  const actions = {
    push(content, onHideCallback) {
      debugger
      // => means push: () => {}
      let modal;
      if (typeof content === "object") {
        loadReport(content).then((reportMeta) => {
          modal = ReactDOM.createPortal(<Dialog
            breakpoints={{ "1360px": "75vw", "960px": "75vw", "640px": "90vw" }}
            style={{ width: "85%", height: "80vh" }}
            visible={true}
            position={content.position}
            key={uniqueModalId()}
            header="Modal Header"
            onHide={() => this.onHide(onHideCallback)}
          >
            {" "}
            {/*TODO  What if I want to handle the event on Modal close */}
            <p>{content.popupText}</p>
            <div className="grid col-12">
              {reportMeta.elements.map((childElement, containerIndex) => {
                childElement.currIndex = containerIndex;
                return (
                  <DraggableContainerElement
                    {...childElement}
                    key={childElement?.id}
                    style={{ marginTop: 10, marginBottom: 10 }}
                    element={childElement}
                    containerIndex={containerIndex}
                    containerMeta={resourceMeta}
                  />
                );
              })}
            </div>
          </Dialog>, document.querySelector("#hdportal"));
          setTimeout(() => {
            setModals((modals) => [...modals, modal]);
          }, 200);
        });

      } else {
        modal = (
          <Dialog
            breakpoints={{ "1360px": "75vw", "960px": "75vw", "640px": "90vw" }}
            style={{ width: "85%", height: "80vh" }}
            visible={true}
            key={uniqueModalId()}
            header="Modal Header"
            onHide={() => this.onHide(onHideCallback)}
          >
            {" "}
            {/*TODO  What if I want to handle the event on Modal close */}
            <p>{content}</p>
          </Dialog>
        );
      }
    },
    onHide(onHideCallback) {
      let prevModal = "";
      //modals.pop();
      setModals((prevModals) => {
        prevModal = prevModals[prevModals.length - 1];
        prevModals.pop();
        return [...prevModals];
      });

      onHideCallback && onHideCallback(prevModal); //This is call back method sot
    },
  };

  return (
    <ModalContext.Provider value={{ actions, modals }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
