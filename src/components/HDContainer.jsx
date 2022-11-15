import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo, useCallback, useEffect } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

const HDContainer = React.forwardRef((props, ref) => {
  const { element, meta } = props;

  const createChildElement = useCallback((child, index) => {
    console.log("creating elements...");
    const ref = React.createRef();
    const reactComponent = React.createElement(child.component, {
      ref: ref,
      key: index + 1,
      name: `${child.name}`,
      setMeta: props.setMeta,
      meta: props.meta,
      element: child,
      enteredValue: "",
    });
    child.ref = ref;
    return reactComponent;
  }, []);

  /**
   * handle click event on element
   * Observable will be create which will emit element click change
   * @param {*} element
   */
   const handleElementClick = (element) => {
    console.log('Element click');
    props.setMeta((prevValue) => {
      return {
        ...prevValue,
        currentElement: element,
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
            border: '1px dashed red'
          }}>
          <div className="col-12" style={{ height: "10rem" }}>
            {element?.attributes?.children.map((child, index) => {
              return (
                <Draggable
                  key={`${child.id}${index}`}
                  draggableId={`${child.id}${index}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <span {...provided.dragHandleProps}>
                        {meta.editMode && <FontAwesomeIcon
                          icon={faGripVertical}
                          style={{ float: "right" }}
                        />}
                      </span>
                      <div onFocus={() => handleElementClick(element)}>
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

export default HDContainer;
//"comp-container col-12"
