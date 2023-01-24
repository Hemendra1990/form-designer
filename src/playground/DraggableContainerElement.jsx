import React, { createElement, createRef, useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useMetaContext, useUpdateMetaContext } from "../context/MetaContext";
import { ItemType } from "../model/ItemType";
import { CONTROL } from "../constants/Elements"
import { useReportMetaContext, useReportUpdateMetaContext } from "../context/ReportMetaContext";

const DraggableContainerElement = React.forwardRef((props, ref) => {
  const { element, pgIndex, moveContainerCard, containerIndex, containerMeta } = props;
  console.log(props);

  const isContainerMetaInitialized = (containerMeta && (Object.keys(containerMeta).length > 0)) || element.isInReportContainer;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { updateMeta } = isContainerMetaInitialized ? useReportUpdateMetaContext() : useUpdateMetaContext();//figured out contexts can be used conditionally

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const meta = isContainerMetaInitialized ? useReportMetaContext() : useMetaContext();

  useEffect(() => {
    if (containerMeta && Object.keys(containerMeta).length > 0) {
      updateMeta(containerMeta)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerMeta]);


  const updateCurrentElement = (event, element) => {
    event.preventDefault();
    event.stopPropagation();
    meta.currentElement = element;

    updateMeta(meta);
  };

  const draggableRef = useRef(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.HD_PG_ELEMENT,
    item: { pgIndex, element },
    end: (item, monitor) => {
      const dropRes = { location: element }
      const dropResult = monitor.getDropResult(dropRes);
      if (monitor.getItemType() === ItemType.HD_ELEMENT) {
        monitor.getItem().initialDropLocation = element;
      }

    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }), [containerIndex]);

  const [{ handlerId }, drop] = useDrop({
    accept: [ItemType.HD_ELEMENT, ItemType.HD_PG_ELEMENT],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!draggableRef.current) {
        return;
      }
      if (monitor.getItemType() === ItemType.HD_ELEMENT) {
        const dragIndex = -1;
        const hoverIndex = element.currIndex;
        if (moveContainerCard) {
          moveContainerCard(dragIndex, hoverIndex, item, monitor);
        }
        return;
      }
      const dragIndex = item.element.currIndex || item.index;
      const hoverIndex = containerIndex;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = draggableRef.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      if (moveContainerCard) {
        moveContainerCard(dragIndex, hoverIndex, item, monitor);
      }
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
    drop: (item, monitor) => {
      monitor.getItem().droppedLocation = element.id;
    }
  }, [containerIndex]);

  drag(drop(draggableRef));

  const createComponent = () => {
    element.attributes = element.attributes || {};
    element.attributes.children = element.attributes.children || [];
    let ref = element.ref;

    console.log('DraggableContianerElement', element);

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

  return (
    <div
      onClick={(event) => {
        updateCurrentElement(event, element);
      }}
      style={{ padding: "10px", border: meta.editMode ? "1px dashed" : "", height: "fit-content" }}
      ref={draggableRef}
      className={element?.attributes?.className
        ? element?.attributes?.className
        : element.type === CONTROL.CONTAINER
          ? "col-12"
          : "col-4"}
      title={element.id}
    >
      {/* <div style={{ border: "1px dashed", padding: "5px" }}> */}
      {createComponent()}
      {/* </div> */}
    </div>
  );
}
);

export default DraggableContainerElement;
