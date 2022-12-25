import axios from "axios";

const baseURL = "http://localhost:8080/hd";

const httpService = {
  JNDI: {
    testDataSource(data) {
      return axios.post(`${baseURL}/jndi/test`, data);
    },
    save(data) {
      return axios.post(`${baseURL}/jndi/save`, data);
    },

    list() {
      return axios.get(`${baseURL}/jndi/list`);
    },
  },

  QUERY: {
    test(data) {
      return axios.post(`${baseURL}/query/test`, data);
    },
    cacheQuery(sessionId, data) {
      return axios.post(`${baseURL}/query/cacheQuery/${sessionId}`, data);
    },

    getQueryResult(queryData) {
      return axios.post(`${baseURL}/query/result`, queryData);
    },
  },
};

export default httpService;
