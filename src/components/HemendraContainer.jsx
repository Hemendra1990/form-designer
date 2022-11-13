import React from "react";

const HemendraContainer = React.forwardRef((props, ref) => {
  console.log(props);
  return <div className="comp-container col-12">Hello</div>;
});

export default HemendraContainer;
