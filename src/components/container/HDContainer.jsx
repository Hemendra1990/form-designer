import React, { useCallback, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { CONTROL } from "../../constants/Elements";
import getComponent from "../../constants/HemendraConstants";
import {
  useMetaContext,
  useUpdateMetaContext,
} from "../../context/MetaContext";
import { ItemType } from "../../model/ItemType";
import DraggableContainerElement from "../../playground/DraggableContainerElement";
import DraggablePGElement from "../../playground/DraggablePGElement";
import { createElementId } from "../../utils/Utils";
import ContainerHelper from "../../_helpers/ContainerHelper";

function HDContainer({
  element,
  pgIndex,
}) {
  const meta = useMetaContext();
  const { updateMeta, updateMetaWithElement } = useUpdateMetaContext();
  const containerElement = element;
  const helper = new ContainerHelper();

  const [containerChildren, setContainerChildren] = useState([]);
  const [controlElementHoveringOnIndex, setControlElementHoveringOnIndex] = useState(-999);

  containerElement.attributes = containerElement.attributes || {};
  containerElement.attributes.children = containerElement.attributes.children || [];

  useEffect(() => {
    console.log("Container children test", element);
  }, [element]);

  const [{ canDrop, isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: [ItemType.HD_ELEMENT, ItemType.HD_PG_ELEMENT],

      hover: (item, monitor) => {
        if (monitor.didDrop()) { //check if the element is dropped anywhere in pg or container
          return;
        }

        //we need to find the hover index, kaha upare hiover hauchi
        //We need to know dragIndex and hoverIndex, kahiniki kaina ame tapare meta.elements achhi seithi modify kariba


      },
      drop: (item, monitor) => {
        //check if the element is already dropped or not
        if (monitor.didDrop() && monitor.getItem().droppedLocation && monitor.getItem().droppedLocation.includes(CONTROL.CONTAINER)) {
          return;
        }

        if (item.resizingInsideContainer) {
          monitor.getItem().resizingInsideContainer = false;
          item.resizingInsideContainer = false;
          return;
        }

        if (monitor.getItemType() === ItemType.HD_ELEMENT) {
          const { controlItem } = item;
          let id = createElementId();
          id = `${controlItem.value}-${id}`
          const component = getComponent(controlItem.value);
          const element = {
            type: controlItem.value.toLowerCase(),
            name: `${controlItem.value}-${id}`,
            id: id,
            component,
          };

          let foundElement = null;
          for (let obj of meta.elements) {
            foundElement = findElement(obj, containerElement.id);
            if (foundElement) {
              foundElement.attributes = foundElement.attributes || {};
              foundElement.attributes.children = foundElement.attributes.children || [];
              if (foundElement.attributes.children.length === 0) {
                foundElement.attributes.children.push({
                  ...element,
                  id: id,
                  parentId: containerElement.id,
                });
              } else { //insert at hover index
                foundElement.attributes.children.splice(controlElementHoveringOnIndex, 0, element);
                foundElement.attributes.children = [...foundElement.attributes.children];
              }

              break;
            }
          }
        } else if (monitor.getItemType() === ItemType.HD_PG_ELEMENT) {
          //hdPGElement
          const helper = new ContainerHelper();
          meta.elements = helper.updateParent(
            meta.elements,
            item.element.id,
            containerElement.id
          );

          const newObj = helper.findNodeAndParent(
            meta.elements,
            containerElement.id
          );
          console.log("New Obj", newObj);
          updateMeta(meta.elements)
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
    }),
    [controlElementHoveringOnIndex, meta.elements]
  );

  function findElement(obj, elementId) {
    if (obj.id && obj.id === elementId) {
      return obj;
    }
    if (obj.attributes && obj.attributes.children) {
      for (let child of obj.attributes.children) {
        const result = findElement(child, elementId);
        if (result) {
          return result;
        }
      }
    }
    return null;
  }

  const moveContainerCard = useCallback(
    (dragIndex, hoverIndex, item, monitor) => {

      if (dragIndex === -1) {
        setControlElementHoveringOnIndex(hoverIndex);
        return;
      }

      if (dragIndex !== undefined && hoverIndex !== undefined) {
        console.log({ dragIndex, hoverIndex });
        const { node, parent } = helper.findNodeAndParent(meta.elements, item.element.id);
        if (node && parent.attributes['children'] && parent.attributes['children'][hoverIndex]) {//check if any element is already there at the index or not
          const children = parent.attributes['children'];
          const [draggedItem] = children.splice(dragIndex, 1);
          children.splice(hoverIndex, 0, draggedItem);
          parent.attributes['children'] = children;

          //setting another flag
          monitor.getItem().resizingInsideContainer = true;

          console.log({ parent, meta });
        }
      }
    },
    [controlElementHoveringOnIndex, setControlElementHoveringOnIndex, meta.elements]
  );

  const isActive = canDrop && isOver;
  let backgroundColor = "";
  if (isActive) {
    backgroundColor = "";
  } else if (canDrop) {
    backgroundColor = "#E4F8F0";
  }

  if (isOverCurrent) {
    backgroundColor = "#DCDCDC";
  }
  return (
    <div
      ref={drop}
      style={{
        minHeight: "100px",
        margin: "20px",
        paddingBottom: "100px",
        border: meta.editMode ? "1px dashed gray" : "",
        backgroundColor: backgroundColor,
      }}
      className="grid"
    >
      {element?.attributes?.children.map((childElement, containerIndex) => {
        if (childElement) {
          childElement.currIndex = containerIndex;
          childElement.parent = element;//element means container
          return (
            <DraggableContainerElement
              {...childElement}
              key={childElement?.id}
              style={{ marginTop: 10, marginBottom: 10 }}
              element={childElement}
              pgIndex={pgIndex}
              parentId={containerElement.id}
              moveContainerCard={moveContainerCard}
              containerIndex={containerIndex}
            />
          );
        }
      })}
    </div>
  );
}

export default HDContainer;
