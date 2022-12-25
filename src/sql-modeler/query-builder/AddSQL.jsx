import { Fragment, memo, useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { SelectButton } from "primereact/selectbutton";
import { InputTextarea } from "primereact/inputtextarea";

const AddSQL = (props) => {
  const { tab, dataSources, queryTypes } = props;

  const [name, setName] = useState(tab.name || "");
  const [selectedDataSource, setSelectedDataSource] = useState(
    tab.dataSourceName || ""
  );
  const [queryType, setQueryType] = useState(tab.type || "select");
  const [query, setQuery] = useState(tab.query || "");

  const handleNameChange = (e) => {
    setName(e.target.value);
    tab.name = e.target.value;
  };

  const handleDSChange = (e) => {
    console.log("DS Change...");
    setSelectedDataSource(e.value);
    tab.dataSourceName = e.value;
  };

  const handleQueryChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    tab.query = val;
  };

  const handleQueryTypeChange = (e) => {
    const val = e.value;
    setQueryType(e.value);
    tab.type = val;
  };

  return (
    <Fragment>
      <div className="grid">
        <div className="col-12">
          <div className="grid p-fluid">
            <div className="col-6">
              <label className="block">Name</label>
              <InputText value={name} onChange={handleNameChange} />
            </div>
            <div className="col-6">
              <label className="block">DataSource</label>
              <Dropdown
                value={selectedDataSource}
                options={dataSources}
                onChange={handleDSChange}
                optionLabel="name"
                placeholder="Select Datasource"
              />
            </div>
            <div className="col-12">
              <SelectButton
                value={queryType}
                options={queryTypes}
                onChange={handleQueryTypeChange}
                optionLabel="label"
                optionValue="value"
              ></SelectButton>
            </div>
            <div className="col-12">
              <label className="block">Query</label>
              <InputTextarea
                rows={5}
                cols={30}
                style={{ width: "100%" }}
                value={query}
                onChange={handleQueryChange}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default memo(AddSQL);
