import { type } from "os";
export class MQueryParam {
  name: string;
  type: QUERY_TYPES;
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

export class MQueryExtraParam {
  paginationInfo?: string;
  treeJson?: boolean;
  controlIds?: Array<string>;
  independentQuery?: boolean;
  resourceId?: string;
  disablePagination?: boolean;
  searchFilters?: { [propName: string]: any };
  delimeter?: "COMMA" | "PIPE";
  placeholders?: Set<string>;
  filters: Array<MQueryExtraParamFilter>;
  filterOperator?: "OR" | "AND";
}

class MQueryResult {
  rows: Array<any>;
  header: Array<MQueryColumnInfo>;
  pageMetaData: PageMetaData;
  nullColumns: any;
  extraDetails: any;
  chartResult: any;
  treeJson: Array<any>;
  sqlId?: string;
  query: string;
}

class MQueryColumnInfo {
  name: string;
  type: string;
  primaryKey: boolean;
}

class PageMetaData {
  totalPages: number;
  totalRows: number;
  pageNumber?: number;
  pageSize?: number;
}

export class MQueryExtraParamFilter {
  name: string;
  value: any;
  type: FILTER_TYPES;
}

export type QUERY_TYPES =
  | "select"
  | "insert"
  | "update"
  | "delete"
  | "procedure";
export type FILTER_TYPES = "equals" | string;
