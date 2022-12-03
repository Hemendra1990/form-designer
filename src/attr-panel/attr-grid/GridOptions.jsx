import { forwardRef, memo, useEffect, useImperativeHandle, useState } from "react";
import { InputSwitch } from "primereact/inputswitch";
import { SelectButton } from 'primereact/selectbutton';
 

const GridOptions = forwardRef(({element}, ref) => {
  const [showGridlines, setShowGridlines] = useState(false);
  const [showGridHeader, setShowGridHeader] = useState(false);
  const [resizableColumns, setColumnResizable] = useState(false);
  const [paginator, setPagination] = useState(false);
  const [horizontallScroll, setHorizontalScroll] = useState(false);
  const [verticalScroll, setVerticalScroll] = useState(false);
  const [multipleColumnSort, setMultipleColumnSort] = useState(false);
  const [rowSelection, setRowSelection] = useState(false);
  const [staticSort, setStaticSort] = useState(false);
  const [expandedRows, setExpandedRows] = useState(false);
  const [hideNullColumns, setHideNullColumns] = useState(false);
  const [exportHiddenColumns, setExportHiddenColumns] = useState(false);
  const [movableColumns, setMovableColumns] = useState(false);
  const [autoHeight, setAutoHeight] = useState(false);
  const [showTreeRowHeader, setShowTreeRowHeader] = useState(false);
  const [capitalizaHeaders, setCapitalizaHeaders] = useState(false);
  const [rowSelectionSingleMode, setRowSelectionSingleMode] = useState(false);
  const [rowSelectionOnHover, setRowSelectionOnHover] = useState(false);
  const [uniqueColumn, setUniqueColumn] = useState(false);
  const [reorderableColumns, setReorderableColumns] = useState(false);
  const [editMode, setEditMode] = useState(null);

  const editModeOptions = ['cell', 'row'];

  useImperativeHandle(ref, () => ({
    getOptions() {
      return {
        showGridlines,
        showGridHeader,
        resizableColumns,
        paginator,
        horizontallScroll,
        verticalScroll,
        multipleColumnSort,
        rowSelection,
        staticSort,
        expandedRows,
        hideNullColumns,
        exportHiddenColumns,
        movableColumns,
        autoHeight,
        showTreeRowHeader,
        capitalizaHeaders,
        rowSelectionSingleMode,
        rowSelectionOnHover,
        uniqueColumn,
        reorderableColumns,
        editMode
      };
    },
  }));

  useEffect(() => {
    if(element.attributes.config) {
      setShowGridlines(element.attributes.config.showGridlines || false);
      setShowGridHeader(element.attributes.config.showGridHeader || false);
      setColumnResizable(element.attributes.config.resizableColumns || false);
      setPagination(element.attributes.config.paginator || false);
      setHorizontalScroll(element.attributes.config.horizontallScroll || false);
      setVerticalScroll(element.attributes.config.verticalScroll || false);
      setMultipleColumnSort(element.attributes.config.multipleColumnSort || false);
      setRowSelection(element.attributes.config.rowSelection || false);
      setStaticSort(element.attributes.config.staticSort || false);
      setExpandedRows(element.attributes.config.expandedRows || false);
      setHideNullColumns(element.attributes.config.hideNullColumns || false);
      setExportHiddenColumns(element.attributes.config.exportHiddenColumns || false);
      setMovableColumns(element.attributes.config.movableColumns || false);
      setAutoHeight(element.attributes.config.autoHeight || false);
      setShowTreeRowHeader(element.attributes.config.showTreeRowHeader || false);
      setCapitalizaHeaders(element.attributes.config.capitalizaHeaders || false);
      setRowSelectionSingleMode(element.attributes.config.rowSelectionSingleMode || false);
      setRowSelectionOnHover(element.attributes.config.rowSelectionOnHover || false);
      setUniqueColumn(element.attributes.config.uniqueColumn || false);
      setReorderableColumns(element.attributes.config.reorderableColumns || false);
      setEditMode(element.attributes.config.editMode || null);
    } else {
      element.attributes.config = {};
    }
  }, []);

  return (
    <div className="options-wrapper">
      <div className="grid align-content-start">
        <div className="col-3">
          <label className="block">Show Grid Line</label>
          <InputSwitch
            checked={showGridlines}
            onChange={(e) => {
              setShowGridlines(e.value);
              element.attributes.config["showGridlines"] = e.value;
            }}
          />
        </div>
        <div className="col-3">
          <label className="block">Show Grid Header</label>
          <InputSwitch
            checked={showGridHeader}
            onChange={(e) => {
              setShowGridHeader(e.value);
              element.attributes.config["showGridHeader"] = e.value;
            }}
          />
        </div>
        <div className="col-3">
          <label className="block">Column Resizable</label>
          <InputSwitch
            checked={resizableColumns}
            onChange={(e) => {
              setColumnResizable(e.value);
              element.attributes.config["resizableColumns"] = e.value;
            }}
          />
        </div>
        <div className="col-3">
          <label className="block">Reorder Column</label>
          <InputSwitch
            checked={reorderableColumns}
            onChange={(e) => {
              setReorderableColumns(e.value);
              element.attributes.config["reorderableColumns"] = e.value;
            }}
          />
        </div>
        <div className="col-3">
          <label className="block">Pagination</label>
          <InputSwitch
            checked={paginator}
            onChange={(e) => {
              setPagination(e.value);
              element.attributes.config["paginator"] = e.value;
            }}
          />
        </div>
        <div className="col-3">
          <label className="block">Edit Mode</label>
          <SelectButton value={editMode} options={editModeOptions} onChange={(e) => setEditMode(e.value)}></SelectButton>
        </div>
        <div className="col-3">
          <label className="block">Horizontal Scroll</label>
          <InputSwitch
            checked={horizontallScroll}
            onChange={(e) => {
              setHorizontalScroll(e.value);
              element.attributes.config["horizontallScroll"] = e.value;
            }}
          />
        </div>
        <div className="col-3">
          <label className="block">Vertical Scroll</label>
          <InputSwitch
            checked={verticalScroll}
            onChange={(e) => {
              setVerticalScroll(e.value);
              element.attributes.config["verticalScroll"] = e.value;
            }}
          />
        </div>
        <div className="col-3">
          <label className="block">Multiple Column Sort</label>
          <InputSwitch
            checked={multipleColumnSort}
            onChange={(e) => {
              setMultipleColumnSort(e.value);
              element.attributes.config["multipleColumnSort"] = e.value;
            }}
          />
        </div>
        <div className="col-3">
          <label className="block">Row Selection</label>
          <InputSwitch
            checked={rowSelection}
            onChange={(e) => {
              setRowSelection(e.value);
              element.attributes.config["rowSelection"] = e.value;
            }}
          />
        </div>
        <div className="col-3">
          <label className="block">Static Sort</label>
          <InputSwitch
            checked={staticSort}
            onChange={(e) => {
              setStaticSort(e.value);
              element.attributes.config["staticSort"] = e.value;
            }}
          />
        </div>
        <div className="col-3">
          <label className="block">Expanded Rows</label>
          <InputSwitch
            checked={expandedRows}
            onChange={(e) => {
              setExpandedRows(e.value);
              element.attributes.config["expandedRows"] = e.value;
            }}
          />
        </div>
        <div className="col-3">
          <label className="block">Hide Null Columns</label>
          <InputSwitch
            checked={hideNullColumns}
            onChange={(e) => {
              setHideNullColumns(e.value);
              element.attributes.config["hideNullColumns"] = e.value;
            }}
          />
        </div>
        <div className="col-3">
          <label className="block">Export Hidden Columns</label>
          <InputSwitch
            checked={exportHiddenColumns}
            onChange={(e) => {
              setExportHiddenColumns(e.value);
              element.attributes.config["exportHiddenColumns"] = e.value;
            }}
          />
        </div>
        <div className="col-3">
          <label className="block">Movable Column</label>
          <InputSwitch
            checked={movableColumns}
            onChange={(e) => {
              setMovableColumns(e.value);
              element.attributes.config["movableColumns"] = e.value;
            }}
          />
        </div>
        <div className="col-3">
          <label className="block">Auto Height</label>
          <InputSwitch
            checked={autoHeight}
            onChange={(e) => {
              setAutoHeight(e.value);
              element.attributes.config["autoHeight"] = e.value;
            }}
          />
        </div>
        <div className="col-3">
          <label className="block">Show tree row header</label>
          <InputSwitch
            checked={showTreeRowHeader}
            onChange={(e) => {
              setShowTreeRowHeader(e.value);
              element.attributes.config["showTreeRowHeader"] = e.value;
            }}
          />
        </div>
        <div className="col-3">
          <label className="block">Capitalize Headers</label>
          <InputSwitch
            checked={capitalizaHeaders}
            onChange={(e) => {
              setCapitalizaHeaders(e.value);
              element.attributes.config["capitalizaHeaders"] = e.value;
            }}
          />
        </div>
        <div className="col-3">
          <label className="block">Row Selection Single Mode</label>
          <InputSwitch
            checked={rowSelectionSingleMode}
            onChange={(e) => {
              setRowSelectionSingleMode(e.value);
              element.attributes.config["rowSelectionSingleMode"] = e.value;
            }}
          />
        </div>
        <div className="col-3">
          <label className="block">Row Selection on Hover</label>
          <InputSwitch
            checked={rowSelectionOnHover}
            onChange={(e) => {
              setRowSelectionOnHover(e.value);
              element.attributes.config["rowSelectionOnHover"] = e.value;
            }}
          />
        </div>
        <div className="col-3">
          <label className="block">Unique Column</label>
          <InputSwitch
            checked={uniqueColumn}
            onChange={(e) => {
              setUniqueColumn(e.value);
              element.attributes.config["uniqueColumn"] = e.value;
            }}
          />
        </div>

        <div className="col-3"></div>
      </div>
    </div>
  );
});

export default memo(GridOptions);
