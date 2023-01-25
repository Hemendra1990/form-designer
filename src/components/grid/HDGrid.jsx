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
import { useMetaContext, useUpdateMetaContext } from "../../context/MetaContext";
import { StringToJSX } from "../../utils/StringToJSX";
import { evaluateCellTemplate } from "../../utils/Utils";
import ColumnTextEditor from "./editors/ColumnTextEditor";
import ColumnDropdownEditor from "./editors/ColumnDropdownEditor";
import { addElementStyle } from "../../control-styles/ControlStyles";
import { ControlStyleModel } from "../../control-styles/ControlStyleModel";
import { useReportMetaContext, useReportUpdateMetaContext } from "../../context/ReportMetaContext";

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
  const [loading, setLoading] = useState(false);
  const [controlStyle, setControlStyle] = useState();
  const { element } = props;

  /* const { updateMeta } = useUpdateMetaContext();
  const meta = useMetaContext(); */

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { updateMeta } = element.isInReportContainer ? useReportUpdateMetaContext() : useUpdateMetaContext();//figured out contexts can be used conditionally
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const meta = element.isInReportContainer ? useReportMetaContext() : useMetaContext();

  const gridColRef = useRef();
  const gridRef = useRef();

  const [dataTableProps, setDataTableProps] = useState({});

  const [refreshgrid, setRefreshgrid] = useState(""); //tried to refresh the grid on applying to attributes, need to change this later after anlysing the impact of this line.
  const [showHideFlag, setShowHideFlag] = useState(true);

  const showHide = (value) => {//expecing the value to be boolean
    setShowHideFlag(value);
  }

  useImperativeHandle(ref, () => ({
    setResult,
    applyGridOptions,

    startLoader(value) {
      setLoading(value);
    },
    getStyleAttributes: () => {
      return ControlStyleModel.getGridStyle();
    },
    addStyle(style = "") {
      setControlStyle(style);
    },
    primeGridRef: gridRef,
    showHide
  }));

  function setResult({ columns, rows }) {
    console.log({ columns, rows });
    const { element } = props;
    element.attributes["columns"] = columns;
    setColumns(columns);
    setRows(rows);
    setLoading(false);
  }

  function applyGridOptions() {
    if (element.attributes.config === undefined) {
      element.attributes.config = {};
      element.attributes.config.paginator = true;
      element.attributes.config.showGridlines = true;
    }
    const gridConfig = element.attributes.config;
    setDataTableProps(gridConfig);

    //Setting options
    //gridRef.current.props = {...gridRef.current.props, ...gridConfig}

    if (gridConfig) {
      //Apllying only cell template to the grid
      Object.keys(gridConfig).forEach((configClmId) => {
        let column = columns.find((clm) => clm.id === configClmId);
        if (column) {
          //1. Body for Cell template
          if (gridConfig[configClmId]["cell-template"]) {
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
          }

          //2. If Cell is Editable
          if (gridConfig[configClmId].editable) {
            //column.editor = getEditor[gridConfig[configClmId].editableType];
            column.editor = (options) => {
              const editor = getEditor[gridConfig[configClmId].editableType];
              return editor(options, configClmId);
            };
          }
        }
      });
      setColumns(columns); //Update columns so that the grid will re-render to see the result
      setRefreshgrid(Math.random());
    }
  }

  const TextEditor = (options, configClmId) => {
    return (
      <ColumnTextEditor
        options={options}
        columnId={configClmId}
      ></ColumnTextEditor>
    );
  };
  const DropdownEditor = (options, configClmId) => {
    return (
      <ColumnDropdownEditor
        meta={meta}
        options={options}
        rows={rows}
        element={props.element}
        columnId={configClmId}
      />
    );
  };
  const MultiselectEditor = (options, configClmId) => {
    return <b>MultiselectEditor Editor</b>;
  };
  const CheckboxEditor = (options, configClmId) => {
    return <b>CheckboxEditor Editor</b>;
  };
  const DatepickerEditor = (options, configClmId) => {
    return <b>DatepickerEditor Editor</b>;
  };

  /* const editableFieldTypes = ['None', 'Text', 'Dropdown', 'Multiselect', 'Checkbox', 'Datepicker']; */
  const getEditor = {
    None: null,
    Text: TextEditor,
    Dropdown: DropdownEditor,
    Multiselect: MultiselectEditor,
    Checkbox: CheckboxEditor,
    Datepicker: DatepickerEditor,
  };

  useEffect(() => {
    /* updateMeta(meta); */
    applyGridOptions();
    //Apply style if the element already has
    if (element.style) {
      const elementStyle = addElementStyle(
        element.style,
        element,
        meta,
        setControlStyle
      );
      setControlStyle(elementStyle);
    }
  }, [columns]); // eslint-disable-line react-hooks/exhaustive-deps

  const onCellEditComplete = (e) => {
    let { rowData, newValue, field, originalEvent: event } = e;

    if (newValue.length > 0) rowData[field] = newValue;
    else event.preventDefault();
  };

  const gridColumns = columns.map((col, i) => {
    return (
      <Column
        key={col.id}
        field={col.field}
        header={col.header}
        ref={gridColRef}
        body={col.body}
        editor={col.editor}
        onCellEditComplete={onCellEditComplete}
      />
    );
  });

  return (
    <>
      <style>{controlStyle}</style>
      <div id={element.id} refreshgrid={refreshgrid.toString()}>
        <DataTable

          ref={gridRef}
          value={rows}
          showGridlines={dataTableProps?.showGridlines}
          resizableColumns={dataTableProps?.resizableColumns}
          paginator={dataTableProps?.paginator}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          rowsPerPageOptions={[5, 10, 25, 50]}
          rows={5}
          reorderableColumns={dataTableProps?.reorderableColumns}
          responsiveLayout="scroll"
          loading={loading}
          emptyMessage="No data to display"
          style={showHideFlag ? { display: 'block', width: "100%" } : { display: 'none', width: "100%" }}
          tableStyle={{
            minHeight: "20rem",
          }}
          stripedRows={true}
          scrollable
          scrollHeight="290px"
          columnResizeMode="absolute"
          editMode={dataTableProps?.editMode}
        >
          {gridColumns}
        </DataTable>
      </div>
    </>
  );
});

export default memo(HDGrid);
