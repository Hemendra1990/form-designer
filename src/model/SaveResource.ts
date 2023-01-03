import { ResourceInfo } from "./ResourceInfo";

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
