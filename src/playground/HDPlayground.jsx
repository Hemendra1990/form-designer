import React, { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import { CONTROL } from "../constants/Elements";
import getComponent from "../constants/HemendraConstants";
import { useMetaContext, useUpdateMetaContext } from "../context/MetaContext";
import { ItemType } from "../model/ItemType";
import { createElementId } from "../utils/Utils";
import ContainerHelper from "../_helpers/ContainerHelper";
import DraggablePGElement from "./DraggablePGElement";

function HDPlayground() {
  const helper = new ContainerHelper();
  const [pgElements, setPGElements] = useState([]);

  const meta = useMetaContext();
  const { addElement, updateMeta } = useUpdateMetaContext();
  const [controlElementHoveringOnIndex, setControlElementHoveringOnIndex] = useState(-999);

  const [{ canDrop, isOver, getDropResult }, drop] = useDrop(
    () => ({
      accept: [ItemType.HD_ELEMENT, ItemType.HD_PG_ELEMENT],
      canDrop: (item, monitor) => {
        return meta.editMode;
      },
      drop: (item, monitor) => {
        console.log(controlElementHoveringOnIndex, item.droppedLocation);
        if (monitor.didDrop() && item.droppedLocation && item.droppedLocation.includes(CONTROL.CONTAINER)) {
          return;
        }

        if (monitor.getItemType() === ItemType.HD_PG_ELEMENT) {
          const { element } = item;
          //"hdPGElement"
          const helper = new ContainerHelper();
          const result = helper.findNodeAndParent(
            [...meta.elements],
            element.id
          );
          const { node, parent } = result;
          if (parent && parent.attributes && parent.attributes.children) {
            parent.attributes.children = parent.attributes.children.filter(
              (child) => child.id !== element.id
            );
            //setPGElements((elements) => [...elements, { ...node }]);

            meta.elements = [...meta.elements, { ...node }];
            updateMeta(meta);
          }
        } else {
          const { controlItem } = item;

          const id = createElementId();
          const component = getComponent(controlItem.value);
          const element = {
            type: controlItem.value.toLowerCase(),
            name: `${controlItem.value}-${id}`,
            id: `${controlItem.value}-${id}`,
            component,
          };
          //setPGElements((elements) => [...elements, { ...element, id }]);
          addElement(element, controlElementHoveringOnIndex);
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
        getDropResult: monitor.getDropResult(),
      }),
    }),
    [controlElementHoveringOnIndex]
  );

  function updatePgElements(newElements) {
    setPGElements([...newElements]);
  }

  const moveCard = useCallback(
    (dragIndex, hoverIndex, item, monitor) => {
      if(dragIndex === -1) {
        setControlElementHoveringOnIndex(hoverIndex);
        return;
      }
      if (
        item &&
        item.element &&
        dragIndex !== undefined &&
        hoverIndex !== undefined
      ) {
        console.log({ dragIndex, hoverIndex });
        const { node, parent } = helper.findNodeAndParent(
          meta.elements,
          item.element.id
        );
        if (node && meta.elements[hoverIndex]) {
          //check if any element is already there at the index or not
          const [draggedItem] = meta.elements.splice(dragIndex, 1);
          meta.elements.splice(hoverIndex, 0, draggedItem);
          updateMeta(meta);
        }
      }
    },
    [meta.elements]
  );

  const isActive = canDrop && isOver;
  let backgroundColor = "";
  if (isOver) {
    backgroundColor = "#DCDCDC";
  }

  return (
    <div
      ref={drop}
      className="grid"
      style={{ minHeight: "30vh", backgroundColor: backgroundColor }}
    >
      {meta.elements.map((element, index) => {
        element.currIndex = index
        return <DraggablePGElement
        {...element}
        key={element.id}
        element={element}
        setPGElements={setPGElements}
        pgElements={pgElements}
        pgIndex={index}
        updatePgElements={updatePgElements}
        moveCard={moveCard}
      />
      })}
    </div>
  );
}

export default HDPlayground;
