import {
  forwardRef,
  Fragment,
  memo,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { AutoComplete } from "primereact/autocomplete";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { Password } from "primereact/password";
import httpService from "../http-service/http-service";

const DataSourceBuilder = forwardRef((props, ref) => {
  const [displayDialog, setDisplayDialog] = useState(false);
  const [selectedDataSource, setSelectedDataSource] = useState(null);
  const [filteredDataSource, setFilteredDataSource] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [dbName, setDbName] = useState();
  const [port, setPort] = useState();
  const [host, setHost] = useState();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [selectedConnection, setSelectedConnection] = useState();
  const [enableAdvancedOptions, showAdvancedOptions] = useState();
  const [validationQuery, setValidationQuery] = useState("select 1");
  const [removedAbandonedConnections, setRemovedAbandonedConnections] =
    useState(true);
  const [validationQueryTimeout, setValidationQueryTimeout] = useState(5);
  const [initialSize, setInitialSize] = useState(1);
  const [maxActive, setMaxActive] = useState(10);
  const [maxWait, setMaxWait] = useState(10000);
  const [minIdle, setMinIdle] = useState(1);
  const [maxIdle, setMaxIdle] = useState(5);
  const [evictableIdleTime, setEvictableIdleTime] = useState(50);
  const [timeBetweenEvictions, setTimeBetweenEvictions] = useState(1000);

  const [testResponse, setTestResponse] = useState(null);

  const connectionTypes = ["SID", "Service Name"];
  const drivers = [
    { name: "MySql", value: "com.mysql.cj.jdbc.Driver", urlName: "mysql" },
    {
      name: "Oracle",
      value: "oracle.jdbc.driver.OracleDriver.",
      urlName: "oracle:thin",
    },
    {
      name: "PostgreSql",
      value: "org.postgresql.Driver",
      urlName: "postgresql",
    },
    {
      name: "SQL Server",
      value: "com.microsoft.sqlserver.jdbc.SQLServerDriver",
      urlName: "sqlserver",
    },
  ];

  useImperativeHandle(ref, () => {
    return {
      openDataSourceConfigModeler() {
        setDisplayDialog(true);
      },
    };
  });

  const searchDataSource = (event) => {
    setTimeout(() => {
      /* let _filteredCountries;
      if (!event.query.trim().length) {
        _filteredCountries = [...countries];
      } else {
        _filteredCountries = countries.filter((country) => {
          return country.name
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      } */
    }, 250);
    httpService.JNDI.list().then((res) => {
      console.log("JNDI List", res);
      setFilteredDataSource(res.data);
    });
  };

  const testDataSource = () => {
    const urlName = drivers.find((d) => d.value === selectedDriver).urlName;
    const saveData = {
      jndiName: `${selectedDataSource}`,
      properties: {
        testWhileIdle: "true",
        host: `${host}`,
        port: `${port}`,
        driver: `${selectedDriver}`,
        url: `jdbc:${urlName}://${host}:${port}/${dbName}`,
        username: `${userName}`,
        password: `${password}`,
        datasourceName: `${selectedDataSource}`,
        validationQuery: `${validationQuery}`,
        initialSize: `${initialSize}`,
        maxIdle: `${maxIdle}`,
        minIdle: `${minIdle}`,
        maxActive: `${maxActive}`,
        validationQueryTimeout: `${validationQueryTimeout}`,
        maxWait: `${maxWait}`,
        minEvictableIdleTimeMillis: `${evictableIdleTime}`,
      },
    };
    const testDsData = {
      testWhileIdle: "true",
      host: `${host}`,
      port: `${port}`,
      driver: `${selectedDriver}`,
      url: `jdbc:${urlName}://${host}:${port}/${dbName}`,
      username: `${userName}`,
      password: `${password}`,
      datasourceName: `${selectedDataSource}`,
      validationQuery: `${validationQuery}`,
      initialSize: `${initialSize}`,
      maxIdle: `${maxIdle}`,
      minIdle: `${minIdle}`,
      maxActive: `${maxActive}`,
      validationQueryTimeout: `${validationQueryTimeout}`,
      maxWait: `${maxWait}`,
      minEvictableIdleTimeMillis: `${evictableIdleTime}`,
    };
    httpService.JNDI.testDataSource(testDsData).then((res) => {
      console.log("datasource test response...");
      setTestResponse(res.data.status);
    });
  };

  const saveDataSource = () => {
    const urlName = drivers.find((d) => d.value === selectedDriver).urlName;
    const saveData = {
      jndiName: `${selectedDataSource}`,
      properties: {
        testWhileIdle: "true",
        host: `${host}`,
        port: `${port}`,
        driver: `${selectedDriver}`,
        url: `jdbc:${urlName}://${host}:${port}/${dbName}`,
        username: `${userName}`,
        password: `${password}`,
        datasourceName: `${selectedDataSource}`,
        validationQuery: `${validationQuery}`,
        initialSize: `${initialSize}`,
        maxIdle: `${maxIdle}`,
        minIdle: `${minIdle}`,
        maxActive: `${maxActive}`,
        validationQueryTimeout: `${validationQueryTimeout}`,
        maxWait: `${maxWait}`,
        minEvictableIdleTimeMillis: `${evictableIdleTime}`,
      },
    };
    httpService.JNDI.save(saveData).then((res) => {
      if (res.data.status) {
        setDisplayDialog(false);
      }
    });
  };

  /* useEffect(
    (prevValue) => {
      console.log("Use Effect", prevValue, selectedDriver);
    },
    [selectedDriver]
  ); */

  const showResponseStatus = () => {
    if (testResponse === true) {
      return <label style={{ color: "green" }}>Test Successfull.</label>;
    } else if (testResponse != null && !testResponse) {
      return <label style={{ color: "red" }}>Test Failed.</label>;
    }
  };

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="Test"
          icon="pi pi-check"
          onClick={() => {
            testDataSource();
          }}
          className="p-button-outlined p-button-info"
        />
        <Button
          label="Save"
          icon="pi pi-save"
          onClick={() => {
            saveDataSource();
          }}
          className="p-button-outlined p-button-secondary"
        />
        <Button
          label="Cancel"
          icon="pi pi-cancel"
          onClick={() => setDisplayDialog(false)}
          className="p-button-outlined p-button-danger"
          autoFocus
        />
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <Fragment>
        <label>DataSource Configuration</label>
        <span className="pull-right">{showResponseStatus()}</span>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <Dialog
        header={renderHeader}
        visible={displayDialog}
        style={{ width: "70vw" }}
        footer={renderFooter("displayBasic")}
        onHide={() => setDisplayDialog(false)}
        closable={false}
      >
        <div className="grid">
          <div className="col-12">
            <label className="block">DataSource Name</label>
            <AutoComplete
              dropdown
              value={selectedDataSource}
              suggestions={filteredDataSource}
              completeMethod={searchDataSource}
              field="name"
              style={{ width: "100%" }}
              onChange={(e) => {
                setSelectedDataSource(e.value);
              }}
            />
          </div>
          <div className="col-6">
            <label className="block">Driver</label>
            <Dropdown
              value={selectedDriver}
              options={drivers}
              onChange={(e) => {
                setSelectedDriver(e.value);
              }}
              style={{ width: "49%" }}
              optionLabel="name"
              placeholder="Select Driver Class"
            />
          </div>
          <div className="col-6">
            <label className="block">Db Name</label>
            <InputText
              style={{ width: "100%" }}
              value={dbName}
              onChange={(e) => setDbName(e.target.value)}
            />
          </div>
          <div className="col-6">
            <label className="block">Host</label>
            <InputText
              style={{ width: "100%" }}
              value={host}
              onChange={(e) => setHost(e.target.value)}
            />
          </div>
          <div className="col-6">
            <label className="block">Port</label>
            <InputNumber
              mode="decimal"
              useGrouping={false}
              style={{ width: "100%" }}
              value={port}
              onValueChange={(e) => setPort(e.value)}
            />
          </div>
          <div className="col-6">
            <label className="block">Username</label>
            <InputText
              style={{ width: "100%" }}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="col-6">
            <label className="block">Password</label>
            <Password
              style={{ width: "100%" }}
              feedback={false}
              value={password}
              onChange={(e) => setPassword(e.value)}
            />
          </div>
          <div className="col-6">
            <label className="block">Connection Type</label>
            <Dropdown
              value={selectedConnection}
              options={connectionTypes}
              onChange={(e) => setSelectedConnection(e.value)}
              placeholder="Select"
            />
          </div>
          <div className="col-6">
            <Button
              label="Advanced Options"
              className="p-button-link"
              onClick={() => showAdvancedOptions(!enableAdvancedOptions)}
            />
          </div>
        </div>
        {enableAdvancedOptions && (
          <div className="grid">
            <div className="col-6">
              <label className="block">Validation Query</label>
              <InputText
                style={{ width: "100%" }}
                value={validationQuery}
                onChange={(e) => setValidationQuery(e.target.value)}
              />
            </div>
            <div className="col-6">
              <label className="block">Remove Abandoned Connectins</label>
              <Checkbox
                inputId="binary"
                checked={removedAbandonedConnections}
                onChange={(e) => setRemovedAbandonedConnections(e.checked)}
              />
            </div>
            <div className="col-6">
              <label className="block">Validation Query timeout</label>
              <InputNumber
                style={{ width: "100%" }}
                value={validationQueryTimeout}
                onValueChange={(e) => setValidationQueryTimeout(e.value)}
              />
            </div>
            <div className="col-6">
              <label className="block">Initial Size</label>
              <InputNumber
                style={{ width: "100%" }}
                value={initialSize}
                onValueChange={(e) => setInitialSize(e.value)}
              />
            </div>
            <div className="col-6">
              <label className="block">Max Active</label>
              <InputNumber
                style={{ width: "100%" }}
                value={maxActive}
                onValueChange={(e) => setMaxActive(e.value)}
              />
            </div>
            <div className="col-6">
              <label className="block">Max Wait</label>
              <InputNumber
                style={{ width: "100%" }}
                value={maxWait}
                onValueChange={(e) => setMaxWait(e.value)}
              />
            </div>
            <div className="col-6">
              <label className="block">Min Idle</label>
              <InputNumber
                style={{ width: "100%" }}
                value={minIdle}
                onValueChange={(e) => setMinIdle(e.value)}
              />
            </div>
            <div className="col-6">
              <label className="block">Max Idle</label>
              <InputNumber
                style={{ width: "100%" }}
                value={maxIdle}
                onValueChange={(e) => setMaxIdle(e.value)}
              />
            </div>
            <div className="col-6">
              <label className="block">
                Minimum Evictable Idle Time(Milli Seconds)
              </label>
              <InputNumber
                style={{ width: "100%" }}
                value={evictableIdleTime}
                onValueChange={(e) => setEvictableIdleTime(e.value)}
              />
            </div>
            <div className="col-6">
              <label className="block">
                Time Between Eviction Runs (Milli Seconds)
              </label>
              <InputNumber
                style={{ width: "100%" }}
                value={timeBetweenEvictions}
                onValueChange={(e) => setTimeBetweenEvictions(e.value)}
              />
            </div>
          </div>
        )}
      </Dialog>
    </Fragment>
  );
});

export default memo(DataSourceBuilder);
