import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  memo,
  useRef,
} from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  useMetaContext,
  useUpdateMetaContext,
} from "../../context/MetaContext";
import {StringToJSX} from "../../utils/StringToJSX"
import createReactClass from "create-react-class"
import { evaluateCellTemplate } from "../../utils/Utils";

const MyTestFun = new Function('row', `
  if(row.id === 3809) {
    return '<h1>Hello World</h1>'
  } else {
    return '<h1> Hi </h1>'
  };
`)

/**
 * type of grid data
 */
const gridData = {
  columns: [{ field: "code", header: "Code" }],
  rows: [],
};

const HDGrid = forwardRef((props, ref) => {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const { updateMeta } = useUpdateMetaContext();
  const meta = useMetaContext();
  const gridRef = useRef();

  useImperativeHandle(ref, () => ({
    setResult,
    applyGridOptions
  }));

  function setResult({ columns, rows }) {
    setColumns(columns);
    setRows(rows);
  }

  

  function applyGridOptions() {
    console.log('Applying Grid Options...', props.element.attributes.config);
    const gridConfig = props.element.attributes.config;
    
    if(gridConfig) {//Apllying only cell template to the grid
      Object.keys(gridConfig)
      .forEach((configClmId)=> {
        let column = columns.find(clm => clm.id === configClmId);
        if(column) {
          column.body = (rowData) => {
            console.log('Inside Grid Column Body...', rowData);
            let cellTempalteString = gridConfig[configClmId]['cell-template'].template(rowData);
            let domStr = evaluateCellTemplate(rowData, cellTempalteString);
            return (
              <>
                <StringToJSX rowData={rowData} domString={domStr} />
              </>
            )
          }
        }
      });

      setColumns(columns); //Update columns so that the grid will re-render to see the result
    }
    
    
  }

  useEffect(() => {
    updateMeta(meta);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const gridColumns = columns.map((col, i) => {
    return <Column key={col.id} field={col.field} header={col.header} ref={gridRef} body={col.body}/>;
  });

  return (
    <div className="col-12">
      <div className="card">
        <DataTable value={rows} responsiveLayout="scroll">
          {gridColumns}
        </DataTable>
      </div>
    </div>
  );
});

export default memo(HDGrid);
