import { MQueryParam } from "./MQueryParam";
import { ResourceConfiguration } from "./ResourceConfiguration";

export class SaveResource {
  resourceId: string;
  resourceName: string;
  comment: string;
  description: string;
  json: ResourceInfo;
  assetIds: Array<string>;
  images: Array<string>;
  sessionId: string;
  constructor() {
    this.json = new ResourceInfo();
  }
}

export class ResourceInfo {
  sqlList: Array<MQueryParam>;
  apiList: Array<any>;
  elements: Array<any>;
  events: Array<any>;
  configuration: ResourceConfiguration;
  version: string;
}

export class SaveResourceResponse {
  alreadyExists: boolean;
  existingResourceId: string;
  message: string;
  status: boolean;
}
