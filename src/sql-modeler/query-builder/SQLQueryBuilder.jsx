import React, { Fragment, useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { TabPanel, TabView } from "primereact/tabview";
import AddSQL from "./AddSQL";
import httpService from "../../http-service/http-service";
import randomstring from "randomstring";
import { useMetaContext, useUpdateMetaContext, useToastContext } from "../../context/MetaContext";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getRandomUUID, groupBy } from "../../utils/Utils";

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

  const [refreshQryTab, setRefreshQryTab] = useState(0); //we want to refresh the query tab, but unless we update the state we won't be able to update the component
  const { toastRef } = useToastContext();

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
    currTab.isTesting = true;
    const testQueryData = {
      usedPlaceHolderList: [],
      sqlVariables: {},
      extraParam: {
        controlIds: [],
        paginationInfo: "0-25",
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
        currTab.isTesting = false;
        currTab.isSuccess = resData.status;

      })
      .catch((err) => {
        currTab.isTesting = false;
        currTab.hasError = true;
        console.error(err);
      });
  };

  const testDmlQuery = (currTab) => {
    const testQueryData = {
      usedPlaceHolderList: [],
      sqlVariables: { code: "Closed" },
      extraParam: {
        controlIds: [],
        paginationInfo: "0-25",
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

        currTab.isTesting = false;
        currTab.isSuccess = resData.status;
      })
      .catch((err) => {
        currTab.isTesting = false;
        currTab.hasError = true;
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

  function splitQueries() {
    let dmlSQLs = [];
    let selectSQLs = [];

    editSqlQueryTabs.forEach(sql => {
      const tmpSql = JSON.parse(JSON.stringify(sql))
      tmpSql.datasourceName = sql.dataSourceName.name;
      if (tmpSql.type === 'select') {
        selectSQLs.push(tmpSql)
      } else {
        dmlSQLs.push(tmpSql);
      }
    });

    return {
      dmlSQLs,
      selectSQLs
    }

  }

  const testAllQuery = () => {
    let count = 0;
    setRefreshQryTab(Math.random() * 100);
    editSqlQueryTabs.map(tab => {
      tab.isTesting = true;
      return tab;
    })
    console.log(editSqlQueryTabs);
    //Seggregate Select and DML queries separately
    const dmlSelectSplittedSQLs = splitQueries();
    const testQueryApis = []
    if (dmlSelectSplittedSQLs.selectSQLs && dmlSelectSplittedSQLs.selectSQLs.length > 0) {
      const selectTestCalls = httpService.QUERY.testMultipleQueries(dmlSelectSplittedSQLs.selectSQLs)
      testQueryApis.push(selectTestCalls);
    }
    if (dmlSelectSplittedSQLs.dmlSQLs && dmlSelectSplittedSQLs.dmlSQLs.length > 0) {

      let map = {};
      dmlSelectSplittedSQLs.dmlSQLs.forEach((sql) => map[sql.queryId] = sql);
      const dmls = httpService.QUERY.validateQueries(map);
      testQueryApis.push(dmls);
    }

    return Promise.all(testQueryApis).then(responses => {
      console.log(responses);
      const selectQueryTestResponse = responses[0];
      const dmlQueryTestResponse = responses[1];

      const tabsGroupedByQueryId = groupBy(editSqlQueryTabs, 'queryId')

      if (selectQueryTestResponse) {
        const selectQries = selectQueryTestResponse.data;
        selectQries.forEach(slctSql => {
          if (slctSql.queryId) {
            const qryTab = tabsGroupedByQueryId[slctSql.queryId][0];
            qryTab.isTesting = false;
            qryTab.isSuccess = slctSql.status;
            if (slctSql.status != undefined && slctSql.status) {
              count++;
            }
          }
        });
      }

      if (dmlQueryTestResponse) {
        const dmlQueries = dmlQueryTestResponse.data;
        Object.keys(dmlQueries).forEach(key => {
          const qryTab = tabsGroupedByQueryId[key][0];
          qryTab.isTesting = false;
          qryTab.isSuccess = dmlQueries[key].status;
          if (dmlQueries[key].status != undefined && dmlQueries[key].status) {
            count++;
          }
        })
      }
      setTimeout(() => {
        setRefreshQryTab(!refreshQryTab);
      }, 10);

      return count;

    }).catch(errs => {
      console.error(errs);
    });
  }

  const handleSaveQuery = () => {
    testAllQuery().then(count => {
      console.log("After testing", count);
      if (count === editSqlQueryTabs.length) {
        const cacheQueryData = {};
        editSqlQueryTabs.forEach(tab => {
          cacheQueryData[tab.queryId] = tab.query
        });
        httpService.QUERY.cacheQuery(meta.sessionId, cacheQueryData).then((res) => {
          if (res.data.status) {
            //Save the query in the meta.sqlList
            editSqlQueryTabs.forEach(tab => {
              const saveQueryData = {
                extraParam: {
                  controlIds: [],
                  paginationInfo: "0-25",
                  placeHolders: {},
                },
                type: tab.type,
                queryId: tab.queryId,
                datasourceName: tab.dataSourceName.name,
                name: tab.name,
                sort: {},
                orderBy: false,
                sessionId: meta.sessionId,
              };
              meta.sqlList.push(saveQueryData);
            });
            updateMeta(meta);
            setShowQueryModeler(false);

            //setShowSQLBuilder(false); //Menubar parent
          }
          navigate(-1);
        });
      } else {
        toastRef.current.show({ severity: 'error', summary: 'Error', detail: 'There are errors in the Queries.' });
      }
    })
  };
  /* const handleSaveQuery = () => {
    const currTab = editSqlQueryTabs[tabActiveIndex - 1];
    const cacheQueryData = {
      [currTab.queryId]: `${currTab.query}`,
    };
    httpService.QUERY.cacheQuery(meta.sessionId, cacheQueryData).then((res) => {
      if (res.data.status) {
        //Save the query in the meta.sqlList
        const saveQueryData = {
          sqlVariables: {
            code: "Closed",
          },
          extraParam: {
            controlIds: [],
            paginationInfo: "0-25",
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
  }; */

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
      {(editSqlQueryTabs.length > 1) && <Button
        className="p-button-outlined p-button-secondary"
        label="Test All"
        icon="pi pi-check"
        onClick={testAllQuery}
      />}
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
    tab.name = `sql_query_${meta.sqlList.length + editSqlQueryTabs.length + 1 || 0
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

  function closeTab(tabIndex) {
    editSqlQueryTabs.splice(tabIndex, 1);
    setEditSQLQueryTabs([...editSqlQueryTabs]);
    setTimeout(() => {
      setTabActiveIndex(tabIndex)
    }, 10);
  }

  const headerTemplate = (options, tab, index) => {
    return <button type="button" onClick={options.onClick} className={options.className}>
      {<i className={tab.isTesting ? "mr-2 inProgress blink"
        : ((tab.isSuccess != undefined) && !tab.isSuccess && !tab.isTesting) ? "mr-2 testError"
          : (tab.isSuccess && !tab.isTesting) ? "mr-2 testSuccess" : "hello"} />}
      {options.titleElement}
      <i className="pi pi-times" onClick={() => closeTab(index)}></i>
    </button>
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
          {editSqlQueryTabs.map((tab, index) => (
            <TabPanel key={tab.id} header={tab.name} closable headerTemplate={(options) => headerTemplate(options, tab, index)} headerClassName="flex align-items-center">
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
