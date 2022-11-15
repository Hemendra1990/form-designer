import React, { memo, useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";

const HDContainer = React.forwardRef((props, ref) => {
  const { element, meta } = props;
  
  
  useEffect(()=> {
    console.log('Container Component ', element);

  });
  

  const generateContainerElements = () => {

    return element.attributes?.children.map((child, index) => {
      console.log('creating elements...');
      const ref = React.createRef();
      const reactComponent = React.createElement(element.component, {
        ref: ref,
        key: index + 1,
        name: `${element.name}`,
        setMeta: props.setMeta,
        meta: props.meta,
        element: element,
        enteredValue: "",
      });
      element.ref = ref;
      return reactComponent;
    });
  }

  return (
    <div className={meta.editMode ? "col-12" : "col-12"} style={{width:'100%', height: '5em'}}>
      <Droppable droppableId={`${element.id}`} type="playground-element">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={{
              backgroundColor: snapshot.isDraggingOver ? "red" : "grey",
            }}
            {...provided.droppableProps}
          >
            <h2>I am a droppable!</h2>

            {generateContainerElements()}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
});

export default HDContainer;
//"comp-container col-12"
