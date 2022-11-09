import React from "react";

const Playground = (props) => {
  console.log("Playground", props);

  /**
   * handle click event on element
   * Observable will be create which will emit element click change
   * @param {*} element 
   */
  const handleElementClick = (element) => {
    props.setMeta((prevValue)=> {
      return {
        ...prevValue,
        currentElement: element
      }
    })
  };

  return (
    <>
      {props.meta.elements.map((element, i) => {
        return (
          <>
            <div className="col-2 gap-1" onClick={() => handleElementClick(element)}>
              {React.createElement(element.component, {
                key: i,
                name: `${element.name}-${element.id}`,
                setMeta: props.setMeta,
                meta: props.meta,
                element: element
              })}
            </div>
          </>
        );
      })}
    </>
  );
};

export default Playground;
