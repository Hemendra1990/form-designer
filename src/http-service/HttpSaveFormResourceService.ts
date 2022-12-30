import axios from "axios";
import { SaveResource } from "./../model/SaveResource";
export class HttpSaveFormResourceService {
  private baseURL = "http://localhost:8080/hd"; //TODO: this will move to environement file

  save(requestData: SaveResource) {
    return axios.post(
      `${this.baseURL}/form-design-resource/new/save`,
      requestData
    );
  }
}
