import React, { useContext, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { v4 as uuidv4 } from "uuid";

import getComponent, {
  jsonStringifyIgnoredList,
} from "../constants/HemendraConstants";

/**
 * Contexts created to share the data between the child components without usign the props
 */
export const ReportMetaContext = React.createContext();
export const UpdateReportMetaContext = React.createContext();
export const ToastContext = React.createContext();

/**
 *
 * @returns Custom hooks
 */
export const useReportMetaContext = () => {
  return useContext(ReportMetaContext);
};

export const useReportUpdateMetaContext = () => {
  return useContext(UpdateReportMetaContext);
};
export const useToastContext = () => {
  return useContext(ToastContext);
};

/**
 * Context Provider so that I wont be passing the meta and setMeta as the props
 * @param {*} param0
 * @returns
 */
export const ReportMetaContextProvider = ({ children }) => {
  const sharedMeta = {
    elements: [],
    sqlVariables: {},
    events: [],
    sqlList: [],
    editMode: false,
    sessionId: uuidv4(),
    itis: 'ReportMeta'
  };
  const [meta, setMeta] = useState(sharedMeta);
  const [toastPosition, setToastPosition] = useState("top-right");
  const toastRef = useRef();
  const api = useRef();

  /**
   * Updates a perticular object in the meta
   *
   * @param {*} value
   */
  const updateMeta = (prevMeta) => {
    console.log('Inside... ReportMetaContext', prevMeta);
    const elementMap = generateElementMap(prevMeta);
    setMeta((meta) => {
      return {
        ...meta,
        ...prevMeta,
        elementMap,
      };
    });
  };

  /**
   * Add element to the meta, so that new element will appear on the playground
   *
   * @param {*} element
   */
  const addElement = (element, index = undefined) => {
    if (index !== undefined && index !== -999) {
      meta.elements.splice(index, 0, element);
      meta.elements = [...meta.elements];
    } else {
      meta.elements.push(element);
    }
    updateMeta(meta);
  };

  /**
   * Clears all the element from the playground
   */
  const clearAll = () => {
    meta.elements.length = 0;
    meta.currentElement = null;
    /* updateMeta(meta); */
    setMeta(sharedMeta);
  };

  /**
   * toggels between Edit and Preview Screen
   */
  const togglePlaygroundMode = () => {
    setMeta((prevValue) => {
      return {
        ...prevValue,
        editMode: !prevValue.editMode,
      };
    });
  };

  /**
   * Load existing report
   */
  const openReport = (reportData) => {
    const { sessionId, json } = reportData;
    //const report = JSON.parse(json);
    const report = json;
    initializeComponent(report.elements);
    setMeta((prevValue) => {
      return {
        ...report,
        toastRef: prevValue.toastRef,
        sessionId: sessionId,
      };
    });
  };

  /**
   * Save the current report
   */
  const saveReport = () => {
    if (meta.elements && meta.elements.length > 0) {
      const metaJson = JSON.stringify(meta, (key, value) => {
        return jsonStringifyIgnoredList.includes(key) ? undefined : value;
      });
      console.info("Report Saved", metaJson);
    } else {
      toastRef.current &&
        toastRef.current.show({
          severity: "error",
          summary: "Can't Save ",
          detail: "Report with no elements can't be saved.",
        });
    }
  };

  const configure = (reportConfigRef) => {
    reportConfigRef.current.showReportConfigure &&
      reportConfigRef.current.showReportConfigure();
  };

  const saveReportConfiguration = (reportConfigRef) => {
    if (reportConfigRef.current) {
      const configs = reportConfigRef.current.getEventConfiguration();
      meta.configuration = { ...configs };
      updateMeta();
    }
  };

  const configureDataSource = (dataSourceConfigRef) => {
    console.log("Datasource Menu clicked!!");
    dataSourceConfigRef.current &&
      dataSourceConfigRef.current.openDataSourceConfigModeler();
  };

  const configureApi = (apiConfigureRef) => {
    apiConfigureRef.current && apiConfigureRef.current.openApiConfigModeler();
  };
  const configureQueryBuilder = (sqlQueryBuilderRef) => {
    sqlQueryBuilderRef.current &&
      sqlQueryBuilderRef.current.openSqlQueryBuilder();
  };

  const generateElementMap = (prevMeta) => {
    if (prevMeta.elements && prevMeta.elements.length > 0) {
      const elementMap = {};
      createElementMap(prevMeta.elements, elementMap);
      return elementMap;
    }
  };

  function createElementMap(elements, elementMap) {
    elements.forEach((elm) => {
      elementMap[elm.name] = elm;
      if (
        elm.attributes &&
        elm.attributes.children &&
        elm.attributes.children.length > 0
      ) {
        createElementMap(elm.attributes.children, elementMap);
      }
    });
  }

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

  function updateMetaWithElement(elementToBeUpdated) {
    if (elementToBeUpdated.id === undefined) {
      return;
    }
    updateMetaWithChildHelper(meta.elements, elementToBeUpdated)
  }

  function updateMetaWithChildHelper(elements, elementToBeUpdated) {
    for (let element of elements) {
      if (element.id === elementToBeUpdated.id) {
        element = elementToBeUpdated;
        break;
      }
      if (element.attributes && element.attributes.children) {
        updateMetaWithChildHelper(element.attributes.children);
      }
    }
  }

  return (
    <>
      <ReportMetaContext.Provider value={meta}>
        <UpdateReportMetaContext.Provider
          value={{
            updateMeta,
            addElement,
            clearAll,
            openReport,
            togglePlaygroundMode,
            saveReport,
            configure,
            saveReportConfiguration,
            configureApi,
            configureDataSource,
            configureQueryBuilder,
            updateMetaWithElement,
          }}
        >
          <ToastContext.Provider value={{ toastRef, setToastPosition }}>
            {children}
          </ToastContext.Provider>
        </UpdateReportMetaContext.Provider>
      </ReportMetaContext.Provider>
      <Toast ref={toastRef} position={toastPosition} />
    </>
  );
};
