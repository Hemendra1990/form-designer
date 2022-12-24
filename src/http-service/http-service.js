import axios from "axios";

const baseURL = "http://localhost:8080/hd";

const httpService = {
  testDataSource(data) {
    return axios.post(`${baseURL}/jndi/test`, data);
  },
  saveJndi(data) {
    return axios.post(`${baseURL}/jndi/save`, data);
  },
};

export default httpService;
