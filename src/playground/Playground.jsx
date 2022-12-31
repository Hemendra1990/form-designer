import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import { useMetaContext, useUpdateMetaContext } from "../context/MetaContext";
import { CONTROL } from "../constants/Elements";

const Playground = (props) => {
  const meta = useMetaContext();
  const { updateMeta } = useUpdateMetaContext();
  const [changePlaygroundState, setChangePlaygroundState] = useState(true); //This is required to reload the controls

  const toastRef = useRef(null);
  useEffect(() => {
    meta.toastRef = toastRef;
    updateMeta(meta);
  }, []);

  /**
   * handle click event on element
   * Observable will be create which will emit element click change
   * @param {*} element
   */
  const updateCurrentElement = (event, element) => {
    event.preventDefault();
    event.stopPropagation();
    meta.currentElement = element;

    updateMeta(meta);
  };

  /**
   * creates the element in the playground
   *
   * @param {*} element
   * @param {*} i
   * @returns
   */
  const createElement = (element, i) => {
    element.attributes = element.attributes || {};
    element.attributes.children = element.attributes.children || [];
    let ref = element.ref;

    if (element.reactComponent) {
      //Commented beacuse opening report looses current.ref
      return React.cloneElement(element.reactComponent, { meta: meta });
      //return element.reactComponent;
    }

    if (!ref) {
      ref = React.createRef();
    }
    const reactComponent = React.createElement(element.component, {
      ref: ref,
      key: i + 1,
      name: `${element.name}`,
      setMeta: updateMeta,
      meta: meta,
      element: element,
      enteredValue: "",
    });

    element.ref = ref;
    element.reactComponent = reactComponent; //Important: this is used to handle the rerender of the elements after drag n drop
    return reactComponent;
  };

  /**
   * Updates the meta.elements to rerender the elements in the playground
   *
   * @param {*} dragResult
   * @returns
   */
  const onDragEnd = (dragResult) => {
    if (!dragResult.destination) return;
    const { destination, source } = dragResult;
    let items = meta.elements;
    let destContainer = items.find(
      (itm) => itm.id === dragResult.destination.droppableId
    );

    if (dragResult.destination.droppableId.includes("container")) {
      //TODO recursively find the value findContainer(items, dragResult.destination.droppableId, destContainer);
      /* destContainer = items.find(
        (itm) => itm.id === dragResult.destination.droppableId
      ); */

      //If source and destination container is Same.
      if (destination.droppableId === source.droppableId) {
        reorderItemsInSameContainer();
      } else if (source.droppableId.includes("container")) {
        //Dragged from One Container to Another sibling Container
        //Remove from Source Container
        reorderItemFromContainerToSiblingContainer();
      } else {
        const [reorderItem] = items.splice(dragResult.source.index, 1);
        destContainer = meta.elementMap[dragResult.destination.droppableId];
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
      }
    } else if (
      source.droppableId.includes("container") &&
      destination.droppableId.includes("playground")
    ) {
      /* If item dragged from container and dropped in Playground */
      reorderItemFromContainerToPlayground();
    } else {
      const [reorderItem] = items.splice(dragResult.source.index, 1);
      items.splice(dragResult.destination.index, 0, reorderItem);
    }

    meta.elements = [...items];
    updateMeta(meta);

    function reorderItemFromContainerToSiblingContainer() {
      const srcContainerChildren =
        meta.elementMap[source.droppableId].attributes.children;
      const [containerChild] = srcContainerChildren.splice(source.index, 1);
      //Add to the destination container
      destContainer.attributes.children.splice(
        destination.index,
        0,
        containerChild
      );
      destContainer.attributes.children = [
        ...destContainer.attributes.children,
      ];
    }

    function reorderItemFromContainerToPlayground() {
      //Splice from container children
      let srcContainerId = source.droppableId;
      let containerChildren =
        meta.elementMap[srcContainerId].attributes.children;
      const [containerChild] = containerChildren.splice(source.index, 1);

      items.splice(dragResult.destination.index, 0, containerChild);
      items = [...items];
    }

    function reorderItemsInSameContainer() {
      let children = destContainer.attributes.children;
      const [childreOrderitem] = children.splice(dragResult.source.index, 1);
      children.splice(dragResult.destination.index, 0, childreOrderitem);

      destContainer.attributes.children = [
        ...destContainer.attributes.children,
      ];
    }
  };

  /**
   * Depth search for the element
   *
   * @param {*} items
   * @param {*} droppableId
   * @returns
   */
  function findContainer(items, droppableId, result) {
    for (let item of items) {
      if (item.id === droppableId) {
        result = item;
        break;
      }

      if (item?.attributes?.children.length > 0) {
        findContainer(item.attributes.children, droppableId);
      }
    }
  }

  /**
   * deletes the element from the playground
   *
   * @param {*} event
   * @param {*} element
   * @param {*} index
   */
  const deleteElement = (event, element, index) => {
    meta.elements.splice(index, 1);
    updateMeta(meta);
    setChangePlaygroundState(!changePlaygroundState);
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
                backgroundColor: snapshot.isDraggingOver ? "grey" : "",
              }}
              {...provided.droppableProps}
            >
              {meta.elements.map((element, index) => (
                <Draggable
                  isDragDisabled={!meta?.editMode}
                  key={element.id}
                  draggableId={element.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      className={
                        element?.attributes?.className
                          ? element?.attributes?.className
                          : element.type === CONTROL.GRID
                          ? "col-12"
                          : "col-4"
                      }
                      onClick={(event) => updateCurrentElement(event, element)}
                    >
                      <div ref={provided.innerRef} {...provided.draggableProps}>
                        <span>
                          <i
                            className={meta?.editMode ? "pi pi-trash" : ""}
                            style={{ fontSize: "1rem" }}
                            onClick={(e) => deleteElement(e, element, index)}
                          ></i>
                        </span>
                        {meta.editMode && (
                          <span {...provided.dragHandleProps}>
                            <FontAwesomeIcon
                              icon={faGripVertical}
                              style={{ float: "right" }}
                            />
                          </span>
                        )}
                        <div
                          className={
                            meta?.editMode ? "edit-mode" : "preview-mode"
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
      {/* <Toast ref={toastRef}></Toast> */}
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
 *  STEP-2: We are generating the dynamic components by iterating the "meta.elements (an Array)",
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
