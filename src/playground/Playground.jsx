import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";

const Playground = (props) => {
  console.log("Playground", props);
  const toastRef = useRef(null);
  useEffect(() => {
    props.meta.toastRef = toastRef;
  }, []);

  /**
   * handle click event on element
   * Observable will be create which will emit element click change
   * @param {*} element
   */
  const handleElementClick = (element) => {
    props.setMeta((prevValue) => {
      return {
        ...prevValue,
        currentElement: element,
      };
    });
  };

  const createElement = (element, i) => {
    element.attributes = element.attributes || {};
    //element.attributes.className = element.attributes.className || 'col-12';
    element.attributes.children = element.attributes.children || [];
    const ref = React.createRef();
    const reactComponent = React.createElement(element.component, {
      ref: ref,
      key: i + 1,
      name: `${element.name}`,
      setMeta: props.setMeta,
      meta: props.meta,
      element: element,
      enteredValue: "",
    });

    element.ref = ref;
    return reactComponent;
  };

  const onDragEnd = (dragResult) => {
    if (!dragResult.destination) return;
    const items = props.meta.elements;
    let destContainer = items.find(
      (itm) => itm.id === dragResult.destination.droppableId
    );
    const [reorderItem] = items.splice(dragResult.source.index, 1);
    if (dragResult.destination.droppableId.includes("container")) {
      destContainer = items.find(
        (itm) => itm.id === dragResult.destination.droppableId
      );
      if (destContainer && destContainer.attributes) {
        if (!destContainer.attributes.children) {
          destContainer.attributes.children = [];
        }
        destContainer.attributes.children = [
          ...destContainer.attributes.children,
          reorderItem,
        ];
      } else {
        destContainer.attributes = {};
        destContainer.attributes.children = [];
        destContainer.attributes.children.push(reorderItem);
      }
    } else {
      items.splice(dragResult.destination.index, 0, reorderItem);
    }

    props.setMeta((prevValue) => {
      return {
        ...prevValue,
        elements: [...items],
      };
    });
  };

  const deleteElement = (event, element, index) => {
    props.meta.elements.splice(index, 1);
    props.setMeta((prevValue) => {
      return {
        ...prevValue,
        elements: props.meta.elements,
      };
    });
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="playground-drppble" type="pgElement">
          {(provided, snapshot) => (
            <div
            className="grid"
              ref={provided.innerRef}
              style={{
                backgroundColor: snapshot.isDraggingOver
                  ? "grey"
                  : "",
              }}
              {...provided.droppableProps}
            >
              {props.meta.elements.map((element, index) => (
                <Draggable
                  isDragDisabled={!props.meta?.editMode}
                  key={element.id}
                  draggableId={element.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div className={element?.attributes?.className || "col-4"}>
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        onFocus={() => handleElementClick(element)}>
                        <span>
                          <i
                            className={
                              props.meta?.editMode ? "pi pi-trash" : ""
                            }
                            style={{ fontSize: "1rem" }}
                            onClick={(e) => deleteElement(e, element, index)}
                          ></i>
                        </span>
                        <span {...provided.dragHandleProps}>
                          <FontAwesomeIcon
                            icon={faGripVertical}
                            style={{ float: "right" }}
                          />
                        </span>
                        <div
                          className={
                            props.meta?.editMode ? "edit-mode" : "preview-mode"
                          }
                        >
                          {createElement(element, index)}
                        </div>
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Toast ref={toastRef}></Toast>
    </>
  );
};

export default Playground;

/**
 * HOW THE HELL CURRENT_ELEMENT(currentElement object inside meta) AND ELEMENT(element in props) OBJECT ARE WORKING?
 *
 * SO THAT CHANGING IN Attribute Panel changes the element object
 *
 * Let's Understand (IT IS ALL ABOUT PASS BY REFERENCE)
 *  STEP-1: We are generating new elements on clicking of the control panel,
 *          all the elements are addded into "meta.elements" array
 *  STEP-2: We are generating the dynamic components by iterating the "props.meta.elements (an Array)",
 *          that means each dynamic component are sharing the "element object" from the elements array
 *  STEP-3: We have created the "handleElementClick" function which takes the element object as the argument
 *              which belongs to "elements" Array
 *          -In this handleElementClick(), we are setting "currentElement" as "element", element belongs to meta.elements
 *          -So change in currentElement updates the meta.elements array...., AS THEY ARE SAME OBJECT, PASS BY REFERENCE
 *
 *
 *
 *
 */
