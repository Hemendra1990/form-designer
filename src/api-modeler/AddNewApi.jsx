import React, { forwardRef, useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { TabView, TabPanel } from "primereact/tabview";
import { SelectButton } from "primereact/selectbutton";

const AddNewApi = forwardRef((props, ref) => {
  const [method, setMethod] = useState(null);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [url, setUrl] = useState(null);
  const [bodyType, setBodyType] = useState(null);
  const [bodyTypeOptions, setBodyTypeOptions] = useState(null);

  useEffect(() => {
    const bodyTypeOptions = [
      { label: "none", value: "none" },
      { label: "form-data", value: "form-data" },
      { label: "x-www-form-urlencoded", value: "x-www-form-urlencoded" },
      { label: "raw", value: "raw" },
    ];

    setBodyTypeOptions(bodyTypeOptions);
  }, []);

  const methods = ["GET", "POST", "PUT", "DELETE"];

  return (
    <>
      <div className="grid p-fluid">
        <div className="col-12 md:col-4">
          <label className="block p-2">API Id</label>
          <InputText
            value={id}
            onChange={(e) => setId(e.target.value)}
          ></InputText>
        </div>
        <div className="col-12 md:col-4">
          <label className="block p-2">API Name</label>
          <InputText
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></InputText>
        </div>
        <div className="col-12 md:col-4">
          <label className="block p-2">Method</label>
          <Dropdown
            options={methods}
            value={method}
            onChange={(e) => {
              setMethod(e.value);
            }}
          />
        </div>
        <div className="col-12 md:col-12">
          <label className="block p-2">Url</label>
          <InputText
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          ></InputText>
        </div>
        <div className="col-12 md:col-12">
          <TabView>
            <TabPanel header="Authorization">Content I</TabPanel>
            <TabPanel header="Header">Content II</TabPanel>
            <TabPanel header="Body">
              <div className="grid p-fluid">
                <div className="col-12 md:col-12">
                  <SelectButton
                    style={{ width: "100%" }}
                    value={bodyType}
                    options={bodyTypeOptions}
                    onChange={(e) => setBodyType(e.value)}
                    optionLabel="label"
                  />
                </div>

                

              </div>
            </TabPanel>
          </TabView>
        </div>
      </div>
    </>
  );
});

export default AddNewApi;
