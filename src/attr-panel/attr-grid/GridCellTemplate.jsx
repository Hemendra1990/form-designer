import React, { memo } from "react";
import { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Checkbox } from "primereact/checkbox";
import { useRef } from "react";

const GridCellTemplate = ({ meta, element, selectedColumn }) => {
  const [cellTemplate, setCellTemplate] = useState('');
  const [enableCellCustomisation, setCellCustomisation] = useState(false);
  const cellTemplateEditorRef = useRef(null);

  const handleCheckboxChange = () => {
    setCellCustomisation(!enableCellCustomisation);
  }

  const updateGridElementConfig = () => {
    element.attributes.config = element.attributes.config || {};
    let columnConfig = element.attributes.config;
    columnConfig[selectedColumn.id] = columnConfig[selectedColumn.id] || {};
    columnConfig[selectedColumn.id]["cell-template"] = {
      ...columnConfig[selectedColumn.id]["cell-template"],
      enabled: enableCellCustomisation,
      template: cellTemplate
    };
  }

  return (
    <div>
      <div className="field-checkbox">
        <Checkbox
          inputId="binary"
          checked={enableCellCustomisation}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="binary">Enable Cell Customisation for <i>{`${selectedColumn.header}(${selectedColumn.id})`}</i></label>
      </div>
      <InputTextarea
        disabled={!enableCellCustomisation}
        placeholder="<div> Cell Customisation for  </div>"
        style={{ width: "100%" }}
        ref={cellTemplateEditorRef}
        value={cellTemplate}
        onChange={(e) => setCellTemplate(e.target.value)}
        onBlur={updateGridElementConfig}
        rows={5}
        autoResize
      />
    </div>
  );
};

export default memo(GridCellTemplate);
