import { MQueryExtraParam } from "./MQueryExtraParam";
import { MQueryResult } from "./MQueryResult";

export class MQueryParam {
  name: string;
  type: "select" | "insert" | "update" | "delete" | "procedure";
  queryId: string;
  datasourceName: string;
  query: string;
  sessionId: string;
  extraParam: MQueryExtraParam;
  result: MQueryResult | Array<any>;
  chartDef: any;
  sqlVariables: any;
  usedPlaceholderList: Array<string>;
  orderBy?: boolean;
  sort?: any;

  constructor() {
    this.usedPlaceholderList = new Array();
    this.sqlVariables = {};
    this.extraParam = new MQueryExtraParam();
  }
}
