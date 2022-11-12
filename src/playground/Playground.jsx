import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Playground = (props) => {
  console.log("Playground", props);

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
    console.log('Drag end', dragResult);
    if(!dragResult.destination) return;
    const items = props.meta.elements;
    const [reorderItem] = items.splice(dragResult.source.index, 1);
    items.splice(dragResult.destination.index, 0, reorderItem);

    props.setMeta((prevValue) => {
      return {
        ...prevValue,
        elements: items
      }
    })


  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        {/* step-1: iterating elements */}
        {props.meta.elements.map((element, index) => {
          return (
            <Droppable key = {element.id} droppableId={`${element.id}`}>
              {
                (provided) => (
                  <div className="col-4" ref={provided.innerRef} {...provided.droppableProps}
                  key={element.id}
                  onFocus={() =>
                    handleElementClick(element)
                  } /* step-3: here "element" is passed, which is the refenrence object from meta.elements, so any change in element updates the meta.elements array */
                >
                  <Draggable
                      key={element.id}
                      draggableId={element.id}
                      index={index}
                    >
                      {(provided) => (
                          <div ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}>
                            {createElement(element, index)}
                          </div>
                        )
                      }
                      
                    </Draggable>
                  {provided.placeholder}
                </div>
                )
              }
              
            </Droppable>
          );
        })}
      </DragDropContext>
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
