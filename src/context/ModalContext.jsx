import React, { Fragment, useCallback, useContext, useState } from "react";
import { createContext } from "react";
import { Dialog } from "primereact/dialog";
import { TEST_REPORTS_FOR_TESTING } from "../tests/report";
import getComponent from "../constants/HemendraConstants";
import { useMetaContext } from "./MetaContext";

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
  const [containerMeta, setContainerMeta] = useState({});

  const meta = useMetaContext();
  const [elements, setElements] = useState([]);

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

  const createChildElement = useCallback((child, index) => {
    let ref = child.ref;
    if (!ref) {
      ref = React.createRef();
    }
    let cMeta;
    if (Object.keys(containerMeta).length > 0) {
      cMeta = containerMeta;
    } else {
      cMeta = meta;
    }
    const reactComponent = React.createElement(child.component, {
      ref: ref,
      key: index + 1,
      name: `${child.name}`,
      meta: cMeta,
      element: child,
      enteredValue: "",
    });
    child.ref = ref;
    return reactComponent;
  });

  const loadReport = (content) => {
    const resourceId = content.resourceId || "rid-0123";
    const json = TEST_REPORTS_FOR_TESTING.find(
      (trpt) => trpt.id === resourceId
    ).json; //we will be getting the json string from the server
    const report = JSON.parse(json);
    initializeComponent(report.elements);
    setContainerMeta(report);
    setElements(report.elements);
    return (
      <Fragment>
        HELLO LOAD REPORT
        {elements.map((element, index) => {
          return createChildElement(element, index);
        })}
      </Fragment>
    );
  };

  const actions = {
    push(content, onHideCallback) {
      // => means push: () => {}
      let modal;
      if (typeof content === "object") {
        modal = (
          <Dialog
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
            {loadReport(content)}
          </Dialog>
        );
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
      setModals((modals) => [...modals, modal]);
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
