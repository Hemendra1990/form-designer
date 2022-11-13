import React from "react";

const HDContainer = React.forwardRef((props, ref) => {
  const {meta} = props;
  console.log(props);
  return <div className={meta.editMode?"comp-container col-12": "col-12"}></div>;
});

export default HDContainer;
//"comp-container col-12"
