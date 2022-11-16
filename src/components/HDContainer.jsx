import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo, useCallback, useEffect } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

const HDContainer = React.forwardRef((props, ref) => {
  const { element, meta, setMeta } = props;

  const createChildElement = useCallback((child, index) => {
    const ref = React.createRef();
    const reactComponent = React.createElement(child.component, {
      ref: ref,
      key: index + 1,
      name: `${child.name}`,
      setMeta: setMeta,
      meta: meta,
      element: child,
      enteredValue: "",
    });
    child.ref = ref;
    return reactComponent;
  }, [ meta, setMeta]);

  /**
   * handle click event on element
   * Observable will be create which will emit element click change
   * @param {*} element
   */
   const handleChildElementClick = (event, element, child) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    console.log('Element click', event);
    props.setMeta((prevValue) => {
      prevValue.currentElement = child;
      return {
        ...prevValue
      };
    });
  };

  return (
    <Droppable droppableId={`${element.id}`} type="pgElement">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            backgroundColor: snapshot.isDraggingOver ? "cyan" : "",
            width: "100%",
            height: 'fit-content',
            border: meta.editMode ? '1px dashed grey' : ''
          }}>
          <div className="grid" style={{ height: "10rem" }}>
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
                      <div onClick={(e) => {handleChildElementClick(e, element, child)}}>
                        {createChildElement(child, index)}
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
                </Draggable>
              );
            })}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
});

export default memo(HDContainer);
//"comp-container col-12"
