import Axios from "axios";
import queryString from "query-string";
import moment from "moment";

const TIMER = 60000;

//BASE-API
//webdev
// export const BASE_API = "https://cstm-api.vnptcantho.com.vn/";
export const BASE_API = "https://apidev.namlongtekgroup.com";
// export const BASE_API = "https://apiphanrang.nlt-group.com";
// export const BASE_API = "https://apicantho.nlt-group.com";
// export const BASE_API = "http://apiwim.nlt-group.com";

const HEADER = {
  accept: "text/plain",
  "Content-Type": "application/json-patch+json",
  Language: localStorage.getItem("currentLanguage") || "vn",
  "Cache-Control": "no-cache",
};

//main api
const axiosClient = new Axios.create({
  baseURL: BASE_API,
  timeout: TIMER,
  headers: HEADER,
  paramsSerializer: (params) => queryString.stringify(params),
});
//handle request
axiosClient.interceptors.request.use(async (request) => {
  request.headers.Language = localStorage.getItem("currentLanguage") || "vn";
  request.headers.Authorization =
    "Bearer " + localStorage.getItem("token") || "";
  return request;
});
//handle response
axiosClient.interceptors.response.use(
  //gọi thành công
  (response) => {
    if (
      response.data &&
      response.data.ErrorCode == 0 &&
      response.data.StatusCode == 200 &&
      response.data.Result
    ) {
      let obj = {
        status: true,
        message: response.data.Message,
        data: response.data.Result,
      };
      return obj;
    } else {
      let obj = {
        status: false,
        message: response.data.Message,
        data: null,
      };
      return obj;
    }
  },
  //gọi thất bại
  (error) => {
    if (error.request.status === 0) {
      return Promise.reject(error.message);
    }
    if (error.response.status === 401 || error.request.status === 401) {
      let user = JSON.parse(localStorage.getItem("user"));
      axiosClient
        .post(
          BASE_API + "/api/authentication/RefreshToken",
          {
            refreshToken: user.RefreshToken,
          },
          {
            baseURL: BASE_API,
            timeout: TIMER,
            headers: HEADER,
            paramsSerializer: (params) => queryString.stringify(params),
          }
        )
        .then((response) => {
          if (
            response.data &&
            response.data !== "" &&
            response.data.StatusCode === 200 &&
            response.data.Success === 1
          ) {
            localStorage.setItem("token", response.data.Result.Token);
            let newUser = {
              ...user,
              RefreshToken: response.data.Result.RefreshToken,
              Token: response.data.Result.Token,
            };
            localStorage.setItem("user", JSON.stringify(newUser));
            Axios.defaults.headers.common["Authorization"] =
              "Bearer " + response.data.Result.Token;
          } else {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            delete Axios.defaults.headers.common["Authorization"];
            location.reload();
          }
        })
        .catch((error) => {
          console.log("RefreshToken Catch => ", error.message);
        });
    }
    return Promise.reject(error.message);
  }
);

export default axiosClient;
