import { MQueryParam } from "./MQueryParam";
import { ResourceConfiguration } from "./ResourceConfiguration";

export class ResourceInfo {
  sqlList: Array<MQueryParam>;
  apiList: Array<any>;
  elements: Array<any>;
  events: Array<any>;
  configuration: ResourceConfiguration;
  version: string;
}
