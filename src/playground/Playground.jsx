import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
    const [reorderItem] = items.splice(dragResult.source.index, 1);
    items.splice(dragResult.destination.index, 0, reorderItem);

    props.setMeta((prevValue) => {
      return {
        ...prevValue,
        elements: items,
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
        {/* step-1: iterating elements */}
        {props.meta.elements.map((element, index) => {
          return (
            <Droppable key={element.id} droppableId={`${element.id}`}>
              {(provided) => (
                <div
                  className={element.attributes?.className}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  key={element.id}
                  onFocus={() =>
                    handleElementClick(element)
                  } /* step-3: here "element" is passed, which is the refenrence object from meta.elements, so any change in element updates the meta.elements array */
                >
                  <Draggable
                    isDragDisabled={!props.meta.editMode}
                    key={element.id}
                    draggableId={element.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        draggable={props.meta.editMode}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <span>
                          <i
                            className={props.meta.editMode ? "pi pi-trash" : ""}
                            style={{ fontSize: "1rem" }}
                            onClick={(e) => deleteElement(e, element, index)}
                          ></i>
                        </span>
                        <div
                          className={
                            props.meta.editMode ? "edit-mode" : "preview-mode"
                          }
                        >
                          {createElement(element, index)}
                        </div>
                      </div>
                    )}
                  </Draggable>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
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
