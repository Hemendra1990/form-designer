import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { deprecate } from "util";
import getComponent from "../constants/HemendraConstants";
import { useMetaContext, useUpdateMetaContext } from "../context/MetaContext"
import { TEST_REPORTS_FOR_TESTING } from "../tests/report";

//******************************** */
//******************************** */
//deprecate
//This component is no longer used
//******************************** */
//******************************** */
//

const HDContainer = React.forwardRef((props, ref) => {
  const meta = useMetaContext();
  const { updateMeta } = useUpdateMetaContext();
  const { element } = props;

  const [containerMeta, setContainerMeta] = useState({});
  const [loadedReport, setLoadedReport] = useState();

  function initializeComponent(reportElements) {
    if (!reportElements) {
      return;
    }
    reportElements.forEach(el => {
      el.component = getComponent(el.type);
      if (el.attributes && el.attributes.children && el.attributes.children.length > 0) {
        initializeComponent(el.attributes.children);
      }
    })
  }

  function createElementMap(elements, elementMap) {
    elements.forEach(elm => {
      elementMap[elm.name] = elm;
      if (elm.attributes && elm.attributes.children.length > 0) {
        createElementMap(elm.attributes.children, elementMap);
      }
    })
  }

  const generateElementMap = (preMeta) => {
    if (preMeta.elements && preMeta.elements.length > 0) {
      const elementMap = {};
      createElementMap(preMeta.elements, elementMap);
      containerMeta.elementMap = elementMap;
      setContainerMeta(containerMeta);
    }
    return <></>;
  }

  useImperativeHandle(ref, () => ({
    loadReport(resourceId, data = {}) {
      //TODO: we need to make the server call taking the resourceId

      //This is for testing
      const json = TEST_REPORTS_FOR_TESTING.find(trpt => trpt.id === resourceId).json; //we will be getting the json string from the server
      const report = JSON.parse(json);
      initializeComponent(report.elements);
      if (element.attributes && element.attributes.children) {
        element.attributes.children = [];
        element.attributes.children = report.elements;
        setContainerMeta(report);
      }
    },
    addStyle(style = "") {
      //TODO: implementation of style
      /* code to add styles from the Style Control component */
    },
  }));

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
      setMeta: updateMeta,
      meta: cMeta,
      element: child,
      enteredValue: "",
    });
    child.ref = ref;
    return reactComponent;
  });

  /**
   * handle click event on element
   * Observable will be create which will emit element click change
   * @param {*} element
   */
  const handleChildElementClick = (event, element, child) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    meta.currentElement = child;
    updateMeta(meta);
  };

  return (
    <Droppable droppableId={`${element.id}`} type="pgElement">
      {(provided, snapshot) => (
        <div
          className="grid col-12"
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            display: "flex",
            backgroundColor: snapshot.isDraggingOver ? "cyan" : "",
            width: "100%",
            border: meta.editMode ? '1px dashed grey' : ''
          }}>
          <div className="col-12 grid">
            {element?.attributes?.children.map((child, index) => {
              return (
                <Draggable
                  key={`${child.id}${index}`}
                  draggableId={`${child.id}${index}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} className={child?.attributes?.className}>
                      <span {...provided.dragHandleProps}>
                        {meta.editMode && <FontAwesomeIcon
                          icon={faGripVertical}
                          style={{ float: "right" }}
                        />}
                      </span>
                      <div onClick={(e) => { handleChildElementClick(e, element, child) }}>
                        {createChildElement(child, index)}
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
                </Draggable>
              );
            })}
            {generateElementMap(containerMeta)}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
});

export default memo(HDContainer);
//"comp-container col-12"
