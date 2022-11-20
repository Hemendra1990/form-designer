
import React from "react";

const HDHtmlEditor = React.forwardRef((props, ref) => {
    const {element} = props;
    return (
        <div id={element.id}>
            <label>Placehodler</label>
        </div>
    )
});

export default HDHtmlEditor;