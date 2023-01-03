import { MQueryExtraParamFilter } from "./MQueryExtraParamFilter";

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
