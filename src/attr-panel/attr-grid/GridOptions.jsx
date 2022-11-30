import { forwardRef, memo, useEffect, useImperativeHandle, useState } from "react";
import { InputSwitch } from "primereact/inputswitch";

const GridOptions = forwardRef(({element}, ref) => {
  const [showGridHeader, setShowGridHeader] = useState(false);
  const [columnResizable, setColumnResizable] = useState(false);
  const [pagination, setPagination] = useState(false);
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

  useImperativeHandle(ref, () => ({
    getOptions() {
      return {
        showGridHeader,
        columnResizable,
        pagination,
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
      };
    },
  }));

  useEffect(() => {
    if(element.attributes.config) {
      setShowGridHeader(element.attributes.config.showGridHeader || false);
      setColumnResizable(element.attributes.config.columnResizable || false);
      setPagination(element.attributes.config.pagination || false);
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
    } else {
      element.attributes.config = {};
    }
  }, []);

  return (
    <div className="options-wrapper">
      <div className="grid align-content-start">
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
            checked={columnResizable}
            onChange={(e) => {
              setColumnResizable(e.value);
              element.attributes.config["columnResizable"] = e.value;
            }}
          />
        </div>
        <div className="col-3">
          <label className="block">Pagination</label>
          <InputSwitch
            checked={pagination}
            onChange={(e) => {
              setPagination(e.value);
              element.attributes.config["pagination"] = e.value;
            }}
          />
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
