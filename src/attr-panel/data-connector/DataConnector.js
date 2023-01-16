import { ProductService } from "../../components/grid/ProductService";
import { UserService } from "../../components/grid/UserService";
import { CONTROL } from "../../constants/Elements";
import httpService from "../../http-service/http-service";
import { createElementId } from "../../utils/Utils";

export class DataConnector {
  static columns = [];
  constructor(meta) {
    this.meta = meta;
    this.productService = new ProductService();
    this.userService = new UserService();
  }

  /**
   *
   * @param {This is for testing} e
   */
  async handleDatasourceChange(element, meta = {}) {
    let rows = [];
    let datasource = element.attributes.datasource;
    if (datasource !== undefined) {
      //This is for API
      let generateColumnIds = true;
      if (element.attributes.columns) {
        const prevClms = element.attributes.columns;
        if (prevClms.length > 0 && prevClms[0].datasource === datasource) {
          //prev columns are using the same datasource Id, so we wont be creating the new column Ids
          DataConnector.columns = [...prevClms];
          generateColumnIds = false;
        }
      }
      const responseToUse = element.attributes.responseToUse || "response.data"; // used || 'response.data' for tesint
      if (datasource === "API-1") {
        await this.productService.getProductsSmall().then((res) => {
          res = resFun(res, responseToUse);
          if (res instanceof Array) {
            const firstRec = res[0];
            if (generateColumnIds) {
              DataConnector.columns = Object.keys(firstRec).map((tCol) => {
                return {
                  field: tCol,
                  header: tCol[0].toUpperCase() + tCol.slice(1),
                  id: createElementId("column-", 7),
                  datasource,
                };
              });
            }
          }

          rows = [...res];
        });
      } else if (datasource === "API-2") {
        await this.userService.getUsers().then((res) => {
          res = resFun(res, responseToUse);
          if (res instanceof Array) {
            const firstRec = res[0];
            if (generateColumnIds) {
              DataConnector.columns = Object.keys(firstRec).map((tCol) => {
                return {
                  field: tCol,
                  header: tCol[0].toUpperCase() + tCol.slice(1),
                  id: createElementId("column-", 7),
                  datasource,
                };
              });
            }
          }
          rows = [...res];
        });
      }
      if (element.ref.current.setResult) {
        switch (element.type) {
          case CONTROL.GRID:
          case CONTROL.LISTBOX:
          case CONTROL.DROPDOWN:
          case CONTROL.RADIO:
          case CONTROL.MULTISELECT:
            element.ref.current.startLoader &&
              element.ref.current.startLoader(true);
            break;
          default:
            break;
        }

        element.ref.current.setResult({
          columns: DataConnector.columns,
          rows: rows,
        });
      }
    } else if (element.attributes.sqldatasource !== undefined) {
      //For SQL Datasource
      datasource = element.attributes.sqldatasource;
      if (datasource !== undefined) {
        const queryData = datasource;
        queryData.sessionId = meta.sessionId;
        if (
          element.type === CONTROL.GRID &&
          element.ref &&
          element.ref.current
        ) {
          element.ref.current.startLoader(true);
        }
        queryData.sqlVariables = {
          ...queryData.sqlVariables,
          ...meta.sqlVariables,
        };
        httpService.QUERY.getQueryResult(queryData).then((res) => {
          console.log("Fetching Query result", res.data);
          rows = [...res.data.rows];

          let resHeaders = res.data.header;
          resHeaders = resHeaders.map((rh) => {
            return {
              field: rh.name,
              header: rh.name,
              id: rh.name,
              datasource: datasource.datasourceName,
            };
          });

          DataConnector.columns = [...resHeaders];

          if (element.ref.current.setResult) {
            if (element.type === CONTROL.GRID) {
              element.ref.current.startLoader(true);
            }
            element.ref.current.setResult({
              columns: DataConnector.columns,
              rows: rows,
            });
          }
        });
      }
    } else {
      if (element.ref.current.setResult) {
        element.ref.current.setResult({
          columns: [],
          rows: rows,
        });
      }
    }
  }

  getColumns() {
    return DataConnector.columns || [];
  }
}

const resFun = new Function(
  "response",
  "responseToUse",
  `
        if(responseToUse) {
            const key = responseToUse.split("response.")[1];
            return response[key];    
        }

        return [];
    `
);
