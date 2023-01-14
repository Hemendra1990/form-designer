import React, { Fragment, useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { TabPanel, TabView } from "primereact/tabview";
import AddSQL from "./AddSQL";
import httpService from "../../http-service/http-service";
import randomstring from "randomstring";
import {
  useMetaContext,
  useUpdateMetaContext,
} from "../../context/MetaContext";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getRandomUUID } from "../../utils/Utils";
//"select" | "insert" | "update" | "delete" | "procedure"
const tab = {
  id: 0,
  queryId: "",
  type: "select",
  name: "",
  query: "",
  orderBy: false,
  isTesting: false,
  queryStatus: "",
  disablePagination: false,
  isError: false,
  sory: {},
  paginationInfo: {},
  isSqlEdit: false,
  sqlNameEdited: false,
  dataSourceName: {
    name: "",
    id: "",
    url: "",
  },
};

const queryTypes = [
  { label: "SELECT", value: "select" },
  { label: "INSERT", value: "insert" },
  { label: "UPDATE", value: "update" },
  { label: "DELETE", value: "delete" },
  { label: "PROCEDURE", value: "procedure" },
];

const SQLQueryBuilder = (props) => {
  const [showQueryModeler, setShowQueryModeler] = useState(true);
  const [editSqlQueryTabs, setEditSQLQueryTabs] = useState([]);
  const [dataSources, setDataSources] = useState([]);
  const [tabActiveIndex, setTabActiveIndex] = useState(0);
  const [queryTestResult, setQueryTestResult] = useState("");
  const [queryTestStatus, setQueryTestStatus] = useState(null);

  const meta = useMetaContext();
  const { updateMeta } = useUpdateMetaContext();
  let navigate = useNavigate();

  const fetchDataSources = () => {
    httpService.JNDI.list().then((res) => {
      setDataSources(res.data);
    });
  };

  useEffect(() => {
    fetchDataSources();
    setEditSQLQueryTabs([]);
  }, []);

  const testSelectQuery = (currTab) => {
    const testQueryData = {
      usedPlaceHolderList: [],
      sqlVariables: {},
      extraParam: {
        controlIds: [],
        paginationInfo: "1-25",
        placeHolders: {},
      },
      query: currTab.query,
      type: currTab.type,
      queryId: currTab.queryId,
      datasourceName: currTab.dataSourceName.name,
      name: currTab.name,
      sort: {},
      orderBy: false,
    };
    httpService.QUERY.test(testQueryData)
      .then((res) => {
        const resData = res.data;
        setQueryTestStatus(resData.status);
        setQueryTestResult(resData.msg);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const testDmlQuery = (currTab) => {
    const testQueryData = {
      usedPlaceHolderList: [],
      sqlVariables: {},
      extraParam: {
        controlIds: [],
        paginationInfo: "1-25",
        placeHolders: {},
      },
      query: currTab.query,
      type: currTab.type,
      queryId: currTab.queryId,
      datasourceName: currTab.dataSourceName.name,
      name: currTab.name,
      sort: {},
      orderBy: false,
    };

    const queryMap = {};
    queryMap[currTab.queryId] = testQueryData;

    httpService.QUERY.validateQueries(queryMap)
      .then((queryRes) => {
        const resData = queryRes.data;
        setQueryTestStatus(resData[currTab.queryId].status);
        setQueryTestResult(resData[currTab.queryId].msg);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const testQuery = (e) => {
    const currTab = editSqlQueryTabs[tabActiveIndex - 1];
    if (currTab.type === "select") {
      testSelectQuery(currTab);
    } else {
      testDmlQuery(currTab);
    }
  };

  const handleSaveQuery = () => {
    const currTab = editSqlQueryTabs[tabActiveIndex - 1];
    const cacheQueryData = {
      [currTab.queryId]: `${currTab.query}`,
    };
    httpService.QUERY.cacheQuery(meta.sessionId, cacheQueryData).then((res) => {
      if (res.data.status) {
        //Save the query in the meta.sqlList
        const saveQueryData = {
          sqlvariables: {},
          extraParam: {
            controlIds: [],
            paginationInfo: "1-25",
            placeHolders: {},
          },
          type: currTab.type,
          queryId: currTab.queryId,
          datasourceName: currTab.dataSourceName.name,
          name: currTab.name,
          sort: {},
          orderBy: false,
          sessionId: meta.sessionId,
        };
        meta.sqlList.push(saveQueryData);
        updateMeta(meta);
        setShowQueryModeler(false);

        //setShowSQLBuilder(false); //Menubar parent
      }
      navigate(-1);
    });
  };

  const updateTabName = (tab) => {
    console.log(tab);
    setEditSQLQueryTabs((prevTabs) => {
      prevTabs.map((t) => {
        if (t.id === tab.id) {
          t.name = tab.name;
          return t;
        }
        return t;
      });
      return [...prevTabs];
    });
  };

  const footer = (
    <div>
      <Button
        icon="pi pi-plus"
        className="p-button-outlined p-button-warning "
        label="Add New Query"
        onClick={(e) => {
          addNewQuery();
        }}
      />
      <Button
        className="p-button-outlined p-button-secondary"
        label="Test"
        icon="pi pi-check"
        onClick={testQuery}
      />
      <Button
        className="p-button-outlined p-button-success"
        label="Save"
        icon="pi pi-save"
        onClick={handleSaveQuery}
      />
      {/* onClick={() => setShowQueryModeler(false)} */}
      <Button
        className="p-button-outlined p-button-danger"
        label="Cancel"
        icon="pi pi-times"
        onClick={() => {
          setShowQueryModeler(false);
          navigate(-1);
        }}
      />
    </div>
  );

  const addNewQuery = () => {
    const uuid = getRandomUUID();
    tab.id = uuid;
    tab.queryId = randomstring.generate(8);
    tab.name = `sql_query_${
      meta.sqlList.length + editSqlQueryTabs.length + 1 || 0
    }`;
    const tabs = [...editSqlQueryTabs, JSON.parse(JSON.stringify(tab))];
    setEditSQLQueryTabs(tabs);
    setTabActiveIndex(tabs.length);
  };

  const handleTabChange = (e) => {
    setTabActiveIndex(e.index);
  };

  const createTabObj = (sqlRow, query) => {
    const dsObj = dataSources.find((ds) => ds.name === sqlRow.datasourceName);
    const tab = JSON.parse(JSON.stringify(sqlRow));
    tab.id = getRandomUUID();
    tab.query = query;
    tab.dataSourceName = dsObj;
    return tab;
  };

  const getQueryAndCreateTab = (e) => {
    const sqlRow = e.value;
    httpService.QUERY.getSingleCachedQueryDetails(
      sqlRow.sessionId,
      sqlRow.queryId
    )
      .then((res) => {
        const tab = createTabObj(sqlRow, res.data.payload);
        setEditSQLQueryTabs((prevVal) => {
          return [...prevVal, tab];
        });
        setTimeout(() => {
          setTabActiveIndex((prevActiveIndex) => {
            return editSqlQueryTabs.length + 1;
          });
        }, 100);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const editSql = (e) => {
    //check if the tab is already opened
    if (editSqlQueryTabs.length > 0) {
      const sqlQueryTabIndex = editSqlQueryTabs.findIndex(
        (tab) => tab.name === e.value.name
      );
      if (sqlQueryTabIndex === -1) {
        getQueryAndCreateTab(e);
      } else {
        setTabActiveIndex(sqlQueryTabIndex + 1);
      }
    } else {
      getQueryAndCreateTab(e);
    }
  };

  const renderHeader = () => {
    if (queryTestStatus) {
      return (
        <Fragment>
          SQL
          <label className="pull-right" style={{ color: "green" }}>
            {"Valid Query"}
          </label>
        </Fragment>
      );
    } else if (queryTestStatus != null && !queryTestStatus) {
      return (
        <Fragment>
          SQL
          <label className="pull-right" style={{ color: "red" }}>
            {queryTestResult}
          </label>
        </Fragment>
      );
    }
  };

  return (
    <>
      <Dialog
        header={renderHeader}
        visible={showQueryModeler}
        style={{ width: "80vw", height: "70vh" }}
        footer={footer}
        onHide={() => {
          setShowQueryModeler(false);
        }}
        closable={false}
      >
        <TabView activeIndex={tabActiveIndex} onTabChange={handleTabChange}>
          <TabPanel header="Available Queries">
            <DataTable
              value={meta.sqlList}
              selectionMode="single"
              onSelectionChange={(e) => {
                editSql(e);
              }}
              paginator={true}
              emptyMessage={"No SQLs created yet. "}
              scrollHeight="290px"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              rowsPerPageOptions={[5, 10, 25, 50]}
              responsiveLayout="scroll"
              stripedRows={true}
              globalFilterFields={["name"]}
              tableStyle={{
                minHeight: "8rem",
              }}
              breakpoint="960px"
              rows={5}
            >
              <Column field="queryId" header="Id" sortable />
              <Column
                field="name"
                header="Name"
                sortable
                filter
                filterPlaceholder="Search by name"
              />
              <Column field="datasourceName" header="DataSource Name" />
            </DataTable>
          </TabPanel>
          {editSqlQueryTabs.map((tab) => (
            <TabPanel key={tab.id} header={tab.name} closable>
              <AddSQL
                tab={tab}
                dataSources={dataSources}
                queryTypes={queryTypes}
                updateTabName={updateTabName}
              ></AddSQL>
            </TabPanel>
          ))}
        </TabView>
      </Dialog>
    </>
  );
};

export default SQLQueryBuilder;
