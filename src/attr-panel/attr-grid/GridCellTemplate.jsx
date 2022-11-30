import React, { memo } from "react";
import { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Checkbox } from "primereact/checkbox";
import { Tooltip } from 'primereact/tooltip';
import { useRef } from "react";
import { useEffect } from "react";
import {Button} from "primereact/button";

const GridCellTemplate = ({ meta, element, selectedColumn }) => {
  const [cellTemplate, setCellTemplate] = useState("");
  const [enableCellCustomisation, setCellCustomisation] = useState(false);
  const cellTemplateEditorRef = useRef(null);

  useEffect(() => {
    if (element.attributes && element.attributes.config) {
      const clmTemplate = element.attributes.config[selectedColumn.id];
      if (clmTemplate && clmTemplate["cell-template"]) {
        const cellTemplate = clmTemplate["cell-template"];
        setCellCustomisation(cellTemplate.enabled);
        setCellTemplate(cellTemplate.template);
      } else {
        setCellCustomisation(false);
        setCellTemplate("");
      }
    }
  }, [selectedColumn]);

  const handleCheckboxChange = () => {
    setCellCustomisation(!enableCellCustomisation);
  };

  const updateGridElementConfig = () => {
    element.attributes.config = element.attributes.config || {};
    let columnConfig = element.attributes.config;
    columnConfig[selectedColumn.id] = columnConfig[selectedColumn.id] || {};
    columnConfig[selectedColumn.id]["cell-template"] = {
      ...columnConfig[selectedColumn.id]["cell-template"],
      enabled: enableCellCustomisation,
      template: cellTemplate,
    };
  };

  const placeholder = "Example:" +
      "" +
      "\n\n" +
      "if(row.id %2 ==0) {\n" +
      "   return '<span style=\"color:red\">${row.id} </span>'\n" +
      "} else {\n" +
      "     return '<span style=\"color:green\">${row.id} </span>'\n" +
      "}";

  return (
    <div>
      <div className="field-checkbox">
        <Checkbox
          inputId="binary"
          checked={enableCellCustomisation}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="binary">
          Enable Cell Customisation for{" "}
          <i style={{color: '#822fdb'}}>{`${selectedColumn.header}(Id: '${selectedColumn.id}', field : '${selectedColumn.field}' )`}</i>
        </label>
      </div>

      <Tooltip target=".pi-info-circle" tooltipOptions={{hideDelay: 3000}}>
        <ul>
          <li>Access Row value by <b>'row'</b> object</li>
          <li>Access column value by <b>'row.[field]'</b></li>
          <li style={{color: "red", fontSize: "1rem"}}>
            when used with if condition use,<br></br>
            <i style={{color: "yellow"}}>
              {'if(row.[field]) {}'}
            </i>
          </li>
          <li>When want to use inside the html tags use, <br/>
            <b>{
              '${row.[field]}'
            }</b>
          </li>
          <li>
            {placeholder}
          </li>
        </ul>
        <code>
        </code>
      </Tooltip>
      <span className="cell-template-info"><i className="pi pi-info-circle" ></i></span>
      <InputTextarea
        disabled={!enableCellCustomisation}
        placeholder={placeholder}
        style={{ width: "100%" }}
        ref={cellTemplateEditorRef}
        value={cellTemplate}
        onChange={(e) => setCellTemplate(e.target.value)}
        onBlur={updateGridElementConfig}
        rows={10}
        autoResize
      />
    </div>
  );
};

export default memo(GridCellTemplate);
