import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  memo,
} from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  useMetaContext,
  useUpdateMetaContext,
} from "../../context/MetaContext";

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

  useImperativeHandle(ref, () => ({
    setResult,
  }));

  function setResult({ columns, rows }) {
    setColumns(columns);
    setRows(rows);
  }

  useEffect(() => {
    updateMeta(meta);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getColumns = columns.map((col, i) => {
    return <Column key={col.field} field={col.field} header={col.header} />;
  });

  return (
    <div className="col-12">
      <div className="card">
        <DataTable value={rows} responsiveLayout="scroll">
          {getColumns}
        </DataTable>
      </div>
    </div>
  );
});

export default memo(HDGrid);
