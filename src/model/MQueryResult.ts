import { MQueryColumnInfo } from "./MQueryColumnInfo";
import { PageMetaData } from "./PageMetaData";

export class MQueryResult {
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
