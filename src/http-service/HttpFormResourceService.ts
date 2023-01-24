import axios from "axios";
import { SaveResource } from "./../model/SaveResource";
import { PageMetaData } from "../model/PageMetaData";
export class HttpFormResourceService {
  private baseURL = "http://localhost:8080/hd/form-design-resource"; //TODO: this will move to environement file

  save(requestData: SaveResource) {
    return axios.post(
      `${this.baseURL}/new/save`,
      requestData
    );
  }

  getAll(paramData: PageMetaData) {
    return axios.post(`${this.baseURL}/list`, paramData);
  }

  getFormJson(resourceId: string) {
    return axios.get(`${this.baseURL}/json/${resourceId}`, { headers: { 'Content-Type': 'application/json' } });
  }

  getAllDetails(paramData: any) {
    return axios.post(`${this.baseURL}/list`, paramData);
  }
}
