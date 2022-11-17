import React, { useContext, useState } from "react";
import { existingReport } from "../tests/report";

import getComponent, { jsonStringifyIgnoredList } from "../constants/HemendraConstants";

/**
 * Contexts created to share the data between the child components without usign the props
 */
export const MetaContext = React.createContext();
export const UpdateMetaContext = React.createContext();

/**
 *
 * @returns Custom hooks
 */
export const useMetaContext = () => {
  return useContext(MetaContext);
};

export const useUpdateMetaContext = () => {
  return useContext(UpdateMetaContext);
};

/**
 * Context Provider so that I wont be passing the meta and setMeta as the props
 * @param {*} param0
 * @returns
 */
export const MetaContextProvider = ({ children }) => {
  const sharedMeta = {
    elements: [],
    sqlVariables: {},
    editMode: true,
  };
  const [meta, setMeta] = useState(sharedMeta);

  /**
   * Updates a perticular object in the meta
   * 
   * @param {*} value 
   */
  const updateMeta = (prevMeta) => {
    const elementMap = generateElementMap(prevMeta);
    setMeta(()=> {
      return {
        ...prevMeta,
        elementMap
      }
    });
  };

  /**
   * Add element to the meta, so that new element will appear on the playground
   * 
   * @param {*} element 
   */
  const addElement = (element) => {
    meta.elements.push(element);
    updateMeta(meta);
    /* setMeta((prevValue) => {
      prevValue.elements.push(element);
      return {
        ...prevValue,
      };
    }); */
  };

  /**
   * Clears all the element from the playground
   */
  const clearAll = () => {
    meta.elements.length = 0;
    meta.currentElement = null;
    updateMeta(meta);
    /* setMeta((prevValue) => {
      return {
        ...prevValue,
        currentElement: null,
        events: [],
      };
    }); */
  };

  /**
   * toggels between Edit and Preview Screen
   */
  const togglePlaygroundMode = () => {
    console.log("Enable preview");
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
  const openReport = () => {
    const report = JSON.parse(existingReport);
    setMeta((prevValue) => {
      report.elements = report.elements.map((el) => {
        el.component = getComponent(el.type);
        return el;
      });

      return {
        ...report,
        toastRef: prevValue.toastRef,
      };
    });
  };

  /**
   * Save the current report
   */
  const saveReport = () => {
    const metaJson = JSON.stringify(meta, (key, value) => {
      return jsonStringifyIgnoredList.includes(key) ? undefined : value;
    });
    console.info("Report Saved", metaJson);
  };

  const generateElementMap = (prevMeta) => {
    const elementMap = {};
    createElementMap(prevMeta.elements, elementMap);
    return elementMap;
  }

  function createElementMap(elements, elementMap) {
    elements.forEach(elm => {
      elementMap[elm.name] = elm;
      if(elm.attributes && elm.attributes.children.length > 0) {
        createElementMap(elm.attributes.children, elementMap);
      }
    })
  }
  

  return (
    <MetaContext.Provider value={meta}>
      <UpdateMetaContext.Provider value={{ updateMeta, addElement, clearAll, openReport, togglePlaygroundMode, saveReport }}>
        {children}
      </UpdateMetaContext.Provider>
    </MetaContext.Provider>
  );
};
