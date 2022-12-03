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
import {InputNumber} from "primereact/inputnumber";
import {
  useMetaContext,
  useUpdateMetaContext,
} from "../../context/MetaContext";
import { StringToJSX } from "../../utils/StringToJSX";
import { evaluateCellTemplate } from "../../utils/Utils";
import { Dropdown } from "primereact/dropdown";

const MyTestFun = new Function(
  "row",
  `
  if(row.id === 3809) {
    return '<h1>Hello World</h1>'
  } else {
    return '<h1> Hi </h1>'
  };
`
);

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
  const gridColRef = useRef();
  const gridRef = useRef();

  const [dataTableProps, setDataTableProps] = useState({});

  const [refreshGrid, setRefreshGrid] = useState(null);//tried to refresh the grid on applying to attributes, need to change this later after anlysing the impact of this line.

  useImperativeHandle(ref, () => ({
    setResult,
    applyGridOptions,
  }));

  function setResult({ columns, rows }) {
    const {element} = props;
    element.attributes["columns"] = columns;
    setColumns(columns);
    setRows(rows);
  }

  function applyGridOptions() {
    console.log("Applying Grid Options...", props.element.attributes.config);
    const gridConfig = props.element.attributes.config;
    setDataTableProps(gridConfig);

    //Setting options
    //gridRef.current.props = {...gridRef.current.props, ...gridConfig}

    if (gridConfig) {
      //Apllying only cell template to the grid
      Object.keys(gridConfig).forEach((configClmId) => {
        let column = columns.find((clm) => clm.id === configClmId);
        if (column) {
          //1. Body for Cell template
          column.body = (rowData) => {
            let cellTempalteString =
              gridConfig[configClmId]["cell-template"].template;
            let domStr = evaluateCellTemplate(rowData, cellTempalteString);
            return (
              <>
                <StringToJSX rowData={rowData} domString={domStr} />
              </>
            );
          };

          //2. If Cell is Editable
          if(gridConfig[configClmId].editable) {
            column.editor = getEditor[gridConfig[configClmId].editableType];
          }

        }
      });
      setColumns(columns); //Update columns so that the grid will re-render to see the result
      setRefreshGrid(Math.random())
    }
  }

  const TextEditor = (options) => {
    console.log({options, rows})
    return (<b>Text Editor</b>)
  }
  const DropdownEditor = (options) => {
    console.log({options, rows})
    return (
      <Dropdown value={options.value} options={rows} optionLabel="name" onChange={(e) => options.editorCallback(e.value)}></Dropdown>
    )
  }
  const MultiselectEditor = (options) => {
    console.log({options, rows})
    return (<b>MultiselectEditor Editor</b>)
  }
  const CheckboxEditor = (options) => {
    console.log({options, rows})
    return (<b>CheckboxEditor Editor</b>)
  }
  const DatepickerEditor = (options) => {
    console.log({options, rows})
    return (<b>DatepickerEditor Editor</b>)
  }

  /* const editableFieldTypes = ['None', 'Text', 'Dropdown', 'Multiselect', 'Checkbox', 'Datepicker']; */
  const getEditor = {
    "None": null,
    "Text": TextEditor,
    "Dropdown": DropdownEditor,
    "Multiselect": MultiselectEditor,
    "Checkbox": CheckboxEditor,
    "Datepicker": DatepickerEditor
  }

  useEffect(() => {
    updateMeta(meta);
    applyGridOptions();
  }, [columns]); // eslint-disable-line react-hooks/exhaustive-deps

  const numberEditor = (options) => {
    return <InputNumber value={options.value} onValueChange={(e) => options.editorCallback(e.value)} mode="currency" currency="USD" locale="en-US" />
  }

  const gridColumns = columns.map((col, i) => {
    console.log('%c', 'color:red', col);
    return (
      <Column
        key={col.id}
        field={col.field}
        header={col.header}
        ref={gridColRef}
        body={col.body}
        editor={col.editor}
        onCellEditComplete={()=> {}}
      />
    );
  });

  return (
    <div className="col-12" refreshGrid>
      <div className="card">
        <DataTable
          ref={gridRef}
          value={rows}
          showGridlines={dataTableProps?.showGridlines}
          resizableColumns={dataTableProps?.resizableColumns}
          paginator={dataTableProps?.paginator}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          rowsPerPageOptions={[5,10,25,50]}
          rows={5}
          reorderableColumns={dataTableProps?.reorderableColumns}
          responsiveLayout="scroll"
          loading={false}
          emptyMessage="No data to display"
          style={{width:'100%'}}
          columnResizeMode="expand"
          editMode={dataTableProps?.editMode}
        >
          {gridColumns}
        </DataTable>
      </div>
    </div>
  );
});

export default memo(HDGrid);
