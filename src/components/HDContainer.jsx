import React from "react";

const HDContainer = React.forwardRef((props, ref) => {
  console.log(props);
  return <div className="comp-container col-12"></div>;
});

export default HDContainer;
